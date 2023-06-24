var eneasy = require("./translations.en-easy.json");
var hieasy = require("./translations.hi-easy.json");
var enmedium = require("./translations.en-medium.json");
var himedium = require("./translations.hi-medium.json");
var enhard = require("./translations.en-hard.json");
var hihard = require("./translations.hi-hard.json");

const i18n = {
  translations: {
    eneasy,
    hieasy,
    enmedium,
    himedium,
    enhard,
    hihard
  },
  defaultLang: "eneasy",
  useBrowserDefault: true,
};

module.exports = i18n;