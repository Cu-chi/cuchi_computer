NUIOk = false
local _SendNUIMessage = SendNUIMessage
SendNUIMessage = function(msg)
    while not NUIOk do
        Wait(0)
    end

    _SendNUIMessage(msg)
end
