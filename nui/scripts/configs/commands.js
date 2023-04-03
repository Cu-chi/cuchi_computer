var ConsoleVersion = "0.0.0";
const ConsolePrefix = "<span style='color: #6d6d9b'>user@laptop</span>:<span style='color: #4d3dff'>~</span># ";
const CommandsList = {
    "help": {
        "description": "display all available commands.",
        "action": () => {
            let finalText = "";
            let first = true;
            Object.entries(CommandsList).forEach(entry => {
                const [key, value] = entry;

                finalText += (!first ? "<br>" : "") + " - " + key + ": " + value.description;
                first = false;
            });

            AddConsoleLine("help", finalText);
        }
    },
    "version": {
        "description": "display current version.",
        "action": () => {
            AddConsoleLine("version", "version: <span style='color: #4d3dff'>" + ConsoleVersion + "</span> - Cuchi");
        }
    },
    "clear": {
        "description": "clear console output.",
        "action": () => {
            ClearConsole();
        }
    },
    "exit": {
        "description": "exit command prompt.",
        "action": () => {
            CloseApp("console");
        }
    } 
};
