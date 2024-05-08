fx_version "cerulean"
game "gta5"
lua54 "yes"
use_experimental_fxv2_oal "yes"

version "1.1.1"
name "cuchi_computer"
description "Usable computer"
author "Cu-chi"
repository "https://github.com/Cu-chi/cuchi_computer"

shared_scripts {
    "config.lua",
    "app_config.lua",
    "shared/functions.lua",
}

client_scripts {
    "locales/main.lua",
    "locales/lua/*.lua",
    "client/*.lua",
    "client/addresses/*.lua"
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "server/*.lua",
    "server/addresses/*.lua"
}

ui_page "nui/index.html"

files {
    "locales/main.js",
    "locales/ui/*.js",
    "assets/screen.gif", -- 1:1 format for better result (256x256px forced)
    "nui/**/*"
}
