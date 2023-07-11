var apps = [];
var openedApps = [];
var cmdHistIndex = 0;
var cmdHistory = [];
var msgId = 0;
var IP = "";
var identifier = null;

window.addEventListener("message", (event) => {
    if (event.data.type === "show") {
        IP = event.data.ip;
        document.body.style.display = "block";
        AddInformation(GetLocale("info_ipv4"), IP);
        ComputerType = event.data.laptop ? GetLocale("info_laptop") : GetLocale("info_desktop");
        AddInformation(GetLocale("info_type"), ComputerType);
        ComputerType = ComputerType.toLowerCase();
        Load(true, GetLocale("os_session"), 100, () => {
            Load(true, GetLocale("os_boot"), 150, () => {
                fetch(`https://${GetParentResourceName()}/getApplicationsData`,
                {
                    method: "POST",
                    body: null
                }).then(response => response.json()).then(data => {
                    const currentTheme = getComputedStyle(document.querySelector(":root")).getPropertyValue("--main-color");

                    for (const [appName, appData] of Object.entries(data)) {
                        if (Applications[appName].usable && !Applications[appName].hide) {
                            if (appName == "market") {
                                let marketConfig = event.data.market;

                                document.getElementById("market-description").innerText = GetLocale("market_description")
                                    .replace("{1}", marketConfig.delayBetweenEachPost)
                                    .replace("{2}", marketConfig.maxPosts)
                                    .replace("{3}", marketConfig.timeBeforeAutomaticDeletion / 24 / 60 / 60)
                            }

                            let container = document.getElementById(appName+"-container");
                            container.innerHTML = ""; // reset so we don't re-add data at each boot

                            appData.forEach(row => {
                                let newElement = document.createElement("div");
                                newElement.classList = appName+"-elem";
    
                                if (appName == "market") {
                                    newElement.id = "market-id-"+row.id;
                                    newElement.innerHTML = `
                                    <h1>${row.title}</h1>
                                    <div class="market-desc">${row.description}</div>
                                    <p class="market-post-id">ID: ${row.id} ${identifier == row.seller ? "(yours)" : ""}</p>
                                    `;
                                }
                                else if (appName == "themes") {
                                    const mainColorLowerCase = row["--main-color"].toLowerCase();
                                    newElement.innerHTML = `<div id="theme-${mainColorLowerCase}" style="background-color: ${mainColorLowerCase};" class="themes-square">${currentTheme == mainColorLowerCase ? "•":""}</div>`;
                                    newElement.onclick = () => editTheme(row);
                                }
                                container.appendChild(newElement);
                            });
                        }
                    }
                    PlayAudio("boot");
                    document.getElementById("container").style.display = "block";
                    Load(false);
                });
            });
        });
    }
    else if (event.data.type === "version") {
        ConsoleVersion = event.data.version;
    }
    else if (event.data.type === "identifier") {
        identifier = event.data.identifier
    }
});

