window.addEventListener("message", (event) => {
    if (event.data.type === "show") {
        document.body.style.display = "block"
        Load(true, "Starting up...", 1500, () => {
            PlayAudio("assets/boot.mp3")
            document.getElementById("container").style.display = "block"
            Load(false)
        })
    }
    else if (event.data.type === "version") {
        ConsoleVersion = event.data.version
    }
})

document.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        var date = new Date()

        document.getElementById("hours").innerText = date.toLocaleTimeString()
        document.getElementById("date").innerText = date.toLocaleDateString()
    }, 1000)

    document.getElementById("exit").onclick = () => {
        Load(true, "Shutting down...", 1500, () => {
            document.body.style.display = "none"
            Load(false)
            fetch(`https://${GetParentResourceName()}/exit`,
            {
                method: "POST",
                body: null
            })
        })
    }

    document.getElementById("console").onclick = () => OpenApp("console")
    document.getElementById("console-quit").onclick = () => CloseApp("console")
    document.getElementById("console-minimize").onclick = () => MinimizeApp("console")

    MakeElementDraggable(document.getElementById("app-console"))

    fetch(`https://${GetParentResourceName()}/NUIOk`,
    {
        method: "POST",
        body: null
    })
})

const Load = (load, text, timeout, callback) => {
    if (load) {
        document.getElementById("loader-text").innerText = text
        document.getElementById("loader-container").style.display = "flex"
        document.getElementById("container").style.display = "none"
        setTimeout(callback, timeout)
    }
    else {
        document.getElementById("loader-container").style.display = "none"
    }
}

const PlayAudio = (src) => {
    new Audio(src).play()
}

const OpenApp = (appName) => {
    let elem = document.getElementById("app-"+appName)

    elem.style.display = "flex"
    elem.style.visibility = "visible"

    let taskbarIcon = document.getElementById("taskbar-"+appName)

    if (!taskbarIcon) {
        let taskbar = document.getElementById("left")
        taskbarIcon = document.createElement("button")
        taskbarIcon.id = "taskbar-"+appName
        taskbarIcon.classList.add("taskbar-icon")
        taskbarIcon.innerHTML = `<img src="assets/${appName}.png">`
        taskbarIcon.onclick = () => {
            if (elem.style.visibility === "hidden") {
                FocusApp(false, appName)
                elem.style.visibility = "visible"
    
                if (appName == "console") {
                    let consoleInput = document.getElementById("console-input")
                    if (consoleInput) consoleInput.focus()
                }
            }
            else {
                MinimizeApp(appName)
            }
        }
        taskbar.appendChild(taskbarIcon)
    }

    elem.onmousedown = (e) => FocusApp(e, appName)
    document.body.onmousedown = () => UnfocusAllApp()
    FocusApp(false, appName)

    if (appName == "console") {
        document.getElementById("console-text").innerHTML = "<div class='console-line'><p>" + ConsolePrefix + "</p><input id='console-input' type='text'></div>"
        let consoleInput = document.getElementById("console-input")
        consoleInput.focus()
        consoleInput.onkeydown = (e) => OnConsoleCommand(e, consoleInput)
    }
}

const CloseApp = (appName) => {
    document.getElementById("app-"+appName).style.display = "none"

    const taskbarIcon = document.getElementById("taskbar-"+appName)
    if (taskbarIcon)
        document.getElementById("left").removeChild(taskbarIcon)
}

const UnfocusAllApp = () => {
    const focused = document.getElementsByClassName("app-active")
    while (focused.length > 0) {
        focused[0].classList.remove("app-active")
    }
}

const FocusApp = (e, appName) => {
    if (e)
        e.stopPropagation() // stop the event from also being handled by the body

    let taskbarIcon = document.getElementById("taskbar-"+appName)
    taskbarIcon.classList.add("app-active")

    if (appName == "console") {
        let consoleInput = document.getElementById("console-input")
        if (consoleInput) consoleInput.focus()
    }
}

const MinimizeApp = (appName) => {
    document.getElementById("taskbar-"+appName).classList.remove("app-active")
    document.getElementById("app-"+appName).style.visibility = "hidden"
}

const MakeElementDraggable = (element) => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    document.getElementById(element.id + "-title").onmousedown = (e) => {
        e = e || window.event
        e.preventDefault()

        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = () => {
            document.onmouseup = null
            document.onmousemove = null
        }

        document.onmousemove = (e) => {
            e = e || window.event
            e.preventDefault()

            pos1 = pos3 - e.clientX
            pos2 = pos4 - e.clientY
            pos3 = e.clientX
            pos4 = e.clientY

            let newTop = element.offsetTop - pos2
            let newLeft = element.offsetLeft - pos1

            //                                                   screen height - 5% of itself because taskbar is 5% height
            if (newTop >= 0 && newTop + element.offsetHeight <= (screen.height - 0.05 * screen.height)) element.style.top = newTop + "px"
            if (newLeft >= 0 && newLeft + element.offsetWidth <= screen.width) element.style.left = newLeft + "px"
        }
    }
}

const OnConsoleCommand = (e, consoleInput) => {
    if (e.key === "Enter") {
        let command = CommandsList[consoleInput.value]

        if (command)
            command.action()
        else
            AddConsoleLine(consoleInput.value, "This command does not exist.<br>Try 'help' to list all available commands")
    }
}

const AddConsoleLine = (command, text) => {
    let consoleText = document.getElementById("console-text")
    let oldInput = document.getElementById("console-input")
    let enteredCommand = document.createElement("p")
    enteredCommand.innerText = command
    enteredCommand.classList.add("entered-command")
    oldInput.onkeydown = null
    oldInput.replaceWith(enteredCommand)

    consoleText.innerHTML += "<div class='console-line'>" + text + "</div>"
    consoleText.innerHTML += "<div class='console-line'><p>" + ConsolePrefix + "</p><input id='console-input' type='text'></div>"
    let newInput = document.getElementById("console-input")
    newInput.focus()
    newInput.onkeydown = (e) => OnConsoleCommand(e, newInput)
}
