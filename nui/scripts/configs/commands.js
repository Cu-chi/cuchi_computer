/*
 * ⚠️ WARNING ⚠️
 * Modifying this code without 
 * proper knowledge can result 
 * in its failure. 
 * 
 * Handle with care to avoid breaking it.
*/

let ConsoleVersion = "0.0.0";
let ComputerType = "desktop";
const ConsolePrefix = () => { return "<span style='color: grey'>user@"+ComputerType+"</span>:<span style='color: green'>~</span># "; };
const CommandsList = {
    "help": {
        "description": () => { return GetLocale("cmd_help_desc"); },
        "action": () => {
            let finalText = "";
            let first = true;
            Object.entries(CommandsList).forEach(entry => {
                const [key, value] = entry;

                finalText += (!first ? "<br>" : "") + " - <span style='text-decoration: underline'>" + key + "</span>: " + value.description();
                first = false;
            });

            AddConsoleLine("help", finalText);
        }
    },
    "version": {
        "description": () => { return GetLocale("cmd_version_desc"); },
        "action": () => {
            AddConsoleLine("version", "version: <span style='color: #4d3dff'>" + ConsoleVersion + "</span> - Cuchi");
        }
    },
    "clear": {
        "description": () => { return GetLocale("cmd_clear_desc"); },
        "action": () => {
            ClearConsole();
        }
    },
    "exit": {
        "description": () => { return GetLocale("cmd_exit_desc"); },
        "action": () => {
            CloseApp("console");
        }
    },
    "shutdown": {
        "description": () => { return GetLocale("cmd_shutdown_desc"); },
        "action": () => {
            ShutdownComputer();
        }
    },
    "start": {
        "description": () => { return GetLocale("cmd_start_desc"); },
        "action": (args) => {
            if (args.length > 0) {
                let appSpecified = args[0].replace(".exe", "")
                let openResult = OpenApp(appSpecified);
                if (openResult != 2)
                    AddConsoleLine("start "+args[0], GetLocale(openResult == 1 ? "cmd_started" : "cmd_start_error").replace("{1}", appSpecified));
                else
                    AddConsoleLine("start "+args[0], GetLocale("cmd_start_already").replace("{1}", appSpecified));
            }
            else 
                AddConsoleLine("start", GetLocale("cmd_start_not_specified"));
        }
    },
    "taskkill": {
        "description": () => { return GetLocale("cmd_taskkill_desc"); },
        "action": (args) => {
            if (args.length > 0) {
                let appSpecified = args[0].replace(".exe", "");
                let wasRunnning = CloseApp(appSpecified);
                AddConsoleLine("taskkill "+args[0], GetLocale(wasRunnning ? "cmd_taskkilled" : "cmd_taskkill_error").replace("{1}", appSpecified));
            }
            else 
                AddConsoleLine("taskkill", GetLocale("cmd_taskkill_not_specified"));
        }
    },
    "ip-tracer": {
        "description": () => { return GetLocale("cmd_iptracer_desc"); },
        "action": (args) => {
            if (args.length > 0) {
                let ipOK = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(args[0]);  
                if (ipOK) {
                    fetch(`https://${GetParentResourceName()}/ipTracer`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            ip: args[0],
                        })
                    }).then(response => response.json()).then(data => {
                        if (data == "DISCONNECTED")
                            AddConsoleLine("ip-tracer "+args[0], GetLocale("cmd_iptracer_disconnected").replace("{1}", args[0]));
                        else
                            AddConsoleLine("ip-tracer "+args[0], GetLocale("cmd_iptracer_result")
                                .replace("{1}", args[0])
                                .replace("{2}", new Date(Date.now()).toUTCString())
                                .replace("{3}", data.zone)
                                .replace("{4}", data.latitude)
                                .replace("{5}", data.longitude)
                                .replace("{6}", data.location));
                    });
                }
                else {
                    AddConsoleLine("ip-tracer "+args[0], GetLocale("cmd_iptracer_error").replace("{1}", args[0]));
                }
            }
            else
                AddConsoleLine("ip-tracer", GetLocale("cmd_iptracer_not_specified"));
        }
    },
    "netscan": {
        "description": () => { return GetLocale("cmd_netscan_desc"); },
        "action": () => {
            fetch(`https://${GetParentResourceName()}/netscan`,
            {
                method: "POST",
                body: null
            }).then(response => response.json()).then(data => {
                let finalText = "";
                let first = true;
                for (let i = 0; i < data.length; i++) {
                    finalText += (!first ? "<br>" : "") + data[i];
                    first = false;
                }

                AddConsoleLine("netscan", finalText);
            });
        }
    },
};
