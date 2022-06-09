import produce from "immer"

import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus, usePortalStateSelector} from "../../../rootReducer/actions";
import {getVersionForDeployToLocation, getCustomerForDeployToLocation, getLocationForDeployToLocation} from "../../../api/apiCalls";
import {VersionForDeployToLocationList, CustomerForDeployToLocationList, LocationForDeployToLocationList} from "../../../api/apiDomain"

export enum CustomerForDeployToLocationPageEvent {
    RESET = "@cusomerForDeployToLocation/RESET",
    GET_CUSTOMER_FOR_DEPLOY_TO_LIST = "@cusomerForDeployToLocation/GET_CUSTOMER_FOR_DEPLOY_TO_LIST",
    GET_CUSTOMER_FOR_DEPLOY_TO_LIST_RESULT = "@cusomerForDeployToLocation/GET_CUSTOMER_FOR_DEPLOY_TO_LIST_RESULT"

}

export interface GetCustomerForDeployToLocationListResetAction {
    type: CustomerForDeployToLocationPageEvent.RESET
}

export interface GetCustomerForDeployToLocationListAction {
    type: CustomerForDeployToLocationPageEvent.GET_CUSTOMER_FOR_DEPLOY_TO_LIST
}

export interface GetCustomerForDeployToLocationListResultsAction {
    type: CustomerForDeployToLocationPageEvent.GET_CUSTOMER_FOR_DEPLOY_TO_LIST_RESULT,
    results: CustomerForDeployToLocationList
}

export type CustomerForDeployToLocationPageAction = GetCustomerForDeployToLocationListResetAction
    | GetCustomerForDeployToLocationListAction
    | GetCustomerForDeployToLocationListResultsAction

export interface CustomerForDeployToLocationPageData {
    loadingStatus: LoadingStatus,
    data?: CustomerForDeployToLocationList
}