document.addEventListener("DOMContentLoaded", () => {
    SetLocale(Locale);

    var localSelection = document.getElementById("locale-selection");
    localSelection.onclick = () => {
        const buttons = [];
        Object.entries(Locales).forEach(locale => {
            const [localeKey, localeData] = locale;
            buttons.push({
                text: localeData.os_lang, callback: () => {
                    SetLocale(localeKey);
                }
            });
        });

        MessageBox("info", GetLocale("os_language"), GetLocale("os_language_selection"), buttons);
    }

    const mainColor = localStorage.getItem("--main-color");
    if (!mainColor) {
        const rootStyle = getComputedStyle(document.querySelector(":root"));
        editTheme({
            "--main-color": rootStyle.getPropertyValue("--main-color"),
            "--lighter-color": rootStyle.getPropertyValue("--lighter-color"),
            "--darker-color": rootStyle.getPropertyValue("--darker-color"),
            "--darkest-color": rootStyle.getPropertyValue("--darkest-color"),
            "--app-minimize-color": rootStyle.getPropertyValue("--app-minimize-color"),
            "--app-exit-color": rootStyle.getPropertyValue("--app-exit-color"),
        });
    }
    else {
        editTheme({
            "--main-color": mainColor,
            "--lighter-color": localStorage.getItem("--lighter-color"),
            "--darker-color": localStorage.getItem("--darker-color"),
            "--darkest-color": localStorage.getItem("--darkest-color"),
            "--app-minimize-color": localStorage.getItem("--app-minimize-color"),
            "--app-exit-color": localStorage.getItem("--app-exit-color"),
        });
    }

    setInterval(() => {
        var date = new Date();

        const dateFormat = GetLocale("date_format");
        document.getElementById("hours").innerText = date.toLocaleTimeString(dateFormat);
        document.getElementById("date").innerText = date.toLocaleDateString(dateFormat);
    }, 1000);

    document.getElementById("exit").onclick = () => {
        const exitBtn = document.getElementById("exit");
        if (exitBtn.getAttribute("validation") === "1") 
            return;

        exitBtn.setAttribute("validation", "1");

        const buttons = [
            {text: GetLocale("os_cancel"), callback: () => exitBtn.removeAttribute("validation")},
            {text: GetLocale("os_shutdown"), callback: () => ShutdownComputer(exitBtn)}
        ];
        MessageBox("info", GetLocale("os_shutdown"), GetLocale("os_shutdown_confirmation"), buttons, () => {
            exitBtn.removeAttribute("validation");
        });
    };

    var desktop = document.getElementById("desktop");
    var unusableApps = [];
    Object.entries(Applications).forEach(entry => {
        const [appName, appData] = entry;
        if (Applications[appName].hide)
            return;

        let appNameCapitalized = appName.charAt(0).toUpperCase() + appName.slice(1);
        desktop.innerHTML += `<button id="${appName}" class="desktop-icon"><img src="assets/images/${appName}.png">${appNameCapitalized}</button>`;

        if (appData.usable) {
            apps.push(appName); // made an array since adding onclick event while be only applied for the last element with the object foreach (weird)
            desktop.innerHTML += appData.appCode;
        }
        else {
            unusableApps.push(appName);
        }
    });

    apps.forEach(app => {
        document.getElementById(app).onclick = () => OpenApp(app);
        document.getElementById(app+"-quit").onclick = () => CloseApp(app);
        document.getElementById(app+"-minimize").onclick = () => MinimizeApp(app);

        var appElement = document.getElementById("app-"+app);
        appElement.setAttribute("style", `display:none;width:${Applications[app].width}px;height:${Applications[app].height}px;`);
        MakeElementDraggable(appElement);
    });

    unusableApps.forEach(app => {
        document.getElementById(app).onclick = () => MessageBox("error", GetLocale("os_error"), GetLocale("os_fake_error").replace("{1}", app));
    });

    fetch(`https://${GetParentResourceName()}/NUIOk`,
    {
        method: "POST",
        body: null
    });

    if (Applications["market"].usable && !Applications["market"].hide) {
        const marketCreationDiv = document.getElementById("market-creation");
        const marketLoader = document.getElementById("market-loader");
        const marketCreationTitleElem = document.getElementById("market-creation-title");
        const marketCreationDescElem = document.getElementById("market-creation-desc");
        const marketCreationPostButton = document.getElementById("market-creation-post");
        const marketCreationCancelButton = document.getElementById("market-creation-cancel");

        const marketDeletionDiv = document.getElementById("market-deletion");
        const marketDeletionIdInput = document.getElementById("market-deletion-id");
        const marketDeletionDeleteButton = document.getElementById("market-deletion-delete");
        const marketDeletionCancelButton = document.getElementById("market-deletion-cancel");

        document.getElementById("market-create").onclick = () => {
            marketCreationDiv.style.display = "flex";
            marketDeletionDiv.style.display = "none";
            marketDeletionIdInput.value = "";
        };

        document.getElementById("market-delete").onclick = () => {
            marketDeletionDiv.style.display = "flex";
            marketCreationDiv.style.display = "none";
            marketCreationTitleElem.value = "";
            marketCreationDescElem.value = "";
        };

        marketCreationPostButton.onclick = () => {
            marketLoader.style.display = "block"
            marketCreationPostButton.disabled = true
            marketCreationCancelButton.disabled = true

            fetch(`https://${GetParentResourceName()}/appAction`,
            {
                method: "POST",
                body: JSON.stringify({
                    app: "market",
                    type: "create",
                    title: marketCreationTitleElem.value,
                    description: marketCreationDescElem.value
                })
            }).then(response => response.json()).then(data => {
                marketLoader.style.display = "none"

                if (data == "OK") {
                    marketCreationDiv.style.display = "none";
                    marketCreationTitleElem.value = "";
                    marketCreationDescElem.value = "";
                    MessageBox("info", GetLocale("info_market_creation_success"),  GetLocale("info_market_creation_success_desc"))
                }
                else {
                    MessageBox("error", GetLocale("error_market_title"),  GetLocale(data))
                }

                marketCreationPostButton.disabled = false
                marketCreationCancelButton.disabled = false
            });
        };

        marketCreationCancelButton.onclick = () => {
            marketCreationDiv.style.display = "none";
            marketCreationTitleElem.value = "";
            marketCreationDescElem.value = "";
        };

        marketDeletionDeleteButton.onclick = () => {
            marketDeletionDeleteButton.disabled = true
            marketDeletionCancelButton.disabled = true

            fetch(`https://${GetParentResourceName()}/appAction`,
            {
                method: "POST",
                body: JSON.stringify({
                    app: "market",
                    type: "delete",
                    id: marketDeletionIdInput.value
                })
            }).then(response => response.json()).then(data => {
                if (data == "OK") {
                    marketDeletionDiv.style.display = "none";
                    marketDeletionIdInput.value = "";
                    MessageBox("info", GetLocale("info_market_deletion_success"),  GetLocale("info_market_deletion_success_desc"))
                }
                else {
                    MessageBox("error", GetLocale("error_market_deletion_title"),  GetLocale(data))
                }

                marketDeletionDeleteButton.disabled = false
                marketDeletionCancelButton.disabled = false
            });
        };

        marketDeletionCancelButton.onclick = () => {
            marketDeletionDiv.style.display = "none";
            marketDeletionIdInput.value = "";
        };

        const marketRefreshButton = document.getElementById("market-refresh");
        marketRefreshButton.onclick = () => {
            marketRefreshButton.disabled = true;

            let container = document.getElementById("market-container");
            container.innerHTML = '<div style="display: flex !important;" id="market-loader"></div>';

            fetch(`https://${GetParentResourceName()}/getApplicationsData`,
            {
                method: "POST",
                body: JSON.stringify({
                    application: "market",
                })
            }).then(response => response.json()).then(data => {
                container.innerHTML = "";
                for (const [appName, appData] of Object.entries(data)) {
                    if (appName == "market") {
                        appData.forEach(row => {
                            let newElement = document.createElement("div");
                            newElement.classList = appName+"-elem";
                            newElement.id = "market-id-"+row.id;
                            newElement.innerHTML = `
                            <h1>${row.title}</h1>
                            <div class="market-desc">${row.description}</div>
                            <p class="market-post-id">ID: ${row.id} ${identifier == row.seller ? "(yours)" : ""}</p>
                            `;

                            container.appendChild(newElement);
                        });
                    }
                }

                setTimeout(() => {
                    marketRefreshButton.disabled = false;
                }, 3000);
            });
        }
    }
})

