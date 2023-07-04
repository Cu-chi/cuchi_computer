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
    end
else
    print("^1Error loading the framework.\n-> Check if you entered the good framework value and its resource name in ^7"..GetCurrentResourceName().."/config.lua\nNote that this resource ^1must^7 be started after your framework resource.")
end

if Config.UseItem and Config.UseItem ~= "" then
    Framework.RegisterUsableItem("laptop", function(src)
        TriggerClientEvent("cuchi_computer:useItem", src)
    end)
end

Framework.RegisterServerCallback("ccmp:startComputer", function(_, cb, location)
    cb(RegisterNewIP(location))
end)

RegisterNetEvent("ccmp:stopComputer", function(location)
    local ip = GetIPFromLocation(location)
    if ip then
        SetIPState(ip, false)
    end
end)

RegisterNetEvent("cuchi_computer:getIdentifier", function()
    local _source = source
    local identifier = Config.Functions.GetIdentifier(_source, Framework.GetPlayerFromId(_source))
    TriggerClientEvent("cuchi_computer:getIdentifier", _source, identifier)
end)
