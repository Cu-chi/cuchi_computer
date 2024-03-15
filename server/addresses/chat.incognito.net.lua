local PlayersInChat = {}

Framework.RegisterServerCallback("ccmp:cin:connect", function(id, cb, username)
    local sanitizedUsername = Sanitize(username)

    if not IsUsernameFree(sanitizedUsername) then
        return cb(false)
    end

    PlayersInChat[id] = sanitizedUsername
    cb(sanitizedUsername)
end)

RegisterNetEvent("ccmp:cin:disconnect", function()
    local username = PlayersInChat[source]
    if username then
        PlayersInChat[source] = nil
        SendToChat(username)
    end
end)

RegisterNetEvent("ccmp:cin:message", function(message)
    local sanitizedMessage = Sanitize(message)

    if IsStringBlank(sanitizedMessage) then
        return
    end

    local username = PlayersInChat[source]
    if username then
        SendToChat(username, sanitizedMessage)
    end
end)

function IsUsernameFree(usernameWanted)
    for _, username in pairs(PlayersInChat) do
        if username == usernameWanted then
            return false
        end
    end
    return true
end

function SendToChat(username, message)
    -- addr_chatincognitonet_left
    for id, _ in pairs(PlayersInChat) do
        TriggerClientEvent("ccmp:cin:chat", id, username, message)
    end
end

AddEventHandler("playerDropped", function()
    local username = PlayersInChat[source]
    if username then
        PlayersInChat[source] = nil
        SendToChat(username)
    end
end)