/**
 * Displays a loading page
 * @param {boolean} load create or destroy loading
 * @param {string} text text to display under the loading icon
 * @param {number} timeout time wait before calling the callback function
 * @param {function} callback callback function that is triggered after the loading
 */
const Load = (load, text, timeout, callback) => {
    if (load) {
        document.getElementById("loader-text").innerText = text;
        document.getElementById("loader-container").style.display = "flex";
        document.getElementById("container").style.display = "none";
        setTimeout(callback, timeout);
    }
    else {
        document.getElementById("loader-container").style.display = "none";
    }
};

/**
 * Plays mp3 audio file
 * @param {string} soundName file name of the audio (must be .mp3)
 */
const PlayAudio = (soundName) => {
    new Audio("assets/sounds/"+soundName+".mp3").play();
};

/**
 * Opens Application
 * @param {string} appName the application name
 * @param {boolean} [msgBox] is it a message box 
 * @returns {0 | 1 | 2} 0 -> app doesn't exist, 1 -> app opened, 2 -> app was already opened
 */
const OpenApp = (appName, msgBox) => {
    openedApps.push(appName);

    let elem = document.getElementById("app-"+appName);
    if (!elem) {
        if (Applications[appName] && !Applications[appName].usable) {
            MessageBox("error", GetLocale("os_error"), GetLocale("os_fake_error").replace("{1}", appName));
            return 1;
        }

        return 0;
    }
    elem.style.display = "flex";
    elem.style.visibility = "visible";

    let wasOpen = true;
    let taskbarIcon = document.getElementById("taskbar-"+appName);

    if (!taskbarIcon) {
        wasOpen = false;
        let taskbar = document.getElementById("left");
        taskbarIcon = document.createElement("button");
        taskbarIcon.id = "taskbar-"+appName;
        taskbarIcon.classList.add("taskbar-icon");
        taskbarIcon.innerHTML = `<img src="assets/images/${msgBox ? appName.split("_")[0] : appName}.png">`;
        taskbarIcon.onclick = () => {
            if (elem.style.visibility === "hidden") {
                FocusApp(false, appName);
                elem.style.visibility = "visible";
    
                if (appName == "console") {
                    let consoleInput = document.getElementById("console-input");
                    if (consoleInput) consoleInput.focus();
                }
            }
            else {
                MinimizeApp(appName);
            }
        }
        taskbar.appendChild(taskbarIcon);
    }

    elem.onmousedown = (e) => FocusApp(e, appName);
    document.body.onmousedown = () => UnfocusAllApp();
    FocusApp(false, appName);

    if (appName == "console") ClearConsole();

    return wasOpen ? 2 : 1;
};

