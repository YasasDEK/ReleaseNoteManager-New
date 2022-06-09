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
import {LoadingStatus, usePortalStateSelector} from "../../rootReducer/actions";
import {getVersionHistoryDataList, getModuleUsingIdList} from "../../api/apiCalls";
import {ModuleList, VersionHistoryDataList} from "../../api/apiDomain";

export enum VersionHistoryDataPageEvent {
    RESET = "@versionsdata/RESET",
    GET_VERSION_DATA_LIST = "@versionsdata/GET_VERSION_DATA_LIST",
    GET_VERSION_DATA_LIST_RESULT = "@versionsdata/GET_VERSION_DATA_LIST_RESULT"

}

export interface GetVersionHistoryDataListResetAction {
    type: VersionHistoryDataPageEvent.RESET
}

export interface GetVersionHistoryDataListAction {
    type: VersionHistoryDataPageEvent.GET_VERSION_DATA_LIST
}

export interface GetVersionHistoryDataListResultsAction {
    type: VersionHistoryDataPageEvent.GET_VERSION_DATA_LIST_RESULT,
    results: VersionHistoryDataList
}

export type VersionHistoryDataPageAction = GetVersionHistoryDataListResetAction
    | GetVersionHistoryDataListAction
    | GetVersionHistoryDataListResultsAction

export interface VersionHistoryDataPageData {
    loadingStatus: LoadingStatus,
    data?: VersionHistoryDataList
}

const initialState = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function VersionHistoryDataPageReducer(state: VersionHistoryDataPageData = initialState, action: VersionHistoryDataPageAction) {
    // console.log("type",action.type)
    return produce(state, draft => {
            switch (action.type) {

                case VersionHistoryDataPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case VersionHistoryDataPageEvent.GET_VERSION_DATA_LIST: {
                    break;
                }

                case VersionHistoryDataPageEvent.GET_VERSION_DATA_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useVersionHistoryDataPageDataSelector(): VersionHistoryDataPageData {
    return usePortalStateSelector<VersionHistoryDataPageData>(ev => ev.VersionHistoryDataPageData)
}

export const VersionHistoryDataPageSagas = [getVersionHistoryDataListSaga];

function* getVersionHistoryDataListSaga() {
    yield takeLatest(VersionHistoryDataPageEvent.GET_VERSION_DATA_LIST, callGetVersionHistoryDataList)
}

function* callGetVersionHistoryDataList(action: GetVersionHistoryDataListAction) {
    try {
        const results = yield call(getVersionHistoryDataList);
        console.log("Response received ==> ", results);
        yield put({
            type: VersionHistoryDataPageEvent.GET_VERSION_DATA_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}


/**************************************************************************************/

export enum ModulesUsingIdPageEvent {
    RESET = "@modulesUsingId/RESET",
    GET_MODULE_LIST = "@modulesUsingId/GET_MODULE_LIST",
    GET_MODULE_LIST_RESULT = "@modulesUsingId/GET_MODULE_LIST_RESULT"

}

export interface GetModulesUsingIdListResetAction {
    type: ModulesUsingIdPageEvent.RESET
}

export interface GetModulesUsingIdListAction {
    type: ModulesUsingIdPageEvent.GET_MODULE_LIST
}

export interface GetModulesUsingIdListResultsAction {
    type: ModulesUsingIdPageEvent.GET_MODULE_LIST_RESULT,
    results: ModuleList
}

export type ModulesUsingIdPageAction = GetModulesUsingIdListResetAction
    | GetModulesUsingIdListAction
    | GetModulesUsingIdListResultsAction

export interface ModulesUsingIdPageData {
    loadingStatus: LoadingStatus,
    data?: ModuleList
}

const initialState2 = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function ModulesUsingIdPageReducer(state: ModulesUsingIdPageData = initialState2, action: ModulesUsingIdPageAction) {
    return produce(state, draft => {
            switch (action.type) {

                case ModulesUsingIdPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case ModulesUsingIdPageEvent.GET_MODULE_LIST: {
                    break;
                }

                case ModulesUsingIdPageEvent.GET_MODULE_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useModulesUsingIdPageDataSelector(): ModulesUsingIdPageData {
    return usePortalStateSelector<ModulesUsingIdPageData>(ev => ev.ModulesUsingIdPageData)
}

export const ModulesUsingIdPageSagas = [getModulesUsingIdListSaga];

function* getModulesUsingIdListSaga() {
    yield takeLatest(ModulesUsingIdPageEvent.GET_MODULE_LIST, callGetModulesUsingIdList)
}

function* callGetModulesUsingIdList(action: GetModulesUsingIdListAction) {
    try {
        const results = yield call(getModuleUsingIdList);
        console.log("Response received ==> ", results);
        yield put({
            type: ModulesUsingIdPageEvent.GET_MODULE_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}
