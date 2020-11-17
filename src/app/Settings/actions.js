const SETTINGS_NS = "settings::";

export function setOption(name, enabled) {
  return {
    type: "settings::setOption",
    name,
    enabled,
  };
}

export function setOptionThunk(name, enabled) {
  return (dispatch) => {
    window.localStorage.setItem(`${SETTINGS_NS}${name}`, enabled);
    dispatch(setOption(name, enabled));
  };
}

export function setInitialSettings(settingsObj) {
  return {
    type: "settings::setInitialSettings",
    settings: settingsObj,
  };
}

export function setInitialSettingsThunk() {
  return (dispatch) => {
    const initialSettings = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const item of Object.keys(localStorage)) {
      if (item.match(SETTINGS_NS)) {
        const name = item.replace(SETTINGS_NS, "");
        initialSettings[name] = window.localStorage.getItem(item) === "true";
      }
    }
    console.log(initialSettings);
    dispatch(setInitialSettings(initialSettings));
  };
}
