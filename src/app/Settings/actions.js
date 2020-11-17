const SETTINGS_NS = "settings::";

// set option action
export function setOption(name, enabled) {
  return {
    type: "settings::setOption",
    name,
    enabled,
  };
}

// thunk to set option in localstorage as well
export function setOptionThunk(name, enabled) {
  return (dispatch) => {
    window.localStorage.setItem(`${SETTINGS_NS}${name}`, enabled);
    dispatch(setOption(name, enabled));
  };
}

// set initial settings in state
export function setInitialSettings(settingsObj) {
  return {
    type: "settings::setInitialSettings",
    settings: settingsObj,
  };
}

// fetch settings saved in localstorage
export function setInitialSettingsThunk() {
  return (dispatch) => {
    const initialSettings = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const item of Object.keys(localStorage)) {
      // match items from the proper settings name space
      if (item.match(SETTINGS_NS)) {
        // extract setting name
        const name = item.replace(SETTINGS_NS, "");
        // parse string into bool
        initialSettings[name] = window.localStorage.getItem(item) === "true";
      }
    }
    // dispatch event
    dispatch(setInitialSettings(initialSettings));
  };
}
