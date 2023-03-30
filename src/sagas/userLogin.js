// sagas/userLogin.js
import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from "constants/actionTypes";
import axios from 'axios';

function getUseApi(params) {
    return axios.get("/custom-api/loginChk", params);
}

function* getUser(action) {
    try {
        // api 통신할때는 call
        const result = yield call(getUseApi, action.params);

        // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
        yield put({ type: GET_USER_SUCCESS, data: result.data });
    } catch (err) {
        yield put({ type: GET_USER_FAILURE, data: err.response.data });
    }
}

function* watchGetUser() {
    yield takeLatest(GET_USER_REQUEST, getUser);
}

export default function* userSaga() {
    yield all([fork(watchGetUser)]);
}
