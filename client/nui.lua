UIOpen = false
Location = nil
RegisterNetEvent("cuchi_computer:useItem", OpenUI)

function OpenUI(location)
    Location = location or GetEntityCoords(PlayerPedId())
    Framework.TriggerServerCallback("ccmp:startComputer", function(ip)
        if ip then
            SendNUIMessage({
                type = "show",
                ip = ip
            })
            SetNuiFocus(true, true)
            UIOpen = true
        else
            Location = nil
            CustomNotification("locale to define")
        end
    end, location)
end

RegisterNUICallback("exit", function(_, cb)
    SetNuiFocus(false, false)
    UIOpen = false
    TriggerServerEvent("ccmp:stopComputer", Location)
    Location = nil
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
