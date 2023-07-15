local appCache = {
    ["market"] = {
        needsRefresh = true,
        result = nil
    }
}
local appQueries = {
    -- ["app name"] = "selection(s)"
    ["market"] = "id, seller, title, description"
}

CreateThread(function()
    MySQL.query("DELETE FROM computers_market WHERE (UNIX_TIMESTAMP() - timestamp) > ?", {AppConfig.Market.timeBeforeAutomaticDeletion}, function(result)
        if result.affectedRows > 0 then
            print("^4[INFO > MARKET]^7 Deleted ^4"..result.affectedRows.." post(s)^7 from database: time before automatic deletion exceed.")
        end
    end)
end)

RegisterNetEvent("cuchi_computer:getApplicationsData", function(specifiedApplication)
    local _source = source
    if not specifiedApplication then
        for app, selections in pairs(appQueries) do
            if appCache[app].needsRefresh then
                MySQL.query("SELECT "..selections.." FROM computers_"..app, {}, function(result)
                    appCache[app] = { needsRefresh = false, result = result }
                    TriggerClientEvent("cuchi_computer:getApplicationsData", _source, app, result)
                end)
            else
                TriggerClientEvent("cuchi_computer:getApplicationsData", _source, app, appCache[app].result)
            end
        end
    else
        local knownAppQuery = appQueries[specifiedApplication]
        if knownAppQuery then -- prevent SQL injection
            if appCache[specifiedApplication].needsRefresh then
                MySQL.query("SELECT "..knownAppQuery.." FROM computers_"..specifiedApplication, {}, function(result)
                    appCache[specifiedApplication] = { needsRefresh = false, result = result }
                    TriggerClientEvent("cuchi_computer:getApplicationsData", _source, specifiedApplication, result)
                end)
            else
                TriggerClientEvent("cuchi_computer:getApplicationsData", _source, specifiedApplication, appCache[specifiedApplication].result)
            end
        end
    end
end)

local delay = {}
RegisterNetEvent("cuchi_computer:postMarket", function(title, description)
    local _source = source
    local identifier = Config.Functions.GetIdentifier(_source, Framework.GetPlayerFromId(_source))

    if not delay[_source] or os.time() - delay[_source] > AppConfig.Market.delayBetweenEachPost then
        delay[_source] = os.time()
    else
        TriggerClientEvent("cuchi_computer:response", _source, "market", "delay")
        return
    end

    MySQL.query("SELECT COUNT(1) as posts FROM computers_market WHERE seller = ?", {identifier}, function(result)
        if result[1].posts >= AppConfig.Market.maxPosts then
            TriggerClientEvent("cuchi_computer:response", _source, "market", "max")
        else
            MySQL.insert("INSERT INTO computers_market (seller, title, description) VALUES (?,?,?)", {identifier, title, description}, function()
                appCache["market"].needsRefresh = true
                TriggerClientEvent("cuchi_computer:response", _source, "market", false)
            end)
        end
    end)
end)

RegisterNetEvent("cuchi_computer:delete", function(id)
    local _source = source
    local identifier = Config.Functions.GetIdentifier(_source, Framework.GetPlayerFromId(_source))

    MySQL.query("DELETE FROM computers_market WHERE id = ? AND seller = ?", {id, identifier}, function(result)
        if result.affectedRows > 0 then
            appCache["market"].needsRefresh = true
        end
        TriggerClientEvent("cuchi_computer:response", _source, "market", result.affectedRows ==  0 and "not_yours" or false)
    end)
end)

RegisterNetEvent("ccmp:createAccount", function(username, password)
    local _source = source
    local identifier = Config.Functions.GetIdentifier(_source, Framework.GetPlayerFromId(_source))

    MySQL.query("SELECT 1 FROM computers_mail_accounts WHERE username = ?", {username}, function(result)
        if #result > 0 then
            TriggerClientEvent("cuchi_computer:response", _source, "mail", "used")
        else
            MySQL.insert("INSERT INTO computers_mail_accounts (identifier,username,password) VALUES (?,?,?)", {identifier, username, password}, function()
                TriggerClientEvent("cuchi_computer:response", _source, "mail", false)
            end)
        end
    end)
end)

local connectedMail = {}
RegisterNetEvent("ccmp:mailConnect", function(username, password)
    local _source = source

    MySQL.query("SELECT 1 FROM computers_mail_accounts WHERE username = ? and PASSWORD = ?", {username, password}, function(result)
        if #result == 0 then
            TriggerClientEvent("cuchi_computer:response", _source, "mail", "wrong")
        else
            TriggerClientEvent("cuchi_computer:response", _source, "mail", false)
            connectedMail[_source] = username
        end
    end)
end)

AddEventHandler("playerDropped", function()
    connectedMail[source] = nil
end)

RegisterNetEvent("ccmp:mailSend", function(mailAddress, object, text, answerTo)
    local _source = source
    local sender = connectedMail[_source]

    MySQL.query("SELECT 1 FROM computers_mail_accounts WHERE username = ?", {mailAddress}, function(result)
        if #result == 0 then
            TriggerClientEvent("cuchi_computer:response", _source, "mail", "mail_error")
        else
            MySQL.insert("INSERT INTO computers_mail_mails (`from`,`to`,`object`,`text`,`answer_to`) VALUES (?,?,?,?,?)", {sender, mailAddress, object, text, answerTo}, function()
                TriggerClientEvent("cuchi_computer:response", _source, "mail", false)
            end)
        end
    end)
end)

RegisterNetEvent("ccmp:mailRefresh", function()
    local _source = source
    if connectedMail[_source] ~= nil then
        MySQL.query("SELECT * FROM computers_mail_mails WHERE `from` = ? OR `to` = ?", {connectedMail[_source], connectedMail[_source]}, function(result)
            TriggerLatentClientEvent("cuchi_computer:getApplicationsData", _source, 8192 * 2, "mail", result)
        end)
    end
end)

RegisterNetEvent("ccmp:readMail", function(id)
    local _source = source
    if connectedMail[_source] ~= nil then
        MySQL.query("UPDATE computers_mail_mails SET `read` = 1 WHERE `to` = ? AND (`id` = ? OR `answer_to` = ?)", {connectedMail[_source], id, id})
    end
end)