/**
 * Closes Application
 * @param {string} appName the application name
 * @param {function} [callback] function callback
 * @returns {boolean} true or false if the app was or wasn't running
 */
const CloseApp = (appName, callback) => {
    const app = document.getElementById("app-"+appName);
    if (app)
        app.style.display = "none";

    var wasRunning = true;
    const taskbarIcon = document.getElementById("taskbar-"+appName);
    if (taskbarIcon)
        document.getElementById("left").removeChild(taskbarIcon);
    else
        wasRunning = false;

    if (callback) callback();

    return wasRunning;
};

/**
 * Unfocuses all applications
 */
const UnfocusAllApp = () => {
    const focused = document.getElementsByClassName("app-active");
    while (focused.length > 0)
        focused[0].classList.remove("app-active");
};

/**
 * Focuses application
 * @param {MouseEvent | false} e 
 * @param {string} appName the application to focus
 */
const FocusApp = (e, appName) => {
    if (e)
        e.stopPropagation(); // stop the event from also being handled by the body

    UnfocusAllApp();

    let taskbarIcon = document.getElementById("taskbar-"+appName);
    taskbarIcon.classList.add("app-active");

    apps.forEach(app => {
        if (app == appName)
            document.getElementById("app-"+appName).style.zIndex = 9999;
        else
            document.getElementById("app-"+app).style.zIndex = "unset";
    });
    

    if (appName == "console") {
        let consoleInput = document.getElementById("console-input");
        if (consoleInput) consoleInput.focus();
    }
};

/**
 * Minimizes application
 * @param {string} appName the application to minimize
 * @param {function} [callback] function callback
 */
