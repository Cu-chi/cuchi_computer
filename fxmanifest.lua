fx_version "cerulean"
game "gta5"
lua54 "yes"
version "0.0.1-beta"

shared_script "config.lua"

client_scripts {
    "client/locales/*.lua",
    "client/*.lua"
}

server_scripts {
    "server/*.lua"
}

ui_page "nui/index.html"

files {
    "nui/**/*"
}
