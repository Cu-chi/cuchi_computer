local RegisteredIPs = {}

--- Add a new IP to the registered list
---@param location vector3
---@return boolean|string
function RegisterNewIP(location)
    local existingIP = GetIPFromLocation(location)
    if not existingIP then
        local genIP = GenerateRandomIP()
        RegisteredIPs[genIP] = {
            state = true,
            location = location
        }
        return genIP
    else
        if not RegisteredIPs[existingIP].state then
            return existingIP
        end
        return false
    end
end

--- Remove an IP from the registered list
---@param ip string
function RemoveIP(ip)
    RegisteredIPs[ip] = nil
end

--- Get the location from the IP adress
---@param ip string
---@return vector3 | nil
function GetLocationFromIP(ip)
    return RegisteredIPs[ip] and RegisteredIPs[ip].location
end

--- Get the IP adress from the location 
---@param targetLocation vector3
---@return nil|string
function GetIPFromLocation(targetLocation)
    for ip, data in pairs(RegisteredIPs) do
        if data.location == targetLocation then
            return ip
        end
    end

    return nil
end

---Define the state of an IP
---@param ip string
---@param used boolean
function SetIPState(ip, used)
    if RegisteredIPs[ip] then
        RegisteredIPs[ip].state = used
    end
end

--- Generate a random IP adress
---@return string
function GenerateRandomIP()
    local ip = ""

    while ip == "" or GetLocationFromIP(ip) do
        ip = ""
        for i = 1, 4 do
            local section = math.random(11, 200)

            ip = ip..section..(i < 4 and "." or "")
        end
    end

    return ip
end
