Framework = nil

SetTimeout(0, function()
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
            Framework.TriggerServerCallback = Framework.Functions.TriggerCallback
        end
    else
        print("^1Error loading the framework.\n-> Check if you entered the good framework value and its resource name in ^7"..GetCurrentResourceName().."/config.lua")
    end
end)

RegisterNetEvent("cuchi_computer:useItem", function()
    SendNUIMessage({
        type = "show"
    })
    SetNuiFocus(true, true)
end)

RegisterNUICallback("exit", function(_, cb)
    SetNuiFocus(false, false)
    cb("OK")
end)

RegisterNUICallback("NUIOk", function(_, cb)
    NUIOk = true
    cb("OK")
end)

CreateThread(function()
    SendNUIMessage({
        type = "version",
        version = GetResourceMetadata(GetCurrentResourceName(), "version", 0)
    })
end)
