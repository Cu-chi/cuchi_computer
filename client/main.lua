Framework = nil
CurrentResourceName = GetCurrentResourceName()
local duiObj = nil
local doingDataHeist = false
local laptopPropName = joaat("prop_laptop_lester2")

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
        print("^1Error loading the framework.\n-> Check if you entered the good framework value and its resource name in ^7"..CurrentResourceName.."/config.lua")
    end

    TriggerServerEvent("cuchi_computer:getIdentifier")
end)

if Config.UseItem and Config.UseItem ~= "" then
    CreateThread(function()
        -- request the model so we can replace the texture
        RequestModel(laptopPropName)
        while not HasModelLoaded(laptopPropName) do
            Wait(0)
        end

        local txd = CreateRuntimeTxd("cuchi_computer")
        duiObj = CreateDui("https://cfx-nui-"..CurrentResourceName.."/assets/screen.gif", 256, 256)

        while not IsDuiAvailable(duiObj) do
            Wait(0)
        end

        local dui = GetDuiHandle(duiObj)
        CreateRuntimeTextureFromDuiHandle(txd, "screen", dui)
        AddReplaceTexture("prop_laptop_lester2", "script_rt_tvscreen", "cuchi_computer", "screen")

        SetModelAsNoLongerNeeded(laptopPropName)
    end)
end

math.randomseed(GetCloudTimeAsInt())

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
                CustomHelpNotification(GetLocale("start_computer"))

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

if Config.DataHeists.Enabled then
    if Config.DataHeists.DisplayArea then
        CreateThread(function()
            for coords, radius in pairs(Config.DataHeists.Areas) do
                local area = AddBlipForRadius(coords.x, coords.y, coords.z, radius + 0.0)
                SetBlipHighDetail(area, true)
                SetBlipColour(area, 40)
                SetBlipAlpha(area, 180)

                local blip = AddBlipForCoord(coords.x, coords.y, coords.z)

                SetBlipSprite(blip, 310)
                SetBlipDisplay(blip, 4)
                SetBlipScale(blip, 0.8)
                SetBlipColour(blip, 49)
                SetBlipAsShortRange(blip, true)

                BeginTextCommandSetBlipName("STRING")
                AddTextComponentString(GetLocale("data_heist"))
                EndTextCommandSetBlipName(blip)
            end
        end)
    end

    function GetDataHeistAtCoords(coords)
        local nearest
        local nearestDistance
        for heistCoords, radius in pairs(Config.DataHeists.Areas) do
            local distance = #(coords - heistCoords)
            if distance <= radius then
                if not nearest or nearestDistance > distance then
                    nearest = heistCoords
                    nearestDistance = distance
                end
            end
        end
        return nearest
    end

    local heistIP = ""
    local heistPort = ""
    local curHeistCoords
    local canBreach = false

    local commands = {

        ---@param cb function
        ["detect"] = function(_, cb)
            local ped = PlayerPedId()
            local coords = GetEntityCoords(ped)
            curHeistCoords = GetDataHeistAtCoords(coords)

            if not curHeistCoords then
                cb(false)
                return
            end

            DataHeistAreaCheck(curHeistCoords)
            canBreach = false
            heistIP = ""

            for _, v in ipairs({ -- get unique ip address from coords
            curHeistCoords.x,
            curHeistCoords.y,
            curHeistCoords.z,
            curHeistCoords.y-curHeistCoords.x,
            }) do
                if heistIP ~= "" then
                    heistIP = heistIP.."."
                end
                heistIP = heistIP..(10 + (math.floor(v) % 200))
            end

            cb(heistIP)
        end,

        ---@param cb function
        ["scan"] = function(data, cb)
            if data["-ports"] == heistIP then
                heistPort = (1000 + (math.floor(curHeistCoords.x+curHeistCoords.y) % 64535))..""
                cb(heistPort)
            else
                cb(false)
            end
        end,

        ---@param cb function
        ["infiltrate"] = function(data, cb)
            if data["-ip"] == heistIP and data["-port"] == heistPort then
                canBreach = true
                cb(true)
            else
                cb(false)
            end
        end,

        ---@param cb function
        ["breach"] = function(data, cb)
            if data["-ip"] == heistIP and data["-port"] == heistPort then
                if not canBreach then
                    return cb("no")
                end

                Framework.TriggerServerCallback("ccmp:dataHeist", function(result)
                    cb(result)
                end, curHeistCoords)
            else
                cb(false)
            end
        end,
    }

    RegisterNUICallback("dataHeist", function(data, cb)
        commands[data.cmd](data, cb)
    end)

    RegisterNUICallback("sellData", function(data, cb)
        if curHeistCoords then
            Framework.TriggerServerCallback("ccmp:dataHeistClaim", function(result, reward)
                if result then
                    StopDataHeist()
                end

                cb({
                    ok = result,
                    reward = reward
                })
            end, curHeistCoords, data.path)
        else
            cb({})
        end
    end)

    function StopDataHeist()
        heistIP = ""
        heistPort = ""
        curHeistCoords = nil
        canBreach = false
        doingDataHeist = false
    end

    function DataHeistAreaCheck(heistCoords)
        CreateThread(function()
            local ped = PlayerPedId()
            local radius = Config.DataHeists.Areas[heistCoords]
            while doingDataHeist do
                local coords = GetEntityCoords(ped)
                local distance = #(coords - heistCoords)
                if distance > radius then
                    StopDataHeist()
                    break
                end
                Wait(100)
            end
        end)
    end

    RegisterNetEvent("ccmp:dataHeistCall", function(gps)
        SetNewWaypoint(gps.x, gps.y)
        CustomNotification(GetLocale("data_heist_call"))
    end)
