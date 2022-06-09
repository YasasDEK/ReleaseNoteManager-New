import produce from "immer"

import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus, usePortalStateSelector} from "../../../rootReducer/actions";
import {getModulesForLocationList} from "../../../api/apiCalls";
import {ModulesForLocationList} from "../../../api/apiDomain";

export enum ModulesForLocationPageEvent {
    RESET = "@deployments/RESET",
    GET_MODULES_FOR_LOCATION_LIST = "@deployments/GET_MODULES_FOR_LOCATION_LIST",
    GET_MODULES_FOR_LOCATION_LIST_RESULT = "@deployments/GET_MODULES_FOR_LOCATION_LIST_RESULT"

}

export interface GetModulesForLocationListResetAction {
    type: ModulesForLocationPageEvent.RESET
}

export interface GetModulesForLocationListAction {
    type: ModulesForLocationPageEvent.GET_MODULES_FOR_LOCATION_LIST
}

export interface GetModulesForLocationListResultsAction {
    type: ModulesForLocationPageEvent.GET_MODULES_FOR_LOCATION_LIST_RESULT,
    results: ModulesForLocationList
}

export type ModulesForLocationPageAction = GetModulesForLocationListResetAction
    | GetModulesForLocationListAction
    | GetModulesForLocationListResultsAction

export interface ModulesForLocationPageData {
    loadingStatus: LoadingStatus,
    data?: ModulesForLocationList
}

const initialState = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function ModulesForLocationPageReducer(state: ModulesForLocationPageData = initialState, action: ModulesForLocationPageAction) {
    return produce(state, draft => {
            switch (action.type) {

                case ModulesForLocationPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case ModulesForLocationPageEvent.GET_MODULES_FOR_LOCATION_LIST: {
                    break;
                }

                case ModulesForLocationPageEvent.GET_MODULES_FOR_LOCATION_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useModulesForLocationPageDataSelector(): ModulesForLocationPageData {
    return usePortalStateSelector<ModulesForLocationPageData>(ev => ev.ModulesForLocationPageData)
}

export const ModulesForLocationPageSagas = [getModulesForLocationListSaga];

function* getModulesForLocationListSaga() {
    yield takeLatest(ModulesForLocationPageEvent.GET_MODULES_FOR_LOCATION_LIST, callGetModulesForLocationList)
}

function* callGetModulesForLocationList(action: GetModulesForLocationListAction) {
    try {
        const results = yield call(getModulesForLocationList);
        console.log("Response received ==> ", results);
        yield put({
            type: ModulesForLocationPageEvent.GET_MODULES_FOR_LOCATION_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}