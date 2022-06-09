import produce from "immer"

import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus, usePortalStateSelector} from "../../../rootReducer/actions";
import {getDeploymentLocationList} from "../../../api/apiCalls";
import {DeploymentLocationList} from "../../../api/apiDomain";

export enum DeploymentLocationPageEvent {
    RESET = "@deployments/RESET",
    GET_DEPLOYMENT_LIST = "@deployments/GET_DEPLOYMENT_LIST",
    GET_DEPLOYMENT_LIST_RESULT = "@deployments/GET_DEPLOYMENT_LIST_RESULT"

}

export interface GetDeploymentLocationListResetAction {
    type: DeploymentLocationPageEvent.RESET
}

export interface GetDeploymentLocationListAction {
    type: DeploymentLocationPageEvent.GET_DEPLOYMENT_LIST
}

export interface GetDeploymentLocationListResultsAction {
    type: DeploymentLocationPageEvent.GET_DEPLOYMENT_LIST_RESULT,
    results: DeploymentLocationList
}

export type DeploymentLocationPageAction = GetDeploymentLocationListResetAction
    | GetDeploymentLocationListAction
    | GetDeploymentLocationListResultsAction

export interface DeploymentLocationPageData {
    loadingStatus: LoadingStatus,
    data?: DeploymentLocationList
}

const initialState = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function DeploymentLocationPageReducer(state: DeploymentLocationPageData = initialState, action: DeploymentLocationPageAction) {
    return produce(state, draft => {
            switch (action.type) {

                case DeploymentLocationPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case DeploymentLocationPageEvent.GET_DEPLOYMENT_LIST: {
                    break;
                }

                case DeploymentLocationPageEvent.GET_DEPLOYMENT_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useDeploymentLocationPageDataSelector(): DeploymentLocationPageData {
    return usePortalStateSelector<DeploymentLocationPageData>(ev => ev.DeploymentLocationPageData)
}

export const DeploymentLocationPageSagas = [getDeploymentLocationListSaga];

function* getDeploymentLocationListSaga() {
    yield takeLatest(DeploymentLocationPageEvent.GET_DEPLOYMENT_LIST, callGetDeploymentLocationList)
}

function* callGetDeploymentLocationList(action: GetDeploymentLocationListAction) {
    try {
        const results = yield call(getDeploymentLocationList);
        console.log("Response received ==> ", results);
        yield put({
            type: DeploymentLocationPageEvent.GET_DEPLOYMENT_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}