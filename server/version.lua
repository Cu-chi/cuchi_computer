CreateThread(function()
    PerformHttpRequest("https://api.github.com/repos/Cu-chi/cuchi_computer/releases/latest", function(responseCode, responseText)
        if responseCode == 200 then
            local currentVersion = "v"..GetResourceMetadata(GetCurrentResourceName(), "version", 0)
            local latestVersion = json.decode(responseText).tag_name
            if currentVersion ~= latestVersion then
                print("^1Version outdated ^7(current: ^1"..currentVersion.."^7, latest: ^2"..latestVersion.."^7): update it from ^2https://github.com/Cu-chi/cuchi_computer^7")
            end
        end
    end, "GET")
end)