end

RegisterNetEvent("cuchi_computer:getIdentifier", function(identifier)
    SendNUIMessage({
        type = "identifier",
        identifier = identifier
    })
end)

local computerDict = "anim@scripted@ulp_missions@computerhack@heeled@"
local computerpName = "hacking_loop"

local laptopDict = "missfam6leadinoutfam_6_mcs_1"
local laptopName = "leadin_loop_c_laptop_girl"
local laptopProp = 0

local shouldStop = false

---Start animation and loop to check coords
---@param laptop boolean
---@param openCoords vector3
function StartAnimationAndCheck(laptop, openCoords)
    shouldStop = false
    local dict = computerDict
    local anim = computerpName

    if laptop then
        dict = laptopDict
        anim = laptopName

        RequestModel(laptopPropName)
        while not HasModelLoaded(laptopPropName) do
            Wait(0)
        end

        laptopProp = CreateObject(laptopPropName, 0, 0, 0, true, true, true)
        SetModelAsNoLongerNeeded(laptopPropName)
        AttachEntityToEntity(laptopProp, PlayerPedId(), 11816, 0.0, 0.42, 0.26, 0.0, 0.0, 0.0, false, false, false, true, 2, true)
    end

    RequestAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
        Wait(0)
    end

    local it = 10
    while not shouldStop do
        local ped = PlayerPedId()
        local coords = GetEntityCoords(ped)

        local distance = #(coords - openCoords)
        -- max distance of 2m for computers and 10m for laptops
        if (not laptop and distance > 2) or distance > 10 then
            SendNUIMessage({
                type = "force-close"
            })
        end

        if it >= 10 then -- only each 2000ms
            TaskPlayAnim(PlayerPedId(), dict, anim, 8.0, 8.0, -1, 17, 0, false, false, false)
            it = 0
        end

        it += 1
        Wait(200)
    end

    RemoveAnimDict(dict)
end

function StopAnimation(laptop)
    shouldStop = true
    local dict = computerDict
    local anim = computerpName

    if laptop then
        dict = laptopDict
        anim = laptopName

        DeleteObject(laptopProp)
        laptopProp = 0
    end

    StopEntityAnim(PlayerPedId(), anim, dict, 0)
end

AddEventHandler("onResourceStop", function(resourceName)
    if resourceName == CurrentResourceName then
        if laptopProp ~= 0 then
            DeleteObject(laptopProp)
            ClearPedTasks(PlayerPedId())

            if duiObj then
                DestroyDui(duiObj)
            end
        end
    end
end)
