fx_version "cerulean"
game "gta5"
lua54 "yes"
version "0.13.48-beta"

shared_scripts {
    "config.lua",
    "app_config.lua",
    "shared/functions.lua",
}

client_scripts {
    "client/locales/*.lua",
    "client/*.lua",
    "client/addresses/*.lua" -- TODO: allow asset escrow
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "server/*.lua",
    "server/addresses/*.lua" -- TODO: allow asset escrow
}

ui_page "nui/index.html"

files {
    "assets/screen.gif", -- 1:1 format for better result (256x256px forced)
    "nui/**/*"
}
