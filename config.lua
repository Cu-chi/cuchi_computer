Config = {}

-- JOIN MY DISCORD: https://discord.gg/qvFmwj2a2T

-- Shared
Config.Framework = "esx" -- esx/qbcore
Config.FrameworkResourceName = "es_extended" -- the framework resource name (e.g.: "es_extended" or "qb-core")
Config.FrameworkOptionalExportName = "" -- if you changed the function's name to get the object, place the new here

Config.Locale = "EN" -- EN/FR/ES/DA/DE

Config.UseItem = "laptop" -- set the item that will be used to display the interface (to disable it, let it empty)

Config.DataHeists = {
    Enabled = true,
    DisplayArea = false, -- display area on the map
    Reward = { 10000, 20000 }, -- random between [1] and [2]
    TypeOfDelay = "each", -- "each": one delay for each area OR "all": one delay for all areas
    Delay = 60, -- in minutes
    JobsToCall = { "police", "sheriff" }, -- jobs to send call when a heist is triggered
    Areas = {
        --[coords as vector3] = areaRadius in meters
        -- fleeca
        [vector3(149.9, -1040.46, 29.37)] = 14,
        [vector3(314.23, -278.83, 54.17)] = 14,
        [vector3(-350.8, -49.57, 49.04)] = 14,
        [vector3(-1213.0, -330.39, 37.79)] = 14,
        [vector3(246.64, 223.2, 106.29)] = 14,

        -- arcadius tower (area in parking)
        [vector3(-160.274, -606.16, 32.424)] = 50
    }
}

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

    Config.UseProps = { -- list of props
        -- included is a list of all basegame laptop/computer/monitor props
        -- remove any that you don't want to use, remove all to disable

        -- laptops
        joaat("prop_laptop_01a"),
        joaat("p_cs_laptop_02"),
        joaat("hei_prop_hst_laptop"),
        joaat("xm_prop_x17_laptop_agent14_01"),
        joaat("prop_laptop_jimmy"),
        joaat("gr_prop_gr_laptop_01b"),
        joaat("as_prop_as_laptop_01a"),
        joaat("h4_prop_club_laptop_dj"),
        joaat("h4_prop_h4_laptop_01a"),
        joaat("h4_prop_club_laptop_dj_02"),
        joaat("bkr_ware05_laptop3"),
        joaat("p_laptop_02_s"),
        joaat("sf_prop_sf_laptop_01a"),
        joaat("prop_laptop_lester2"),
        joaat("xm_prop_x17_laptop_mrsr"),
        joaat("tr_prop_tr_laptop_jimmy"),
        joaat("bkr_ware05_laptop1"),
        joaat("bkr_prop_clubhouse_laptop_01a"),
        joaat("v_ind_ss_laptop"),
        joaat("m23_1_prop_m31_laptop_01a"),
        joaat("ex_prop_ex_laptop_01a"),
        joaat("prop_laptop_lester"),
        joaat("ba_prop_club_laptop_dj"),
        joaat("xm_prop_x17_laptop_avon"),
        joaat("bkr_prop_clubhouse_laptop_01b"),
        joaat("sf_prop_sf_laptop_01b"),
        joaat("gr_prop_gr_laptop_01a"),
        joaat("sf_int1_laptop_armoury"),
        joaat("ba_prop_club_laptop_dj_02"),
        joaat("m23_2_prop_m32_laptoplscm_01a"),
        joaat("gr_prop_gr_laptop_01c"),
        joaat("ch_prop_laptop_01a"),
        joaat("bkr_ware05_laptop2"),
        joaat("bkr_ware05_pclatopbasic2"),
        joaat("p_amb_lap_top_02"),
        -- computers
        joaat("h4_prop_battle_club_computer_01"),
        joaat("xm_office_computer"),
        joaat("ba_prop_battle_club_computer_01"),
        joaat("h4_prop_battle_club_computer_02"),
        joaat("xm_prop_x17_computer_01"),
        joaat("xm_prop_x17_computer_02"),
        joaat("bkr_ware05_pcupgrade2"),
        -- monitors
        joaat("ex_prop_trailer_monitor_01"),
        joaat("sf_prop_sf_monitor_s_02a"),
        joaat("v_serv_ct_monitor05"),
        joaat("sf_prop_sf_monitor_b_02a"),
        joaat("sm_prop_smug_monitor_01"),
        joaat("prop_monitor_03b"),
        joaat("v_res_lest_monitor"),
        joaat("v_serv_ct_monitor04"),
        joaat("ch_prop_ch_monitor_01a"),
        joaat("prop_monitor_02"),
        joaat("xm_int02_security_monitor"),
        joaat("prop_monitor_01c"),
        joaat("prop_monitor_01b"),
        joaat("v_res_monitorwidelarge"),
        joaat("v_serv_ct_monitor01"),
        joaat("prop_monitor_li"),
        joaat("prop_ld_monitor_01"),
        joaat("sf_prop_sf_monitor_01a"),
        joaat("prop_monitor_01a"),
        joaat("v_res_monitor"),
        joaat("v_serv_ct_monitor02"),
        joaat("v_serv_ct_monitor07"),
        joaat("hei_prop_hei_bank_mon"),
        joaat("vw_prop_vw_trailer_monitor_01"),
        joaat("vw_prop_vw_monitor_01"),
        joaat("prop_monitor_w_large"),
        joaat("ex_prop_monitor_01_ex"),
        joaat("v_serv_ct_monitor06"),
        joaat("tr_prop_tr_monitor_01a"),
        joaat("prop_monitor_04a"),
        joaat("tr_prop_tr_monitor_01b"),
        joaat("sf_prop_sf_monitor_stu_01a")
    }
    Config.TargetSystem = false -- if true then you must have ox_target, if false prop interactions will be based on a zone check
    Config.TargetType = "qb" -- "ox"/"qb" for ox_target or qb-target

    Config.UsablePositions = { -- positions where players can open a computer free to use
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
