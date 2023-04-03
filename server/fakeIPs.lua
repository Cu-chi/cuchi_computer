local RegisteredIPs = {}

--- Add a new IP to the registered list
---@param location vector3
---@return string
function RegisterNewIP(location)
    local existingIP = GetIPFromLocation(location)
    if not existingIP then
        local genIP = GenerateRandomIP()
        RegisteredIPs[genIP] = location
        print("registered "..genIP.. " for "..location)
        return genIP
    else
        print("already registered at "..existingIP.. " for "..location)
        return existingIP
    end
end

--- Remove an IP from the registered list
---@param ip string
function RemoveIP(ip)
    RegisteredIPs[ip] = nil
end

--- Get the location from the IP adress
---@param ip string
---@return vector3
function GetLocationFromIP(ip)
    return RegisteredIPs[ip]
end

--- Get the IP adress from the location 
---@param targetLocation vector3
---@return nil|string
function GetIPFromLocation(targetLocation)
    for ip, location in pairs(RegisteredIPs) do
        if location == targetLocation then
            return ip
        end
    end

    return nil
end

--- Generate a random IP adress
---@return string
function GenerateRandomIP()
    local ip = ""

    while ip == "" or GetLocationFromIP(ip) do
        for i = 1, 4 do
            local section = math.random(11, 200)

            ip = ip..section..(i < 4 and "." or "")
        end
    end

    return ip
end
