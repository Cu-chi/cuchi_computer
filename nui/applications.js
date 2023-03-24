const Applications = {
    "code": {
        usable: false
    },
    "console": {
        usable: true,
        width: 640,
        height: 420,
        appCode: `
<div id="app-console" class="application">
    <h1 id="app-console-title"></button><button id="console-quit" class="app-exit"></button><button id="console-minimize" class="app-minimize"></button>Command Prompt</h1>
    <div id="console-text"></div>
</div>`
    },
    "adresses": {
        usable: true,
        width: 380,
        height: 640,
        appCode: `
<div id="app-adresses" class="application">
    <h1 id="app-adresses-title"></button><button id="adresses-quit" class="app-exit"></button><button id="adresses-minimize" class="app-minimize"></button>Adresses</h1>
    <div id="adresses-text"></div>
</div>`
    },
    "informations": {
        usable: true,
        width: 380,
        height: 640,
        appCode: `
<div id="app-informations" class="application">
    <h1 id="app-informations-title"></button><button id="informations-quit" class="app-exit"></button><button id="informations-minimize" class="app-minimize"></button>Informations</h1>
    <div id="informations-text"></div>
</div>`
    },
}