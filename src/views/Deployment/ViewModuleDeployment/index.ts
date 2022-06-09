/*
 *
 *  * (C) Copyright 2006-2020 hSenid Mobile Solutions (Pvt) Limited.
 *  *
 *  * All Rights Reserved.
 *  *
 *  * These materials are unpublished, proprietary, confidential source code of
 *  * hSenid Mobile Solutions (Pvt) Limited and constitute a TRADE SECRET
 *  * of hSenid Mobile Solutions (Pvt) Limited.
 *  *
 *  * hSenid Mobile Solutions (Pvt) Limited retains all title to and intellectual
 *  * property rights in these materials.
 *  *
 *
 */

import produce from "immer"

import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus, usePortalStateSelector} from "../../../rootReducer/actions";
import {viewModuleDeployment} from "../../../api/apiCalls";
import {ViewModuleDeploymentList} from "../../../api/apiDomain";
import {getDAReleaseNoteList} from "../../../api/apiCalls";
import {ViewDAReleaseNoteList} from "../../../api/apiDomain";


export enum ViewModuleDeploymentPageEvent {
    RESET = "@cusomers/RESET",
    GET_MODULE_DEPLOYMENT_LIST = "@cusomers/GET_MODULE_DEPLOYMENT_LIST",
    GET_MODULE_DEPLOYMENT_LIST_RESULT = "@cusomers/GET_MODULE_DEPLOYMENT_LIST_RESULT"

}

export interface GetViewModuleDeploymentListResetAction {
    type: ViewModuleDeploymentPageEvent.RESET
}

export interface GetViewModuleDeploymentListAction {
    type: ViewModuleDeploymentPageEvent.GET_MODULE_DEPLOYMENT_LIST
}

export interface GetViewModuleDeploymentListResultsAction {
    type: ViewModuleDeploymentPageEvent.GET_MODULE_DEPLOYMENT_LIST_RESULT,
    results: ViewModuleDeploymentList
}

export type ViewModuleDeploymentPageAction = GetViewModuleDeploymentListResetAction
    | GetViewModuleDeploymentListAction
    | GetViewModuleDeploymentListResultsAction

export interface ViewModuleDeploymentPageData {
    loadingStatus: LoadingStatus,
    data?: ViewModuleDeploymentList
}

const initialState = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function ViewModuleDeploymentPageReducer(state: ViewModuleDeploymentPageData = initialState, action: ViewModuleDeploymentPageAction) {
    return produce(state, draft => {
            switch (action.type) {

                case ViewModuleDeploymentPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case ViewModuleDeploymentPageEvent.GET_MODULE_DEPLOYMENT_LIST: {
                    break;
                }

                case ViewModuleDeploymentPageEvent.GET_MODULE_DEPLOYMENT_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useViewModuleDeploymentPageDataSelector(): ViewModuleDeploymentPageData {
    return usePortalStateSelector<ViewModuleDeploymentPageData>(ev => ev.ViewModuleDeploymentPageData)
}

export const ViewModuleDeploymentPageSagas = [getViewModuleDeploymentListSaga];

function* getViewModuleDeploymentListSaga() {
    yield takeLatest(ViewModuleDeploymentPageEvent.GET_MODULE_DEPLOYMENT_LIST, callGetViewModuleDeploymentList)
}

function* callGetViewModuleDeploymentList(action: GetViewModuleDeploymentListAction) {
    try {
        const results = yield call(viewModuleDeployment);
        console.log("Response received ==> ", results);
        yield put({
            type: ViewModuleDeploymentPageEvent.GET_MODULE_DEPLOYMENT_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}

/***************************************************************************************/

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

const initialState2 = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function DAReleaseNotePageReducer(state: DAReleaseNotePageData = initialState2, action: DAReleaseNotePageAction) {
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