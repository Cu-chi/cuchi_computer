function IsStringBlank(str)
    return (str == nil or #string.gsub(str, "^%s*(.-)%s*$", "%1") == 0)
end

function Sanitize(txt)
    local replacements = {
        ['&' ] = '&amp;',
        ['<' ] = '&lt;',
        ['>' ] = '&gt;',
        ['\n'] = '<br/>',
        --["'"] = '&apos;',
        --['"' ] = '&quot;'
    }
    --txt = txt:gsub('[&<>\n"\']', replacements):gsub(' +', function(s) return ' '..('&nbsp;'):rep(#s-1) end)
    txt = txt:gsub('[&<>\n]', replacements):gsub(' +', function(s) return ' '..('&nbsp;'):rep(#s-1) end)
    return txt
end