const MinimizeApp = (appName, callback) => {
    document.getElementById("taskbar-"+appName).classList.remove("app-active");
    document.getElementById("app-"+appName).style.visibility = "hidden";

    if (callback) callback();
};

/**
 * Makes an element draggable
 * @param {HTMLDivElement} element the element to make draggable
 */
const MakeElementDraggable = (element) => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var movable = document.getElementById(element.id + "-title");
    movable.style.cursor = "move";
    movable.onmousedown = (e) => {
        e = e || window.event;
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };

        document.onmousemove = (e) => {
            e = e || window.event;
            e.preventDefault();

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            let newTop = element.offsetTop - pos2;
            let newLeft = element.offsetLeft - pos1;

            //                                                   screen height - 5% of itself because taskbar is 5% height
            if (newTop >= 0 && newTop + element.offsetHeight <= (screen.height - 0.05 * screen.height)) 
                element.style.top = newTop + "px";
            if (newLeft >= 0 && newLeft + element.offsetWidth <= screen.width) 
                element.style.left = newLeft + "px";
        };
    };
};

/**
 * Event called when a command is entered in the console
 * @param {KeyboardEvent} e 
 * @param {HTMLElement} consoleInput the console input element
 */
const OnConsoleCommand = (e, consoleInput) => {
    if (e.key === "Enter") {
        const [cmd, ...args] = consoleInput.value.split(" ");

        let command = CommandsList[cmd];

        if (command)
            command.action(args);
        else
            AddConsoleLine(consoleInput.value, GetLocale("cmd_unknown"));

        if (consoleInput.value != "")
            cmdHistory.push(consoleInput.value);
        cmdHistIndex = 0;
    }
    else if (e.key === "ArrowUp") {
        let newIndex = cmdHistory.length - (cmdHistIndex + 1);
        if (newIndex > 0) cmdHistIndex += 1;

        let cmd = cmdHistory[newIndex > 0 ? newIndex : 0];
        consoleInput.value = cmd || "";
    }
    else if (e.key === "ArrowDown") {
        let newIndex = cmdHistory.length - 1 - (cmdHistIndex - 1);
        if (newIndex < cmdHistory.length) cmdHistIndex -= 1;

        let cmd = cmdHistory[newIndex < cmdHistory.length ? newIndex : cmdHistory.length];
        consoleInput.value = cmd || "";
    }
};

/**
 * Adds a line in the console
 * @param {string} command the command string that triggered the addition of this line
 * @param {string} text the result string of the command
 */
const AddConsoleLine = (command, text) => {
    let consoleText = document.getElementById("console-text");
    let oldInput = document.getElementById("console-input");
    let enteredCommand = document.createElement("p");
    enteredCommand.innerText = command;
    enteredCommand.classList.add("entered-command");
    oldInput.onkeydown = null;
    oldInput.replaceWith(enteredCommand);

    consoleText.innerHTML += "<div>" + text + "</div>";
    consoleText.innerHTML += "<div class='console-line'><p>" + ConsolePrefix() + "</p><input id='console-input' type='text'></div>";
    let newInput = document.getElementById("console-input");
    newInput.focus();
    newInput.onkeydown = (e) => OnConsoleCommand(e, newInput);
};

/**
 * Clears console output
 */
const ClearConsole = () => {
    document.getElementById("console-text").innerHTML = "<div class='console-line'><p>" + ConsolePrefix() + "</p><input id='console-input' type='text'></div>";
    let consoleInput = document.getElementById("console-input");
    consoleInput.focus();
    consoleInput.onkeydown = (e) => OnConsoleCommand(e, consoleInput);
};

/**
 * Adds an information in the application informations
 * @param {string} label label of information
 * @param {string | any} value its value
 */
const AddInformation = (label, value) => {
    var informations = document.getElementById("informations-text");
    var newParagraph = document.createElement("p");
    newParagraph.innerHTML = `<span class="info-label">${label}</span> ${value}`;
    informations.appendChild(newParagraph);
}

