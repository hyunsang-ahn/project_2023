// reducers/userTicket.js
import produce from "immer";
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from "constants/actionTypes";

export const getUser = params => ({
    type: GET_USER_REQUEST,
    /** 중요! - 이 params은 saga의
    const result = yield call(getUserTicketApi, action.params);
    여기의 params로 들어갑니다. */
    params
});

export const setUser = user => ({ type: SET_USER, user });

const initalState = {
    user: null,
    loading: false
};

const user = (state = initalState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case GET_USER_REQUEST:
                draft.loading = true;
                break;

            // 요기가 saga에 의해 실행된다.
            case GET_USER_SUCCESS:
                draft.user = action.data;
                draft.loading = false;
                break;
            case GET_USER_FAILURE:
                draft.loading = false;
                break;
            default:
                return state;
        }
    });

export default user;