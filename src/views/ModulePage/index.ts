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
import {getModuleList} from "../../api/apiCalls";
import {ModuleList} from "../../api/apiDomain";

export enum HomePageEvent {
    RESET = "@modules/RESET",
    GET_MODULE_LIST = "@modules/GET_MODULE_LIST",
    GET_MODULE_LIST_RESULT = "@modules/GET_MODULE_LIST_RESULT"

}

export interface GetHomeListResetAction {
    type: HomePageEvent.RESET
}

export interface GetHomeListAction {
    type: HomePageEvent.GET_MODULE_LIST
}

export interface GetHomeListResultsAction {
    type: HomePageEvent.GET_MODULE_LIST_RESULT,
    results: ModuleList
}

export type HomePageAction = GetHomeListResetAction
    | GetHomeListAction
    | GetHomeListResultsAction

export interface HomePageData {
    loadingStatus: LoadingStatus,
    data?: ModuleList
}

const initialState = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function homePageReducer(state: HomePageData = initialState, action: HomePageAction) {
    return produce(state, draft => {
            switch (action.type) {

                case HomePageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case HomePageEvent.GET_MODULE_LIST: {
                    break;
                }

                case HomePageEvent.GET_MODULE_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useHomePageDataSelector(): HomePageData {
    return usePortalStateSelector<HomePageData>(ev => ev.homePageData)
}

export const HomePageSagas = [getHomeListSaga];

function* getHomeListSaga() {
    yield takeLatest(HomePageEvent.GET_MODULE_LIST, callGetHomeList)
}

function* callGetHomeList(action: GetHomeListAction) {
    try {
        const results = yield call(getModuleList);
        console.log("Response received ==> ", results);
        yield put({
            type: HomePageEvent.GET_MODULE_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}
