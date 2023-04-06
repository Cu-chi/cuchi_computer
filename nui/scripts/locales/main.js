var Locale = "FR";

const GetLocale = (key) => {
    var locale = Locales[Locale][key];
    if (locale) return locale;

    locale = Locales["en"][key];
    if (locale) return locale;

    return key + " doesn't exist"
};
