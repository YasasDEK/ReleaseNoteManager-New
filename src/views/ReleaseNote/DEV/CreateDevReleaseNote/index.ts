import produce from "immer"

import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus, usePortalStateSelector} from "../../../../rootReducer/actions";
import {getDependentModulesList, getVersionHistoryDataList, getCustomersForModuleList} from "../../../../api/apiCalls"
import {DependentModulesList, VersionHistoryDataList, CustomerForModuleList} from "../../../../api/apiDomain";

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

/*------------------------------------------------------------------------------------------*/

export enum DependentModulesPageEvent {
    RESET = "@dependent/RESET",
    GET_DEPENDENT_MODULES_LIST = "@dependent/GET_DEPENDENT_MODULES_LIST",
    GET_DEPENDENT_MODULES_LIST_RESULT = "@dependent/GET_DEPENDENT_MODULES_LIST_RESULT"

}

export interface GetDependentModulesListResetAction {
    type: DependentModulesPageEvent.RESET
}

export interface GetDependentModulesListAction {
    type: DependentModulesPageEvent.GET_DEPENDENT_MODULES_LIST
}

export interface GetDependentModulesListResultsAction {
    type: DependentModulesPageEvent.GET_DEPENDENT_MODULES_LIST_RESULT,
    results: DependentModulesList
}

export type DependentModulesPageAction = GetDependentModulesListResetAction
    | GetDependentModulesListAction
    | GetDependentModulesListResultsAction

export interface DependentModulesPageData {
    loadingStatus: LoadingStatus,
    data?: DependentModulesList
}

const initialState2 = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function DependentModulesPageReducer(state: DependentModulesPageData = initialState2, action: DependentModulesPageAction) {
    // console.log("type",action.type)
    return produce(state, draft => {
            switch (action.type) {

                case DependentModulesPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case DependentModulesPageEvent.GET_DEPENDENT_MODULES_LIST: {
                    break;
                }

                case DependentModulesPageEvent.GET_DEPENDENT_MODULES_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useDependentModulesPageDataSelector(): DependentModulesPageData {
    return usePortalStateSelector<DependentModulesPageData>(ev => ev.DependentModulesPageData)
}

export const DependentModulesPageSagas = [getDependentModulesListSaga];

function* getDependentModulesListSaga() {
    yield takeLatest(DependentModulesPageEvent.GET_DEPENDENT_MODULES_LIST, callGetDependentModulesList)
}

function* callGetDependentModulesList(action: GetDependentModulesListAction) {
    try {
        const results = yield call(getDependentModulesList);
        console.log("Response received ==> ", results);
        yield put({
            type: DependentModulesPageEvent.GET_DEPENDENT_MODULES_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}

/******************************************************************************************/

export enum CustomerForModulePageEvent {
    RESET = "@customersformodule/RESET",
    GET_CUSTOMER_FOR_MODULE_LIST = "@customersformodule/GET_CUSTOMER_FOR_MODULE_LIST",
    GET_CUSTOMER_FOR_MODULE_LIST_RESULT = "@customersformodule/GET_CUSTOMER_FOR_MODULE_LIST_RESULT"

}

export interface GetCustomerForModuleListResetAction {
    type: CustomerForModulePageEvent.RESET
}

export interface GetCustomerForModuleListAction {
    type: CustomerForModulePageEvent.GET_CUSTOMER_FOR_MODULE_LIST
}

export interface GetCustomerForModuleListResultsAction {
    type: CustomerForModulePageEvent.GET_CUSTOMER_FOR_MODULE_LIST_RESULT,
    results: CustomerForModuleList
}

export type CustomerForModulePageAction = GetCustomerForModuleListResetAction
    | GetCustomerForModuleListAction
    | GetCustomerForModuleListResultsAction

export interface CustomerForModulePageData {
    loadingStatus: LoadingStatus,
    data?: CustomerForModuleList
}

const initialState3 = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function CustomerForModulePageReducer(state: CustomerForModulePageData = initialState3, action: CustomerForModulePageAction) {
    return produce(state, draft => {
            switch (action.type) {

                case CustomerForModulePageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case CustomerForModulePageEvent.GET_CUSTOMER_FOR_MODULE_LIST: {
                    break;
                }

                case CustomerForModulePageEvent.GET_CUSTOMER_FOR_MODULE_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useCustomerForModulePageDataSelector(): CustomerForModulePageData {
    return usePortalStateSelector<CustomerForModulePageData>(ev => ev.CustomerForModulePageData)
}

export const CustomerForModulePageSagas = [getCustomerForModuleListSaga];

function* getCustomerForModuleListSaga() {
    yield takeLatest(CustomerForModulePageEvent.GET_CUSTOMER_FOR_MODULE_LIST, callGetCustomerForModuleList)
}

function* callGetCustomerForModuleList(action: GetCustomerForModuleListAction) {
    try {
        const results = yield call(getCustomersForModuleList);
        console.log("Response received ==> ", results);
        yield put({
            type: CustomerForModulePageEvent.GET_CUSTOMER_FOR_MODULE_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}

/******************************************************************************************/
