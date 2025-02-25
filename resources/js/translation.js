async function doTranslation() {
  const config = await getCfg()

  // See if the localization file exists
  const localizations = await filesystem.readDirectory(`${NL_CWD}/languages`)

  // Use english if the selected file does not exist
  const selectedLanguage = localizations.find(f => f.entry === `${config.language}.json`)

  // Use english if the selected file does not exist
  if (!selectedLanguage) {
    config.language = 'en'
  }

  const localization = await filesystem.readFile(`${NL_CWD}/languages/${config.language}.json`)
  const engLocale = await filesystem.readFile(`${NL_CWD}/languages/en.json`)
  localeObj = JSON.parse(localization)

  const set = (id, localeString) => document.getElementById(id).innerHTML = localeString || 'UNKNOWN'

  // Begin filling in values
  set('titleSection', localeObj.appName)

  const verSpan = document.createElement('span')
  verSpan.id = 'version'
  verSpan.innerHTML = ` v${NL_APPVERSION}`

  document.querySelector('#titleSection').appendChild(verSpan)

  // Play buttons
  set('playOfficial', localeObj.playOfficial)
  set('playPrivate', localeObj.playPrivate)
  set('serverLaunch', localeObj.launchLocalServer)

  // File select buttons
  set('gameFolderSet', localeObj.gameFolderSet)
  set('grasscutterFileSet', localeObj.grasscutterFileSet)

  // Private options
  document.querySelector('#ip').placeholder = localeObj.ipPlaceholder
  document.querySelector('#port').placeholder = localeObj.portPlaceholder

  // Settings
  set('fullSettingsTitle', localeObj.settingsTitle)
  set('scriptsTitle', localeObj.scriptsSectionTitle)
  set('killswitchTitle', localeObj.killswitchOption)
  set('killswitchSubtitle', localeObj.killswitchSubtitle)
  set('proxyTitle', localeObj.proxyOption)
  set('proxyInstall', localeObj.proxyInstallBtn)
  set('proxySubtitle', localeObj.proxySubtitle)
  set('updateBtn', localeObj.updateOption)
  set('updateTitle', localeObj.updateOption)
  set('updateSubtitle', localeObj.updateSubtitle)
  set('languageTitle', localeObj.languageOption)
  set('languageSubtitle', localeObj.languageSubtitle)
  set('serverLaunchTitle', localeObj.enableServerLauncherOption)
  set('serverSubtitle', localeObj.enableServerLauncherSubtitle)
  
  // Intro popup
  const popup = document.getElementById('firstTimeNotice')
  const introSpan = popup.querySelector('span')
  const boldIntroSpan = document.createElement('span')

  boldIntroSpan.innerHTML = localeObj.introSen1 + '\n'
  boldIntroSpan.classList.add('boldTitle')

  introSpan.appendChild(boldIntroSpan)

  introSpan.innerHTML += localeObj.introSen2 + '<br>'
  introSpan.innerHTML += localeObj.introSen3 + '<br>'
  introSpan.innerHTML += localeObj.introSen4 + '<br>'

  set('firstTimeInstallBtn', localeObj.proxyInstallBtn)
  set('firstTimeDenyBtn', localeObj.proxyInstallDeny)
}