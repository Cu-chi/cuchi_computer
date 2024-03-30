Framework = nil

local success, result
if Config.Framework == "esx" then
    success, result = pcall(function()
        if Config.FrameworkOptionalExportName ~= "" then
            return exports[Config.FrameworkResourceName][Config.FrameworkOptionalExportName]()
        end
        return exports[Config.FrameworkResourceName]:getSharedObject()
    end)
elseif Config.Framework == "qbcore" then
    success, result = pcall(function()
        if Config.FrameworkOptionalExportName ~= "" then
            return exports[Config.FrameworkResourceName][Config.FrameworkOptionalExportName]()
        end
        return exports[Config.FrameworkResourceName]:GetCoreObject()
    end)
end

if success then
    Framework = result

    if Config.Framework == "qbcore" then -- standardization of framework functions
        Framework.RegisterServerCallback = Framework.Functions.CreateCallback
        Framework.GetPlayerFromId = Framework.Functions.GetPlayer
        Framework.RegisterUsableItem = Framework.Functions.CreateUseableItem
        Framework.GetPlayers = Framework.Functions.GetPlayers
    end
else
    print("^1Error loading the framework.\n-> Check if you entered the good framework value and its resource name in ^7"..GetCurrentResourceName().."/config.lua\nNote that this resource ^1must^7 be started after your framework resource.")
end

math.randomseed(os.time())

if Config.UseItem and Config.UseItem ~= "" then
    Framework.RegisterUsableItem("laptop", function(src, item)
        if Config.Framework == "qbcore" then
            local Player = Framework.GetPlayerFromId(src)
            if Player.Functions.GetItemByName(item.name) ~= nil then
                TriggerClientEvent("cuchi_computer:useItem", src)
            end
        else
            TriggerClientEvent("cuchi_computer:useItem", src)
        end
    end)
end

Framework.RegisterServerCallback("ccmp:startComputer", function(_, cb, location)
    cb(RegisterNewIP(location))
end)

RegisterNetEvent("ccmp:stopComputer", function(location, laptop)
    local ip = GetIPFromLocation(location)

    if ip then
        if not laptop then
            SetIPState(ip, false)
        else
            RemoveIP(ip)
        end
    end
end)

RegisterNetEvent("cuchi_computer:getIdentifier", function()
    local _source = source
    local identifier = Config.Functions.GetIdentifier(_source, Framework.GetPlayerFromId(_source))
    TriggerClientEvent("cuchi_computer:getIdentifier", _source, identifier)
end)

Framework.RegisterServerCallback("ccmp:ipTracer", function(_, cb, ip)
    cb(GetLocationFromIP(ip) or "DISCONNECTED")
end)

Framework.RegisterServerCallback("ccmp:netscan", function(_, cb)
    cb(GetAllIPAddresses())
end)

if Config.DataHeists.Enabled then
    local heistDelays = Config.DataHeists.TypeOfDelay == "each" and {} or 0
    local breachPaths = {}

    Framework.RegisterServerCallback("ccmp:dataHeist", function(id, cb, heistCoords)
        local range = Config.DataHeists.Areas[heistCoords]
        if range then
            local ped = GetPlayerPed(id)
            local coords = GetEntityCoords(ped)
            local distance = #(coords - heistCoords)
            if distance <= range then -- security check
                local delay = (Config.DataHeists.TypeOfDelay == "each" and (heistDelays[heistCoords] or 0) or heistDelays)
                local delta = os.time() - delay
                if delta >= Config.DataHeists.Delay * 60 * 1000 then
                    if Config.DataHeists.TypeOfDelay == "each" then
                        heistDelays[heistCoords] = os.time()
                    else
                        heistDelays = os.time()
                    end

                    local gps = vector2(coords.x, coords.y)
                    local players = Framework.GetPlayers()

                    for i = 1, #players, 1 do
                        local player = Framework.GetPlayerFromId(players[i])

                        if player then
                            for j = 1, #Config.DataHeists.JobsToCall, 1 do
                                local jobName = ""
                                if Config.Framework == "esx" then
                                    jobName = player.job.name
                                elseif Config.Framework == "qbcore" then
                                    jobName = player.PlayerData.job.name
                                end

                                if jobName == Config.DataHeists.JobsToCall[j] then
                                    TriggerClientEvent("ccmp:dataHeistCall", players[i], gps)
                                    break
                                end
                            end
                        end
                    end

                    local netPath = "//".."breach-temp"..math.random(0, 100000).."/breached/data/dump-"..math.random(0, 100000)
                    breachPaths[netPath] = heistCoords

                    cb(netPath)
                else
                    cb("delay")
                end
            end
        end
    end)

    Framework.RegisterServerCallback("ccmp:dataHeistClaim", function(id, cb, heistCoords, netPath)
        local range = Config.DataHeists.Areas[heistCoords]
        if range then
            local ped = GetPlayerPed(id)
            local coords = GetEntityCoords(ped)
            local distance = #(coords - heistCoords)
            if distance <= range then -- security check
                if breachPaths[netPath] and breachPaths[netPath] == heistCoords then
                    breachPaths[netPath] = nil
                    local player = Framework.GetPlayerFromId(id)
                    local reward = math.random(Config.DataHeists.Reward[1], Config.DataHeists.Reward[2])

                    if Config.Framework == "esx" then
                        player.addMoney(reward)
                    elseif Config.Framework == "qbcore" then
                        player.Functions.AddMoney("cash", reward)
                    end

                    cb(true, reward)
                else
                    cb(false)
                end
            end
        end
    end)
end
