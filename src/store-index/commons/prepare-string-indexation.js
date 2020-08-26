import removeAccents from "remove-accents";

function prepare(token = "") {
  return typeof token === "string"
    ? removeAccents(token.toLowerCase()).replace(/[- ']/g, "")
    : token;
}

export default prepare;
