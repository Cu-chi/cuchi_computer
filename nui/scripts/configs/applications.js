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
    "mail": {
        usable: true,
        width: 800,
        height: 600,
        appCode: `
<div id="app-mail" class="application">
    <h1 id="app-mail-title"><button id="mail-quit" class="app-exit"></button><button id="mail-minimize" class="app-minimize"></button>Mail</h1>
    <div id="mail-connection">
        <h1 id="mail-connection-title">Sign in</h1>
        <p id="mail-connection-info"></p>
        <input id="mail-connection-username" placeholder="Username" type="text" maxlength="16">
        <input id="mail-connection-password" placeholder="Password" type="password" maxlength="32">
        <label id="mail-connection-checkbox">
            <input id="mail-connection-save" type="checkbox"><span id="mail-checkbox-text">Save inputs for next time.</span>
        </label>
        <div class="mail-connection-actions">
            <button id="mail-connection-signin">Sign in</button>
            <button id="mail-connection-signup">No account? Sign up</button>
        </div>
    </div>
    <div id="mail-signup">
        <h1 id="mail-signup-title">Sign up</h1>
        <p id="mail-signup-error"></p>
        <input id="mail-signup-username" placeholder="Username" type="text" maxlength="16">
        <p id="mail-signup-preview">You mail address will be: </p>
        <input id="mail-signup-password" placeholder="Password" type="password" maxlength="32">
        <input id="mail-signup-password-confirmation" placeholder="Confirm Password" type="password" maxlength="32">
        <p id="mail-signup-warning">WARNING: Don't put a real password!</p>
        <div class="mail-connection-actions">
            <button id="mail-signup-signup">Sign up</button>
            <button id="mail-signup-signin">Already have an account? Sign in</button>
        </div>
    </div>
    <div id="mail-loader"></div>
    <div id="mail-wrapper">
        <div id="mail-top">
            <h1 id="mail-indication">mail@mail.com</h1>
            <div>
                <button id="mail-create">New mail</button>
                <button id="mail-refresh">Refresh</button>
                <button id="mail-signout">Disconnect</button>
            </div>
        </div>
        <div id="mail-container">

        </div>
        <div id="mail-reader">
            <h1 id="mail-reader-object"></h1>
            <div id="mail-reader-container"></div>
            <button id="mail-reader-answer">ANSWER</button>
        </div>
        <div id="mail-creator">
            <input id="mail-creator-to" placeholder="mail@" type="text">
            <input id="mail-creator-object" placeholder="Mail object" type="text" maxlength="32">
            <textarea rows='10' data-min-rows='10' id="mail-creator-text" placeholder="Text..." maxlength="4096"></textarea>
            <button id="mail-creator-send">Send</button>
        </div>
    </div>
</div>`
    },
};
