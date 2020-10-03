import { all } from "redux-saga/effects";
import relation from "./relation/sagas";

export default function* rootSaga() {
  yield all([relation()]);
}
