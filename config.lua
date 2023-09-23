Config = {}

-- JOIN MY DISCORD: https://discord.gg/qvFmwj2a2T

-- Shared
Config.Framework = "esx" -- esx/qbcore
Config.FrameworkResourceName = "es_extended" -- the framework resource name (e.g.: "es_extended" or "qb-core")
Config.FrameworkOptionalExportName = "" -- if you changed the function's name to get the object, place the new here

Config.Locale = "EN"

Config.UseItem = "laptop" -- set the item that will be used to display the interface (to disable it, let it empty)
if IsDuplicityVersion() then

    Config.Functions = {
        ---Function that will return an identifier for the specified player
        ---@param src string
        ---@param playerObj table equals xPlayer for ESX and Player for QBCore
        ---@return string
        GetIdentifier = function(src, playerObj)
            local license, _ = string.gsub(GetPlayerIdentifierByType(src, "license"), "license:", "")
            return license

            -- example using multichar on QBCore (identifier based on the charid)
            -- return playerObj.PlayerData.citizenid
        end
    }
else
    Config.LaptopInVehicle = true -- make laptop usable or not in vehicles
    Config.UsablePositions = { -- if you want to use positions where players can open the computer
        vector3(1275.5, -1710.7, 54.8),
        vector3(1272.3, -1711.6, 54.8),
    }

    CustomDrawMarker = function(coords)
        DrawMarker(20, coords.x, coords.y, coords.z, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.25, 0.25, 0.25, 20, 20, 200, 100, true, true, 2, false, nil, nil, false)
    end

    CustomHelpNotification = function(text)
        AddTextEntry("computers:notif", text)
        BeginTextCommandDisplayHelp("computers:notif")
        EndTextCommandDisplayHelp(0, false, true, -1)
    end

    CustomNotification = function(text)
        BeginTextCommandThefeedPost("STRING")
        AddTextComponentSubstringPlayerName(text)
        EndTextCommandThefeedPostTicker(false, true)
    end
end
