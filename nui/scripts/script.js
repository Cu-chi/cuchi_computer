var apps = [];
var msgId = 0;

window.addEventListener("message", (event) => {
    if (event.data.type === "show") {
        document.body.style.display = "block";
        Load(true, "Starting up...", 150, () => {
            PlayAudio("boot");
            document.getElementById("container").style.display = "block";
            Load(false);
        });
    }
    else if (event.data.type === "version") {
        ConsoleVersion = event.data.version;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        var date = new Date();

        document.getElementById("hours").innerText = date.toLocaleTimeString();
        document.getElementById("date").innerText = date.toLocaleDateString();
    }, 1000);

    document.getElementById("exit").onclick = () => {
        const buttons = [
            {text: "Cancel"},
            {text: "Shutdown", callback: () => {
                Load(true, "Shutting down...", 150, () => {
                    document.body.style.display = "none"
                    Load(false)
                    fetch(`https://${GetParentResourceName()}/exit`,
                    {
                        method: "POST",
                        body: null
                    })
                })
            }}
        ];
        MessageBox("info", "Shutdown", "You are about to shutdown the computer, are you sure?", buttons);
    };

    var desktop = document.getElementById("desktop");
    var unusableApps = [];
    Object.entries(Applications).forEach(entry => {
        const [appName, appData] = entry;
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
        document.getElementById(app).onclick = () => MessageBox("error", "Error", "Unknown error: can't open " + app + ".exe");
    });

    fetch(`https://${GetParentResourceName()}/NUIOk`,
    {
        method: "POST",
        body: null
    });
})

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

const PlayAudio = (soundName) => {
    new Audio("assets/sounds/"+soundName+".mp3").play();
};

const OpenApp = (appName, msgBox) => {
    let elem = document.getElementById("app-"+appName);

    elem.style.display = "flex";
    elem.style.visibility = "visible";

    let taskbarIcon = document.getElementById("taskbar-"+appName);

    if (!taskbarIcon) {
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

    if (appName == "console") {
        document.getElementById("console-text").innerHTML = "<div class='console-line'><p>" + ConsolePrefix + "</p><input id='console-input' type='text'></div>";
        let consoleInput = document.getElementById("console-input");
        consoleInput.focus();
        consoleInput.onkeydown = (e) => OnConsoleCommand(e, consoleInput);
    }
};

const CloseApp = (appName) => {
    document.getElementById("app-"+appName).style.display = "none";

    const taskbarIcon = document.getElementById("taskbar-"+appName);
    if (taskbarIcon)
        document.getElementById("left").removeChild(taskbarIcon);
};

const UnfocusAllApp = () => {
    const focused = document.getElementsByClassName("app-active");
    while (focused.length > 0)
        focused[0].classList.remove("app-active");
};

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

const MinimizeApp = (appName) => {
    document.getElementById("taskbar-"+appName).classList.remove("app-active");
    document.getElementById("app-"+appName).style.visibility = "hidden";
};

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

const OnConsoleCommand = (e, consoleInput) => {
    if (e.key === "Enter") {
        let command = CommandsList[consoleInput.value];

        if (command)
            command.action();
        else
            AddConsoleLine(consoleInput.value, "This command does not exist.<br>Try 'help' to list all available commands");
    };
};

const AddConsoleLine = (command, text) => {
    let consoleText = document.getElementById("console-text");
    let oldInput = document.getElementById("console-input");
    let enteredCommand = document.createElement("p");
    enteredCommand.innerText = command;
    enteredCommand.classList.add("entered-command");
    oldInput.onkeydown = null;
    oldInput.replaceWith(enteredCommand);

    consoleText.innerHTML += "<div class='console-line'>" + text + "</div>";
    consoleText.innerHTML += "<div class='console-line'><p>" + ConsolePrefix + "</p><input id='console-input' type='text'></div>";
    let newInput = document.getElementById("console-input");
    newInput.focus();
    newInput.onkeydown = (e) => OnConsoleCommand(e, newInput);
};

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
 */
const MessageBox = (type, title, message, buttons) => {
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
    h1.innerText = title;
    element.appendChild(h1);

    let p = document.createElement("p");
    p.innerText = message;
    p.classList.add("msg-box-text");
    element.appendChild(p);

    if (!buttons) {
        let button = document.createElement("button");
        button.classList.add("msg-box-btn");
        button.innerText = "Close";
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
    MakeElementDraggable(element);

    PlayAudio("message");
};