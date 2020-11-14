export default (state, action) => {
  if (state === undefined) {
    return { time: new Date().toISOString() };
  }

  switch (action.type) {
    case "details::update-time":
      return { ...state, time: new Date().toISOString() };

    default:
      return state;
  }
};
