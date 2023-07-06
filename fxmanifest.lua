fx_version "cerulean"
game "gta5"
lua54 "yes"
version "0.11.33-beta"

shared_scripts {
    "config.lua",
    "app_config.lua"
}

client_scripts {
    "client/locales/*.lua",
    "client/*.lua"
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "server/*.lua"
}

ui_page "nui/index.html"

files {
    "nui/**/*"
}
