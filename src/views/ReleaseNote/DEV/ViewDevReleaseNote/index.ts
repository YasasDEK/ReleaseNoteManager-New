import produce from "immer"

import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus, usePortalStateSelector} from "../../../../rootReducer/actions";
import {getDevReleaseNoteList, getDeploymentHistoryForReleaseNote} from "../../../../api/apiCalls";
import {ViewDevReleaseNoteList, DeploymentHistoryForReleaseNoteList} from "../../../../api/apiDomain";

export enum DevReleaseNotePageEvent {
    RESET = "@release/RESET",
    GET_RELEASE_NOTE_LIST = "@release/GET_RELEASE_NOTE_LIST",
    GET_RELEASE_NOTE_LIST_RESULT = "@release/GET_RELEASE_NOTE_LIST_RESULT"

}

export interface GetDevReleaseNoteListResetAction {
    type: DevReleaseNotePageEvent.RESET
}

export interface GetDevReleaseNoteListAction {
    type: DevReleaseNotePageEvent.GET_RELEASE_NOTE_LIST
}

export interface GetDevReleaseNoteListResultsAction {
    type: DevReleaseNotePageEvent.GET_RELEASE_NOTE_LIST_RESULT,
    results: ViewDevReleaseNoteList
}

export type DevReleaseNotePageAction = GetDevReleaseNoteListResetAction
    | GetDevReleaseNoteListAction
    | GetDevReleaseNoteListResultsAction

export interface DevReleaseNotePageData {
    loadingStatus: LoadingStatus,
    data?: ViewDevReleaseNoteList
}

const initialState = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function DevReleaseNotePageReducer(state: DevReleaseNotePageData = initialState, action: DevReleaseNotePageAction) {
    // console.log("type",action.type)
    return produce(state, draft => {
            switch (action.type) {

                case DevReleaseNotePageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case DevReleaseNotePageEvent.GET_RELEASE_NOTE_LIST: {
                    break;
                }

                case DevReleaseNotePageEvent.GET_RELEASE_NOTE_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useDevReleaseNotePageDataSelector(): DevReleaseNotePageData {
    return usePortalStateSelector<DevReleaseNotePageData>(ev => ev.DevReleaseNotePageData)
}

export const DevReleaseNotePageSagas = [getDevReleaseNoteListSaga];

function* getDevReleaseNoteListSaga() {
    yield takeLatest(DevReleaseNotePageEvent.GET_RELEASE_NOTE_LIST, callGetDevReleaseNoteList)
}

function* callGetDevReleaseNoteList(action: GetDevReleaseNoteListAction) {
    try {
        const results = yield call(getDevReleaseNoteList);
        console.log("Response received ==> ", results);
        yield put({
            type: DevReleaseNotePageEvent.GET_RELEASE_NOTE_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}

/*************************************************************************************/

export enum DeploymentHistoryPageEvent {
    RESET = "@deploymentHistory/RESET",
    GET_DEPLOYMENT_HISTORY_LIST = "@deploymentHistory/GET_DEPLOYMENT_HISTORY_LIST",
    GET_DEPLOYMENT_HISTORY_LIST_RESULT = "@deploymentHistory/GET_DEPLOYMENT_HISTORY_LIST_RESULT"

}

export interface GetDeploymentHistoryListResetAction {
    type: DeploymentHistoryPageEvent.RESET
}

export interface GetDeploymentHistoryListAction {
    type: DeploymentHistoryPageEvent.GET_DEPLOYMENT_HISTORY_LIST
}

export interface GetDeploymentHistoryListResultsAction {
    type: DeploymentHistoryPageEvent.GET_DEPLOYMENT_HISTORY_LIST_RESULT,
    results: DeploymentHistoryForReleaseNoteList
}

export type DeploymentHistoryPageAction = GetDeploymentHistoryListResetAction
    | GetDeploymentHistoryListAction
    | GetDeploymentHistoryListResultsAction

export interface DeploymentHistoryPageData {
    loadingStatus: LoadingStatus,
    data?: DeploymentHistoryForReleaseNoteList
}

const initialState2 = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function DeploymentHistoryPageReducer(state: DeploymentHistoryPageData = initialState2, action: DeploymentHistoryPageAction) {
    // console.log("type",action.type)
    return produce(state, draft => {
            switch (action.type) {

                case DeploymentHistoryPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case DeploymentHistoryPageEvent.GET_DEPLOYMENT_HISTORY_LIST: {
                    break;
                }

                case DeploymentHistoryPageEvent.GET_DEPLOYMENT_HISTORY_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useDeploymentHistoryPageDataSelector(): DeploymentHistoryPageData {
    return usePortalStateSelector<DeploymentHistoryPageData>(ev => ev.DeploymentHistoryPageData)
}

export const DeploymentHistoryPageSagas = [getDeploymentHistoryListSaga];

function* getDeploymentHistoryListSaga() {
    yield takeLatest(DeploymentHistoryPageEvent.GET_DEPLOYMENT_HISTORY_LIST, callGetDeploymentHistoryList)
}

function* callGetDeploymentHistoryList(action: GetDeploymentHistoryListAction) {
    try {
        const results = yield call(getDeploymentHistoryForReleaseNote);
        console.log("Response received ==> ", results);
        yield put({
            type: DeploymentHistoryPageEvent.GET_DEPLOYMENT_HISTORY_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}