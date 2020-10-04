import { store } from "../index";
import RequestingActions from "../redux/requesting/actions";
import RelationAction from "../redux/relation/actions";

export function createAction(
  type,
  payload = undefined,
  error = false,
  meta = null
) {
  return { type, payload, error, meta };
}

export async function runEffect(action, effect, ...args) {
  const { meta, type: actionType } = action;

  const { dispatch } = store;
  dispatch(
    createAction(
      RequestingActions.SET_REQUESTING,
      { type: actionType, value: true },
      false,
      meta
    )
  );
  const model = await effect(...args);
  console.log(model, "model");
  const isError = model ? !model?.success : true;
  if (!model) dispatch(createAction(RelationAction.SET_ERROR, "Network error"));
  else if (model?.success)
    dispatch(createAction(RelationAction.REMOVE_ERROR, []));
  dispatch(
    createAction(`${actionType}_FINISHED`, model?.data || model, isError)
  );
  // Set Requesting of the action to false
  dispatch(
    createAction(
      RequestingActions.SET_REQUESTING,
      { type: actionType, value: false },
      false,
      meta
    )
  );
  return model?.data || model;
}

export const getKeyForAction = (actionType, scope) =>
  `${scope ? `[scope:${scope}]` : ""}${actionType}`;
