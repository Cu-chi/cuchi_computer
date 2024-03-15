function IsStringBlank(str)
    return (str == nil or #string.gsub(str, "^%s*(.-)%s*$", "%1") == 0)
end

function Sanitize(str)
    local replacements = {
        ['&'] = '&amp;',
        ['<'] = '&lt;',
        ['>'] = '&gt;',
        ['\n'] = '<br/>'
    }

    str = str:gsub('[&<>\n]', replacements):gsub(' +', function(s) return ' '..('&nbsp;'):rep(#s-1) end)
    return str
end

function Round(number, x)
    return tonumber(string.format("%."..x.."f", number))
end
