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
import {getCustomerList} from "../../api/apiCalls";
import {CustomerList} from "../../api/apiDomain";

export enum CustomerPageEvent {
    RESET = "@cusomers/RESET",
    GET_CUSTOMER_LIST = "@cusomers/GET_CUSTOMER_LIST",
    GET_CUSTOMER_LIST_RESULT = "@cusomers/GET_CUSTOMER_LIST_RESULT"

}

export interface GetCustomerListResetAction {
    type: CustomerPageEvent.RESET
}

export interface GetCustomerListAction {
    type: CustomerPageEvent.GET_CUSTOMER_LIST
}

export interface GetCustomerListResultsAction {
    type: CustomerPageEvent.GET_CUSTOMER_LIST_RESULT,
    results: CustomerList
}

export type CustomerPageAction = GetCustomerListResetAction
    | GetCustomerListAction
    | GetCustomerListResultsAction

export interface CustomerPageData {
    loadingStatus: LoadingStatus,
    data?: CustomerList
}

const initialState = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function customerPageReducer(state: CustomerPageData = initialState, action: CustomerPageAction) {
    return produce(state, draft => {
            switch (action.type) {

                case CustomerPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case CustomerPageEvent.GET_CUSTOMER_LIST: {
                    break;
                }

                case CustomerPageEvent.GET_CUSTOMER_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useCustomerPageDataSelector(): CustomerPageData {
    return usePortalStateSelector<CustomerPageData>(ev => ev.customerPageData)
}

export const CustomerPageSagas = [getCustomerListSaga];

function* getCustomerListSaga() {
    yield takeLatest(CustomerPageEvent.GET_CUSTOMER_LIST, callGetCustomerList)
}

function* callGetCustomerList(action: GetCustomerListAction) {
    try {
        const results = yield call(getCustomerList);
        console.log("Response received ==> ", results);
        yield put({
            type: CustomerPageEvent.GET_CUSTOMER_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}
