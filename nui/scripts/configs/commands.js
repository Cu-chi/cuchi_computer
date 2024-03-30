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
const ConsolePrefix = () => { return "<span style='color: grey'>admin@"+ComputerType+"</span>:<span style='color: green'>~</span>$ "; };
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
    "connect": {
        "description": () => { return GetLocale("cmd_connect_desc"); },
        "action": (args) => {
            if (args.length > 0) {
                let specifiedDomain = args[0];
                let appExists = appAddresses[specifiedDomain] != undefined;
                if (appExists) {
                    let appAddr = document.getElementById("addresses-addresse");
                    appAddr.innerText = specifiedDomain;
                    const event = new Event(specifiedDomain);
                    document.dispatchEvent(event);
                    openedApp = specifiedDomain;

                    OpenApp("addresses-content");
                    AddConsoleLine("connect "+specifiedDomain, GetLocale("cmd_connect_success").replace("{1}", specifiedDomain));
                }
                else
                    AddConsoleLine("connect "+specifiedDomain, GetLocale("cmd_connect_unknown"));
            }
            else
                AddConsoleLine("connect", GetLocale("cmd_connect_not_specified"));
        }
    },
    "detect": {
        "description": () => { return GetLocale("cmd_detect_desc"); },
        "action": (args) => {
            if (args.length > 0) {
                if (args[0] === "-ip") {
                    fetch(`https://${GetParentResourceName()}/dataHeist`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            cmd: "detect",
                        })
                    }).then(response => response.json()).then(data => {
                        if (!data)
                            AddConsoleLine("detect "+args[0], GetLocale("cmd_detect_none_detected"));
                        else
                            AddConsoleLine("detect "+args[0], GetLocale("cmd_detect_detected") 
                                .replace("{1}", data));
                    });
                }
                else
                    AddConsoleLine("detect "+args[0], GetLocale("cmd_detect_arg"));
            }
            else
                AddConsoleLine("detect", GetLocale("cmd_detect_arg"));
        }
    },
    "scan": {
        "description": () => { return GetLocale("cmd_scan_desc"); },
        "action": (args) => {
            if (args.length > 0) {
                const neededArgs = {
                    "-ports": ""
                };

                let nextArg;
                for (const arg of args) {
                    if (nextArg) {
                        neededArgs[nextArg] = arg;
                        nextArg = undefined;
                        continue;
                    }

                    if (arg in neededArgs) 
                        nextArg = arg;
                };

                if (neededArgs["-ports"] !== "") {
                    fetch(`https://${GetParentResourceName()}/dataHeist`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            "cmd": "scan",
                            "-ports": neededArgs["-ports"]
                        })
                    }).then(response => response.json()).then(data => {
                        if (!data)
                            AddConsoleLine("scan "+(args.join(" ")), GetLocale("cmd_scan_wrong"));
                        else
                            AddConsoleLine("scan "+(args.join(" ")), GetLocale("cmd_scan_good")
                                .replace("{1}", data));
                    });
                }
                else
                    AddConsoleLine("scan "+(args.join(" ")), GetLocale("cmd_scan_arg"));
            }
            else
                AddConsoleLine("scan", GetLocale("cmd_scan_arg"));
        }
    },
    "infiltrate": {
        "description": () => { return GetLocale("cmd_infiltrate_desc"); },
        "action": (args) => {
            if (args.length > 0) {
                const neededArgs = {
                    "-ip": "",
                    "-port": ""
                };

                let nextArg;
                for (const arg of args) {
                    if (nextArg) {
                        neededArgs[nextArg] = arg;
                        nextArg = undefined;
                        continue;
                    }

                    if (arg in neededArgs) 
                        nextArg = arg;
                };

                if (neededArgs["-ip"] !== "" && neededArgs["-port"] !== "") {
                    fetch(`https://${GetParentResourceName()}/dataHeist`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            "cmd": "infiltrate",
                            "-ip": neededArgs["-ip"],
                            "-port": neededArgs["-port"]
                        })
                    }).then(response => response.json()).then(data => {
                        if (!data)
                            AddConsoleLine("infiltrate "+(args.join(" ")), GetLocale("cmd_infiltrate_wrong")
                                .replace("{1}", neededArgs["-ip"])
                                .replace("{2}", neededArgs["-port"]));
                        else
                            AddConsoleLine("infiltrate "+(args.join(" ")), GetLocale("cmd_infiltrate_good")
                                .replace("{1}", neededArgs["-ip"])
                                .replace("{2}", neededArgs["-port"]));
                    });
                }
                else
                    AddConsoleLine("infiltrate "+(args.join(" ")), GetLocale("cmd_infiltrate_arg"));
            }
            else
                AddConsoleLine("infiltrate", GetLocale("cmd_infiltrate_arg"));
        }
    },
    "breach": {
        "description": () => { return GetLocale("cmd_breach_desc"); },
        "action": (args) => {
            if (args.length > 0) {
                const neededArgs = {
                    "-ip": "",
                    "-port": ""
                };

                let nextArg;
                for (const arg of args) {
                    if (nextArg) {
                        neededArgs[nextArg] = arg;
                        nextArg = undefined;
                        continue;
                    }

                    if (arg in neededArgs) 
                        nextArg = arg;
                };

                if (neededArgs["-ip"] !== "" && neededArgs["-port"] !== "") {
                    fetch(`https://${GetParentResourceName()}/dataHeist`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            "cmd": "breach",
                            "-ip": neededArgs["-ip"],
                            "-port": neededArgs["-port"]
                        })
                    }).then(response => response.json()).then(data => {
                        if (!data)
                            AddConsoleLine("breach "+(args.join(" ")), GetLocale("cmd_breach_bad")
                                .replace("{1}", neededArgs["-ip"])
                                .replace("{2}", neededArgs["-port"]));
                        else if (data === "no")
                            AddConsoleLine("breach "+(args.join(" ")), GetLocale("cmd_breach_no")
                                .replace("{1}", neededArgs["-ip"])
                                .replace("{2}", neededArgs["-port"]));
                        else if (data === "delay")
                            AddConsoleLine("breach "+(args.join(" ")), GetLocale("cmd_breach_delay")
                                .replace("{1}", neededArgs["-ip"])
                                .replace("{2}", neededArgs["-port"]));
                        else
                            AddConsoleLine("breach "+(args.join(" ")), GetLocale("cmd_breach_good")
                                .replace("{1}", data));

                    });
                }
                else
                    AddConsoleLine("breach "+(args.join(" ")), GetLocale("cmd_breach_arg"));
            }
            else
                AddConsoleLine("breach", GetLocale("cmd_breach_arg"));
        }
    }
};
