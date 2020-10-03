import { all, call, takeEvery, put, select } from "redux-saga/effects";
import RelationAction from "./actions";
import { createAction, runEffect } from "../../utilities/actionUtility";
import RelationEffects from "./effects";
import RelationSelector from "./relationSelector";

function* GET_USERS(action) {
  const data = yield call(runEffect, action, RelationEffects.getSites);
}
function* TOGGLE_SELECTED_USER(action) {
  const selectedUser = yield select(RelationSelector.SelectSelectedUser);
  console.log(action, selectedUser);
  if (selectedUser?._id === action.payload._id)
    yield put(RelationAction.unselectSite());
  else yield put(RelationAction.selectSite(action.payload));
}
function* CREATE_USER(action) {
  yield call(runEffect, action, RelationEffects.createUser, action.payload);
  yield put(createAction(RelationAction.CREATE_USER_SUCCESS, false));
}
function* ADD_RELATION(action) {
  yield call(runEffect, action, RelationEffects.createRelation, action.payload);
  yield put(createAction(RelationAction.CREATE_RELATION_SUCCESS, false));
}
function* UPDATE_RELATION(action) {
  const res = yield call(
    runEffect,
    action,
    RelationEffects.update,
    action.payload
  );
  if (res.success) {
    yield put(RelationAction.selectSite(res.user));
    yield put(createAction(RelationAction.CREATE_RELATION_SUCCESS, false));
  }
}
export default function* RelationSaga() {
  yield all([
    yield takeEvery(RelationAction.REQUEST_USER, GET_USERS),
    yield takeEvery(RelationAction.TOGGLE_SELECTED_USER, TOGGLE_SELECTED_USER),
    yield takeEvery(RelationAction.CREATE_USER, CREATE_USER),
    yield takeEvery(RelationAction.ADD_RELATION, ADD_RELATION),
    yield takeEvery(RelationAction.UPDATE_DIRECT_RELATION, UPDATE_RELATION),
  ]);
}
