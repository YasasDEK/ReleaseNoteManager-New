import produce from "immer"

import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus, usePortalStateSelector} from "../../../rootReducer/actions";
import {getDeploymentTimeLineList} from "../../../api/apiCalls";
import {DeploymentTimeLineList} from "../../../api/apiDomain";

export enum DeploymentTimeLinePageEvent {
    RESET = "@deployments/RESET",
    GET_DEPLOYMENT_TIME_LINE_LIST = "@deployments/GET_DEPLOYMENT_TIME_LINE_LIST",
    GET_DEPLOYMENT_TIME_LINE_LIST_RESULT = "@deployments/GET_DEPLOYMENT_TIME_LINE_LIST_RESULT"

}

export interface GetDeploymentTimeLineListResetAction {
    type: DeploymentTimeLinePageEvent.RESET
}

export interface GetDeploymentTimeLineListAction {
    type: DeploymentTimeLinePageEvent.GET_DEPLOYMENT_TIME_LINE_LIST
}

export interface GetDeploymentTimeLineListResultsAction {
    type: DeploymentTimeLinePageEvent.GET_DEPLOYMENT_TIME_LINE_LIST_RESULT,
    results: DeploymentTimeLineList
}

export type DeploymentTimeLinePageAction = GetDeploymentTimeLineListResetAction
    | GetDeploymentTimeLineListAction
    | GetDeploymentTimeLineListResultsAction

export interface DeploymentTimeLinePageData {
    loadingStatus: LoadingStatus,
    data?: DeploymentTimeLineList
}

const initialState = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function DeploymentTimeLinePageReducer(state: DeploymentTimeLinePageData = initialState, action: DeploymentTimeLinePageAction) {
    // console.log("type",action.type)
    return produce(state, draft => {
            switch (action.type) {

                case DeploymentTimeLinePageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case DeploymentTimeLinePageEvent.GET_DEPLOYMENT_TIME_LINE_LIST: {
                    break;
                }

                case DeploymentTimeLinePageEvent.GET_DEPLOYMENT_TIME_LINE_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useDeploymentTimeLinePageDataSelector(): DeploymentTimeLinePageData {
    return usePortalStateSelector<DeploymentTimeLinePageData>(ev => ev.DeploymentTimeLinePageData)
}

export const DeploymentTimeLinePageSagas = [getDeploymentTimeLineListSaga];

function* getDeploymentTimeLineListSaga() {
    yield takeLatest(DeploymentTimeLinePageEvent.GET_DEPLOYMENT_TIME_LINE_LIST, callGetDeploymentTimeLineList)
}

function* callGetDeploymentTimeLineList(action: GetDeploymentTimeLineListAction) {
    try {
        const results = yield call(getDeploymentTimeLineList);
        console.log("Response received ==> ", results);
        yield put({
            type: DeploymentTimeLinePageEvent.GET_DEPLOYMENT_TIME_LINE_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}