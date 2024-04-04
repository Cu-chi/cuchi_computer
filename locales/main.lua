Locales = {}

function GetLocale(key)
    local locale = Locales[Config.Locale][key]
    if locale then
        return locale
    end

    return key + " doesn't exist"
end