/**
 * @typedef {Array} MessageBoxButtonsList
 * @property {MessageBoxButton} button - button properties
 */

/**
 * @typedef {Object} MessageBoxButton
 * @property {string} text - Text
 * @property {function} [callback] - specific callback for this button
 */

/**
 * Display a message
 * @param {"error" | "info"} type - The type of the message box
 * @param {string} title - Title of the message box
 * @param {string} message - Content of the message box
 * @param {MessageBoxButtonsList} [buttons]
 * @param {function} [onClose] function to execute when the close button is clicked
 * @param {function} [onMinimize] function to execute when the minimize button is clicked
 */
const MessageBox = (type, title, message, buttons, onClose, onMinimize) => {
    msgId += 1;
    let element = document.createElement("div");
    element.style.display = "flex";
    let appName = type + "_" + msgId;
    element.id = "app-" + appName;
    
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = "translate(-50%, -50%)";

    element.classList.add("application");

    let h1 = document.createElement("h1");
    h1.id = element.id+"-title";
    h1.innerHTML = `<button id="${appName}-quit" class="app-exit"></button><button id="${appName}-minimize" class="app-minimize"></button>${title}`
    element.appendChild(h1);

    let p = document.createElement("p");
    p.innerText = message;
    p.classList.add("msg-box-text");
    element.appendChild(p);

    if (!buttons) {
        let button = document.createElement("button");
        button.classList.add("msg-box-btn");
        button.innerText = GetLocale("os_close");
        button.onclick = () => {
            CloseApp(appName);
            element.remove();
        };
    
        element.appendChild(button);
    }
    else {
        if (buttons.length > 1) {
            var buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("msg-box-btn-container");
            element.appendChild(buttonsContainer);
        }
        
        buttons.forEach(buttonData => {
            let buttonElem = document.createElement("button");
            buttonElem.classList.add("msg-box-btn");
            buttonElem.innerText = buttonData.text;
            buttonElem.onclick = () => {
                CloseApp(appName);
                element.remove();
                if (buttonData.callback) 
                    buttonData.callback();
            };
        
            (buttonsContainer || element).appendChild(buttonElem);
        });
    }
    document.getElementById("desktop").appendChild(element);
    OpenApp(appName, true);
    document.getElementById(appName+"-quit").onclick = () => CloseApp(appName, onClose);
    document.getElementById(appName+"-minimize").onclick = () => MinimizeApp(appName, onMinimize);
    MakeElementDraggable(element);

    PlayAudio("message");
};

/**
 * Closes the interface
 * @param {HTMLElement} [exitBtn] if triggered from the exit button
 */
const ShutdownComputer = (exitBtn) => {
    Load(true, GetLocale("os_shuttingdown"), 1500, () => {
        document.body.style.display = "none";
        Load(false);
        fetch(`https://${GetParentResourceName()}/exit`,
        {
            method: "POST",
            body: null
        });
    });
    openedApps.forEach(appName => CloseApp(appName));
    openedApps = [];

    if (exitBtn)
        exitBtn.removeAttribute("validation");

    apps.forEach(app => {
        var appElement = document.getElementById("app-"+app);
        appElement.style.top = "25%";
        appElement.style.left = "25%";

        var appTextElement = document.getElementById(app+"-text");
        if (appTextElement) {
            appTextElement.innerHTML = "";
        }
    });
}

/**
 * Edit theme
 * @param {object} themeData object containing theme data
 */
const editTheme = (themeData) => {
    let oldTheme = document.getElementById("theme-"+localStorage.getItem("--main-color"));
    if (oldTheme) {
        oldTheme.innerHTML = "";
        document.getElementById("theme-"+themeData["--main-color"].toLowerCase()).innerHTML = "•";
    }

    for (var [key, value] of Object.entries(themeData)) {
        value = value.toLowerCase();
        localStorage.setItem(key, value);
        document.querySelector(":root").style.setProperty(key, value);
    }
}
