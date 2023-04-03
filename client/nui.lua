UIOpen = false
RegisterNetEvent("cuchi_computer:useItem", OpenUI)

function OpenUI()
    SendNUIMessage({
        type = "show"
    })
    SetNuiFocus(true, true)
    UIOpen = true
end

RegisterNUICallback("exit", function(_, cb)
    SetNuiFocus(false, false)
    UIOpen = false
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