const initialState = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function CustomerForDeployToLocationPageReducer(state: CustomerForDeployToLocationPageData = initialState, action: CustomerForDeployToLocationPageAction) {
    return produce(state, draft => {
            switch (action.type) {

                case CustomerForDeployToLocationPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case CustomerForDeployToLocationPageEvent.GET_CUSTOMER_FOR_DEPLOY_TO_LIST: {
                    break;
                }

                case CustomerForDeployToLocationPageEvent.GET_CUSTOMER_FOR_DEPLOY_TO_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useCustomerForDeployToLocationPageDataSelector(): CustomerForDeployToLocationPageData {
    return usePortalStateSelector<CustomerForDeployToLocationPageData>(ev => ev.CustomerForDeployToLocationPageData)
}

export const CustomerForDeployToLocationPageSagas = [getCustomerForDeployToLocationListSaga];

function* getCustomerForDeployToLocationListSaga() {
    yield takeLatest(CustomerForDeployToLocationPageEvent.GET_CUSTOMER_FOR_DEPLOY_TO_LIST, callGetCustomerForDeployToLocationList)
}

function* callGetCustomerForDeployToLocationList(action: GetCustomerForDeployToLocationListAction) {
    try {
        const results = yield call(getCustomerForDeployToLocation);
        console.log("Response received ==> ", results);
        yield put({
            type: CustomerForDeployToLocationPageEvent.GET_CUSTOMER_FOR_DEPLOY_TO_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}

/**************************************************************************************/

export enum VersionForDeployToLocationPageEvent {
    RESET = "@VersionForDeployToLocation/RESET",
    GET_VERSION_FOR_DEPLOY_TO_LOCATION_LIST = "@VersionForDeployToLocation/GET_VERSION_FOR_DEPLOY_TO_LOCATION_LIST",
    GET_VERSION_FOR_DEPLOY_TO_LOCATION_LIST_RESULT = "@VersionForDeployToLocation/GET_VERSION_FOR_DEPLOY_TO_LOCATION_LIST_RESULT"

}

export interface GetVersionForDeployToLocationListResetAction {
    type: VersionForDeployToLocationPageEvent.RESET
}

export interface GetVersionForDeployToLocationListAction {
    type: VersionForDeployToLocationPageEvent.GET_VERSION_FOR_DEPLOY_TO_LOCATION_LIST
}

export interface GetVersionForDeployToLocationListResultsAction {
    type: VersionForDeployToLocationPageEvent.GET_VERSION_FOR_DEPLOY_TO_LOCATION_LIST_RESULT
    results: VersionForDeployToLocationList
}

export type VersionForDeployToLocationPageAction = GetVersionForDeployToLocationListResetAction
    | GetVersionForDeployToLocationListAction
    | GetVersionForDeployToLocationListResultsAction

export interface VersionForDeployToLocationPageData {
    loadingStatus: LoadingStatus,
    data?: VersionForDeployToLocationList
}

const initialState2 = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function VersionForDeployToLocationPageReducer(state: VersionForDeployToLocationPageData = initialState2, action: VersionForDeployToLocationPageAction) {
    return produce(state, draft => {
            switch (action.type) {

                case VersionForDeployToLocationPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case VersionForDeployToLocationPageEvent.GET_VERSION_FOR_DEPLOY_TO_LOCATION_LIST: {
                    break;
                }

                case VersionForDeployToLocationPageEvent.GET_VERSION_FOR_DEPLOY_TO_LOCATION_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useVersionForDeployToLocationPageDataSelector(): VersionForDeployToLocationPageData {
    return usePortalStateSelector<VersionForDeployToLocationPageData>(ev => ev.VersionForDeployToLocationPageData)
}

export const VersionForDeployToLocationPageSagas = [getVersionForDeployToLocationListSaga];

function* getVersionForDeployToLocationListSaga() {
    yield takeLatest(VersionForDeployToLocationPageEvent.GET_VERSION_FOR_DEPLOY_TO_LOCATION_LIST, callGetVersionForDeployToLocationList)
}

function* callGetVersionForDeployToLocationList(action: GetVersionForDeployToLocationListAction) {
    try {
        const results = yield call(getVersionForDeployToLocation);
        console.log("Response received ==> ", results);
        yield put({
            type: VersionForDeployToLocationPageEvent.GET_VERSION_FOR_DEPLOY_TO_LOCATION_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}

/*************************************************************************************/

export enum LocationForDeployToLocationPageEvent {
    RESET = "@LocationForDeployToLocation/RESET",
    GET_LOCATION_FOR_DEPLOY_TO_LOCATION_LIST = "@LocationForDeployToLocation/GET_LOCATION_FOR_DEPLOY_TO_LOCATION_LIST",
    GET_LOCATION_FOR_DEPLOY_TO_LOCATION_LIST_RESULT = "@LocationForDeployToLocation/GET_LOCATION_FOR_DEPLOY_TO_LOCATION_LIST_RESULT"

}

export interface GetLocationForDeployToLocationListResetAction {
    type: LocationForDeployToLocationPageEvent.RESET
}

export interface GetLocationForDeployToLocationListAction {
    type: LocationForDeployToLocationPageEvent.GET_LOCATION_FOR_DEPLOY_TO_LOCATION_LIST
}

export interface GetLocationForDeployToLocationListResultsAction {
    type: LocationForDeployToLocationPageEvent.GET_LOCATION_FOR_DEPLOY_TO_LOCATION_LIST_RESULT
    results: LocationForDeployToLocationList
}

export type LocationForDeployToLocationPageAction = GetLocationForDeployToLocationListResetAction
    | GetLocationForDeployToLocationListAction
    | GetLocationForDeployToLocationListResultsAction

export interface LocationForDeployToLocationPageData {
    loadingStatus: LoadingStatus,
    data?: LocationForDeployToLocationList
}

const initialState3 = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function LocationForDeployToLocationPageReducer(state: LocationForDeployToLocationPageData = initialState3, action: LocationForDeployToLocationPageAction) {
    return produce(state, draft => {
            switch (action.type) {

                case LocationForDeployToLocationPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case LocationForDeployToLocationPageEvent.GET_LOCATION_FOR_DEPLOY_TO_LOCATION_LIST: {
                    break;
                }

                case LocationForDeployToLocationPageEvent.GET_LOCATION_FOR_DEPLOY_TO_LOCATION_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useLocationForDeployToLocationPageDataSelector(): LocationForDeployToLocationPageData {
    return usePortalStateSelector<LocationForDeployToLocationPageData>(ev => ev.LocationForDeployToLocationPageData)
}

export const LocationForDeployToLocationPageSagas = [getLocationForDeployToLocationListSaga];

function* getLocationForDeployToLocationListSaga() {
    yield takeLatest(LocationForDeployToLocationPageEvent.GET_LOCATION_FOR_DEPLOY_TO_LOCATION_LIST, callGetLocationForDeployToLocationList)
}

function* callGetLocationForDeployToLocationList(action: GetLocationForDeployToLocationListAction) {
    try {
        const results = yield call(getLocationForDeployToLocation);
        console.log("Response received ==> ", results);
        yield put({
            type: LocationForDeployToLocationPageEvent.GET_LOCATION_FOR_DEPLOY_TO_LOCATION_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}