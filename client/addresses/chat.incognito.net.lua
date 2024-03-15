RegisterNUICallback("cinConnect", function(data, cb)
    local username = string.sub(data.username, 1, 16)
    Framework.TriggerServerCallback("ccmp:cin:connect", function(sanitizedUsername)
        if not sanitizedUsername then
            return cb({})
        end

        cb({ username = sanitizedUsername })
    end, username)
end)

RegisterNUICallback("cinMessage", function(data, cb)
    local message = string.sub(data.message, 1, 255)
    if not IsStringBlank(message) then
        TriggerServerEvent("ccmp:cin:message", message)
    end
    cb("OK")
end)

RegisterNUICallback("cinDisconnect", function(_, cb)
    TriggerServerEvent("ccmp:cin:disconnect")
    cb("OK")
end)

RegisterNetEvent("ccmp:cin:chat", function(username, message)
    SendNUIMessage({
        type = "chat.incognito.net",
        username = username,
        message = message
    })
end)
