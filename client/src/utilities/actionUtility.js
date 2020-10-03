import { store } from "../index";
import RequestingActions from "../redux/requesting/actions";

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
  const isError = !model?.success;
  dispatch(
    createAction(`${actionType}_FINISHED`, model.data || model, isError, {
      ...model.metadata,
      ...meta,
    })
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
  return model.data || model;
}

export const getKeyForAction = (actionType, scope) =>
  `${scope ? `[scope:${scope}]` : ""}${actionType}`;
