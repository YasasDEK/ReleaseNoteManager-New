import produce from "immer"

import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus, usePortalStateSelector} from "../../../../rootReducer/actions";
import {getDAReleaseNoteList} from "../../../../api/apiCalls";
import {ViewDAReleaseNoteList} from "../../../../api/apiDomain";

export enum DAReleaseNotePageEvent {
    RESET = "@darelease/RESET",
    GET_DA_RELEASE_NOTE_LIST = "@darelease/GET_RELEASE_NOTE_LIST",
    GET_DA_RELEASE_NOTE_LIST_RESULT = "@darelease/GET_DA_RELEASE_NOTE_LIST_RESULT"

}

export interface GetDAReleaseNoteListResetAction {
    type: DAReleaseNotePageEvent.RESET
}

export interface GetDAReleaseNoteListAction {
    type: DAReleaseNotePageEvent.GET_DA_RELEASE_NOTE_LIST
}

export interface GetDAReleaseNoteListResultsAction {
    type: DAReleaseNotePageEvent.GET_DA_RELEASE_NOTE_LIST_RESULT,
    results: ViewDAReleaseNoteList
}

export type DAReleaseNotePageAction = GetDAReleaseNoteListResetAction
    | GetDAReleaseNoteListAction
    | GetDAReleaseNoteListResultsAction

export interface DAReleaseNotePageData {
    loadingStatus: LoadingStatus,
    data?: ViewDAReleaseNoteList
}

const initialState = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function DAReleaseNotePageReducer(state: DAReleaseNotePageData = initialState, action: DAReleaseNotePageAction) {
    // console.log("type",action.type)
    return produce(state, draft => {
            switch (action.type) {

                case DAReleaseNotePageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case DAReleaseNotePageEvent.GET_DA_RELEASE_NOTE_LIST: {
                    break;
                }

                case DAReleaseNotePageEvent.GET_DA_RELEASE_NOTE_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useDAReleaseNotePageDataSelector(): DAReleaseNotePageData {
    return usePortalStateSelector<DAReleaseNotePageData>(ev => ev.DAReleaseNotePageData)
}

export const DAReleaseNotePageSagas = [getDAReleaseNoteListSaga];

function* getDAReleaseNoteListSaga() {
    yield takeLatest(DAReleaseNotePageEvent.GET_DA_RELEASE_NOTE_LIST, callGetDAReleaseNoteList)
}

function* callGetDAReleaseNoteList(action: GetDAReleaseNoteListAction) {
    try {
        const results = yield call(getDAReleaseNoteList);
        console.log("Response received ==> ", results);
        yield put({
            type: DAReleaseNotePageEvent.GET_DA_RELEASE_NOTE_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}