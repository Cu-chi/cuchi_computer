/*
 * ⚠️ WARNING ⚠️
 * Modifying this code without 
 * proper knowledge can result 
 * in its failure. 
 * 
 * Handle with care to avoid breaking it.
*/

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
    <h1 id="app-console-title"><button id="console-quit" class="app-exit"></button><button id="console-minimize" class="app-minimize"></button>Command Prompt</h1>
    <div id="console-text"></div>
</div>`
    },
    "adresses": {
        usable: true,
        width: 380,
        height: 640,
        appCode: `
<div id="app-adresses" class="application">
    <h1 id="app-adresses-title"><button id="adresses-quit" class="app-exit"></button><button id="adresses-minimize" class="app-minimize"></button>Adresses</h1>
    <div id="adresses-text"></div>
</div>`
    },
    "informations": {
        usable: true,
        appCode: `
<div id="app-informations" class="application">
    <h1 id="app-informations-title"><button id="informations-quit" class="app-exit"></button><button id="informations-minimize" class="app-minimize"></button>Informations</h1>
    <div id="informations-text"></div>
</div>`
    },
    "market": {
        usable: true,
        width: 800,
        height: 600,
        appCode: `
<div id="app-market" class="application">
    <h1 id="app-market-title"><button id="market-quit" class="app-exit"></button><button id="market-minimize" class="app-minimize"></button>Market</h1>
    <div id="market-wrapper">
        <div id="market-top">
            <h1>Market</h1>
            <p id="market-description"></p>
            <div id="market-actions">
                <button class="market-btn" id="market-create">Create</button>
                <button class="market-btn" id="market-delete">Delete</button>
                <button class="market-btn" id="market-refresh">Refresh</button>
            </div>
        </div>
        <div id="market-creation">
            <input id="market-creation-title" placeholder="Title" type="text" maxlength="16">
            <input id="market-creation-desc" placeholder="Description" type="text" maxlength="512">
            <div>
                <button class="market-btn" id="market-creation-post">Post</button>
                <button class="market-btn" id="market-creation-cancel">Cancel</button>
            </div>
            <div id="market-loader"></div>
        </div>
        <div id="market-deletion">
            <input id="market-deletion-id" placeholder="ID" type="number" min="1" max="2000000000">
            <div>
                <button class="market-btn" id="market-deletion-delete">Delete</button>
                <button class="market-btn" id="market-deletion-cancel">Cancel</button>
            </div>
        </div>
        <div id="market-container"></div>
    </div>
</div>`
    },
    "themes": {
        usable: true,
        appCode: `
<div id="app-themes" class="application">
    <h1 id="app-themes-title"><button id="themes-quit" class="app-exit"></button><button id="themes-minimize" class="app-minimize"></button>Themes</h1>
    <div id="themes-container"></div>
</div>`
    },
};
