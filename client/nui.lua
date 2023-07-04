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
            CustomNotification(GetLocale("already_in_use"))
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

local dataWaiting = false
local appsData = {
    themes = AppConfig.Themes
}
RegisterNUICallback("getApplicationsData", function(data, cb)
    if dataWaiting then
        cb("")
        return
    end

    dataWaiting = true
    TriggerServerEvent("cuchi_computer:getApplicationsData", data and data.application or nil)

    while dataWaiting do
        Wait(10)
    end
    cb(appsData)
end)

local waiting = {
    market = false
}
RegisterNUICallback("appAction", function(data, cb)
    if data.app == "market" then
        if  data.type == "create" then
            if not data.title or not data.description or IsStringBlank(data.title) or IsStringBlank(data.description) then
                cb("error_market_empty_arg")
                return
            end

            local title = Sanitize(data.title)
            local description = Sanitize(data.description)
            if #title > 16 or #description > 512 then
                cb("error_market_arg_overflow")
                return
            end

            waiting.market = "waiting"
            TriggerServerEvent("cuchi_computer:postMarket", title, description)
            while waiting.market == "waiting" do
                Wait(50)
            end

            if waiting.market == "delay" then
                cb("error_market_delay")
            elseif waiting.market == "max" then
                cb("error_market_max")
            else
                cb("OK")
            end

            waiting.market = false
        elseif data.type == "delete" then
            local id = tonumber(data.id)
            if id and id > 0 and math.type(id) == "integer" then
                waiting.market = "waiting"
                TriggerServerEvent("cuchi_computer:delete", id)
                while waiting.market == "waiting" do
                    Wait(50)
                end

                if waiting.market == "not_yours" then
                    cb("error_market_id_not_yours")
                else
                    cb("OK")
                end

                waiting.market = false
            else
                cb("error_market_id")
            end
        end
    end
end)

RegisterNetEvent("cuchi_computer:response", function(app, res)
    waiting[app] = res
end)

RegisterNetEvent("cuchi_computer:getApplicationsData", function(app, data, identifier)
    if identifier then
        SendNUIMessage({
            type = "identifier",
            identifier = identifier
        })
    end

    appsData[app] = data
    dataWaiting = false
end)

CreateThread(function()
    SendNUIMessage({
        type = "version",
        version = GetResourceMetadata(GetCurrentResourceName(), "version", 0)
    })
end)
