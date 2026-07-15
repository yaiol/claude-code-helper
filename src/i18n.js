// ⚠ CLAUDE PRE-COMMIT GUARD - STOP before editing this file.
//   It holds every UI string, in every language. Do NOT hand-edit it: no empty
//   {} blocks, no copying values from another app, no pasting translations, no
//   "I'll fill the others later" - all of those are bugs. The only correct path
//   is the i18n key workflow: add keys in EN, then translate, sort and audit
//   across every language. Full procedure and exact commands: see CLAUDE-i18n.md.

import { useMemo } from 'react';

const TRANSLATIONS = {
  en: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "New version available:",
    lnkUpdateWhatsNew:                      "What's new",
    btnUpdateDownload:                      "Download",
    lnkUpdateSkip:                          "Skip this version",
    tipUpdateDismiss:                       "Dismiss",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Help",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "is a Claude Helper.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sessions",
    tipSessionsRefresh:                     "Refresh list",
    plhSessionsFilter:                      "Filter by title or path…",
    lblSessionsActive:                      "Active",
    lblSessionsArchived:                    "Archived",
    lblSessionsLost:                        "Lost",
    tipSessionsLost:                        "No Claude Desktop entry for this session - its title was lost (likely a Desktop bug). Title recovered from the first message.",
    tipSessionsFilterClear:                 "Clear filter",
    tipSessionsFilterActive:                "Show or hide active sessions",
    tipSessionsFilterArchived:              "Show or hide archived sessions",
    tipSessionsFilterLost:                  "Show or hide lost sessions",
    tipSessionsFilterSource:                "Show or hide sessions from this source",
    msgSessionsLoading:                     "Loading sessions…",
    msgSessionsEmpty:                       "No sessions found",
    msgSessionsError:                       "Could not read Claude Desktop data",
    lblSessionsCount:                       "sessions",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Select a session to view its decoded transcript",
    msgTranscriptLoading:                   "Decoding transcript…",
    msgTranscriptError:                     "Could not decode this transcript",
    tipTranscriptReveal:                    "Show transcript file in folder",
    tipTranscriptCopy:                      "Copy as Markdown",
    tipTranscriptExport:                    "Export as Markdown file",
    tipTranscriptToolExpand:                "Expand or collapse tool details",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Export transcript",
    lblExportFilterMd:                      "Markdown",

    // ⚠ CLAUDE: do NOT add keys here - every key must belong to an existing Prefix block above. If no block fits, ask the user.
  },

  fr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Annuler",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nouvelle version disponible :",
    lnkUpdateWhatsNew:                      "Nouveautés",
    btnUpdateDownload:                      "Télécharger",
    lnkUpdateSkip:                          "Ignorer cette version",
    tipUpdateDismiss:                       "Ignorer",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Ouvrir les paramètres",
    tipHdrHelp:                             "Aide",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Paramètres",
    tabDlgSettingsDisplay:                  "Affichage",
    tabDlgSettingsAbout:                    "À propos",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Langue",
    lblDlgSettingsDisplayTheme:             "Thème",
    btnDlgSettingsDisplayThemeDark:         "Sombre",
    btnDlgSettingsDisplayThemeLight:        "Clair",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "est un modèle d'application yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sessions",
    tipSessionsRefresh:                     "Actualiser la liste",
    plhSessionsFilter:                      "Filtrer par titre ou chemin…",
    lblSessionsActive:                      "Actif",
    lblSessionsArchived:                    "Archivé",
    lblSessionsLost:                        "Perdues",
    tipSessionsLost:                        "Aucune entrée Claude Desktop pour cette session - son titre a été perdu (probablement un bug du Bureau). Titre récupéré du premier message.",
    tipSessionsFilterClear:                 "Effacer le filtre",
    tipSessionsFilterActive:                "Afficher ou masquer les sessions actives",
    tipSessionsFilterArchived:              "Afficher ou masquer les sessions archivées",
    tipSessionsFilterLost:                  "Afficher ou masquer les sessions perdues",
    tipSessionsFilterSource:                "Afficher ou masquer les sessions de cette source",
    msgSessionsLoading:                     "Chargement des sessions…",
    msgSessionsEmpty:                       "Aucune session trouvée",
    msgSessionsError:                       "Impossible de lire les données Claude Desktop",
    lblSessionsCount:                       "sessions",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Sélectionnez une session pour afficher sa transcription décodée",
    msgTranscriptLoading:                   "Décodage de la transcription…",
    msgTranscriptError:                     "Impossible de décoder cette transcription",
    tipTranscriptReveal:                    "Afficher le fichier de transcription dans le dossier",
    tipTranscriptCopy:                      "Copier en Markdown",
    tipTranscriptExport:                    "Exporter en tant que fichier Markdown",
    tipTranscriptToolExpand:                "Développer ou réduire les détails de l'outil",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Exporter la transcription",
    lblExportFilterMd:                      "Markdown",

  },

  de: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Abbrechen",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Neue Version verfügbar:",
    lnkUpdateWhatsNew:                      "Was ist neu",
    btnUpdateDownload:                      "Herunterladen",
    lnkUpdateSkip:                          "Diese Version überspringen",
    tipUpdateDismiss:                       "Schließen",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Einstellungen öffnen",
    tipHdrHelp:                             "Hilfe",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Einstellungen",
    tabDlgSettingsDisplay:                  "Anzeige",
    tabDlgSettingsAbout:                    "Über",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Sprache",
    lblDlgSettingsDisplayTheme:             "Design",
    btnDlgSettingsDisplayThemeDark:         "Dunkel",
    btnDlgSettingsDisplayThemeLight:        "Hell",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ist eine yaiol Electron App-Vorlage.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sitzungen",
    tipSessionsRefresh:                     "Liste aktualisieren",
    plhSessionsFilter:                      "Nach Titel oder Pfad filtern…",
    lblSessionsActive:                      "Aktiv",
    lblSessionsArchived:                    "Archiviert",
    lblSessionsLost:                        "Verloren",
    tipSessionsLost:                        "Kein Claude Desktop-Eintrag für diese Sitzung - ihr Titel ging verloren (wahrscheinlich ein Desktop-Bug). Titel aus der ersten Nachricht wiederhergestellt.",
    tipSessionsFilterClear:                 "Filter löschen",
    tipSessionsFilterActive:                "Aktive Sitzungen anzeigen oder ausblenden",
    tipSessionsFilterArchived:              "Archivierte Sitzungen anzeigen oder ausblenden",
    tipSessionsFilterLost:                  "Verlorene Sitzungen anzeigen oder ausblenden",
    tipSessionsFilterSource:                "Sitzungen dieser Quelle ein- oder ausblenden",
    msgSessionsLoading:                     "Sitzungen werden geladen…",
    msgSessionsEmpty:                       "Keine Sitzungen gefunden",
    msgSessionsError:                       "Claude Desktop-Daten konnten nicht gelesen werden",
    lblSessionsCount:                       "Sitzungen",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Wählen Sie eine Sitzung aus, um deren dekodiertes Transkript anzuzeigen",
    msgTranscriptLoading:                   "Transkript wird dekodiert…",
    msgTranscriptError:                     "Dieses Transkript konnte nicht dekodiert werden",
    tipTranscriptReveal:                    "Transkriptdatei im Ordner anzeigen",
    tipTranscriptCopy:                      "Als Markdown kopieren",
    tipTranscriptExport:                    "Als Markdown-Datei exportieren",
    tipTranscriptToolExpand:                "Werkzeugdetails ein- oder ausblenden",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Transkript exportieren",
    lblExportFilterMd:                      "Markdown",

  },

  es: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancelar",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nueva versión disponible:",
    lnkUpdateWhatsNew:                      "Novedades",
    btnUpdateDownload:                      "Descargar",
    lnkUpdateSkip:                          "Omitir esta versión",
    tipUpdateDismiss:                       "Descartar",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Abrir configuración",
    tipHdrHelp:                             "Ayuda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configuración",
    tabDlgSettingsDisplay:                  "Pantalla",
    tabDlgSettingsAbout:                    "Acerca de",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Oscuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "es una plantilla de aplicación yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sesiones",
    tipSessionsRefresh:                     "Actualizar lista",
    plhSessionsFilter:                      "Filtrar por título o ruta…",
    lblSessionsActive:                      "Activo",
    lblSessionsArchived:                    "Archivado",
    lblSessionsLost:                        "Perdidas",
    tipSessionsLost:                        "No hay entrada de Claude Desktop para esta sesión - su título se perdió (probablemente un error del Escritorio). Título recuperado del primer mensaje.",
    tipSessionsFilterClear:                 "Borrar filtro",
    tipSessionsFilterActive:                "Mostrar u ocultar sesiones activas",
    tipSessionsFilterArchived:              "Mostrar u ocultar sesiones archivadas",
    tipSessionsFilterLost:                  "Mostrar u ocultar sesiones perdidas",
    tipSessionsFilterSource:                "Mostrar u ocultar sesiones de esta fuente",
    msgSessionsLoading:                     "Cargando sesiones…",
    msgSessionsEmpty:                       "No se encontraron sesiones",
    msgSessionsError:                       "No se pudieron leer los datos de Claude Desktop",
    lblSessionsCount:                       "sesiones",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Seleccione una sesión para ver su transcripción decodificada",
    msgTranscriptLoading:                   "Decodificando transcripción…",
    msgTranscriptError:                     "No se pudo decodificar esta transcripción",
    tipTranscriptReveal:                    "Mostrar archivo de transcripción en la carpeta",
    tipTranscriptCopy:                      "Copiar como Markdown",
    tipTranscriptExport:                    "Exportar como archivo Markdown",
    tipTranscriptToolExpand:                "Expandir o contraer los detalles de la herramienta",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Exportar transcripción",
    lblExportFilterMd:                      "Markdown",

  },

  pt_BR: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancelar",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versão disponível:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Baixar",
    lnkUpdateSkip:                          "Ignorar esta versão",
    tipUpdateDismiss:                       "Dispensar",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Abrir configurações",
    tipHdrHelp:                             "Ajuda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configurações",
    tabDlgSettingsDisplay:                  "Exibição",
    tabDlgSettingsAbout:                    "Sobre",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "é um modelo de aplicativo yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sessões",
    tipSessionsRefresh:                     "Atualizar lista",
    plhSessionsFilter:                      "Filtrar por título ou caminho…",
    lblSessionsActive:                      "Ativo",
    lblSessionsArchived:                    "Arquivado",
    lblSessionsLost:                        "Perdidas",
    tipSessionsLost:                        "Nenhuma entrada do Claude Desktop para esta sessão - o título foi perdido (provavelmente um bug do Desktop). Título recuperado da primeira mensagem.",
    tipSessionsFilterClear:                 "Limpar filtro",
    tipSessionsFilterActive:                "Mostrar ou ocultar sessões ativas",
    tipSessionsFilterArchived:              "Mostrar ou ocultar sessões arquivadas",
    tipSessionsFilterLost:                  "Mostrar ou ocultar sessões perdidas",
    tipSessionsFilterSource:                "Mostrar ou ocultar sessões desta origem",
    msgSessionsLoading:                     "Carregando sessões…",
    msgSessionsEmpty:                       "Nenhuma sessão encontrada",
    msgSessionsError:                       "Não foi possível ler os dados do Claude Desktop",
    lblSessionsCount:                       "sessões",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Selecione uma sessão para ver sua transcrição decodificada",
    msgTranscriptLoading:                   "Decodificando transcrição…",
    msgTranscriptError:                     "Não foi possível decodificar esta transcrição",
    tipTranscriptReveal:                    "Mostrar arquivo de transcrição na pasta",
    tipTranscriptCopy:                      "Copiar como Markdown",
    tipTranscriptExport:                    "Exportar como arquivo Markdown",
    tipTranscriptToolExpand:                "Expandir ou recolher os detalhes da ferramenta",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Exportar transcrição",
    lblExportFilterMd:                      "Markdown",

  },

  pt_PT: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancelar",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versão disponível:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Transferir",
    lnkUpdateSkip:                          "Ignorar esta versão",
    tipUpdateDismiss:                       "Dispensar",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Abrir definições",
    tipHdrHelp:                             "Ajuda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Definições",
    tabDlgSettingsDisplay:                  "Visualização",
    tabDlgSettingsAbout:                    "Sobre",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "é um modelo de aplicação yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sessões",
    tipSessionsRefresh:                     "Atualizar lista",
    plhSessionsFilter:                      "Filtrar por título ou caminho…",
    lblSessionsActive:                      "Ativo",
    lblSessionsArchived:                    "Arquivado",
    lblSessionsLost:                        "Perdidas",
    tipSessionsLost:                        "Nenhuma entrada do Claude Desktop para esta sessão - o título foi perdido (provavelmente um bug do Desktop). Título recuperado da primeira mensagem.",
    tipSessionsFilterClear:                 "Limpar filtro",
    tipSessionsFilterActive:                "Mostrar ou ocultar sessões ativas",
    tipSessionsFilterArchived:              "Mostrar ou ocultar sessões arquivadas",
    tipSessionsFilterLost:                  "Mostrar ou ocultar sessões perdidas",
    tipSessionsFilterSource:                "Mostrar ou ocultar sessões desta origem",
    msgSessionsLoading:                     "A carregar sessões…",
    msgSessionsEmpty:                       "Nenhuma sessão encontrada",
    msgSessionsError:                       "Não foi possível ler os dados do Claude Desktop",
    lblSessionsCount:                       "sessões",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Selecione uma sessão para ver a sua transcrição descodificada",
    msgTranscriptLoading:                   "A descodificar transcrição…",
    msgTranscriptError:                     "Não foi possível descodificar esta transcrição",
    tipTranscriptReveal:                    "Mostrar ficheiro de transcrição na pasta",
    tipTranscriptCopy:                      "Copiar como Markdown",
    tipTranscriptExport:                    "Exportar como ficheiro Markdown",
    tipTranscriptToolExpand:                "Expandir ou recolher os detalhes da ferramenta",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Exportar transcrição",
    lblExportFilterMd:                      "Markdown",

  },

  it: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Annulla",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nuova versione disponibile:",
    lnkUpdateWhatsNew:                      "Novità",
    btnUpdateDownload:                      "Scarica",
    lnkUpdateSkip:                          "Salta questa versione",
    tipUpdateDismiss:                       "Ignora",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Apri impostazioni",
    tipHdrHelp:                             "Aiuto",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Impostazioni",
    tabDlgSettingsDisplay:                  "Schermo",
    tabDlgSettingsAbout:                    "Informazioni",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Lingua",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Scuro",
    btnDlgSettingsDisplayThemeLight:        "Chiaro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "è un modello di app yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sessioni",
    tipSessionsRefresh:                     "Aggiorna elenco",
    plhSessionsFilter:                      "Filtra per titolo o percorso…",
    lblSessionsActive:                      "Attivo",
    lblSessionsArchived:                    "Archiviato",
    lblSessionsLost:                        "Perse",
    tipSessionsLost:                        "Nessuna voce Claude Desktop per questa sessione - il suo titolo è andato perso (probabilmente un bug del Desktop). Titolo recuperato dal primo messaggio.",
    tipSessionsFilterClear:                 "Cancella filtro",
    tipSessionsFilterActive:                "Mostra o nascondi sessioni attive",
    tipSessionsFilterArchived:              "Mostra o nascondi sessioni archiviate",
    tipSessionsFilterLost:                  "Mostra o nascondi sessioni perse",
    tipSessionsFilterSource:                "Mostra o nascondi le sessioni da questa origine",
    msgSessionsLoading:                     "Caricamento sessioni…",
    msgSessionsEmpty:                       "Nessuna sessione trovata",
    msgSessionsError:                       "Impossibile leggere i dati di Claude Desktop",
    lblSessionsCount:                       "sessioni",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Seleziona una sessione per visualizzare la sua trascrizione decodificata",
    msgTranscriptLoading:                   "Decodifica trascrizione…",
    msgTranscriptError:                     "Impossibile decodificare questa trascrizione",
    tipTranscriptReveal:                    "Mostra il file di trascrizione nella cartella",
    tipTranscriptCopy:                      "Copia come Markdown",
    tipTranscriptExport:                    "Esporta come file Markdown",
    tipTranscriptToolExpand:                "Espandi o comprimi i dettagli dello strumento",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Esporta trascrizione",
    lblExportFilterMd:                      "Markdown",

  },

  nl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Annuleren",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nieuwe versie beschikbaar:",
    lnkUpdateWhatsNew:                      "Wat is nieuw",
    btnUpdateDownload:                      "Downloaden",
    lnkUpdateSkip:                          "Deze versie overslaan",
    tipUpdateDismiss:                       "Sluiten",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Instellingen openen",
    tipHdrHelp:                             "Hulp",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Instellingen",
    tabDlgSettingsDisplay:                  "Weergave",
    tabDlgSettingsAbout:                    "Over",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Taal",
    lblDlgSettingsDisplayTheme:             "Thema",
    btnDlgSettingsDisplayThemeDark:         "Donker",
    btnDlgSettingsDisplayThemeLight:        "Licht",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "is een yaiol Electron app-sjabloon.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sessies",
    tipSessionsRefresh:                     "Lijst vernieuwen",
    plhSessionsFilter:                      "Filteren op titel of pad…",
    lblSessionsActive:                      "Actief",
    lblSessionsArchived:                    "Gearchiveerd",
    lblSessionsLost:                        "Verloren",
    tipSessionsLost:                        "Geen Claude Desktop-item voor deze sessie - de titel is verloren gegaan (waarschijnlijk een Desktop-bug). Titel hersteld uit het eerste bericht.",
    tipSessionsFilterClear:                 "Filter wissen",
    tipSessionsFilterActive:                "Actieve sessies tonen of verbergen",
    tipSessionsFilterArchived:              "Gearchiveerde sessies tonen of verbergen",
    tipSessionsFilterLost:                  "Verloren sessies tonen of verbergen",
    tipSessionsFilterSource:                "Sessies van deze bron tonen of verbergen",
    msgSessionsLoading:                     "Sessies laden…",
    msgSessionsEmpty:                       "Geen sessies gevonden",
    msgSessionsError:                       "Kon Claude Desktop-gegevens niet lezen",
    lblSessionsCount:                       "sessies",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Selecteer een sessie om het gedecodeerde transcript te bekijken",
    msgTranscriptLoading:                   "Transcript wordt gedecodeerd…",
    msgTranscriptError:                     "Dit transcript kon niet worden gedecodeerd",
    tipTranscriptReveal:                    "Transcriptbestand in map weergeven",
    tipTranscriptCopy:                      "Kopiëren als Markdown",
    tipTranscriptExport:                    "Exporteren als Markdown-bestand",
    tipTranscriptToolExpand:                "Gereedschapsdetails uitvouwen of samenvouwen",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Transcript exporteren",
    lblExportFilterMd:                      "Markdown",

  },

  ru: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Отмена",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна новая версия:",
    lnkUpdateWhatsNew:                      "Что нового",
    btnUpdateDownload:                      "Скачать",
    lnkUpdateSkip:                          "Пропустить эту версию",
    tipUpdateDismiss:                       "Закрыть",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Открыть настройки",
    tipHdrHelp:                             "Справка",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Настройки",
    tabDlgSettingsDisplay:                  "Отображение",
    tabDlgSettingsAbout:                    "О программе",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Язык",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тёмный",
    btnDlgSettingsDisplayThemeLight:        "Светлый",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "- это шаблон приложения yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Сессии",
    tipSessionsRefresh:                     "Обновить список",
    plhSessionsFilter:                      "Фильтр по названию или пути…",
    lblSessionsActive:                      "Активно",
    lblSessionsArchived:                    "В архиве",
    lblSessionsLost:                        "Потерянные",
    tipSessionsLost:                        "Нет записи Claude Desktop для этой сессии - ее заголовок был утерян (вероятно, ошибка Desktop). Заголовок восстановлен из первого сообщения.",
    tipSessionsFilterClear:                 "Очистить фильтр",
    tipSessionsFilterActive:                "Показать или скрыть активные сеансы",
    tipSessionsFilterArchived:              "Показать или скрыть архивные сеансы",
    tipSessionsFilterLost:                  "Показать или скрыть потерянные сессии",
    tipSessionsFilterSource:                "Показать или скрыть сеансы из этого источника",
    msgSessionsLoading:                     "Загрузка сеансов…",
    msgSessionsEmpty:                       "Сеансы не найдены",
    msgSessionsError:                       "Не удалось прочитать данные Claude Desktop",
    lblSessionsCount:                       "сеансы",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Выберите сеанс, чтобы просмотреть его декодированную стенограмму",
    msgTranscriptLoading:                   "Декодирование транскрипта…",
    msgTranscriptError:                     "Не удалось декодировать этот транскрипт",
    tipTranscriptReveal:                    "Показать файл транскрипта в папке",
    tipTranscriptCopy:                      "Копировать как Markdown",
    tipTranscriptExport:                    "Экспортировать как файл Markdown",
    tipTranscriptToolExpand:                "Развернуть или свернуть сведения об инструменте",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Экспортировать стенограмму",
    lblExportFilterMd:                      "Markdown",

  },

  uk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Скасувати",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна нова версія:",
    lnkUpdateWhatsNew:                      "Що нового",
    btnUpdateDownload:                      "Завантажити",
    lnkUpdateSkip:                          "Пропустити цю версію",
    tipUpdateDismiss:                       "Закрити",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Відкрити налаштування",
    tipHdrHelp:                             "Довідка",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Налаштування",
    tabDlgSettingsDisplay:                  "Відображення",
    tabDlgSettingsAbout:                    "Про програму",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Мова",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Темний",
    btnDlgSettingsDisplayThemeLight:        "Світлий",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "- це шаблон програми yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Сесії",
    tipSessionsRefresh:                     "Оновити список",
    plhSessionsFilter:                      "Фільтрувати за назвою або шляхом…",
    lblSessionsActive:                      "Активно",
    lblSessionsArchived:                    "Архівовано",
    lblSessionsLost:                        "Втрачені",
    tipSessionsLost:                        "Немає запису Claude Desktop для цієї сесії - її назву було втрачено (ймовірно, помилка Desktop). Назву відновлено з першого повідомлення.",
    tipSessionsFilterClear:                 "Очистити фільтр",
    tipSessionsFilterActive:                "Показати або приховати активні сеанси",
    tipSessionsFilterArchived:              "Показати або приховати архівні сеанси",
    tipSessionsFilterLost:                  "Показати або приховати втрачені сесії",
    tipSessionsFilterSource:                "Показати або приховати сеанси з цього джерела",
    msgSessionsLoading:                     "Завантаження сесій…",
    msgSessionsEmpty:                       "Сесій не знайдено",
    msgSessionsError:                       "Не вдалося прочитати дані Claude Desktop",
    lblSessionsCount:                       "сесії",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Виберіть сесію, щоб переглянути її декодований транскрипт",
    msgTranscriptLoading:                   "Декодування транскрипту…",
    msgTranscriptError:                     "Не вдалося декодувати цей транскрипт",
    tipTranscriptReveal:                    "Показати файл транскрипту в папці",
    tipTranscriptCopy:                      "Копіювати як Markdown",
    tipTranscriptExport:                    "Експортувати як файл Markdown",
    tipTranscriptToolExpand:                "Розгорнути або згорнути відомості про інструмент",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Експортувати стенограму",
    lblExportFilterMd:                      "Markdown",

  },

  pl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Anuluj",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Dostępna nowa wersja:",
    lnkUpdateWhatsNew:                      "Co nowego",
    btnUpdateDownload:                      "Pobierz",
    lnkUpdateSkip:                          "Pomiń tę wersję",
    tipUpdateDismiss:                       "Zamknij",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Otwórz ustawienia",
    tipHdrHelp:                             "Pomoc",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Ustawienia",
    tabDlgSettingsDisplay:                  "Wyświetlanie",
    tabDlgSettingsAbout:                    "O programie",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Język",
    lblDlgSettingsDisplayTheme:             "Motyw",
    btnDlgSettingsDisplayThemeDark:         "Ciemny",
    btnDlgSettingsDisplayThemeLight:        "Jasny",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "to szablon aplikacji yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sesje",
    tipSessionsRefresh:                     "Odśwież listę",
    plhSessionsFilter:                      "Filtruj według tytułu lub ścieżki…",
    lblSessionsActive:                      "Aktywne",
    lblSessionsArchived:                    "Zarchiwizowane",
    lblSessionsLost:                        "Utracone",
    tipSessionsLost:                        "Brak wpisu Claude Desktop dla tej sesji - jej tytuł został utracony (prawdopodobnie błąd Desktopu). Tytuł odzyskany z pierwszej wiadomości.",
    tipSessionsFilterClear:                 "Wyczyść filtr",
    tipSessionsFilterActive:                "Pokaż lub ukryj aktywne sesje",
    tipSessionsFilterArchived:              "Pokaż lub ukryj zarchiwizowane sesje",
    tipSessionsFilterLost:                  "Pokaż lub ukryj utracone sesje",
    tipSessionsFilterSource:                "Pokaż lub ukryj sesje z tego źródła",
    msgSessionsLoading:                     "Ładowanie sesji…",
    msgSessionsEmpty:                       "Nie znaleziono sesji",
    msgSessionsError:                       "Nie można odczytać danych Claude Desktop",
    lblSessionsCount:                       "sesje",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Wybierz sesję, aby wyświetlić jej zdekodowany transkrypt",
    msgTranscriptLoading:                   "Dekodowanie transkrypcji…",
    msgTranscriptError:                     "Nie można było zdekodować tej transkrypcji",
    tipTranscriptReveal:                    "Pokaż plik transkrypcji w folderze",
    tipTranscriptCopy:                      "Kopiuj jako Markdown",
    tipTranscriptExport:                    "Eksportuj jako plik Markdown",
    tipTranscriptToolExpand:                "Rozwiń lub zwiń szczegóły narzędzia",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Eksportuj transkrypcję",
    lblExportFilterMd:                      "Markdown",

  },

  ro: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Anulează",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versiune nouă disponibilă:",
    lnkUpdateWhatsNew:                      "Ce e nou",
    btnUpdateDownload:                      "Descarcă",
    lnkUpdateSkip:                          "Omite această versiune",
    tipUpdateDismiss:                       "Ignoră",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Deschide setările",
    tipHdrHelp:                             "Ajutor",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Setări",
    tabDlgSettingsDisplay:                  "Afișaj",
    tabDlgSettingsAbout:                    "Despre",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Limbă",
    lblDlgSettingsDisplayTheme:             "Temă",
    btnDlgSettingsDisplayThemeDark:         "Întunecat",
    btnDlgSettingsDisplayThemeLight:        "Luminos",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "este un șablon de aplicație yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sesiuni",
    tipSessionsRefresh:                     "Reîmprospătare listă",
    plhSessionsFilter:                      "Filtrați după titlu sau cale…",
    lblSessionsActive:                      "Activ",
    lblSessionsArchived:                    "Arhivat",
    lblSessionsLost:                        "Pierdute",
    tipSessionsLost:                        "Nicio intrare Claude Desktop pentru această sesiune - titlul său a fost pierdut (probabil o eroare de Desktop). Titlul a fost recuperat din primul mesaj.",
    tipSessionsFilterClear:                 "Șterge filtru",
    tipSessionsFilterActive:                "Afișează sau ascunde sesiunile active",
    tipSessionsFilterArchived:              "Afișează sau ascunde sesiunile arhivate",
    tipSessionsFilterLost:                  "Afișează sau ascunde sesiunile pierdute",
    tipSessionsFilterSource:                "Afișați sau ascundeți sesiunile din această sursă",
    msgSessionsLoading:                     "Se încarcă sesiunile…",
    msgSessionsEmpty:                       "Nicio sesiune găsită",
    msgSessionsError:                       "Nu s-au putut citi datele Claude Desktop",
    lblSessionsCount:                       "sesiuni",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Selectați o sesiune pentru a vizualiza transcrierea decodificată",
    msgTranscriptLoading:                   "Decodificare transcriere…",
    msgTranscriptError:                     "Nu s-a putut decodifica această transcriere",
    tipTranscriptReveal:                    "Afișează fișierul de transcriere în folder",
    tipTranscriptCopy:                      "Copiază ca Markdown",
    tipTranscriptExport:                    "Exportă ca fișier Markdown",
    tipTranscriptToolExpand:                "Extindeți sau restrângeți detaliile instrumentului",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Exportă transcrierea",
    lblExportFilterMd:                      "Markdown",

  },

  sv: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Avbryt",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny version tillgänglig:",
    lnkUpdateWhatsNew:                      "Vad är nytt",
    btnUpdateDownload:                      "Ladda ner",
    lnkUpdateSkip:                          "Hoppa över den här versionen",
    tipUpdateDismiss:                       "Avfärda",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Öppna inställningar",
    tipHdrHelp:                             "Hjälp",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Inställningar",
    tabDlgSettingsDisplay:                  "Visning",
    tabDlgSettingsAbout:                    "Om",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Språk",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Mörk",
    btnDlgSettingsDisplayThemeLight:        "Ljus",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "är en yaiol Electron app-mall.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sessioner",
    tipSessionsRefresh:                     "Uppdatera lista",
    plhSessionsFilter:                      "Filtrera efter titel eller sökväg…",
    lblSessionsActive:                      "Aktiv",
    lblSessionsArchived:                    "Arkiverad",
    lblSessionsLost:                        "Förlorade",
    tipSessionsLost:                        "Ingen Claude Desktop-post för denna session - dess titel förlorades (troligen en skrivbordsbugg). Titel återställd från första meddelandet.",
    tipSessionsFilterClear:                 "Rensa filter",
    tipSessionsFilterActive:                "Visa eller dölj aktiva sessioner",
    tipSessionsFilterArchived:              "Visa eller dölj arkiverade sessioner",
    tipSessionsFilterLost:                  "Visa eller dölj förlorade sessioner",
    tipSessionsFilterSource:                "Visa eller dölj sessioner från denna källa",
    msgSessionsLoading:                     "Laddar sessioner…",
    msgSessionsEmpty:                       "Inga sessioner hittades",
    msgSessionsError:                       "Kunde inte läsa Claude Desktop-data",
    lblSessionsCount:                       "sessioner",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Välj en session för att visa dess avkodade transkript",
    msgTranscriptLoading:                   "Avkodar transkript…",
    msgTranscriptError:                     "Kunde inte avkoda detta transkript",
    tipTranscriptReveal:                    "Visa transkriptfil i mapp",
    tipTranscriptCopy:                      "Kopiera som Markdown",
    tipTranscriptExport:                    "Exportera som Markdown-fil",
    tipTranscriptToolExpand:                "Expandera eller dölj verktygsdetaljer",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Exportera transkript",
    lblExportFilterMd:                      "Markdown",

  },

  nb: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Avbryt",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny versjon tilgjengelig:",
    lnkUpdateWhatsNew:                      "Hva er nytt",
    btnUpdateDownload:                      "Last ned",
    lnkUpdateSkip:                          "Hopp over denne versjonen",
    tipUpdateDismiss:                       "Avvis",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Åpne innstillinger",
    tipHdrHelp:                             "Hjelp",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Innstillinger",
    tabDlgSettingsDisplay:                  "Skjerm",
    tabDlgSettingsAbout:                    "Om",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Språk",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Mørk",
    btnDlgSettingsDisplayThemeLight:        "Lys",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "er en yaiol Electron app-mal.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sesjoner",
    tipSessionsRefresh:                     "Oppdater liste",
    plhSessionsFilter:                      "Filtrer etter tittel eller bane…",
    lblSessionsActive:                      "Aktiv",
    lblSessionsArchived:                    "Arkivert",
    lblSessionsLost:                        "Tapte",
    tipSessionsLost:                        "Ingen Claude Desktop-oppføring for denne økten - tittelen ble tapt (sannsynligvis en skrivebordsfeil). Tittel gjenopprettet fra den første meldingen.",
    tipSessionsFilterClear:                 "Fjern filter",
    tipSessionsFilterActive:                "Vis eller skjul aktive økter",
    tipSessionsFilterArchived:              "Vis eller skjul arkiverte økter",
    tipSessionsFilterLost:                  "Vis eller skjul tapte økter",
    tipSessionsFilterSource:                "Vis eller skjul økter fra denne kilden",
    msgSessionsLoading:                     "Laster økter…",
    msgSessionsEmpty:                       "Ingen økter funnet",
    msgSessionsError:                       "Kunne ikke lese Claude Desktop-data",
    lblSessionsCount:                       "økter",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Velg en økt for å vise dens dekodede transkripsjon",
    msgTranscriptLoading:                   "Dekoder transkripsjon…",
    msgTranscriptError:                     "Kunne ikke dekode denne transkripsjonen",
    tipTranscriptReveal:                    "Vis transkripsjonsfil i mappe",
    tipTranscriptCopy:                      "Kopier som Markdown",
    tipTranscriptExport:                    "Eksporter som Markdown-fil",
    tipTranscriptToolExpand:                "Utvid eller skjul verktøydetaljer",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Eksporter transkripsjon",
    lblExportFilterMd:                      "Markdown",

  },

  tr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "İptal",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Yeni sürüm mevcut:",
    lnkUpdateWhatsNew:                      "Yenilikler",
    btnUpdateDownload:                      "İndir",
    lnkUpdateSkip:                          "Bu sürümü atla",
    tipUpdateDismiss:                       "Kapat",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Ayarları aç",
    tipHdrHelp:                             "Yardım",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Ayarlar",
    tabDlgSettingsDisplay:                  "Görüntü",
    tabDlgSettingsAbout:                    "Hakkında",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Dil",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Koyu",
    btnDlgSettingsDisplayThemeLight:        "Açık",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "bir yaiol Electron uygulama şablonudur.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Oturumlar",
    tipSessionsRefresh:                     "Listeyi yenile",
    plhSessionsFilter:                      "Başlığa veya yola göre filtrele…",
    lblSessionsActive:                      "Aktif",
    lblSessionsArchived:                    "Arşivlendi",
    lblSessionsLost:                        "Kayıp",
    tipSessionsLost:                        "Bu oturum için Claude Masaüstü girişi yok - başlığı kayboldu (muhtemelen bir Masaüstü hatası). Başlık ilk mesajdan kurtarıldı.",
    tipSessionsFilterClear:                 "Filtreyi temizle",
    tipSessionsFilterActive:                "Aktif oturumları göster veya gizle",
    tipSessionsFilterArchived:              "Arşivlenmiş oturumları göster veya gizle",
    tipSessionsFilterLost:                  "Kaybolan oturumları göster veya gizle",
    tipSessionsFilterSource:                "Bu kaynaktan gelen oturumları göster veya gizle",
    msgSessionsLoading:                     "Oturumlar yükleniyor…",
    msgSessionsEmpty:                       "Oturum bulunamadı",
    msgSessionsError:                       "Claude Desktop verileri okunamadı",
    lblSessionsCount:                       "oturumlar",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Çözümlenmiş dökümünü görüntülemek için bir oturum seçin",
    msgTranscriptLoading:                   "Transkript çözümleniyor…",
    msgTranscriptError:                     "Bu transkript çözümlenemedi",
    tipTranscriptReveal:                    "Transkript dosyasını klasörde göster",
    tipTranscriptCopy:                      "Markdown olarak kopyala",
    tipTranscriptExport:                    "Markdown dosyası olarak dışa aktar",
    tipTranscriptToolExpand:                "Araç ayrıntılarını genişlet veya daralt",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Transkripti dışa aktar",
    lblExportFilterMd:                      "Markdown",

  },

  hr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Odustani",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova verzija dostupna:",
    lnkUpdateWhatsNew:                      "Što je novo",
    btnUpdateDownload:                      "Preuzmi",
    lnkUpdateSkip:                          "Preskoči ovu verziju",
    tipUpdateDismiss:                       "Odbaci",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Otvori postavke",
    tipHdrHelp:                             "Pomoć",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Postavke",
    tabDlgSettingsDisplay:                  "Prikaz",
    tabDlgSettingsAbout:                    "O programu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jezik",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Tamno",
    btnDlgSettingsDisplayThemeLight:        "Svijetlo",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "je predložak aplikacije yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sesije",
    tipSessionsRefresh:                     "Osvježi popis",
    plhSessionsFilter:                      "Filtriraj po naslovu ili putanji…",
    lblSessionsActive:                      "Aktivno",
    lblSessionsArchived:                    "Arhivirano",
    lblSessionsLost:                        "Izgubljene",
    tipSessionsLost:                        "Nema unosa Claude Desktop za ovu sesiju - njezin je naslov izgubljen (vjerojatno greška Desktopa). Naslov je oporavljen iz prve poruke.",
    tipSessionsFilterClear:                 "Očisti filtar",
    tipSessionsFilterActive:                "Prikaži ili sakrij aktivne sesije",
    tipSessionsFilterArchived:              "Prikaži ili sakrij arhivirane sesije",
    tipSessionsFilterLost:                  "Prikaži ili sakrij izgubljene sesije",
    tipSessionsFilterSource:                "Prikaži ili sakrij sesije iz ovog izvora",
    msgSessionsLoading:                     "Učitavanje sesija…",
    msgSessionsEmpty:                       "Nema pronađenih sesija",
    msgSessionsError:                       "Nije moguće pročitati podatke Claude Desktopa",
    lblSessionsCount:                       "sesije",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Odaberite sesiju za prikaz njezinog dekodiranog transkripta",
    msgTranscriptLoading:                   "Dekodiranje transkripta…",
    msgTranscriptError:                     "Nije moguće dekodirati ovaj transkript",
    tipTranscriptReveal:                    "Prikaži datoteku transkripta u mapi",
    tipTranscriptCopy:                      "Kopiraj kao Markdown",
    tipTranscriptExport:                    "Izvezi kao Markdown datoteku",
    tipTranscriptToolExpand:                "Proširi ili sažmi pojedinosti alata",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Izvezi transkript",
    lblExportFilterMd:                      "Markdown",

  },

  el: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Ακύρωση",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Νέα έκδοση διαθέσιμη:",
    lnkUpdateWhatsNew:                      "Τι νέο υπάρχει",
    btnUpdateDownload:                      "Λήψη",
    lnkUpdateSkip:                          "Παράλειψη αυτής της έκδοσης",
    tipUpdateDismiss:                       "Απόρριψη",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Άνοιγμα ρυθμίσεων",
    tipHdrHelp:                             "Βοήθεια",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Ρυθμίσεις",
    tabDlgSettingsDisplay:                  "Οθόνη",
    tabDlgSettingsAbout:                    "Σχετικά",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Γλώσσα",
    lblDlgSettingsDisplayTheme:             "Θέμα",
    btnDlgSettingsDisplayThemeDark:         "Σκοτεινό",
    btnDlgSettingsDisplayThemeLight:        "Φωτεινό",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "είναι ένα πρότυπο εφαρμογής yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Συνεδρίες",
    tipSessionsRefresh:                     "Ανανέωση λίστας",
    plhSessionsFilter:                      "Φιλτράρισμα κατά τίτλο ή διαδρομή…",
    lblSessionsActive:                      "Ενεργό",
    lblSessionsArchived:                    "Αρχειοθετημένο",
    lblSessionsLost:                        "Χαμένες",
    tipSessionsLost:                        "Δεν υπάρχει καταχώριση Claude Desktop για αυτήν τη συνεδρία - ο τίτλος της χάθηκε (πιθανώς σφάλμα Desktop). Ο τίτλος ανακτήθηκε από το πρώτο μήνυμα.",
    tipSessionsFilterClear:                 "Εκκαθάριση φίλτρου",
    tipSessionsFilterActive:                "Εμφάνιση ή απόκρυψη ενεργών περιόδων",
    tipSessionsFilterArchived:              "Εμφάνιση ή απόκρυψη αρχειοθετημένων περιόδων",
    tipSessionsFilterLost:                  "Εμφάνιση ή απόκρυψη χαμένων συνεδριών",
    tipSessionsFilterSource:                "Εμφάνιση ή απόκρυψη περιόδων λειτουργίας από αυτήν την πηγή",
    msgSessionsLoading:                     "Φόρτωση συνεδριών…",
    msgSessionsEmpty:                       "Δεν βρέθηκαν συνεδρίες",
    msgSessionsError:                       "Δεν ήταν δυνατή η ανάγνωση δεδομένων Claude Desktop",
    lblSessionsCount:                       "συνεδρίες",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Επιλέξτε μια συνεδρία για να δείτε την αποκωδικοποιημένη μεταγραφή της",
    msgTranscriptLoading:                   "Αποκωδικοποίηση μεταγραφής…",
    msgTranscriptError:                     "Δεν ήταν δυνατή η αποκωδικοποίηση αυτής της μεταγραφής",
    tipTranscriptReveal:                    "Εμφάνιση αρχείου μεταγραφής στο φάκελο",
    tipTranscriptCopy:                      "Αντιγραφή ως Markdown",
    tipTranscriptExport:                    "Εξαγωγή ως αρχείο Markdown",
    tipTranscriptToolExpand:                "Ανάπτυξη ή σύμπτυξη λεπτομερειών εργαλείου",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Εξαγωγή μεταγραφής",
    lblExportFilterMd:                      "Markdown",

  },

  he: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "ביטול",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "גרסה חדשה זמינה:",
    lnkUpdateWhatsNew:                      "מה חדש",
    btnUpdateDownload:                      "הורדה",
    lnkUpdateSkip:                          "דלג על גרסה זו",
    tipUpdateDismiss:                       "בטל",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "פתח הגדרות",
    tipHdrHelp:                             "עזרה",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "הגדרות",
    tabDlgSettingsDisplay:                  "תצוגה",
    tabDlgSettingsAbout:                    "אודות",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "שפה",
    lblDlgSettingsDisplayTheme:             "ערכת נושא",
    btnDlgSettingsDisplayThemeDark:         "כהה",
    btnDlgSettingsDisplayThemeLight:        "בהיר",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "הוא תבנית יישום yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "סשנים",
    tipSessionsRefresh:                     "רענן רשימה",
    plhSessionsFilter:                      "סנן לפי כותרת או נתיב…",
    lblSessionsActive:                      "פעיל",
    lblSessionsArchived:                    "בארכיון",
    lblSessionsLost:                        "אבודות",
    tipSessionsLost:                        "אין ערך של Claude Desktop עבור הפעלה זו - הכותרת שלה אבדה (כנראה באג בשולחן העבודה). הכותרת שוחזרה מההודעה הראשונה.",
    tipSessionsFilterClear:                 "נקה מסנן",
    tipSessionsFilterActive:                "הצג או הסתר הפעלות פעילות",
    tipSessionsFilterArchived:              "הצג או הסתר הפעלות בארכיון",
    tipSessionsFilterLost:                  "הצג או הסתר הפעלות אבודות",
    tipSessionsFilterSource:                "הצג או הסתר הפעלות ממקור זה",
    msgSessionsLoading:                     "טוען הפעלות…",
    msgSessionsEmpty:                       "לא נמצאו הפעלות",
    msgSessionsError:                       "לא ניתן היה לקרוא נתוני Claude Desktop",
    lblSessionsCount:                       "הפעלות",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "בחר הפעלה כדי להציג את התמליל המפוענח שלה",
    msgTranscriptLoading:                   "מפענח תמליל…",
    msgTranscriptError:                     "לא ניתן היה לפענח תמליל זה",
    tipTranscriptReveal:                    "הצג קובץ תמליל בתיקייה",
    tipTranscriptCopy:                      "העתק כ-Markdown",
    tipTranscriptExport:                    "ייצוא כקובץ Markdown",
    tipTranscriptToolExpand:                "הרחב או כווץ פרטי כלי",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "ייצוא תמלול",
    lblExportFilterMd:                      "Markdown",

  },

  ar: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "إلغاء",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "إصدار جديد متوفر:",
    lnkUpdateWhatsNew:                      "ما الجديد",
    btnUpdateDownload:                      "تنزيل",
    lnkUpdateSkip:                          "تخطي هذا الإصدار",
    tipUpdateDismiss:                       "تجاهل",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "فتح الإعدادات",
    tipHdrHelp:                             "مساعدة",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "الإعدادات",
    tabDlgSettingsDisplay:                  "عرض",
    tabDlgSettingsAbout:                    "حول",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "اللغة",
    lblDlgSettingsDisplayTheme:             "المظهر",
    btnDlgSettingsDisplayThemeDark:         "داكن",
    btnDlgSettingsDisplayThemeLight:        "فاتح",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "هو قالب تطبيق yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "الجلسات",
    tipSessionsRefresh:                     "تحديث القائمة",
    plhSessionsFilter:                      "تصفية حسب العنوان أو المسار…",
    lblSessionsActive:                      "نشط",
    lblSessionsArchived:                    "مؤرشف",
    lblSessionsLost:                        "مفقودة",
    tipSessionsLost:                        "لا يوجد إدخال لـ Claude Desktop لهذه الجلسة - فقد عنوانها (على الأرجح خطأ في سطح المكتب). تم استرداد العنوان من الرسالة الأولى.",
    tipSessionsFilterClear:                 "مسح الفلتر",
    tipSessionsFilterActive:                "إظهار أو إخفاء الجلسات النشطة",
    tipSessionsFilterArchived:              "إظهار أو إخفاء الجلسات المؤرشفة",
    tipSessionsFilterLost:                  "إظهار أو إخفاء الجلسات المفقودة",
    tipSessionsFilterSource:                "إظهار أو إخفاء الجلسات من هذا المصدر",
    msgSessionsLoading:                     "جارٍ تحميل الجلسات…",
    msgSessionsEmpty:                       "لم يتم العثور على جلسات",
    msgSessionsError:                       "تعذر قراءة بيانات Claude Desktop",
    lblSessionsCount:                       "جلسات",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "حدد جلسة لعرض نصها المفكك",
    msgTranscriptLoading:                   "جارٍ فك تشفير النص…",
    msgTranscriptError:                     "تعذر فك تشفير هذا النص",
    tipTranscriptReveal:                    "إظهار ملف النص في المجلد",
    tipTranscriptCopy:                      "نسخ كـ Markdown",
    tipTranscriptExport:                    "تصدير كملف Markdown",
    tipTranscriptToolExpand:                "توسيع أو طي تفاصيل الأداة",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "تصدير النص",
    lblExportFilterMd:                      "Markdown",

  },

  fa: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "لغو",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "نسخه جدید موجود است:",
    lnkUpdateWhatsNew:                      "چه خبر",
    btnUpdateDownload:                      "دانلود",
    lnkUpdateSkip:                          "رد کردن این نسخه",
    tipUpdateDismiss:                       "رد کردن",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "باز کردن تنظیمات",
    tipHdrHelp:                             "راهنما",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "تنظیمات",
    tabDlgSettingsDisplay:                  "نمایش",
    tabDlgSettingsAbout:                    "درباره",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "زبان",
    lblDlgSettingsDisplayTheme:             "پوسته",
    btnDlgSettingsDisplayThemeDark:         "تیره",
    btnDlgSettingsDisplayThemeLight:        "روشن",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "یک قالب برنامه yaiol Electron است.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "نشست‌ها",
    tipSessionsRefresh:                     "به‌روزرسانی فهرست",
    plhSessionsFilter:                      "فیلتر بر اساس عنوان یا مسیر…",
    lblSessionsActive:                      "فعال",
    lblSessionsArchived:                    "بایگانی‌شده",
    lblSessionsLost:                        "گمشده",
    tipSessionsLost:                        "هیچ ورودی Claude Desktop برای این جلسه وجود ندارد - عنوان آن گم شده است (احتمالاً یک اشکال در دسکتاپ). عنوان از پیام اول بازیابی شد.",
    tipSessionsFilterClear:                 "پاک کردن فیلتر",
    tipSessionsFilterActive:                "نمایش یا پنهان کردن جلسات فعال",
    tipSessionsFilterArchived:              "نمایش یا پنهان کردن جلسات بایگانی‌شده",
    tipSessionsFilterLost:                  "نمایش یا پنهان کردن جلسات گمشده",
    tipSessionsFilterSource:                "نمایش یا پنهان کردن جلسات از این منبع",
    msgSessionsLoading:                     "در حال بارگذاری جلسات…",
    msgSessionsEmpty:                       "جلسه‌ای یافت نشد",
    msgSessionsError:                       "امکان خواندن داده‌های Claude Desktop وجود نداشت",
    lblSessionsCount:                       "جلسات",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "یک جلسه را برای مشاهده رونوشت رمزگشایی شده آن انتخاب کنید",
    msgTranscriptLoading:                   "در حال رمزگشایی رونوشت…",
    msgTranscriptError:                     "امکان رمزگشایی این رونوشت وجود نداشت",
    tipTranscriptReveal:                    "نمایش فایل رونوشت در پوشه",
    tipTranscriptCopy:                      "کپی به عنوان Markdown",
    tipTranscriptExport:                    "خروجی گرفتن به عنوان فایل Markdown",
    tipTranscriptToolExpand:                "بسط یا جمع کردن جزئیات ابزار",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "خروجی گرفتن از رونوشت",
    lblExportFilterMd:                      "Markdown",

  },

  zh_CN: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "取消",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "新版本可用:",
    lnkUpdateWhatsNew:                      "新功能",
    btnUpdateDownload:                      "下载",
    lnkUpdateSkip:                          "跳过此版本",
    tipUpdateDismiss:                       "忽略",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "打开设置",
    tipHdrHelp:                             "帮助",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "设置",
    tabDlgSettingsDisplay:                  "显示",
    tabDlgSettingsAbout:                    "关于",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "语言",
    lblDlgSettingsDisplayTheme:             "主题",
    btnDlgSettingsDisplayThemeDark:         "深色",
    btnDlgSettingsDisplayThemeLight:        "浅色",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "是一个 yaiol Electron 应用程序模板。",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "会话",
    tipSessionsRefresh:                     "刷新列表",
    plhSessionsFilter:                      "按标题或路径筛选…",
    lblSessionsActive:                      "活跃",
    lblSessionsArchived:                    "已归档",
    lblSessionsLost:                        "已丢失",
    tipSessionsLost:                        "此会话没有 Claude 桌面条目 - 其标题已丢失（可能是桌面错误）。标题已从第一条消息中恢复。",
    tipSessionsFilterClear:                 "清除筛选",
    tipSessionsFilterActive:                "显示或隐藏活跃会话",
    tipSessionsFilterArchived:              "显示或隐藏已归档会话",
    tipSessionsFilterLost:                  "显示或隐藏已丢失的会话",
    tipSessionsFilterSource:                "显示或隐藏此来源的会话",
    msgSessionsLoading:                     "正在加载会话…",
    msgSessionsEmpty:                       "未找到会话",
    msgSessionsError:                       "无法读取 Claude Desktop 数据",
    lblSessionsCount:                       "会话",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "选择一个会话以查看其解码的转录",
    msgTranscriptLoading:                   "正在解码文本…",
    msgTranscriptError:                     "无法解码此文本",
    tipTranscriptReveal:                    "在文件夹中显示文本文件",
    tipTranscriptCopy:                      "复制为 Markdown",
    tipTranscriptExport:                    "导出为 Markdown 文件",
    tipTranscriptToolExpand:                "展开或折叠工具详情",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "导出转录",
    lblExportFilterMd:                      "Markdown",

  },

  zh_TW: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "取消",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "新版本可用:",
    lnkUpdateWhatsNew:                      "新功能",
    btnUpdateDownload:                      "下載",
    lnkUpdateSkip:                          "跳過此版本",
    tipUpdateDismiss:                       "忽略",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "打開設定",
    tipHdrHelp:                             "說明",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "設定",
    tabDlgSettingsDisplay:                  "顯示",
    tabDlgSettingsAbout:                    "關於",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "語言",
    lblDlgSettingsDisplayTheme:             "主題",
    btnDlgSettingsDisplayThemeDark:         "深色",
    btnDlgSettingsDisplayThemeLight:        "淺色",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "是一個 yaiol Electron 應用程式範本。",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "工作階段",
    tipSessionsRefresh:                     "重新整理清單",
    plhSessionsFilter:                      "依標題或路徑篩選…",
    lblSessionsActive:                      "使用中",
    lblSessionsArchived:                    "已封存",
    lblSessionsLost:                        "已遺失",
    tipSessionsLost:                        "此工作階段沒有 Claude 桌面項目 - 其標題已遺失（可能是桌面錯誤）。標題已從第一則訊息中復原。",
    tipSessionsFilterClear:                 "清除篩選",
    tipSessionsFilterActive:                "顯示或隱藏使用中工作階段",
    tipSessionsFilterArchived:              "顯示或隱藏已封存工作階段",
    tipSessionsFilterLost:                  "顯示或隱藏已遺失的工作階段",
    tipSessionsFilterSource:                "顯示或隱藏此來源的工作階段",
    msgSessionsLoading:                     "正在載入工作階段…",
    msgSessionsEmpty:                       "未找到工作階段",
    msgSessionsError:                       "無法讀取 Claude Desktop 資料",
    lblSessionsCount:                       "工作階段",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "選取一個工作階段以檢視其解碼的轉錄",
    msgTranscriptLoading:                   "正在解碼文字…",
    msgTranscriptError:                     "無法解碼此文字",
    tipTranscriptReveal:                    "在資料夾中顯示文字檔案",
    tipTranscriptCopy:                      "複製為 Markdown",
    tipTranscriptExport:                    "匯出為 Markdown 檔案",
    tipTranscriptToolExpand:                "展開或摺疊工具詳細資訊",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "匯出轉錄",
    lblExportFilterMd:                      "Markdown",

  },

  ja: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "キャンセル",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "新しいバージョンが利用可能です:",
    lnkUpdateWhatsNew:                      "新機能",
    btnUpdateDownload:                      "ダウンロード",
    lnkUpdateSkip:                          "このバージョンをスキップ",
    tipUpdateDismiss:                       "閉じる",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "設定を開く",
    tipHdrHelp:                             "ヘルプ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "設定",
    tabDlgSettingsDisplay:                  "表示",
    tabDlgSettingsAbout:                    "概要",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "言語",
    lblDlgSettingsDisplayTheme:             "テーマ",
    btnDlgSettingsDisplayThemeDark:         "ダーク",
    btnDlgSettingsDisplayThemeLight:        "ライト",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "は yaiol Electron アプリのテンプレートです。",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "セッション",
    tipSessionsRefresh:                     "リストを更新",
    plhSessionsFilter:                      "タイトルまたはパスでフィルター…",
    lblSessionsActive:                      "アクティブ",
    lblSessionsArchived:                    "アーカイブ済み",
    lblSessionsLost:                        "失われた",
    tipSessionsLost:                        "このセッションのClaude Desktopエントリがありません - タイトルが失われました（おそらくデスクトップのバグ）。タイトルは最初のメッセージから復元されました。",
    tipSessionsFilterClear:                 "フィルターをクリア",
    tipSessionsFilterActive:                "アクティブなセッションを表示または非表示",
    tipSessionsFilterArchived:              "アーカイブされたセッションを表示または非表示",
    tipSessionsFilterLost:                  "失われたセッションを表示または非表示",
    tipSessionsFilterSource:                "このソースからのセッションを表示または非表示にする",
    msgSessionsLoading:                     "セッションを読み込み中…",
    msgSessionsEmpty:                       "セッションが見つかりません",
    msgSessionsError:                       "Claude Desktop データを読み取れませんでした",
    lblSessionsCount:                       "セッション",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "セッションを選択して、デコードされたトランスクリプトを表示します",
    msgTranscriptLoading:                   "文字起こしをデコード中…",
    msgTranscriptError:                     "この文字起こしをデコードできませんでした",
    tipTranscriptReveal:                    "フォルダーで文字起こしファイルを表示",
    tipTranscriptCopy:                      "Markdownとしてコピー",
    tipTranscriptExport:                    "Markdownファイルとしてエクスポート",
    tipTranscriptToolExpand:                "ツールの詳細を展開または折りたたむ",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "トランスクリプトをエクスポート",
    lblExportFilterMd:                      "Markdown",

  },

  ko: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "취소",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "새 버전 사용 가능:",
    lnkUpdateWhatsNew:                      "새로운 기능",
    btnUpdateDownload:                      "다운로드",
    lnkUpdateSkip:                          "이 버전 건너뛰기",
    tipUpdateDismiss:                       "닫기",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "설정 열기",
    tipHdrHelp:                             "도움말",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "설정",
    tabDlgSettingsDisplay:                  "디스플레이",
    tabDlgSettingsAbout:                    "정보",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "언어",
    lblDlgSettingsDisplayTheme:             "테마",
    btnDlgSettingsDisplayThemeDark:         "어둡게",
    btnDlgSettingsDisplayThemeLight:        "밝게",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "yaiol Electron 앱 템플릿입니다.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "세션",
    tipSessionsRefresh:                     "목록 새로 고침",
    plhSessionsFilter:                      "제목 또는 경로로 필터링…",
    lblSessionsActive:                      "활성",
    lblSessionsArchived:                    "보관됨",
    lblSessionsLost:                        "손실됨",
    tipSessionsLost:                        "이 세션에 대한 Claude Desktop 항목이 없습니다 - 제목이 손실되었습니다 (데스크톱 버그일 가능성 높음). 제목은 첫 번째 메시지에서 복구되었습니다.",
    tipSessionsFilterClear:                 "필터 지우기",
    tipSessionsFilterActive:                "활성 세션 표시 또는 숨기기",
    tipSessionsFilterArchived:              "보관된 세션 표시 또는 숨기기",
    tipSessionsFilterLost:                  "손실된 세션 표시 또는 숨기기",
    tipSessionsFilterSource:                "이 소스의 세션 표시 또는 숨기기",
    msgSessionsLoading:                     "세션 로드 중…",
    msgSessionsEmpty:                       "세션을 찾을 수 없습니다",
    msgSessionsError:                       "Claude Desktop 데이터를 읽을 수 없습니다",
    lblSessionsCount:                       "세션",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "세션을 선택하여 디코딩된 스크립트를 확인하세요",
    msgTranscriptLoading:                   "스크립트 디코딩 중…",
    msgTranscriptError:                     "이 스크립트를 디코딩할 수 없습니다",
    tipTranscriptReveal:                    "폴더에서 스크립트 파일 표시",
    tipTranscriptCopy:                      "Markdown으로 복사",
    tipTranscriptExport:                    "Markdown 파일로 내보내기",
    tipTranscriptToolExpand:                "도구 세부 정보 확장 또는 축소",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "스크립트 내보내기",
    lblExportFilterMd:                      "Markdown",

  },

  vi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Hủy",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Phiên bản mới có sẵn:",
    lnkUpdateWhatsNew:                      "Có gì mới",
    btnUpdateDownload:                      "Tải xuống",
    lnkUpdateSkip:                          "Bỏ qua phiên bản này",
    tipUpdateDismiss:                       "Bỏ qua",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Mở cài đặt",
    tipHdrHelp:                             "Trợ giúp",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Cài đặt",
    tabDlgSettingsDisplay:                  "Hiển thị",
    tabDlgSettingsAbout:                    "Giới thiệu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Ngôn ngữ",
    lblDlgSettingsDisplayTheme:             "Chủ đề",
    btnDlgSettingsDisplayThemeDark:         "Tối",
    btnDlgSettingsDisplayThemeLight:        "Sáng",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "là một mẫu ứng dụng yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Phiên",
    tipSessionsRefresh:                     "Làm mới danh sách",
    plhSessionsFilter:                      "Lọc theo tiêu đề hoặc đường dẫn…",
    lblSessionsActive:                      "Hoạt động",
    lblSessionsArchived:                    "Đã lưu trữ",
    lblSessionsLost:                        "Đã mất",
    tipSessionsLost:                        "Không có mục Claude Desktop cho phiên này - tiêu đề của nó đã bị mất (có thể là lỗi Desktop). Tiêu đề đã được khôi phục từ tin nhắn đầu tiên.",
    tipSessionsFilterClear:                 "Xóa bộ lọc",
    tipSessionsFilterActive:                "Hiển thị hoặc ẩn các phiên hoạt động",
    tipSessionsFilterArchived:              "Hiển thị hoặc ẩn các phiên đã lưu trữ",
    tipSessionsFilterLost:                  "Hiển thị hoặc ẩn các phiên đã mất",
    tipSessionsFilterSource:                "Hiển thị hoặc ẩn các phiên từ nguồn này",
    msgSessionsLoading:                     "Đang tải phiên…",
    msgSessionsEmpty:                       "Không tìm thấy phiên nào",
    msgSessionsError:                       "Không thể đọc dữ liệu Claude Desktop",
    lblSessionsCount:                       "phiên",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Chọn một phiên để xem bản ghi đã giải mã của nó",
    msgTranscriptLoading:                   "Đang giải mã bản ghi…",
    msgTranscriptError:                     "Không thể giải mã bản ghi này",
    tipTranscriptReveal:                    "Hiển thị tệp bản ghi trong thư mục",
    tipTranscriptCopy:                      "Sao chép dưới dạng Markdown",
    tipTranscriptExport:                    "Xuất dưới dạng tệp Markdown",
    tipTranscriptToolExpand:                "Mở rộng hoặc thu gọn chi tiết công cụ",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Xuất bản ghi",
    lblExportFilterMd:                      "Markdown",

  },

  th: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "ยกเลิก",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "มีเวอร์ชันใหม่:",
    lnkUpdateWhatsNew:                      "มีอะไรใหม่",
    btnUpdateDownload:                      "ดาวน์โหลด",
    lnkUpdateSkip:                          "ข้ามเวอร์ชันนี้",
    tipUpdateDismiss:                       "ปิด",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "เปิดการตั้งค่า",
    tipHdrHelp:                             "วิธีใช้",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "การตั้งค่า",
    tabDlgSettingsDisplay:                  "การแสดงผล",
    tabDlgSettingsAbout:                    "เกี่ยวกับ",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ภาษา",
    lblDlgSettingsDisplayTheme:             "ธีม",
    btnDlgSettingsDisplayThemeDark:         "มืด",
    btnDlgSettingsDisplayThemeLight:        "สว่าง",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "เป็นเทมเพลตแอป yaiol Electron",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "เซสชัน",
    tipSessionsRefresh:                     "รีเฟรชรายการ",
    plhSessionsFilter:                      "กรองตามชื่อหรือพาธ…",
    lblSessionsActive:                      "ใช้งานอยู่",
    lblSessionsArchived:                    "เก็บถาวรแล้ว",
    lblSessionsLost:                        "สูญหาย",
    tipSessionsLost:                        "ไม่มีรายการ Claude Desktop สำหรับเซสชันนี้ - ชื่อเรื่องหายไป (อาจเป็นข้อผิดพลาดของ Desktop) ชื่อเรื่องกู้คืนจากข้อความแรกแล้ว",
    tipSessionsFilterClear:                 "ล้างตัวกรอง",
    tipSessionsFilterActive:                "แสดงหรือซ่อนเซสชันที่ใช้งานอยู่",
    tipSessionsFilterArchived:              "แสดงหรือซ่อนเซสชันที่เก็บถาวร",
    tipSessionsFilterLost:                  "แสดงหรือซ่อนเซสชันที่หายไป",
    tipSessionsFilterSource:                "แสดงหรือซ่อนเซสชันจากแหล่งที่มานี้",
    msgSessionsLoading:                     "กำลังโหลดเซสชัน…",
    msgSessionsEmpty:                       "ไม่พบเซสชัน",
    msgSessionsError:                       "ไม่สามารถอ่านข้อมูล Claude Desktop ได้",
    lblSessionsCount:                       "เซสชัน",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "เลือกเซสชันเพื่อดูสคริปต์ที่ถอดรหัสแล้ว",
    msgTranscriptLoading:                   "กำลังถอดรหัสสคริปต์…",
    msgTranscriptError:                     "ไม่สามารถถอดรหัสสคริปต์นี้ได้",
    tipTranscriptReveal:                    "แสดงไฟล์สคริปต์ในโฟลเดอร์",
    tipTranscriptCopy:                      "คัดลอกเป็น Markdown",
    tipTranscriptExport:                    "ส่งออกเป็นไฟล์ Markdown",
    tipTranscriptToolExpand:                "ขยายหรือยุบรายละเอียดเครื่องมือ",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "ส่งออกสคริปต์",
    lblExportFilterMd:                      "Markdown",

  },

  id: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Batal",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versi baru tersedia:",
    lnkUpdateWhatsNew:                      "Apa yang baru",
    btnUpdateDownload:                      "Unduh",
    lnkUpdateSkip:                          "Lewati versi ini",
    tipUpdateDismiss:                       "Abaikan",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Buka pengaturan",
    tipHdrHelp:                             "Bantuan",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Pengaturan",
    tabDlgSettingsDisplay:                  "Tampilan",
    tabDlgSettingsAbout:                    "Tentang",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Bahasa",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Gelap",
    btnDlgSettingsDisplayThemeLight:        "Terang",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "adalah templat aplikasi yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sesi",
    tipSessionsRefresh:                     "Segarkan daftar",
    plhSessionsFilter:                      "Saring berdasarkan judul atau jalur…",
    lblSessionsActive:                      "Aktif",
    lblSessionsArchived:                    "Diarsipkan",
    lblSessionsLost:                        "Hilang",
    tipSessionsLost:                        "Tidak ada entri Claude Desktop untuk sesi ini - judulnya hilang (kemungkinan bug Desktop). Judul dipulihkan dari pesan pertama.",
    tipSessionsFilterClear:                 "Hapus filter",
    tipSessionsFilterActive:                "Tampilkan atau sembunyikan sesi aktif",
    tipSessionsFilterArchived:              "Tampilkan atau sembunyikan sesi yang diarsipkan",
    tipSessionsFilterLost:                  "Tampilkan atau sembunyikan sesi yang hilang",
    tipSessionsFilterSource:                "Tampilkan atau sembunyikan sesi dari sumber ini",
    msgSessionsLoading:                     "Memuat sesi…",
    msgSessionsEmpty:                       "Tidak ada sesi ditemukan",
    msgSessionsError:                       "Tidak dapat membaca data Claude Desktop",
    lblSessionsCount:                       "sesi",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Pilih sesi untuk melihat transkrip yang didekodekan",
    msgTranscriptLoading:                   "Mendekode transkrip…",
    msgTranscriptError:                     "Tidak dapat mendekode transkrip ini",
    tipTranscriptReveal:                    "Tampilkan file transkrip di folder",
    tipTranscriptCopy:                      "Salin sebagai Markdown",
    tipTranscriptExport:                    "Ekspor sebagai file Markdown",
    tipTranscriptToolExpand:                "Perluas atau ciutkan detail alat",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Ekspor transkrip",
    lblExportFilterMd:                      "Markdown",

  },

  ca: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel·la",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versió disponible:",
    lnkUpdateWhatsNew:                      "Novetats",
    btnUpdateDownload:                      "Baixa",
    lnkUpdateSkip:                          "Omet aquesta versió",
    tipUpdateDismiss:                       "Descarta",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Obre la configuració",
    tipHdrHelp:                             "Ajuda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configuració",
    tabDlgSettingsDisplay:                  "Visualització",
    tabDlgSettingsAbout:                    "Quant a",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Fosc",
    btnDlgSettingsDisplayThemeLight:        "Clar",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "és una plantilla d'aplicació yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sessions",
    tipSessionsRefresh:                     "Actualitzar llista",
    plhSessionsFilter:                      "Filtra per títol o ruta…",
    lblSessionsActive:                      "Actiu",
    lblSessionsArchived:                    "Arxivats",
    lblSessionsLost:                        "Perdudes",
    tipSessionsLost:                        "No hi ha cap entrada de Claude Desktop per a aquesta sessió - el seu títol es va perdre (probablement un error de l'escriptori). Títol recuperat del primer missatge.",
    tipSessionsFilterClear:                 "Esborra el filtre",
    tipSessionsFilterActive:                "Mostra o amaga les sessions actives",
    tipSessionsFilterArchived:              "Mostra o amaga les sessions arxivades",
    tipSessionsFilterLost:                  "Mostra o amaga les sessions perdudes",
    tipSessionsFilterSource:                "Mostra o amaga les sessions d'aquesta font",
    msgSessionsLoading:                     "Carregant sessions…",
    msgSessionsEmpty:                       "No s'han trobat sessions",
    msgSessionsError:                       "No s'han pogut llegir les dades de Claude Desktop",
    lblSessionsCount:                       "sessions",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Seleccioneu una sessió per veure la seva transcripció descodificada",
    msgTranscriptLoading:                   "Descodificant transcripció…",
    msgTranscriptError:                     "No s'ha pogut descodificar aquesta transcripció",
    tipTranscriptReveal:                    "Mostra el fitxer de transcripció a la carpeta",
    tipTranscriptCopy:                      "Copia com a Markdown",
    tipTranscriptExport:                    "Exporta com a fitxer Markdown",
    tipTranscriptToolExpand:                "Expandeix o contrau els detalls de l'eina",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Exporta la transcripció",
    lblExportFilterMd:                      "Markdown",

  },

  cs: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Zrušit",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nová verze je k dispozici:",
    lnkUpdateWhatsNew:                      "Co je nového",
    btnUpdateDownload:                      "Stáhnout",
    lnkUpdateSkip:                          "Přeskočit tuto verzi",
    tipUpdateDismiss:                       "Zavřít",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Otevřít nastavení",
    tipHdrHelp:                             "Nápověda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nastavení",
    tabDlgSettingsDisplay:                  "Zobrazení",
    tabDlgSettingsAbout:                    "O aplikaci",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jazyk",
    lblDlgSettingsDisplayTheme:             "Motiv",
    btnDlgSettingsDisplayThemeDark:         "Tmavý",
    btnDlgSettingsDisplayThemeLight:        "Světlý",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "je šablona aplikace yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Relace",
    tipSessionsRefresh:                     "Obnovit seznam",
    plhSessionsFilter:                      "Filtrovat podle názvu nebo cesty…",
    lblSessionsActive:                      "Aktivní",
    lblSessionsArchived:                    "Archivováno",
    lblSessionsLost:                        "Ztracené",
    tipSessionsLost:                        "Pro tuto relaci neexistuje záznam Claude Desktop - její název byl ztracen (pravděpodobně chyba Desktopu). Název byl obnoven z první zprávy.",
    tipSessionsFilterClear:                 "Vymazat filtr",
    tipSessionsFilterActive:                "Zobrazit nebo skrýt aktivní relace",
    tipSessionsFilterArchived:              "Zobrazit nebo skrýt archivované relace",
    tipSessionsFilterLost:                  "Zobrazit nebo skrýt ztracené relace",
    tipSessionsFilterSource:                "Zobrazit nebo skrýt relace z tohoto zdroje",
    msgSessionsLoading:                     "Načítání relací…",
    msgSessionsEmpty:                       "Nebyly nalezeny žádné relace",
    msgSessionsError:                       "Nepodařilo se přečíst data Claude Desktop",
    lblSessionsCount:                       "relace",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Vyberte relaci pro zobrazení jejího dekódovaného přepisu",
    msgTranscriptLoading:                   "Dekóduji přepis…",
    msgTranscriptError:                     "Nepodařilo se dekódovat tento přepis",
    tipTranscriptReveal:                    "Zobrazit soubor přepisu ve složce",
    tipTranscriptCopy:                      "Kopírovat jako Markdown",
    tipTranscriptExport:                    "Exportovat jako soubor Markdown",
    tipTranscriptToolExpand:                "Rozbalit nebo sbalit podrobnosti nástroje",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Exportovat přepis",
    lblExportFilterMd:                      "Markdown",

  },

  da: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Annuller",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny version tilgængelig:",
    lnkUpdateWhatsNew:                      "Hvad er nyt",
    btnUpdateDownload:                      "Download",
    lnkUpdateSkip:                          "Spring denne version over",
    tipUpdateDismiss:                       "Afvis",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Åbn indstillinger",
    tipHdrHelp:                             "Hjælp",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Indstillinger",
    tabDlgSettingsDisplay:                  "Skærm",
    tabDlgSettingsAbout:                    "Om",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Sprog",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Mørk",
    btnDlgSettingsDisplayThemeLight:        "Lys",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "er en yaiol Electron app-skabelon.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sessioner",
    tipSessionsRefresh:                     "Opdater liste",
    plhSessionsFilter:                      "Filtrer efter titel eller sti…",
    lblSessionsActive:                      "Aktiv",
    lblSessionsArchived:                    "Arkiveret",
    lblSessionsLost:                        "Mistede",
    tipSessionsLost:                        "Ingen Claude Desktop-post for denne session - dens titel gik tabt (sandsynligvis en Desktop-fejl). Titel genoprettet fra den første besked.",
    tipSessionsFilterClear:                 "Ryd filter",
    tipSessionsFilterActive:                "Vis eller skjul aktive sessioner",
    tipSessionsFilterArchived:              "Vis eller skjul arkiverede sessioner",
    tipSessionsFilterLost:                  "Vis eller skjul mistede sessioner",
    tipSessionsFilterSource:                "Vis eller skjul sessioner fra denne kilde",
    msgSessionsLoading:                     "Indlæser sessioner…",
    msgSessionsEmpty:                       "Ingen sessioner fundet",
    msgSessionsError:                       "Kunne ikke læse Claude Desktop-data",
    lblSessionsCount:                       "sessioner",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Vælg en session for at se dens afkodede transkription",
    msgTranscriptLoading:                   "Afkoder transskript…",
    msgTranscriptError:                     "Kunne ikke afkode dette transskript",
    tipTranscriptReveal:                    "Vis transskriptfil i mappe",
    tipTranscriptCopy:                      "Kopier som Markdown",
    tipTranscriptExport:                    "Eksporter som Markdown-fil",
    tipTranscriptToolExpand:                "Udvid eller skjul værktøjsdetaljer",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Eksporter transskription",
    lblExportFilterMd:                      "Markdown",

  },

  fi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Peruuta",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Uusi versio saatavilla:",
    lnkUpdateWhatsNew:                      "Mitä uutta",
    btnUpdateDownload:                      "Lataa",
    lnkUpdateSkip:                          "Ohita tämä versio",
    tipUpdateDismiss:                       "Hylkää",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Avaa asetukset",
    tipHdrHelp:                             "Ohje",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Asetukset",
    tabDlgSettingsDisplay:                  "Näyttö",
    tabDlgSettingsAbout:                    "Tietoja",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Kieli",
    lblDlgSettingsDisplayTheme:             "Teema",
    btnDlgSettingsDisplayThemeDark:         "Tumma",
    btnDlgSettingsDisplayThemeLight:        "Vaalea",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "on yaiol Electron -sovelluspohja.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Istunnot",
    tipSessionsRefresh:                     "Päivitä luettelo",
    plhSessionsFilter:                      "Suodata otsikon tai polun mukaan…",
    lblSessionsActive:                      "Aktiivinen",
    lblSessionsArchived:                    "Arkistoitu",
    lblSessionsLost:                        "Kadonneet",
    tipSessionsLost:                        "Tälle istunnolle ei ole Claude Desktop -merkintää - sen otsikko katosi (todennäköisesti työpöytävirhe). Otsikko palautettu ensimmäisestä viestistä.",
    tipSessionsFilterClear:                 "Tyhjennä suodatin",
    tipSessionsFilterActive:                "Näytä tai piilota aktiiviset istunnot",
    tipSessionsFilterArchived:              "Näytä tai piilota arkistoidut istunnot",
    tipSessionsFilterLost:                  "Näytä tai piilota kadonneet istunnot",
    tipSessionsFilterSource:                "Näytä tai piilota istunnot tästä lähteestä",
    msgSessionsLoading:                     "Ladataan istuntoja…",
    msgSessionsEmpty:                       "Istuntoja ei löytynyt",
    msgSessionsError:                       "Claude Desktop -tietoja ei voitu lukea",
    lblSessionsCount:                       "istunnot",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Valitse istunto nähdäksesi sen dekoodatun transkriptin",
    msgTranscriptLoading:                   "Purkaa litterointia…",
    msgTranscriptError:                     "Litterointia ei voitu purkaa",
    tipTranscriptReveal:                    "Näytä litterointitiedosto kansiossa",
    tipTranscriptCopy:                      "Kopioi Markdownina",
    tipTranscriptExport:                    "Vie Markdown-tiedostona",
    tipTranscriptToolExpand:                "Laajenna tai kutista työkalun tiedot",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Vie transkripti",
    lblExportFilterMd:                      "Markdown",

  },

  ms: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Batal",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versi baharu tersedia:",
    lnkUpdateWhatsNew:                      "Apa yang baharu",
    btnUpdateDownload:                      "Muat turun",
    lnkUpdateSkip:                          "Langkau versi ini",
    tipUpdateDismiss:                       "Abaikan",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Buka tetapan",
    tipHdrHelp:                             "Bantuan",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Tetapan",
    tabDlgSettingsDisplay:                  "Paparan",
    tabDlgSettingsAbout:                    "Mengenai",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Bahasa",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Gelap",
    btnDlgSettingsDisplayThemeLight:        "Cerah",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ialah templat aplikasi yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sesi",
    tipSessionsRefresh:                     "Segarkan senarai",
    plhSessionsFilter:                      "Tapis mengikut tajuk atau laluan…",
    lblSessionsActive:                      "Aktif",
    lblSessionsArchived:                    "Diarkibkan",
    lblSessionsLost:                        "Hilang",
    tipSessionsLost:                        "Tiada entri Claude Desktop untuk sesi ini - tajuknya hilang (kemungkinan pepijat Desktop). Tajuk dipulihkan daripada mesej pertama.",
    tipSessionsFilterClear:                 "Kosongkan penapis",
    tipSessionsFilterActive:                "Tunjuk atau sembunyikan sesi aktif",
    tipSessionsFilterArchived:              "Tunjuk atau sembunyikan sesi diarkibkan",
    tipSessionsFilterLost:                  "Tunjuk atau sembunyi sesi yang hilang",
    tipSessionsFilterSource:                "Tunjukkan atau sembunyikan sesi dari sumber ini",
    msgSessionsLoading:                     "Memuatkan sesi…",
    msgSessionsEmpty:                       "Tiada sesi ditemui",
    msgSessionsError:                       "Tidak dapat membaca data Claude Desktop",
    lblSessionsCount:                       "sesi",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Pilih sesi untuk melihat transkrip yang dinyahkod",
    msgTranscriptLoading:                   "Menyahkod transkrip…",
    msgTranscriptError:                     "Tidak dapat menyahkod transkrip ini",
    tipTranscriptReveal:                    "Tunjukkan fail transkrip dalam folder",
    tipTranscriptCopy:                      "Salin sebagai Markdown",
    tipTranscriptExport:                    "Eksport sebagai fail Markdown",
    tipTranscriptToolExpand:                "Kembangkan atau runtuhkan butiran alat",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Eksport transkrip",
    lblExportFilterMd:                      "Markdown",

  },

  hy: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Չեղարկել",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Նոր տարբերակ հասանելի է:",
    lnkUpdateWhatsNew:                      "Ինչ նորություն կա",
    btnUpdateDownload:                      "Ներբեռնել",
    lnkUpdateSkip:                          "Բաց թողնել այս տարբերակը",
    tipUpdateDismiss:                       "Մերժել",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Բացել կարգավորումները",
    tipHdrHelp:                             "Օգնություն",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Կարգավորումներ",
    tabDlgSettingsDisplay:                  "Ցուցադրում",
    tabDlgSettingsAbout:                    "Ծրագրի մասին",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Լեզու",
    lblDlgSettingsDisplayTheme:             "Թեմա",
    btnDlgSettingsDisplayThemeDark:         "Մուգ",
    btnDlgSettingsDisplayThemeLight:        "Բաց",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "yaiol Electron հավելվածի ձևանմուշ է։",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Սեսիաներ",
    tipSessionsRefresh:                     "Թարմացնել ցուցակը",
    plhSessionsFilter:                      "Զտել ըստ վերնագրի կամ ուղու…",
    lblSessionsActive:                      "Ակտիվ",
    lblSessionsArchived:                    "Արխիվացված",
    lblSessionsLost:                        "Կորած",
    tipSessionsLost:                        "Այս նիստի համար Claude Desktop մուտք չկա - դրա վերնագիրը կորել է (հավանաբար Desktop-ի սխալ): Վերնագիրը վերականգնվել է առաջին հաղորդագրությունից:",
    tipSessionsFilterClear:                 "Մաքրել զտիչը",
    tipSessionsFilterActive:                "Ցուցադրել կամ թաքցնել ակտիվ նիստերը",
    tipSessionsFilterArchived:              "Ցուցադրել կամ թաքցնել արխիվացված նիստերը",
    tipSessionsFilterLost:                  "Ցույց տալ կամ թաքցնել կորած նիստերը",
    tipSessionsFilterSource:                "Ցուցադրել կամ թաքցնել նիստերը այս աղբյուրից",
    msgSessionsLoading:                     "Նիստերը բեռնվում են…",
    msgSessionsEmpty:                       "Նիստեր չեն գտնվել",
    msgSessionsError:                       "Հնարավոր չէ կարդալ Claude Desktop-ի տվյալները",
    lblSessionsCount:                       "նիստեր",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Ընտրեք նիստ՝ դրա վերծանված արտագրությունը դիտելու համար",
    msgTranscriptLoading:                   "Գրառումը վերծանվում է…",
    msgTranscriptError:                     "Չհաջողվեց վերծանել այս գրառումը",
    tipTranscriptReveal:                    "Ցույց տալ գրառման ֆայլը թղթապանակում",
    tipTranscriptCopy:                      "Պատճենել որպես Markdown",
    tipTranscriptExport:                    "Արտահանել որպես Markdown ֆայլ",
    tipTranscriptToolExpand:                "Ընդլայնել կամ ծալել գործիքի մանրամասները",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Արտահանել արտագրությունը",
    lblExportFilterMd:                      "Markdown",

  },

  bg: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Отказ",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Налична е нова версия:",
    lnkUpdateWhatsNew:                      "Какво ново",
    btnUpdateDownload:                      "Изтегли",
    lnkUpdateSkip:                          "Пропусни тази версия",
    tipUpdateDismiss:                       "Отхвърли",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Отвори настройки",
    tipHdrHelp:                             "Помощ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Настройки",
    tabDlgSettingsDisplay:                  "Показване",
    tabDlgSettingsAbout:                    "Относно",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Език",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тъмен",
    btnDlgSettingsDisplayThemeLight:        "Светъл",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "е шаблон за приложение yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Сесии",
    tipSessionsRefresh:                     "Обнови списъка",
    plhSessionsFilter:                      "Филтриране по заглавие или път…",
    lblSessionsActive:                      "Активни",
    lblSessionsArchived:                    "Архивирани",
    lblSessionsLost:                        "Изгубени",
    tipSessionsLost:                        "Няма запис на Claude Desktop за тази сесия - заглавието й беше изгубено (вероятно грешка на Desktop). Заглавието е възстановено от първото съобщение.",
    tipSessionsFilterClear:                 "Изчисти филтъра",
    tipSessionsFilterActive:                "Показване или скриване на активни сесии",
    tipSessionsFilterArchived:              "Показване или скриване на архивирани сесии",
    tipSessionsFilterLost:                  "Показване или скриване на изгубени сесии",
    tipSessionsFilterSource:                "Показване или скриване на сесии от този източник",
    msgSessionsLoading:                     "Зареждане на сесии…",
    msgSessionsEmpty:                       "Няма намерени сесии",
    msgSessionsError:                       "Не може да се прочетат данните на Claude Desktop",
    lblSessionsCount:                       "сесии",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Изберете сесия, за да видите нейния декодиран препис",
    msgTranscriptLoading:                   "Декодиране на препис…",
    msgTranscriptError:                     "Не може да се декодира този препис",
    tipTranscriptReveal:                    "Покажи файла с препис в папката",
    tipTranscriptCopy:                      "Копирай като Markdown",
    tipTranscriptExport:                    "Експортиране като Markdown файл",
    tipTranscriptToolExpand:                "Разгъване или свиване на подробностите за инструмента",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Експортиране на препис",
    lblExportFilterMd:                      "Markdown",

  },

  gl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancelar",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versión dispoñible:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Descargar",
    lnkUpdateSkip:                          "Omitir esta versión",
    tipUpdateDismiss:                       "Descartar",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Abrir configuración",
    tipHdrHelp:                             "Axuda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configuración",
    tabDlgSettingsDisplay:                  "Visualización",
    tabDlgSettingsAbout:                    "Acerca de",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "é un modelo de aplicación yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sesións",
    tipSessionsRefresh:                     "Actualizar lista",
    plhSessionsFilter:                      "Filtrar por título ou ruta…",
    lblSessionsActive:                      "Activo",
    lblSessionsArchived:                    "Arquivado",
    lblSessionsLost:                        "Perdidas",
    tipSessionsLost:                        "Non hai entrada de Claude Desktop para esta sesión - o seu título perdeuse (probablemente un erro do Escritorio). Título recuperado da primeira mensaxe.",
    tipSessionsFilterClear:                 "Borrar filtro",
    tipSessionsFilterActive:                "Mostrar ou ocultar sesións activas",
    tipSessionsFilterArchived:              "Mostrar ou ocultar sesións arquivadas",
    tipSessionsFilterLost:                  "Mostrar ou ocultar sesións perdidas",
    tipSessionsFilterSource:                "Mostrar ou ocultar sesións desta orixe",
    msgSessionsLoading:                     "Cargando sesións…",
    msgSessionsEmpty:                       "Non se atoparon sesións",
    msgSessionsError:                       "Non se puideron ler os datos de Claude Desktop",
    lblSessionsCount:                       "sesións",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Seleccione unha sesión para ver a súa transcrición decodificada",
    msgTranscriptLoading:                   "Decodificando transcrición…",
    msgTranscriptError:                     "Non se puido decodificar esta transcrición",
    tipTranscriptReveal:                    "Mostrar ficheiro de transcrición no cartafol",
    tipTranscriptCopy:                      "Copiar como Markdown",
    tipTranscriptExport:                    "Exportar como ficheiro Markdown",
    tipTranscriptToolExpand:                "Expandir ou contraer os detalles da ferramenta",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Exportar transcrición",
    lblExportFilterMd:                      "Markdown",

  },

  hu: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Mégse",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Új verzió elérhető:",
    lnkUpdateWhatsNew:                      "Újdonságok",
    btnUpdateDownload:                      "Letöltés",
    lnkUpdateSkip:                          "Verzió kihagyása",
    tipUpdateDismiss:                       "Elvetés",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Beállítások megnyitása",
    tipHdrHelp:                             "Súgó",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Beállítások",
    tabDlgSettingsDisplay:                  "Megjelenítés",
    tabDlgSettingsAbout:                    "Névjegy",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Nyelv",
    lblDlgSettingsDisplayTheme:             "Téma",
    btnDlgSettingsDisplayThemeDark:         "Sötét",
    btnDlgSettingsDisplayThemeLight:        "Világos",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "egy yaiol Electron alkalmazássablon.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Munkamenetek",
    tipSessionsRefresh:                     "Lista frissítése",
    plhSessionsFilter:                      "Szűrés cím vagy elérési út alapján…",
    lblSessionsActive:                      "Aktív",
    lblSessionsArchived:                    "Archivált",
    lblSessionsLost:                        "Elveszett",
    tipSessionsLost:                        "Nincs Claude Desktop bejegyzés ehhez a munkamenethez - a címe elveszett (valószínűleg asztali hiba). A cím az első üzenetből lett helyreállítva.",
    tipSessionsFilterClear:                 "Szűrő törlése",
    tipSessionsFilterActive:                "Aktív munkamenetek megjelenítése vagy elrejtése",
    tipSessionsFilterArchived:              "Archivált munkamenetek megjelenítése vagy elrejtése",
    tipSessionsFilterLost:                  "Elveszett munkamenetek megjelenítése vagy elrejtése",
    tipSessionsFilterSource:                "Munkamenetek megjelenítése vagy elrejtése ebből a forrásból",
    msgSessionsLoading:                     "Munkamenetek betöltése…",
    msgSessionsEmpty:                       "Nincsenek munkamenetek",
    msgSessionsError:                       "Nem sikerült olvasni a Claude Desktop adatokat",
    lblSessionsCount:                       "munkamenetek",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Válasszon ki egy munkamenetet a dekódolt átirat megtekintéséhez",
    msgTranscriptLoading:                   "Átirat dekódolása…",
    msgTranscriptError:                     "Nem sikerült dekódolni az átiratot",
    tipTranscriptReveal:                    "Átiratfájl megjelenítése mappában",
    tipTranscriptCopy:                      "Másolás Markdownként",
    tipTranscriptExport:                    "Exportálás Markdown fájlként",
    tipTranscriptToolExpand:                "Eszköz részleteinek kibontása vagy összecsukása",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Átirat exportálása",
    lblExportFilterMd:                      "Markdown",

  },

  lt: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Atšaukti",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Yra nauja versija:",
    lnkUpdateWhatsNew:                      "Kas naujo",
    btnUpdateDownload:                      "Atsisiųsti",
    lnkUpdateSkip:                          "Praleisti šią versiją",
    tipUpdateDismiss:                       "Atmesti",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Atidaryti nustatymus",
    tipHdrHelp:                             "Pagalba",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nustatymai",
    tabDlgSettingsDisplay:                  "Rodymas",
    tabDlgSettingsAbout:                    "Apie",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Kalba",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Tamsus",
    btnDlgSettingsDisplayThemeLight:        "Šviesus",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "yra yaiol Electron programos šablonas.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Sesijos",
    tipSessionsRefresh:                     "Atnaujinti sąrašą",
    plhSessionsFilter:                      "Filtruoti pagal pavadinimą ar kelią…",
    lblSessionsActive:                      "Aktyvus",
    lblSessionsArchived:                    "Archyvuota",
    lblSessionsLost:                        "Prarastos",
    tipSessionsLost:                        "Nėra Claude Desktop įrašo šiai sesijai - jos pavadinimas buvo prarastas (tikėtina, Desktop klaida). Pavadinimas atkurtas iš pirmojo pranešimo.",
    tipSessionsFilterClear:                 "Išvalyti filtrą",
    tipSessionsFilterActive:                "Rodyti arba slėpti aktyvius seansus",
    tipSessionsFilterArchived:              "Rodyti arba slėpti archyvuotus seansus",
    tipSessionsFilterLost:                  "Rodyti arba slėpti prarastas sesijas",
    tipSessionsFilterSource:                "Rodyti arba slėpti seansus iš šio šaltinio",
    msgSessionsLoading:                     "Įkeliamos sesijos…",
    msgSessionsEmpty:                       "Sesijų nerasta",
    msgSessionsError:                       "Nepavyko nuskaityti Claude Desktop duomenų",
    lblSessionsCount:                       "sesijos",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Pasirinkite sesiją, kad peržiūrėtumėte jos iššifruotą stenogramą",
    msgTranscriptLoading:                   "Dekoduojamas nuorašas…",
    msgTranscriptError:                     "Nepavyko dekoduoti šio nuorašo",
    tipTranscriptReveal:                    "Rodyti nuorašo failą aplanke",
    tipTranscriptCopy:                      "Kopijuoti kaip Markdown",
    tipTranscriptExport:                    "Eksportuoti kaip Markdown failą",
    tipTranscriptToolExpand:                "Išskleisti arba sutraukti įrankio detales",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Eksportuoti transkripciją",
    lblExportFilterMd:                      "Markdown",

  },

  mk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Откажи",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Достапна е нова верзија:",
    lnkUpdateWhatsNew:                      "Што е ново",
    btnUpdateDownload:                      "Преземи",
    lnkUpdateSkip:                          "Прескокни ја оваа верзија",
    tipUpdateDismiss:                       "Отфрли",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Отвори поставки",
    tipHdrHelp:                             "Помош",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Поставки",
    tabDlgSettingsDisplay:                  "Приказ",
    tabDlgSettingsAbout:                    "За програмата",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Јазик",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Темно",
    btnDlgSettingsDisplayThemeLight:        "Светло",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "е шаблон за апликација yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Сесии",
    tipSessionsRefresh:                     "Освежи листа",
    plhSessionsFilter:                      "Филтрирај по наслов или патека…",
    lblSessionsActive:                      "Активно",
    lblSessionsArchived:                    "Архивирано",
    lblSessionsLost:                        "Изгубени",
    tipSessionsLost:                        "Нема запис на Claude Desktop за оваа сесија - нејзиниот наслов беше изгубен (веројатно грешка на Desktop). Насловот е обновен од првата порака.",
    tipSessionsFilterClear:                 "Исчисти филтер",
    tipSessionsFilterActive:                "Прикажи или скриј активни сесии",
    tipSessionsFilterArchived:              "Прикажи или скриј архивирани сесии",
    tipSessionsFilterLost:                  "Прикажи или скриј изгубени сесии",
    tipSessionsFilterSource:                "Прикажи или скриј сесии од овој извор",
    msgSessionsLoading:                     "Вчитување сесии…",
    msgSessionsEmpty:                       "Не се пронајдени сесии",
    msgSessionsError:                       "Не може да се прочитаат податоците на Claude Desktop",
    lblSessionsCount:                       "сесии",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Изберете сесија за да го видите нејзиниот декодиран транскрипт",
    msgTranscriptLoading:                   "Декодирање на транскрипт…",
    msgTranscriptError:                     "Не можеше да се декодира овој транскрипт",
    tipTranscriptReveal:                    "Прикажи ја датотеката со транскрипт во папката",
    tipTranscriptCopy:                      "Копирај како Markdown",
    tipTranscriptExport:                    "Извези како Markdown датотека",
    tipTranscriptToolExpand:                "Прошири или стесни детали за алатката",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Извези транскрипт",
    lblExportFilterMd:                      "Markdown",

  },

  sr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Откажи",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна је нова верзија:",
    lnkUpdateWhatsNew:                      "Шта је ново",
    btnUpdateDownload:                      "Преузми",
    lnkUpdateSkip:                          "Прескочи ову верзију",
    tipUpdateDismiss:                       "Одбаци",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Отвори подешавања",
    tipHdrHelp:                             "Помоћ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Подешавања",
    tabDlgSettingsDisplay:                  "Приказ",
    tabDlgSettingsAbout:                    "О програму",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Језик",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тамно",
    btnDlgSettingsDisplayThemeLight:        "Светло",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "је шаблон yaiol Electron апликације.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Сесије",
    tipSessionsRefresh:                     "Освежи листу",
    plhSessionsFilter:                      "Филтрирај по наслову или путањи…",
    lblSessionsActive:                      "Активно",
    lblSessionsArchived:                    "Архивирано",
    lblSessionsLost:                        "Изгубљене",
    tipSessionsLost:                        "Нема Claude Desktop уноса за ову сесију - њен наслов је изгубљен (вероватно грешка Desktop-а). Наслов је опорављен из прве поруке.",
    tipSessionsFilterClear:                 "Обриши филтер",
    tipSessionsFilterActive:                "Prikaži ili sakrij aktivne sesije",
    tipSessionsFilterArchived:              "Prikaži ili sakrij arhivirane sesije",
    tipSessionsFilterLost:                  "Прикажи или сакриј изгубљене сесије",
    tipSessionsFilterSource:                "Прикажи или сакриј сесије из овог извора",
    msgSessionsLoading:                     "Учитавање сесија…",
    msgSessionsEmpty:                       "Није пронађена ниједна сесија",
    msgSessionsError:                       "Није могуће прочитати податке Claude Desktop-а",
    lblSessionsCount:                       "сесије",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Изаберите сесију да бисте видели њен декодирани транскрипт",
    msgTranscriptLoading:                   "Декодирање транскрипта…",
    msgTranscriptError:                     "Није могуће декодирати овај транскрипт",
    tipTranscriptReveal:                    "Прикажи датотеку транскрипта у фасцикли",
    tipTranscriptCopy:                      "Копирај као Markdown",
    tipTranscriptExport:                    "Извези као Markdown датотеку",
    tipTranscriptToolExpand:                "Прошири или скупи детаље алата",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Извези транскрипт",
    lblExportFilterMd:                      "Markdown",

  },

  sk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Zrušiť",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "K dispozícii je nová verzia:",
    lnkUpdateWhatsNew:                      "Čo je nové",
    btnUpdateDownload:                      "Stiahnuť",
    lnkUpdateSkip:                          "Preskočiť túto verziu",
    tipUpdateDismiss:                       "Zavrieť",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Otvoriť nastavenia",
    tipHdrHelp:                             "Pomoc",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nastavenia",
    tabDlgSettingsDisplay:                  "Zobrazenie",
    tabDlgSettingsAbout:                    "O aplikácii",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jazyk",
    lblDlgSettingsDisplayTheme:             "Téma",
    btnDlgSettingsDisplayThemeDark:         "Tmavý",
    btnDlgSettingsDisplayThemeLight:        "Svetlý",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "je šablóna aplikácie yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Relácie",
    tipSessionsRefresh:                     "Obnoviť zoznam",
    plhSessionsFilter:                      "Filtrovať podľa názvu alebo cesty…",
    lblSessionsActive:                      "Aktívne",
    lblSessionsArchived:                    "Archivované",
    lblSessionsLost:                        "Stratené",
    tipSessionsLost:                        "Pre túto reláciu neexistuje záznam Claude Desktop - jej názov bol stratený (pravdepodobne chyba Desktopu). Názov bol obnovený z prvej správy.",
    tipSessionsFilterClear:                 "Vymazať filter",
    tipSessionsFilterActive:                "Zobraziť alebo skryť aktívne relácie",
    tipSessionsFilterArchived:              "Zobraziť alebo skryť archivované relácie",
    tipSessionsFilterLost:                  "Zobraziť alebo skryť stratené relácie",
    tipSessionsFilterSource:                "Zobraziť alebo skryť relácie z tohto zdroja",
    msgSessionsLoading:                     "Načítavanie relácií…",
    msgSessionsEmpty:                       "Nenašli sa žiadne relácie",
    msgSessionsError:                       "Nepodarilo sa prečítať dáta Claude Desktop",
    lblSessionsCount:                       "relácie",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Vyberte reláciu pre zobrazenie jej dekódovaného prepisu",
    msgTranscriptLoading:                   "Dekódujem prepis…",
    msgTranscriptError:                     "Nepodarilo sa dekódovať tento prepis",
    tipTranscriptReveal:                    "Zobraziť súbor prepisu v priečinku",
    tipTranscriptCopy:                      "Kopírovať ako Markdown",
    tipTranscriptExport:                    "Exportovať ako súbor Markdown",
    tipTranscriptToolExpand:                "Rozbaliť alebo zbaliť podrobnosti nástroja",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Exportovať prepis",
    lblExportFilterMd:                      "Markdown",

  },

  sl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Prekliči",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Na voljo je nova različica:",
    lnkUpdateWhatsNew:                      "Kaj je novega",
    btnUpdateDownload:                      "Prenesi",
    lnkUpdateSkip:                          "Preskoči to različico",
    tipUpdateDismiss:                       "Zavrni",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Odpri nastavitve",
    tipHdrHelp:                             "Pomoč",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nastavitve",
    tabDlgSettingsDisplay:                  "Prikaz",
    tabDlgSettingsAbout:                    "O programu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jezik",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Temno",
    btnDlgSettingsDisplayThemeLight:        "Svetlo",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "je predloga aplikacije yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Seje",
    tipSessionsRefresh:                     "Osveži seznam",
    plhSessionsFilter:                      "Filtriraj po naslovu ali poti…",
    lblSessionsActive:                      "Aktivno",
    lblSessionsArchived:                    "Arhivirano",
    lblSessionsLost:                        "Izgubljene",
    tipSessionsLost:                        "Ni vnosa Claude Desktop za to sejo - njen naslov je bil izgubljen (verjetno napaka namizja). Naslov je bil obnovljen iz prvega sporočila.",
    tipSessionsFilterClear:                 "Počisti filter",
    tipSessionsFilterActive:                "Prikaži ali skrij aktivne seje",
    tipSessionsFilterArchived:              "Prikaži ali skrij arhivirane seje",
    tipSessionsFilterLost:                  "Prikaži ali skrij izgubljene seje",
    tipSessionsFilterSource:                "Prikaži ali skrij seje iz tega vira",
    msgSessionsLoading:                     "Nalaganje sej…",
    msgSessionsEmpty:                       "Ni najdenih sej",
    msgSessionsError:                       "Ni bilo mogoče prebrati podatkov Claude Desktop",
    lblSessionsCount:                       "seje",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Izberite sejo za ogled njenega dekodiranega prepisa",
    msgTranscriptLoading:                   "Dekodiranje prepisa…",
    msgTranscriptError:                     "Ni bilo mogoče dekodirati tega prepisa",
    tipTranscriptReveal:                    "Prikaži datoteko prepisa v mapi",
    tipTranscriptCopy:                      "Kopiraj kot Markdown",
    tipTranscriptExport:                    "Izvozi kot datoteko Markdown",
    tipTranscriptToolExpand:                "Razširi ali strni podrobnosti orodja",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Izvozi prepis",
    lblExportFilterMd:                      "Markdown",

  },

  ta: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "ரத்துசெய்",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "புதிய பதிப்பு உள்ளது:",
    lnkUpdateWhatsNew:                      "புதியது என்ன",
    btnUpdateDownload:                      "பதிவிறக்கு",
    lnkUpdateSkip:                          "இந்த பதிப்பைத் தவிர்க்கவும்",
    tipUpdateDismiss:                       "நிராகரி",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "அமைப்புகளைத் திற",
    tipHdrHelp:                             "உதவி",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "அமைப்புகள்",
    tabDlgSettingsDisplay:                  "காட்சி",
    tabDlgSettingsAbout:                    "பற்றி",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "மொழி",
    lblDlgSettingsDisplayTheme:             "தீம்",
    btnDlgSettingsDisplayThemeDark:         "இருண்ட",
    btnDlgSettingsDisplayThemeLight:        "வெளிச்சம்",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ஒரு yaiol Electron பயன்பாட்டு டெம்ப்ளேட் ஆகும்.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "அமர்வுகள்",
    tipSessionsRefresh:                     "பட்டியலைப் புதுப்பிக்கவும்",
    plhSessionsFilter:                      "தலைப்பு அல்லது பாதை மூலம் வடிகட்டவும்…",
    lblSessionsActive:                      "செயலில்",
    lblSessionsArchived:                    "காப்பகப்படுத்தப்பட்டது",
    lblSessionsLost:                        "இழந்தவை",
    tipSessionsLost:                        "இந்த அமர்வுக்கு Claude Desktop பதிவு இல்லை - அதன் தலைப்பு தொலைந்துவிட்டது (டெஸ்க்டாப் பிழையாக இருக்கலாம்). முதல் செய்தியிலிருந்து தலைப்பு மீட்கப்பட்டது.",
    tipSessionsFilterClear:                 "வடிப்பானை அழி",
    tipSessionsFilterActive:                "செயலில் உள்ள அமர்வுகளைக் காட்டு அல்லது மறை",
    tipSessionsFilterArchived:              "காப்பகப்படுத்தப்பட்ட அமர்வுகளைக் காட்டு அல்லது மறை",
    tipSessionsFilterLost:                  "இழந்த அமர்வுகளைக் காட்டு அல்லது மறை",
    tipSessionsFilterSource:                "இந்த மூலத்திலிருந்து அமர்வுகளைக் காட்டு அல்லது மறை",
    msgSessionsLoading:                     "அமர்வுகள் ஏற்றப்படுகின்றன…",
    msgSessionsEmpty:                       "அமர்வுகள் எதுவும் கண்டறியப்படவில்லை",
    msgSessionsError:                       "Claude Desktop தரவைப் படிக்க முடியவில்லை",
    lblSessionsCount:                       "அமர்வுகள்",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "அதன் டிகோட் செய்யப்பட்ட டிரான்ஸ்கிரிப்டைப் பார்க்க ஒரு அமர்வைத் தேர்ந்தெடுக்கவும்",
    msgTranscriptLoading:                   "படியெடுப்பை டிகோடிங் செய்கிறது…",
    msgTranscriptError:                     "இந்த படியெடுப்பை டிகோடிங் செய்ய முடியவில்லை",
    tipTranscriptReveal:                    "கோப்புறையில் படியெடுப்பு கோப்பைக் காட்டு",
    tipTranscriptCopy:                      "Markdown ஆக நகலெடு",
    tipTranscriptExport:                    "Markdown கோப்பாக ஏற்றுமதி செய்",
    tipTranscriptToolExpand:                "கருவி விவரங்களை விரிவாக்கு அல்லது சுருக்கு",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "படியை ஏற்றுமதி செய்",
    lblExportFilterMd:                      "Markdown",

  },

  hi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "रद्द करें",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "नया संस्करण उपलब्ध है:",
    lnkUpdateWhatsNew:                      "नया क्या है",
    btnUpdateDownload:                      "डाउनलोड करें",
    lnkUpdateSkip:                          "इस संस्करण को छोड़ें",
    tipUpdateDismiss:                       "खारिज करें",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "सेटिंग्स खोलें",
    tipHdrHelp:                             "सहायता",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "सेटिंग्स",
    tabDlgSettingsDisplay:                  "प्रदर्शन",
    tabDlgSettingsAbout:                    "के बारे में",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "भाषा",
    lblDlgSettingsDisplayTheme:             "थीम",
    btnDlgSettingsDisplayThemeDark:         "गहरा",
    btnDlgSettingsDisplayThemeLight:        "हल्का",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "एक yaiol Electron ऐप टेम्पलेट है।",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "सत्र",
    tipSessionsRefresh:                     "सूची ताज़ा करें",
    plhSessionsFilter:                      "शीर्षक या पाथ द्वारा फ़िल्टर करें…",
    lblSessionsActive:                      "सक्रिय",
    lblSessionsArchived:                    "संग्रहीत",
    lblSessionsLost:                        "खोई हुई",
    tipSessionsLost:                        "इस सत्र के लिए कोई क्लाउड डेस्कटॉप प्रविष्टि नहीं है - इसका शीर्षक खो गया था (संभवतः डेस्कटॉप बग)। शीर्षक पहले संदेश से पुनर्प्राप्त किया गया।",
    tipSessionsFilterClear:                 "फ़िल्टर साफ़ करें",
    tipSessionsFilterActive:                "सक्रिय सत्रों को दिखाएँ या छिपाएँ",
    tipSessionsFilterArchived:              "संग्रहीत सत्रों को दिखाएँ या छिपाएँ",
    tipSessionsFilterLost:                  "खोई हुई सत्रों को दिखाएं या छिपाएं",
    tipSessionsFilterSource:                "इस स्रोत से सत्रों को दिखाएं या छिपाएं",
    msgSessionsLoading:                     "सत्र लोड हो रहे हैं…",
    msgSessionsEmpty:                       "कोई सत्र नहीं मिला",
    msgSessionsError:                       "Claude Desktop डेटा पढ़ा नहीं जा सका",
    lblSessionsCount:                       "सत्र",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "उसका डिकोड किया गया प्रतिलेख देखने के लिए एक सत्र चुनें",
    msgTranscriptLoading:                   "प्रतिलेख डिकोड किया जा रहा है…",
    msgTranscriptError:                     "इस प्रतिलेख को डिकोड नहीं किया जा सका",
    tipTranscriptReveal:                    "फ़ोल्डर में प्रतिलेख फ़ाइल दिखाएँ",
    tipTranscriptCopy:                      "Markdown के रूप में कॉपी करें",
    tipTranscriptExport:                    "Markdown फ़ाइल के रूप में निर्यात करें",
    tipTranscriptToolExpand:                "टूल विवरणों का विस्तार या संकुचन करें",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "प्रतिलेख निर्यात करें",
    lblExportFilterMd:                      "Markdown",

  },

  bn: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "বাতিল করুন",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "নতুন সংস্করণ উপলব্ধ:",
    lnkUpdateWhatsNew:                      "নতুন কি আছে",
    btnUpdateDownload:                      "ডাউনলোড করুন",
    lnkUpdateSkip:                          "এই সংস্করণটি এড়িয়ে যান",
    tipUpdateDismiss:                       "খারিজ করুন",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "সেটিংস খুলুন",
    tipHdrHelp:                             "সাহায্য",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "সেটিংস",
    tabDlgSettingsDisplay:                  "প্রদর্শন",
    tabDlgSettingsAbout:                    "সম্পর্কে",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ভাষা",
    lblDlgSettingsDisplayTheme:             "থিম",
    btnDlgSettingsDisplayThemeDark:         "গাঢ়",
    btnDlgSettingsDisplayThemeLight:        "হালকা",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "একটি yaiol Electron অ্যাপ টেমপ্লেট।",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "সেশন",
    tipSessionsRefresh:                     "তালিকা রিফ্রেশ করুন",
    plhSessionsFilter:                      "শিরোনাম বা পাথ দ্বারা ফিল্টার করুন…",
    lblSessionsActive:                      "সক্রিয়",
    lblSessionsArchived:                    "আর্কাইভ করা হয়েছে",
    lblSessionsLost:                        "হারানো",
    tipSessionsLost:                        "এই সেশনের জন্য কোনো ক্লাউড ডেস্কটপ এন্ট্রি নেই - এর শিরোনাম হারিয়ে গেছে (সম্ভবত একটি ডেস্কটপ বাগ)। প্রথম বার্তা থেকে শিরোনাম পুনরুদ্ধার করা হয়েছে।",
    tipSessionsFilterClear:                 "ফিল্টার সাফ করুন",
    tipSessionsFilterActive:                "সক্রিয় সেশনগুলি দেখান বা লুকান",
    tipSessionsFilterArchived:              "আর্কাইভ করা সেশনগুলি দেখান বা লুকান",
    tipSessionsFilterLost:                  "হারানো সেশনগুলি দেখান বা লুকান",
    tipSessionsFilterSource:                "এই উৎস থেকে সেশনগুলি দেখান বা লুকান",
    msgSessionsLoading:                     "সেশন লোড হচ্ছে…",
    msgSessionsEmpty:                       "কোনো সেশন পাওয়া যায়নি",
    msgSessionsError:                       "Claude Desktop ডেটা পড়া যায়নি",
    lblSessionsCount:                       "সেশন",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "ডিকোড করা প্রতিলিপি দেখতে একটি সেশন নির্বাচন করুন",
    msgTranscriptLoading:                   "প্রতিলিপি ডিকোড করা হচ্ছে…",
    msgTranscriptError:                     "এই প্রতিলিপি ডিকোড করা যায়নি",
    tipTranscriptReveal:                    "ফোল্ডারে প্রতিলিপি ফাইল দেখান",
    tipTranscriptCopy:                      "Markdown হিসাবে কপি করুন",
    tipTranscriptExport:                    "Markdown ফাইল হিসাবে এক্সপোর্ট করুন",
    tipTranscriptToolExpand:                "টুলের বিবরণ প্রসারিত বা সঙ্কুচিত করুন",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "ট্রান্সক্রিপ্ট এক্সপোর্ট করুন",
    lblExportFilterMd:                      "Markdown",

  },

  ur: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "منسوخ کریں",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "نیا ورژن دستیاب ہے:",
    lnkUpdateWhatsNew:                      "نیا کیا ہے",
    btnUpdateDownload:                      "ڈاؤن لوڈ کریں",
    lnkUpdateSkip:                          "اس ورژن کو چھوڑ دیں",
    tipUpdateDismiss:                       "مسترد کریں",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "ترتیبات کھولیں",
    tipHdrHelp:                             "مدد",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "ترتیبات",
    tabDlgSettingsDisplay:                  "ڈسپلے",
    tabDlgSettingsAbout:                    "کے بارے میں",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "زبان",
    lblDlgSettingsDisplayTheme:             "تھیم",
    btnDlgSettingsDisplayThemeDark:         "گہرا",
    btnDlgSettingsDisplayThemeLight:        "ہلکا",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ایک یائیول الیکٹران ایپ ٹیمپلیٹ ہے۔",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "سیشنز",
    tipSessionsRefresh:                     "فہرست ریفریش کریں",
    plhSessionsFilter:                      "عنوان یا پاتھ کے لحاظ سے فلٹر کریں…",
    lblSessionsActive:                      "فعال",
    lblSessionsArchived:                    "محفوظ شدہ",
    lblSessionsLost:                        "گمشدہ",
    tipSessionsLost:                        "اس سیشن کے لیے کوئی کلاڈ ڈیسک ٹاپ اندراج نہیں ہے - اس کا عنوان گم ہو گیا تھا (غالباً ڈیسک ٹاپ بگ)۔ عنوان پہلے پیغام سے بازیافت کیا گیا ہے۔",
    tipSessionsFilterClear:                 "فلٹر صاف کریں",
    tipSessionsFilterActive:                "فعال سیشنز دکھائیں یا چھپائیں",
    tipSessionsFilterArchived:              "آرکائیو شدہ سیشنز دکھائیں یا چھپائیں",
    tipSessionsFilterLost:                  "گمشدہ سیشنز دکھائیں یا چھپائیں",
    tipSessionsFilterSource:                "اس ماخذ سے سیشنز دکھائیں یا چھپائیں",
    msgSessionsLoading:                     "سیشنز لوڈ ہو رہے ہیں…",
    msgSessionsEmpty:                       "کوئی سیشن نہیں ملا",
    msgSessionsError:                       "Claude Desktop ڈیٹا پڑھا نہیں جا سکا",
    lblSessionsCount:                       "سیشنز",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "اس کا ڈی کوڈ شدہ ٹرانسکرپٹ دیکھنے کے لیے ایک سیشن منتخب کریں",
    msgTranscriptLoading:                   "ٹرانسکرپٹ ڈی کوڈ ہو رہا ہے…",
    msgTranscriptError:                     "اس ٹرانسکرپٹ کو ڈی کوڈ نہیں کیا جا سکا",
    tipTranscriptReveal:                    "فولڈر میں ٹرانسکرپٹ فائل دکھائیں",
    tipTranscriptCopy:                      "مارک ڈاؤن کے طور پر کاپی کریں",
    tipTranscriptExport:                    "مارک ڈاؤن فائل کے طور پر ایکسپورٹ کریں",
    tipTranscriptToolExpand:                "ٹول کی تفصیلات کو وسعت دیں یا سمیٹیں",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "ٹرانسکرپٹ ایکسپورٹ کریں",
    lblExportFilterMd:                      "Markdown",

  },

  sw: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Ghairi",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Toleo jipya linapatikana:",
    lnkUpdateWhatsNew:                      "Nini kipya",
    btnUpdateDownload:                      "Pakua",
    lnkUpdateSkip:                          "Ruka toleo hili",
    tipUpdateDismiss:                       "Futa",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Fungua mipangilio",
    tipHdrHelp:                             "Msaada",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Mipangilio",
    tabDlgSettingsDisplay:                  "Onyesho",
    tabDlgSettingsAbout:                    "Kuhusu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Lugha",
    lblDlgSettingsDisplayTheme:             "Mandhari",
    btnDlgSettingsDisplayThemeDark:         "Giza",
    btnDlgSettingsDisplayThemeLight:        "Nuru",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ni kiolezo cha programu ya yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Vipindi",
    tipSessionsRefresh:                     "Onyesha upya orodha",
    plhSessionsFilter:                      "Chuja kwa kichwa au njia…",
    lblSessionsActive:                      "Inatumika",
    lblSessionsArchived:                    "Imeariwa",
    lblSessionsLost:                        "Zilizopotea",
    tipSessionsLost:                        "Hakuna kiingilio cha Claude Desktop kwa kipindi hiki - kichwa chake kilipotea (labda hitilafu ya Desktop). Kichwa kimerejeshwa kutoka ujumbe wa kwanza.",
    tipSessionsFilterClear:                 "Futa kichujio",
    tipSessionsFilterActive:                "Onyesha au ficha vipindi vinavyotumika",
    tipSessionsFilterArchived:              "Onyesha au ficha vipindi vilivyohifadhiwa",
    tipSessionsFilterLost:                  "Onyesha au ficha vipindi vilivyopotea",
    tipSessionsFilterSource:                "Onyesha au ficha vipindi kutoka chanzo hiki",
    msgSessionsLoading:                     "Inapakia vipindi…",
    msgSessionsEmpty:                       "Hakuna vipindi vilivyopatikana",
    msgSessionsError:                       "Imeshindwa kusoma data ya Claude Desktop",
    lblSessionsCount:                       "vipindi",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Chagua kipindi ili kuona nakala yake iliyefumbuliwa",
    msgTranscriptLoading:                   "Inasimbua nakala…",
    msgTranscriptError:                     "Imeshindwa kusimbua nakala hii",
    tipTranscriptReveal:                    "Onyesha faili ya nakala kwenye folda",
    tipTranscriptCopy:                      "Nakili kama Markdown",
    tipTranscriptExport:                    "Hamisha kama faili ya Markdown",
    tipTranscriptToolExpand:                "Panua au kunja maelezo ya zana",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Hamisha nakala",
    lblExportFilterMd:                      "Markdown",

  },

  pa: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "ਰੱਦ ਕਰੋ",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "ਨਵਾਂ ਸੰਸਕਰਨ ਉਪਲਬਧ ਹੈ:",
    lnkUpdateWhatsNew:                      "ਨਵਾਂ ਕੀ ਹੈ",
    btnUpdateDownload:                      "ਡਾਊਨਲੋਡ ਕਰੋ",
    lnkUpdateSkip:                          "ਇਸ ਸੰਸਕਰਨ ਨੂੰ ਛੱਡੋ",
    tipUpdateDismiss:                       "ਖਾਰਜ ਕਰੋ",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "ਸੈਟਿੰਗਾਂ ਖੋਲ੍ਹੋ",
    tipHdrHelp:                             "ਮਦਦ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "ਸੈਟਿੰਗਾਂ",
    tabDlgSettingsDisplay:                  "ਪ੍ਰਦਰਸ਼ਨ",
    tabDlgSettingsAbout:                    "ਬਾਰੇ",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ਭਾਸ਼ਾ",
    lblDlgSettingsDisplayTheme:             "ਥੀਮ",
    btnDlgSettingsDisplayThemeDark:         "ਗੂੜ੍ਹਾ",
    btnDlgSettingsDisplayThemeLight:        "ਹਲਕਾ",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ਇੱਕ yaiol Electron ਐਪ ਟੈਂਪਲੇਟ ਹੈ।",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "ਸੈਸ਼ਨ",
    tipSessionsRefresh:                     "ਸੂਚੀ ਤਾਜ਼ਾ ਕਰੋ",
    plhSessionsFilter:                      "ਸਿਰਲੇਖ ਜਾਂ ਪਾਥ ਦੁਆਰਾ ਫਿਲਟਰ ਕਰੋ…",
    lblSessionsActive:                      "ਸਰਗਰਮ",
    lblSessionsArchived:                    "ਪੁਰਾਲੇਖਬੱਧ",
    lblSessionsLost:                        "ਗੁੰਮ ਹੋਏ",
    tipSessionsLost:                        "ਇਸ ਸੈਸ਼ਨ ਲਈ ਕੋਈ ਕਲਾਉਡ ਡੈਸਕਟਾਪ ਐਂਟਰੀ ਨਹੀਂ ਹੈ - ਇਸਦਾ ਸਿਰਲੇਖ ਗੁੰਮ ਹੋ ਗਿਆ ਸੀ (ਸੰਭਾਵਤ ਤੌਰ 'ਤੇ ਇੱਕ ਡੈਸਕਟਾਪ ਬੱਗ)। ਸਿਰਲੇਖ ਪਹਿਲੇ ਸੁਨੇਹੇ ਤੋਂ ਮੁੜ ਪ੍ਰਾਪਤ ਕੀਤਾ ਗਿਆ।",
    tipSessionsFilterClear:                 "ਫਿਲਟਰ ਸਾਫ਼ ਕਰੋ",
    tipSessionsFilterActive:                "ਸਰਗਰਮ ਸੈਸ਼ਨ ਦਿਖਾਓ ਜਾਂ ਲੁਕਾਓ",
    tipSessionsFilterArchived:              "ਪੁਰਾਣੇ ਸੈਸ਼ਨ ਦਿਖਾਓ ਜਾਂ ਲੁਕਾਓ",
    tipSessionsFilterLost:                  "ਗੁੰਮ ਹੋਏ ਸੈਸ਼ਨ ਦਿਖਾਓ ਜਾਂ ਲੁਕਾਓ",
    tipSessionsFilterSource:                "ਇਸ ਸਰੋਤ ਤੋਂ ਸੈਸ਼ਨ ਦਿਖਾਓ ਜਾਂ ਲੁਕਾਓ",
    msgSessionsLoading:                     "ਸੈਸ਼ਨ ਲੋਡ ਹੋ ਰਹੇ ਹਨ…",
    msgSessionsEmpty:                       "ਕੋਈ ਸੈਸ਼ਨ ਨਹੀਂ ਮਿਲਿਆ",
    msgSessionsError:                       "Claude Desktop ਡਾਟਾ ਪੜ੍ਹਿਆ ਨਹੀਂ ਜਾ ਸਕਿਆ",
    lblSessionsCount:                       "ਸੈਸ਼ਨ",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "ਇਸਦਾ ਡੀਕੋਡ ਕੀਤਾ ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ ਦੇਖਣ ਲਈ ਇੱਕ ਸੈਸ਼ਨ ਚੁਣੋ",
    msgTranscriptLoading:                   "ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ ਡੀਕੋਡ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ…",
    msgTranscriptError:                     "ਇਸ ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ ਨੂੰ ਡੀਕੋਡ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਿਆ",
    tipTranscriptReveal:                    "ਫੋਲਡਰ ਵਿੱਚ ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ ਫਾਈਲ ਦਿਖਾਓ",
    tipTranscriptCopy:                      "ਮਾਰਕਡਾਊਨ ਵਜੋਂ ਕਾਪੀ ਕਰੋ",
    tipTranscriptExport:                    "ਮਾਰਕਡਾਊਨ ਫਾਈਲ ਵਜੋਂ ਐਕਸਪੋਰਟ ਕਰੋ",
    tipTranscriptToolExpand:                "ਟੂਲ ਵੇਰਵਿਆਂ ਦਾ ਵਿਸਤਾਰ ਜਾਂ ਸੰਕੁਚਨ ਕਰੋ",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ ਐਕਸਪੋਰਟ ਕਰੋ",
    lblExportFilterMd:                      "Markdown",

  },

  ha: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Soke",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Sabon sigar yana nan:",
    lnkUpdateWhatsNew:                      "Menene sabo",
    btnUpdateDownload:                      "Zazzage",
    lnkUpdateSkip:                          "Tsallake wannan sigar",
    tipUpdateDismiss:                       "Watsar",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Bude saituna",
    tipHdrHelp:                             "Taimako",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Saituna",
    tabDlgSettingsDisplay:                  "Nuni",
    tabDlgSettingsAbout:                    "Game da",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Harshe",
    lblDlgSettingsDisplayTheme:             "Jigo",
    btnDlgSettingsDisplayThemeDark:         "Duhu",
    btnDlgSettingsDisplayThemeLight:        "Haske",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "samfuri ne na aikace-aikacen yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Zama",
    tipSessionsRefresh:                     "Sabunta jerin",
    plhSessionsFilter:                      "Tace ta take ko hanya…",
    lblSessionsActive:                      "Mai aiki",
    lblSessionsArchived:                    "An adana",
    lblSessionsLost:                        "Batattu",
    tipSessionsLost:                        "Babu shigarwar Claude Desktop don wannan zama - an rasa taken sa (mai yiwuwa kuskuren Desktop). An dawo da taken daga saƙon farko.",
    tipSessionsFilterClear:                 "Share tace",
    tipSessionsFilterActive:                "Nuna ko ɓoye zamanin aiki",
    tipSessionsFilterArchived:              "Nuna ko ɓoye zamanin da aka adana",
    tipSessionsFilterLost:                  "Nuna ko ɓoye zaman batattu",
    tipSessionsFilterSource:                "Nuna ko ɓoye zaman daga wannan tushe",
    msgSessionsLoading:                     "Ana ɗora zamanai…",
    msgSessionsEmpty:                       "Ba a sami zamanai ba",
    msgSessionsError:                       "Ba a iya karanta bayanan Claude Desktop ba",
    lblSessionsCount:                       "zamanai",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Zaɓi zama don duba rubutunsa da aka warware",
    msgTranscriptLoading:                   "Ana fassara rubutun…",
    msgTranscriptError:                     "Ba a iya fassara wannan rubutun ba",
    tipTranscriptReveal:                    "Nuna fayil ɗin rubutun a cikin babban fayil",
    tipTranscriptCopy:                      "Kwafi a matsayin Markdown",
    tipTranscriptExport:                    "Fitar da shi a matsayin fayil ɗin Markdown",
    tipTranscriptToolExpand:                "Fadada ko rufe cikakkun bayanai na kayan aiki",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Fitar da rubutun",
    lblExportFilterMd:                      "Markdown",

  },

  yo: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Fagilee",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ẹya tuntun wa:",
    lnkUpdateWhatsNew:                      "Kí ni titun",
    btnUpdateDownload:                      "Ṣe igbasilẹ",
    lnkUpdateSkip:                          "Fo ẹya yii",
    tipUpdateDismiss:                       "Foju pa",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Ṣi eto",
    tipHdrHelp:                             "Iranlọwọ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Eto",
    tabDlgSettingsDisplay:                  "Ifihan",
    tabDlgSettingsAbout:                    "Nipa",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Èdè",
    lblDlgSettingsDisplayTheme:             "Àtùpà",
    btnDlgSettingsDisplayThemeDark:         "Dudu",
    btnDlgSettingsDisplayThemeLight:        "Fẹ́lẹ́fẹ́lẹ́",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "jẹ́ àdàkọ ohun èlò yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Awọn igba",
    tipSessionsRefresh:                     "Tuntun akojọ",
    plhSessionsFilter:                      "Ṣe àlàyé nípa àkọlé tàbí ipa ọ̀nà…",
    lblSessionsActive:                      "Nṣiṣẹ",
    lblSessionsArchived:                    "Ti fi pamọ",
    lblSessionsLost:                        "Ti sọnu",
    tipSessionsLost:                        "Ko si titẹsi Claude Desktop fun igba yii - akọle rẹ ti sọnu (o ṣeeṣe kokoro Ojú-iṣẹ). Akọle ti gba pada lati ifiranṣẹ akọkọ.",
    tipSessionsFilterClear:                 "Pa àlàyé rẹ",
    tipSessionsFilterActive:                "Fihan tabi fi pamọ awọn igba ti nṣiṣẹ",
    tipSessionsFilterArchived:              "Fihan tabi fi pamọ awọn igba ti a ti tọju",
    tipSessionsFilterLost:                  "Fihan tabi tọju awọn igba ti o sọnu",
    tipSessionsFilterSource:                "Fihan tabi fi pamọ awọn akoko lati orisun yii",
    msgSessionsLoading:                     "Nfiranṣẹ awọn igba…",
    msgSessionsEmpty:                       "Ko si igba ti a ri",
    msgSessionsError:                       "Ko le ka data Claude Desktop",
    lblSessionsCount:                       "awọn igba",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Yan igba kan lati wo iwe afọwọkọ ti a ti yipada",
    msgTranscriptLoading:                   "Nṣiṣẹ́ àkọsílẹ̀…",
    msgTranscriptError:                     "Kò lè ṣiṣẹ́ àkọsílẹ̀ yìí",
    tipTranscriptReveal:                    "Fi faili àkọsílẹ̀ hàn nínú fóldà",
    tipTranscriptCopy:                      "Daakọ gẹ́gẹ́ bí Markdown",
    tipTranscriptExport:                    "Ṣe okeere bi faili Markdown",
    tipTranscriptToolExpand:                "Fadada tabi pa awọn alaye ohun elo rẹ",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "Ṣe okeere àkọsílẹ̀",
    lblExportFilterMd:                      "Markdown",

  },

  te: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "రద్దు చేయి",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "కొత్త వెర్షన్ అందుబాటులో ఉంది:",
    lnkUpdateWhatsNew:                      "కొత్తవి ఏమిటి",
    btnUpdateDownload:                      "డౌన్‌లోడ్ చేయండి",
    lnkUpdateSkip:                          "ఈ వెర్షన్‌ను దాటవేయి",
    tipUpdateDismiss:                       "తిరస్కరించు",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "సెట్టింగ్‌లను తెరవండి",
    tipHdrHelp:                             "సహాయం",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "సెట్టింగ్‌లు",
    tabDlgSettingsDisplay:                  "ప్రదర్శన",
    tabDlgSettingsAbout:                    "గురించి",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "భాష",
    lblDlgSettingsDisplayTheme:             "థీమ్",
    btnDlgSettingsDisplayThemeDark:         "ముదురు",
    btnDlgSettingsDisplayThemeLight:        "లేత",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ఒక yaiol Electron యాప్ టెంప్లేట్.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "సెషన్లు",
    tipSessionsRefresh:                     "జాబితాను రిఫ్రెష్ చేయండి",
    plhSessionsFilter:                      "శీర్షిక లేదా మార్గం ద్వారా ఫిల్టర్ చేయండి…",
    lblSessionsActive:                      "సక్రియం",
    lblSessionsArchived:                    "ఆర్కైవ్ చేయబడింది",
    lblSessionsLost:                        "కోల్పోయినవి",
    tipSessionsLost:                        "ఈ సెషన్‌కు క్లాడ్ డెస్క్‌టాప్ ఎంట్రీ లేదు - దాని శీర్షిక కోల్పోయింది (బహుశా డెస్క్‌టాప్ బగ్). మొదటి సందేశం నుండి శీర్షిక తిరిగి పొందబడింది.",
    tipSessionsFilterClear:                 "ఫిల్టర్‌ను క్లియర్ చేయండి",
    tipSessionsFilterActive:                "సక్రియ సెషన్‌లను చూపించు లేదా దాచు",
    tipSessionsFilterArchived:              "ఆర్కైవ్ చేయబడిన సెషన్‌లను చూపించు లేదా దాచు",
    tipSessionsFilterLost:                  "కోల్పోయిన సెషన్‌లను చూపించు లేదా దాచు",
    tipSessionsFilterSource:                "ఈ మూలం నుండి సెషన్‌లను చూపించు లేదా దాచు",
    msgSessionsLoading:                     "సెషన్‌లు లోడ్ అవుతున్నాయి…",
    msgSessionsEmpty:                       "సెషన్‌లు కనుగొనబడలేదు",
    msgSessionsError:                       "Claude Desktop డేటాను చదవలేకపోయింది",
    lblSessionsCount:                       "సెషన్‌లు",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "దాని డీకోడ్ చేయబడిన ట్రాన్స్‌క్రిప్ట్‌ను వీక్షించడానికి ఒక సెషన్‌ను ఎంచుకోండి",
    msgTranscriptLoading:                   "ట్రాన్‌స్క్రిప్ట్‌ను డీకోడ్ చేస్తోంది…",
    msgTranscriptError:                     "ఈ ట్రాన్‌స్క్రిప్ట్‌ను డీకోడ్ చేయలేకపోయింది",
    tipTranscriptReveal:                    "ఫోల్డర్‌లో ట్రాన్‌స్క్రిప్ట్ ఫైల్‌ను చూపించు",
    tipTranscriptCopy:                      "మార్క్‌డౌన్‌గా కాపీ చేయి",
    tipTranscriptExport:                    "Markdown ఫైల్‌గా ఎగుమతి చేయండి",
    tipTranscriptToolExpand:                "పరికరం వివరాలను విస్తరించండి లేదా కుదించండి",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "ట్రాన్స్‌క్రిప్ట్‌ను ఎగుమతి చేయండి",
    lblExportFilterMd:                      "Markdown",

  },

  mr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "रद्द करा",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "नवीन आवृत्ती उपलब्ध आहे:",
    lnkUpdateWhatsNew:                      "नवीन काय आहे",
    btnUpdateDownload:                      "डाउनलोड करा",
    lnkUpdateSkip:                          "ही आवृत्ती वगळा",
    tipUpdateDismiss:                       "डिसमिस करा",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "सेटिंग्ज उघडा",
    tipHdrHelp:                             "मदत",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "सेटिंग्ज",
    tabDlgSettingsDisplay:                  "प्रदर्शन",
    tabDlgSettingsAbout:                    "बद्दल",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "भाषा",
    lblDlgSettingsDisplayTheme:             "थीम",
    btnDlgSettingsDisplayThemeDark:         "गडद",
    btnDlgSettingsDisplayThemeLight:        "हलका",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "एक yaiol Electron ॲप टेम्पलेट आहे.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "सत्रे",
    tipSessionsRefresh:                     "सूची रीफ्रेश करा",
    plhSessionsFilter:                      "शीर्षक किंवा मार्गानुसार फिल्टर करा…",
    lblSessionsActive:                      "सक्रिय",
    lblSessionsArchived:                    "संग्रहित",
    lblSessionsLost:                        "गमावलेले",
    tipSessionsLost:                        "या सत्रासाठी Claude Desktop एंट्री नाही - त्याचे शीर्षक गमावले होते (बहुधा डेस्कटॉप बग). शीर्षक पहिल्या संदेशातून पुनर्प्राप्त केले.",
    tipSessionsFilterClear:                 "फिल्टर साफ करा",
    tipSessionsFilterActive:                "सक्रिय सत्रे दाखवा किंवा लपवा",
    tipSessionsFilterArchived:              "संग्रहित सत्रे दाखवा किंवा लपवा",
    tipSessionsFilterLost:                  "गमावलेले सत्र दाखवा किंवा लपवा",
    tipSessionsFilterSource:                "या स्रोतातील सत्रे दाखवा किंवा लपवा",
    msgSessionsLoading:                     "सत्र लोड होत आहेत…",
    msgSessionsEmpty:                       "कोणतेही सत्र सापडले नाहीत",
    msgSessionsError:                       "Claude Desktop डेटा वाचता आला नाही",
    lblSessionsCount:                       "सत्र",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "त्याचे डीकोड केलेले प्रतिलेख पाहण्यासाठी एक सत्र निवडा",
    msgTranscriptLoading:                   "प्रतिलेख डीकोड करत आहे…",
    msgTranscriptError:                     "हा प्रतिलेख डीकोड करता आला नाही",
    tipTranscriptReveal:                    "फोल्डरमध्ये प्रतिलेख फाइल दाखवा",
    tipTranscriptCopy:                      "मार्कडाउन म्हणून कॉपी करा",
    tipTranscriptExport:                    "Markdown फाइल म्हणून निर्यात करा",
    tipTranscriptToolExpand:                "साधनाचे तपशील विस्तृत करा किंवा संकुचित करा",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "प्रतिलेख निर्यात करा",
    lblExportFilterMd:                      "Markdown",

  },

  tl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Kanselahin",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "May bagong bersyon:",
    lnkUpdateWhatsNew:                      "Ano ang bago",
    btnUpdateDownload:                      "I-download",
    lnkUpdateSkip:                          "Laktawan ang bersyon na ito",
    tipUpdateDismiss:                       "Balewalain",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Buksan ang mga setting",
    tipHdrHelp:                             "Tulong",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Mga Setting",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsAbout:                    "Tungkol sa",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Wika",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Madilim",
    btnDlgSettingsDisplayThemeLight:        "Maliwanag",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ay isang template ng app ng yaiol Electron.",

    // Prefix:Sessions - Scope:left pane - Claude Code session list
    ttlSessions:                            "Mga Sesyon",
    tipSessionsRefresh:                     "I-refresh ang listahan",
    plhSessionsFilter:                      "Salain ayon sa pamagat o path…",
    lblSessionsActive:                      "Aktibo",
    lblSessionsArchived:                    "Naka-archive",
    lblSessionsLost:                        "Nawala",
    tipSessionsLost:                        "Walang entry ng Claude Desktop para sa session na ito - nawala ang pamagat nito (posibleng bug ng Desktop). Naibalik ang pamagat mula sa unang mensahe.",
    tipSessionsFilterClear:                 "I-clear ang filter",
    tipSessionsFilterActive:                "Ipakita o itago ang mga aktibong sesyon",
    tipSessionsFilterArchived:              "Ipakita o itago ang mga naka-archive na sesyon",
    tipSessionsFilterLost:                  "Ipakita o itago ang mga nawalang session",
    tipSessionsFilterSource:                "Ipakita o itago ang mga session mula sa pinagmulang ito",
    msgSessionsLoading:                     "Naglo-load ng mga session…",
    msgSessionsEmpty:                       "Walang nakitang mga session",
    msgSessionsError:                       "Hindi mabasa ang data ng Claude Desktop",
    lblSessionsCount:                       "mga session",

    // Prefix:Transcript - Scope:right pane - decoded transcript view
    msgTranscriptSelect:                    "Pumili ng session upang tingnan ang na-decode na transcript nito",
    msgTranscriptLoading:                   "Nagde-decode ng transkrip…",
    msgTranscriptError:                     "Hindi ma-decode ang transkrip na ito",
    tipTranscriptReveal:                    "Ipakita ang file ng transkrip sa folder",
    tipTranscriptCopy:                      "Kopyahin bilang Markdown",
    tipTranscriptExport:                    "I-export bilang Markdown file",
    tipTranscriptToolExpand:                "Palawakin o i-collapse ang mga detalye ng tool",

    // Prefix:Export - Scope:save-to-file dialog
    ttlExport:                              "I-export ang transcript",
    lblExportFilterMd:                      "Markdown",

  },
};

