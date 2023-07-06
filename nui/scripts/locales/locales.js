const Locales = {
    EN: {
        os_lang: "English",
        os_language: "Language",
        os_language_selection: "Select the language to set for the system.",
        os_cancel: "Cancel",
        os_close: "Close",
        os_boot: "Starting up...",
        os_shutdown: "Shutdown",
        os_shuttingdown: "Shutting down...",
        os_shutdown_confirmation: "You are about to shutdown the computer, are you sure?",
        os_error: "Error",
        os_fake_error: "Unknown error: can't open {1}.exe",
        os_session: "Initializing a new session...",

        date_format: "en-US",

        cmd_unknown: "This command does not exist.<br>Try 'help' to list all available commands.",
        cmd_help_desc: "display all available commands.",
        cmd_version_desc: "display current version.",
        cmd_clear_desc: "clear console output.",
        cmd_exit_desc: "exit command prompt.",
        cmd_shutdown_desc: "shutdown computer.",
        cmd_start_desc: "start an application.<br>    Usage: start [app]",
        cmd_started: "Application '{1}.exe' has been started.",
        cmd_start_error: "Unknown application '{1}.exe'.",
        cmd_start_not_specified: "You have to specify an application.<br>    Usage: start [app]",
        cmd_start_already: "Application '{1}.exe' is already running.",
        cmd_taskkill_desc: "kill an application.<br>    Usage: taskkill [app]",
        cmd_taskkilled: "Application '{1}.exe' has been killed.",
        cmd_taskkill_error: "Application '{1}.exe' isn't running.",
        cmd_taskkill_not_specified: "You have to specify an application.<br>    Usage: taskkill [app]",
        cmd_iptracer_desc: "get information about specified IP address.<br>    Usage: ip-tracer [IPv4]",
        cmd_iptracer_not_specified: "You have to specify an IP address.<br>    Usage: ip-tracer [IPv4]",
        cmd_iptracer_error: "The IP address is incorrect, it should look like 11.22.33.44.",
        cmd_iptracer_result: `IP address > <span style='color:green'>{1}</span>
        <br>Date & Time > <span style='color:green'>{2}</span>
        <br>Zone > <span style='color:green'>{3}</span>
        <br>Latitude > <span style='color:green'>{4}</span>
        <br>Longitude > <span style='color:green'>{5}</span>
        <br>Location > <span style='color:green'>{6}</span>
        <br><span style='color:red'>GPS set.</span>`,
        cmd_iptracer_disconnected: "IP address {1} has <span style='color:red'>disconnected</span> from the network.",

        error_market_title: "Error creating post",
        error_market_deletion_title: "Deletion error",
        error_market_empty_arg: "The title or the description is empty.",
        error_market_arg_overflow: "Title or description exceeds the allowed size.",
        error_market_delay: "Wait between each post.",
        error_market_max: "You reached the max number of posts.",
        error_market_id: "ID is invalid.",
        error_market_id_not_yours: "This ID isn't one of your posts.",
        error_market_creation_success: "Created with success!",
        error_market_creation_success_desc: "The post has been created with success.\nRefresh the market.",
        error_market_deletion_success: "Deleted with success!",
        error_market_deletion_success_desc: "The post has been deleted with success.\nRefresh the market.",

        info_ipv4: "IPv4:",
        info_type: "Computer type:",
        info_desktop: "Desktop",
        info_laptop: "Laptop",

        market_description: "You can create a post every {1} seconds, you can create a maximum of {2} posts. Each post will be active for {3} days.",
    },
    FR: {
        os_lang: "Français",
        os_language: "Langage",
        os_language_selection: "Sélectionnez la langue à définir pour le système.",
        os_cancel: "Annuler",
        os_close: "Fermer",
        os_boot: "Démarrage...",
        os_shutdown: "Arrêter",
        os_shuttingdown: "Arrêt en cours...",
        os_shutdown_confirmation: "Vous êtes sur le point d'éteindre l'ordinateur, êtes-vous sûr ?",
        os_error: "Erreur",
        os_fake_error: "Erreur inconnue : impossible d'ouvrir {1}.exe",
        os_session: "Initialisation d'une nouvelle session...",

        date_format: "fr-FR",

        cmd_unknown: "Cette commande n'existe pas.<br>Essayez 'help' pour lister toutes les commandes disponibles.",
        cmd_help_desc: "afficher toutes les commandes disponibles.",
        cmd_version_desc: "afficher la version actuelle.",
        cmd_clear_desc: "effacer la sortie de la console.",
        cmd_exit_desc: "quitter l'invite de commande.",
        cmd_shutdown_desc: "éteindre l'ordinateur.",
        cmd_start_desc: "démarrer une application.<br>    Usage: start [app]",
        cmd_started: "L'application '{1}.exe' a été démarrée.",
        cmd_start_error: "Application inconnue '{1}.exe'",
        cmd_start_not_specified: "Vous devez spécifier une application.<br>    Usage: start [app]",
        cmd_start_already: "L'application '{1}.exe' est déjà en cours d'exécution.",
        cmd_taskkill_desc: "tuer une application.<br>    Usage: taskkill [app]",
        cmd_taskkilled: "L'application '{1}.exe' a été tuée.",
        cmd_taskkill_error: "L'application '{1}.exe' n'est pas en cours d'exécution.",
        cmd_taskkill_not_specified: "Vous devez spécifier une application.<br>    Usage: taskkill [app]",
        cmd_iptracer_desc: "obtenir des informations sur l'addresse IP spécifiée.<br>    Usage: ip-tracer [IPv4]",
        cmd_iptracer_not_specified: "Vous devez spécifier une addresse IP.<br>    Usage: ip-tracer [IPv4]",
        cmd_iptracer_error: "L'addresse IP est incorrecte, elle doit ressembler à 11.22.33.44.",
        cmd_iptracer_result: `addresse IP > <span style='color:green'>{1}</span>
        <br>Date & Heure > <span style='color:green'>{2}</span>
        <br>Zone > <span style='color:green'>{3}</span>
        <br>Latitude > <span style='color:green'>{4}</span>
        <br>Longitude > <span style='color:green'>{5}</span>
        <br>Position > <span style='color:green'>{6}</span>
        <br><span style='color:red'>GPS réglé.</span>`,
        cmd_iptracer_disconnected: "L'addresse IP {1} s'est <span style='color:red'>déconnectée</span> du réseau.",

        error_market_title: "Erreur de création du poste",
        error_market_deletion_title: "Erreur de suppression",
        error_market_empty_arg: "Le titre ou la description est vide.",
        error_market_arg_overflow: "Le titre ou la description dépasse la taille autorisée.",
        error_market_delay: "Attendez entre chaque poste.",
        error_market_max: "Vous avez atteint le maximum de postes.",
        error_market_id: "L'ID est invalide.",
        error_market_id_not_yours: "Cette ID n'est pas l'une de vos postes.",

        info_ipv4: "IPv4 :",
        info_type: "Type d'ordinateur:",
        info_desktop: "Fixe",
        info_laptop: "Portable",
    },
}
