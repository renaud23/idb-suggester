import Snowball from "snowball";

const STEMMERS = {};

function getStemmer(language = "English") {
  if (!(language in STEMMERS)) {
    const stemmer = new Snowball(language);
    STEMMERS[language] = function (token) {
      stemmer.setCurrent(token);
      stemmer.stem();
      return stemmer.getCurrent();
    };
  }

  return STEMMERS[language];
}

export default getStemmer;