export const LANGUAGES = [
  { key: 'ar', label: 'العربية' },
  { key: 'bn', label: 'বাংলা' },
  { key: 'bg', label: 'Български' },
  { key: 'ca', label: 'Català' },
  { key: 'zh_CN', label: '简体中文' },
  { key: 'zh_TW', label: '繁體中文' },
  { key: 'cs', label: 'Čeština' },
  { key: 'da', label: 'Dansk' },
  { key: 'de', label: 'Deutsch' },
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Español' },
  { key: 'fa', label: 'فارسی' },
  { key: 'fi', label: 'Suomi' },
  { key: 'fr', label: 'Français' },
  { key: 'gl', label: 'Galego' },
  { key: 'el', label: 'Ελληνικά' },
  { key: 'ha', label: 'Hausa' },
  { key: 'he', label: 'עברית' },
  { key: 'hi', label: 'हिन्दी' },
  { key: 'hr', label: 'Hrvatski' },
  { key: 'hu', label: 'Magyar' },
  { key: 'hy', label: 'Հայերեն' },
  { key: 'id', label: 'Indonesia' },
  { key: 'it', label: 'Italiano' },
  { key: 'ja', label: '日本語' },
  { key: 'ko', label: '한국어' },
  { key: 'lt', label: 'Lietuvių' },
  { key: 'mk', label: 'Македонски' },
  { key: 'mr', label: 'मराठी' },
  { key: 'ms', label: 'Melayu' },
  { key: 'nl', label: 'Nederlands' },
  { key: 'nb', label: 'Norsk' },
  { key: 'pa', label: 'ਪੰਜਾਬੀ' },
  { key: 'pl', label: 'Polski' },
  { key: 'pt_BR', label: 'Português (Brasil)' },
  { key: 'pt_PT', label: 'Português (Portugal)' },
  { key: 'ro', label: 'Română' },
  { key: 'ru', label: 'Русский' },
  { key: 'sk', label: 'Slovenčina' },
  { key: 'sl', label: 'Slovenščina' },
  { key: 'sr', label: 'Српски' },
  { key: 'sv', label: 'Svenska' },
  { key: 'sw', label: 'Kiswahili' },
  { key: 'ta', label: 'தமிழ்' },
  { key: 'te', label: 'తెలుగు' },
  { key: 'th', label: 'ไทย' },
  { key: 'tl', label: 'Filipino' },
  { key: 'tr', label: 'Türkçe' },
  { key: 'uk', label: 'Українська' },
  { key: 'ur', label: 'اردو' },
  { key: 'vi', label: 'Tiếng Việt' },
  { key: 'yo', label: 'Yorùbá' },
];

const base = TRANSLATIONS.en;

// ⚠ CLAUDE: useT MUST return a useMemo-wrapped function. The bare form
//   `return (key) => ...` produces a new function every render, which destabilizes
//   every useCallback/useEffect depending on `t` → infinite render loop, EMFILE crashes.
//   See CLAUDE-i18n.md → "useT() must memoize". Do not "simplify" this.
export function useT(langKey) {
  return useMemo(() => {
    const lang = TRANSLATIONS[langKey] || base;
    return (key) => lang[key] ?? base[key] ?? key;
  }, [langKey]);
}

export function getT(langKey) {
  const lang = TRANSLATIONS[langKey] || base;
  return (key) => lang[key] ?? base[key] ?? key;
}
