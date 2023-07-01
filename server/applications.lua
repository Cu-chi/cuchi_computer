local appQueries = {
    -- ["app name"] = "selection(s)"
    ["market"] = "*"
}

RegisterNetEvent("cuchi_computer:getApplicationsData", function(specifiedApplication)
    local _source = source
    local identifier = Config.Functions.GetIdentifier(_source, Framework.GetPlayerFromId(_source))
    if not specifiedApplication then
        for app, selections in pairs(appQueries) do
            MySQL.query("SELECT "..selections.." FROM computers_"..app, {}, function(result)
                TriggerClientEvent("cuchi_computer:getApplicationsData", _source, app, result)
            end)
        end
    else
        local knownAppQuery = appQueries[specifiedApplication]
        if knownAppQuery then -- prevent SQL injection
            MySQL.query("SELECT "..knownAppQuery.." FROM computers_"..specifiedApplication, {}, function(result)
                TriggerClientEvent("cuchi_computer:getApplicationsData", _source, specifiedApplication, result, identifier)
            end)
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
                TriggerClientEvent("cuchi_computer:response", _source, "market", false)
            end)
        end
    end)
end)

RegisterNetEvent("cuchi_computer:delete", function(id)
    local _source = source
    local identifier = Config.Functions.GetIdentifier(_source, Framework.GetPlayerFromId(_source))

    MySQL.query("DELETE FROM computers_market WHERE id = ? AND seller = ?", {id, identifier}, function(result)
        print(result.affectedRows)
        if result.affectedRows > 0 then
            TriggerClientEvent("cuchi_computer:response", _source, "market", false)
        else
            TriggerClientEvent("cuchi_computer:response", _source, "market", "not_yours")
        end
    end)
end)
