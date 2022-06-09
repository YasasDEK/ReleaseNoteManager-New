import produce from "immer"

import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus, usePortalStateSelector} from "../../../../rootReducer/actions";
import {
    getDevReleaseNoteList,
    getReleaseNoteforEditRelease, 
    getDependentModulesList} from "../../../../api/apiCalls";
import {
    ViewDevReleaseNoteList, 
    VersionHistoryInEditReleaseNoteList, 
    DependentModulesList} from "../../../../api/apiDomain";

export enum EditReleaseNotePageEvent {
    RESET = "@editRelease/RESET",
    GET_EDIT_RELEASE_NOTE_LIST = "@editRelease/GET_EDIT_RELEASE_NOTE_LIST",
    GET_EDIT_RELEASE_NOTE_LIST_RESULT = "@editRelease/GET_EDIT_RELEASE_NOTE_LIST_RESULT"

}

export interface GetEditReleaseNoteListResetAction {
    type: EditReleaseNotePageEvent.RESET
}

export interface GetEditReleaseNoteListAction {
    type: EditReleaseNotePageEvent.GET_EDIT_RELEASE_NOTE_LIST
}

export interface GetEditReleaseNoteListResultsAction {
    type: EditReleaseNotePageEvent.GET_EDIT_RELEASE_NOTE_LIST_RESULT,
    results: ViewDevReleaseNoteList
}

export type EditReleaseNotePageAction = GetEditReleaseNoteListResetAction
    | GetEditReleaseNoteListAction
    | GetEditReleaseNoteListResultsAction

export interface EditReleaseNotePageData {
    loadingStatus: LoadingStatus,
    data?: ViewDevReleaseNoteList
}

const initialState = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function EditReleaseNotePageReducer(state: EditReleaseNotePageData = initialState, action: EditReleaseNotePageAction) {
    // console.log("type",action.type)
    return produce(state, draft => {
            switch (action.type) {

                case EditReleaseNotePageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case EditReleaseNotePageEvent.GET_EDIT_RELEASE_NOTE_LIST: {
                    break;
                }

                case EditReleaseNotePageEvent.GET_EDIT_RELEASE_NOTE_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useEditReleaseNotePageDataSelector(): EditReleaseNotePageData {
    return usePortalStateSelector<EditReleaseNotePageData>(ev => ev.EditReleaseNotePageData)
}

export const EditReleaseNotePageSagas = [getEditReleaseNoteListSaga];

function* getEditReleaseNoteListSaga() {
    yield takeLatest(EditReleaseNotePageEvent.GET_EDIT_RELEASE_NOTE_LIST, callGetEditReleaseNoteList)
}

function* callGetEditReleaseNoteList(action: GetEditReleaseNoteListAction) {
    try {
        const results = yield call(getDevReleaseNoteList);
        console.log("Response received ==> ", results);
        yield put({
            type: EditReleaseNotePageEvent.GET_EDIT_RELEASE_NOTE_LIST_RESULT,
            results: results
        });
    } catch (e) {
        console.error(e);
        // yield put({type: RegisterUserEvent.LOAD_INVITATION_ERROR})
    }
}

/*******************************************************************************************/

export enum VersionHistoryInReleaseNoteEditPageEvent {
    RESET = "@versionsGet/RESET",
    GET_VERSION_LIST = "@versionsGet/GET_VERSION_LIST",
    GET_VERSION_LIST_RESULT = "@versionsGet/GET_VERSION_LIST_RESULT"

}

export interface GetVersionHistoryInReleaseNoteEditListResetAction {
    type: VersionHistoryInReleaseNoteEditPageEvent.RESET
}

export interface GetVersionHistoryInReleaseNoteEditListAction {
    type: VersionHistoryInReleaseNoteEditPageEvent.GET_VERSION_LIST
}

export interface GetVersionHistoryInReleaseNoteEditListResultsAction {
    type: VersionHistoryInReleaseNoteEditPageEvent.GET_VERSION_LIST_RESULT,
    results: VersionHistoryInEditReleaseNoteList
}

export type VersionHistoryInReleaseNoteEditPageAction = GetVersionHistoryInReleaseNoteEditListResetAction
    | GetVersionHistoryInReleaseNoteEditListAction
    | GetVersionHistoryInReleaseNoteEditListResultsAction

export interface VersionHistoryInReleaseNoteEditPageData {
    loadingStatus: LoadingStatus,
    data?: VersionHistoryInEditReleaseNoteList
}

const initialState2 = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function VersionHistoryInReleaseNoteEditPageReducer(state: VersionHistoryInReleaseNoteEditPageData = initialState2, action: VersionHistoryInReleaseNoteEditPageAction) {
    // console.log("type",action.type)
    return produce(state, draft => {
            switch (action.type) {

                case VersionHistoryInReleaseNoteEditPageEvent.RESET: {
                    draft.loadingStatus = LoadingStatus.LOADING_STARTED;
                    draft.data = undefined;
                    break;
                }
                case VersionHistoryInReleaseNoteEditPageEvent.GET_VERSION_LIST: {
                    break;
                }

                case VersionHistoryInReleaseNoteEditPageEvent.GET_VERSION_LIST_RESULT: {
                    draft.loadingStatus = LoadingStatus.LOADING_SUCCESS;
                    draft.data = action.results;
                    break;
                }
            }
        }
    )
}

export function useVersionHistoryInReleaseNoteEditPageDataSelector(): VersionHistoryInReleaseNoteEditPageData {
    return usePortalStateSelector<VersionHistoryInReleaseNoteEditPageData>(ev => ev.VersionHistoryInReleaseNoteEditPageData)
}

export const VersionHistoryInReleaseNoteEditPageSagas = [getVersionHistoryInReleaseNoteEditListSaga];

function* getVersionHistoryInReleaseNoteEditListSaga() {
    yield takeLatest(VersionHistoryInReleaseNoteEditPageEvent.GET_VERSION_LIST, callGetVersionHistoryInReleaseNoteEditList)
}

function* callGetVersionHistoryInReleaseNoteEditList(action: GetVersionHistoryInReleaseNoteEditListAction) {
    try {
        const results = yield call(getReleaseNoteforEditRelease);
        console.log("Response received ==> ", results);
        yield put({
            type: VersionHistoryInReleaseNoteEditPageEvent.GET_VERSION_LIST_RESULT,
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

const initialState3 = {
    loadingStatus: LoadingStatus.LOADING_STARTED
};

export function DependentModulesPageReducer(state: DependentModulesPageData = initialState3, action: DependentModulesPageAction) {
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