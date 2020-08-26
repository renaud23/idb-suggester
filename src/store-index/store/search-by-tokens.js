import searchByPrefix from "./search-by-prefix";
import tokenizer from "string-tokenizer";
import removeAccents from "remove-accents";
import { tokensToArray } from "../commons";
import { getStemmer } from "../commons";

function mergeToPatterns(p, field) {
  const { rules, name } = field;
  return rules.reduce(
    function (a, pattern, i) {
      return { ...a, [`pattern${name}${i}`]: pattern };
    },
    { ...p }
  );
}

function stemAll(tokens, stemmer) {
  return tokens.map((token) => stemmer(token));
}

function createTokenizer(fields, language) {
  const stemmer = getStemmer(language);
  const patterns = fields.reduce(function (a, f, i) {
    const { rules } = f;
    if (rules) {
      return mergeToPatterns(a, f);
    }
    return a;
  }, {});

  return function (query = "") {
    const all = tokenizer()
      .input(removeAccents(query).toLocaleLowerCase())
      .tokens(patterns)
      .resolve();
    return stemAll(tokensToArray(all), stemmer);
  };
}

function resolve(propositions, how) {
  const map_ = propositions.reduce(function (a, suggestions) {
    return suggestions.reduce(
      function (b, s) {
        const { id } = s;
        if (id in b) {
          const [s_, how] = b[id];
          return { ...b, [id]: [s_, how + 1] };
        }
        return { ...b, [id]: [s, 1] };
      },
      { ...a }
    );
  }, {});

  const sorted = Object.values(map_).sort(function (a, b) {
    if (a[1] > b[1]) {
      return -1;
    }
    if (a[1] < b[1]) {
      return 1;
    }
    return 0;
  });
  return sorted.reduce(function (a, [s]) {
    if (a.length < how) {
      return [...a, s];
    }
    return a;
  }, []);
}

function create(store, fields = [], language = "French") {
  if (!store) {
    return undefined;
  }
  const queryParser = createTokenizer(fields, language);
  const searching = searchByPrefix(store);

  return async function (query, how) {
    const tokens = queryParser(query);
    const suggestions = await Promise.all(
      tokens.reduce(function (a, t) {
        return [...a, searching(t, how)];
      }, [])
    );
    return resolve(suggestions, how);
  };
}

export default create;
