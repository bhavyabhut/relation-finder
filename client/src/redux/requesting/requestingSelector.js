import { createSelector } from "reselect";
import { getKeyForAction } from "../../utilities/actionUtility";

function selectRequesting(requestingState, actionTypes, scope) {
  return actionTypes.some((actionType) => {
    return !!requestingState[getKeyForAction(actionType, scope)];
  });
}

export default createSelector(
  (state) => state.requesting,
  (state, actionTypes) => actionTypes,
  (state, actionTypes, scope) => scope,
  selectRequesting
);
