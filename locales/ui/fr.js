Locales["FR"] = {
    os_lang: "Français",
    os_language: "Langage",
    os_language_selection: "Sélectionnez la langue à définir pour le système.",
    os_cancel: "Annuler",
    os_close: "Fermer",
    os_boot: "Démarrage...",
    os_shutdown: "Arrêter",
    os_shuttingdown: "Arrêt en cours...",
    os_shutdown_confirmation: "Vous êtes sur le point d'éteindre l'ordinateur, êtes-vous sûr ?",
    os_shutdown_forced: "Arrêt forcé (trop loin de la position d'ouverture)...",
    os_error: "Erreur",
    os_fake_error: "Erreur inconnue : impossible d'ouvrir {1}.exe",
    os_session: "Initialisation d'une nouvelle session...",
    os_refresh: "Rafraîchir",
    os_create: "Créer",
    os_delete: "Supprimer",
    os_title: "Titre",
    os_description: "Description",

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
    cmd_iptracer_desc: "obtenir des informations sur l'adresse IP spécifiée.<br>    Usage: ip-tracer [IPv4]",
    cmd_iptracer_not_specified: "Vous devez spécifier une adresse IP.<br>    Usage: ip-tracer [IPv4]",
    cmd_iptracer_error: "L'adresse IP est incorrecte, elle doit ressembler à 11.22.33.44.",
    cmd_iptracer_result: `adresse IP > <span style='color:green'>{1}</span>
    <br>Date & Heure > <span style='color:green'>{2}</span>
    <br>Zone > <span style='color:green'>{3}</span>
    <br>Latitude > <span style='color:green'>{4}</span>
    <br>Longitude > <span style='color:green'>{5}</span>
    <br>Position > <span style='color:green'>{6}</span>
    <br><span style='color:red'>GPS réglé.</span>`,
    cmd_iptracer_disconnected: "L'adresse IP {1} est <span style='color:red'>déconnectée</span> du réseau.",
    cmd_netscan_desc: "scanner le réseau.",
    cmd_connect_desc: "accéder au domaine.<br>    Usage: connect [domaine]",
    cmd_connect_not_specified: "Vous devez spécifier un nom de domaine.<br>    Usage: connect [domaine]",
    cmd_connect_unknown: "Nom de domaine inconnu.",
    cmd_connect_success: "Connecté avec succès à <span style='color:green'>{1}</span>.",
    cmd_detect_desc: "détecter l'adresse IP du réseau à partir de votre position réelle.<br>    Usage habituel : detect -ip",
    cmd_detect_arg: "Vous devez spécifier le type de détection.<br>    Usage habituel : detect -ip",
    cmd_detect_none_detected: "Aucune IP détectée à proximité de votre emplacement.",
    cmd_detect_detected: "Adresse <span style='color:green'>{1}</span> trouvée à votre emplacement.",
    cmd_scan_desc: "analyser les choses sur l'adresse IP spécifiée.<br>    Usage habituel : scan -ports [ip]",
    cmd_scan_arg: "Vous devez spécifier ce que vous souhaitez analyser.<br>    Usage habituel : scan -ports [ip]",
    cmd_scan_wrong: "Impossible d'analyser les ports de l'adresse IP donnée.",
    cmd_scan_good: "Le port <span style='color:green'>{1}</span> est ouvert.",
    cmd_infiltrate_desc: "trouver et infiltrer un service sur un port et une adresse donnés.<br>    Usage habituel : infiltrate -ip [ip] -port [port-ouvert]",
    cmd_infiltrate_arg: "Vous devez spécifier l'ip et le port.<br>    Usage habituel : infiltrate -ip [ip] -port [open-port]",
    cmd_infiltrate_wrong: "Aucun service à infiltrer sur X {1}:{2}",
    cmd_infiltrate_good: "Service sur {1}:{2} <span style='color:green'>infiltré</span>.",
    cmd_breach_desc: "pirater les données du service infiltré.<br>    Usage habituel : breach -ip [ip] -port [open-port]",
    cmd_breach_arg: "Vous devez spécifier l'ip et le port.<br>    Usage habituel : breach -ip [ip] -port [open-port]",
    cmd_breach_bad: "Je ne trouve aucun service à pirater sur {1}:{2}",
    cmd_breach_no: "Vous devez infiltrer le service avant de le pirater.",
    cmd_breach_good: "Le service a été piraté et les données ont été écrites dans :<br><span style='color:crimson'>{1}</span>",
    cmd_breach_delay: "Vous devez attendre avant de faire une brèche sur ce service.",

    error_market_title: "Erreur de création du poste",
    error_market_deletion_title: "Erreur de suppression",
    error_market_empty_arg: "Le titre ou la description est vide.",
    error_market_arg_overflow: "Le titre ou la description dépasse la taille autorisée.",
    error_market_delay: "Attendez entre chaque poste.",
    error_market_max: "Vous avez atteint le maximum de postes.",
    error_market_id: "L'ID est invalide.",
    error_market_id_not_yours: "Cette ID n'est pas l'une de vos postes.",
    info_market_creation_success: "Créé avec succès !",
    info_market_creation_success_desc: "Le poste à été créé avec succès.\nRafraîchissez le market.",
    info_market_deletion_success: "Supprimé avec succès !",
    info_market_deletion_success_desc: "Le poste à été supprimé avec succès.\nRafraîchissez le market.",
    market_yours: "le vôtre",
    market_post: "Poster",

    info_ipv4: "IPv4 :",
    info_type: "Type d'ordinateur:",
    info_desktop: "Fixe",
    info_laptop: "Portable",

    market_description: "Vous pouvez créer un poste toutes les {1} secondes, vous pouvez créer au maximum {2} postes. Chaque poste sera actif pour {3} jours.",

    mail_signin: "S'identifier",
    mail_signup: "S'inscrire",
    mail_save: "Sauvegarder les entrées pour la prochaine fois.",
    mail_preview: "Votre adresse mail sera {1}.",
    mail_passwords_different: "Les mots de passe sont différents.",
    mail_username_taken: "Ce nom d'utilisateur est déjà utilisé.",
    mail_account_created: "Compte créé !",
    mail_empty: "Le nom d'utilisateur et/ou le mot de passe ne peut pas être vide.",
    mail_input_overflow: "Le nom d'utilisateur ou le mot de passe dépasse la taille autorisée.",
    mail_password_empty: "Entrez un mot de passe.",
    mail_password_warning: "⚠️ ATTENTION : Ne mettez pas un vrai mot de passe !",
    mail_connect_wrong: "Le compte n'existe pas ou le nom d'utilisateur ou le mot de passe est incorrect.",
    mail_signout: "Se déconnecter",
    mail_create: "Nouveau mail",
    mail_unread: "NON LU",
    mail_object: "Objet du mail",
    mail_text: "Texte...",
    mail_send: "Envoyer",
    mail_new: "NOUVEAU",
    mail_signup_message: "Pas de compte ? S'inscrire",
    mail_signin_message: "Vous avez déjà un compte ? S'identifier",
    mail_username: "Nom d'utilisateur",
    mail_password: "Mot de passe",
    mail_confirm_password: "Confirmation Mot de passe",
    mail_send_error_address: "L'adresse e-mail saisie n'est pas valide, n'existe pas ou a été supprimée.",
    mail_send_error_empty: "L'objet ou le texte du mail est vide.",
    mail_send_error_overflow: "L'objet ou le texte du mail dépasse la taille autorisée.",
    mail_answer: "Répondre",

    addresses_desc: "Les utilisateurs doivent faire preuve de prudence lorsqu'ils visitent les domaines répertoriés, et nous ne sommes pas responsables des conséquences.",
    addr_chatincognitonet_connect_title: "Pseudo temporaire :",
    addr_chatincognitonet_username: "Pseudo",
    addr_chatincognitonet_connect: "Se connecter",
    addr_chatincognitonet_connect_taken: "Pseudo déjà utilisé",
    addr_chatincognitonet_send: "Envoyer",
    addr_chatincognitonet_msg_placeholder: "message... (255 caractères)",
    addr_chatincognitonet_left: "a quitté le chat.",
    addr_selldata_title: "Vendre des données",
    addr_selldata_path: "Chemin d'accès aux données...",
    addr_selldata_sell: "Vendre",
    addr_selldata_bad: "Les données n'existent pas sur ce chemin ou impossible d'accéder au chemin.",
    addr_selldata_sold: "Données vendues pour {1}$.",
}