// sagas/index.js
import { all, fork } from "redux-saga/effects";

import userLogin from "./userLogin";

export default function* rootSaga() {
    yield all([fork(userLogin)]);
}
