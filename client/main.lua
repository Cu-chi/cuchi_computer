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

if #Config.UsablePositions > 0 then
    CreateThread(function()
        while true do
            if UIOpen then
                Wait(500)
                goto skip
            end

            local playerPedId = PlayerPedId()
            local playerCoords = GetEntityCoords(playerPedId)

            local nearestDistance
            local nearestIndex = 0
            for i = 1, #Config.UsablePositions, 1 do
                local currentDistance = #(playerCoords - Config.UsablePositions[i])
                if not nearestDistance or currentDistance < nearestDistance then
                    nearestDistance = currentDistance
                    nearestIndex = i
                end
            end

            if nearestDistance and nearestDistance < 2.0 then
                CustomDrawMarker(Config.UsablePositions[nearestIndex])
                CustomHelpNotification("~INPUT_CONTEXT~ to start computer")

                if IsControlJustPressed(0, 51) then
                    OpenUI(Config.UsablePositions[nearestIndex])
                end
                Wait(0)
            else
                Wait(500)
            end

            ::skip::
        end
    end)
end
