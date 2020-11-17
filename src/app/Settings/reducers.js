export default function settingsReducer(state = {}, action) {
  switch (action.type) {
    case "settings::setOption":
      return {
        ...state,
        [action.name]: action.enabled,
      };
    case "settings::setInitialSettings":
      return {
        ...action.settings,
      };
    default:
      return state;
  }
}
