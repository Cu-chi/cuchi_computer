var Locale = localStorage.getItem("locale");
if (!Locale)
    Locale = "EN";

/**
 * Get locale string
 * @param {string} key locale string key
 * @returns {string} locale string
 */
const GetLocale = (key) => {
    var locale = Locales[Locale][key];
    if (locale) return locale;

    locale = Locales["en"][key];
    if (locale) return locale;

    return key + " doesn't exist"
};

/**
 * Defines locale for the client-side
 * @param {string} key key of the language 
 */
const SetLocale = (key) => {
    if (!Locales[key]) console.log("locale key " + key + " doesn't exist");

    Locale = key;
    localStorage.setItem("locale", key)
    document.getElementById("locale-selection").innerText = GetLocale("os_lang");
}
