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

import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { history, routeSagas } from "../router/router";
import { connectRouter, routerMiddleware, RouterState } from "connected-react-router";
import { HomePageData, homePageReducer, HomePageSagas } from "../views/ModulePage";
import { CustomerPageData, customerPageReducer, CustomerPageSagas } from "../views/CustomerPage";
import { 
    VersionHistoryDataPageData, 
    VersionHistoryDataPageReducer, 
    VersionHistoryDataPageSagas,
    ModulesUsingIdPageData,
    ModulesUsingIdPageReducer,
    ModulesUsingIdPageSagas 
} from "../views/VesionHistoryPage";
import { DeploymentLocationPageData, DeploymentLocationPageReducer, DeploymentLocationPageSagas } from "../views/Deployment/DeploymentLocationPage";
import { ModulesForLocationPageData, ModulesForLocationPageReducer, ModulesForLocationPageSagas } from "../views/Deployment/DeploymentModules"
import { DeploymentTimeLinePageData, DeploymentTimeLinePageReducer, DeploymentTimeLinePageSagas } from "../views/Deployment/DeploymentTimeLine"
import { 
    DependentModulesPageData, 
    DependentModulesPageReducer, 
    DependentModulesPageSagas,
    CustomerForModulePageData,
    CustomerForModulePageReducer,
    CustomerForModulePageSagas } from "../views/ReleaseNote/DEV/CreateDevReleaseNote"
import { 
    DevReleaseNotePageData, 
    DevReleaseNotePageReducer, 
    DevReleaseNotePageSagas,
    DeploymentHistoryPageData,
    DeploymentHistoryPageReducer,
    DeploymentHistoryPageSagas } from "../views/ReleaseNote/DEV/ViewDevReleaseNote"
import { EditReleaseNotePageData, EditReleaseNotePageReducer, EditReleaseNotePageSagas } from "../views/ReleaseNote/DEV/EditDevReleaseNote"
import {
    VersionHistoryInReleaseNoteEditPageData,
    VersionHistoryInReleaseNoteEditPageReducer,
    VersionHistoryInReleaseNoteEditPageSagas
} from "../views/ReleaseNote/DEV/EditDevReleaseNote"
import {
    VersionForDeployToLocationPageData,
    VersionForDeployToLocationPageReducer,
    VersionForDeployToLocationPageSagas,
    CustomerForDeployToLocationPageData,
    CustomerForDeployToLocationPageReducer,
    CustomerForDeployToLocationPageSagas,
    LocationForDeployToLocationPageData,
    LocationForDeployToLocationPageReducer,
    LocationForDeployToLocationPageSagas
} from "../views/Deployment/DeployToLocation"
import {
    ViewModuleDeploymentPageData,
    ViewModuleDeploymentPageSagas,
    ViewModuleDeploymentPageReducer
} from "../views/Deployment/ViewModuleDeployment"
import {
    DAReleaseNotePageData,
    DAReleaseNotePageSagas,
    DAReleaseNotePageReducer
} from "../views/ReleaseNote/DA/ViewDAReleaseNote"

export interface PortalState {
    router: RouterState<unknown>,
    homePageData: HomePageData,
    customerPageData: CustomerPageData,
    VersionHistoryDataPageData: VersionHistoryDataPageData,
    DeploymentLocationPageData: DeploymentLocationPageData,
    ModulesForLocationPageData: ModulesForLocationPageData,
    DeploymentTimeLinePageData: DeploymentTimeLinePageData,
    DependentModulesPageData: DependentModulesPageData,
    DevReleaseNotePageData: DevReleaseNotePageData,
    EditReleaseNotePageData: EditReleaseNotePageData,
    VersionHistoryInReleaseNoteEditPageData: VersionHistoryInReleaseNoteEditPageData,
    VersionForDeployToLocationPageData: VersionForDeployToLocationPageData,
    CustomerForDeployToLocationPageData: CustomerForDeployToLocationPageData,
    LocationForDeployToLocationPageData: LocationForDeployToLocationPageData,
    DeploymentHistoryPageData: DeploymentHistoryPageData,
    CustomerForModulePageData: CustomerForModulePageData,
    ViewModuleDeploymentPageData: ViewModuleDeploymentPageData,
    DAReleaseNotePageData: DAReleaseNotePageData,
    ModulesUsingIdPageData: ModulesUsingIdPageData
    // VersionHistoryPageData:VersionHistoryPageData
}

const rootReducer = (history: any) => combineReducers<PortalState>({
    router: connectRouter(history),
    homePageData: homePageReducer,
    customerPageData: customerPageReducer,
    VersionHistoryDataPageData: VersionHistoryDataPageReducer,
    DeploymentLocationPageData: DeploymentLocationPageReducer,
    ModulesForLocationPageData: ModulesForLocationPageReducer,
    DeploymentTimeLinePageData: DeploymentTimeLinePageReducer,
    DependentModulesPageData: DependentModulesPageReducer,
    DevReleaseNotePageData: DevReleaseNotePageReducer,
    EditReleaseNotePageData: EditReleaseNotePageReducer,
    VersionHistoryInReleaseNoteEditPageData: VersionHistoryInReleaseNoteEditPageReducer,
    VersionForDeployToLocationPageData :VersionForDeployToLocationPageReducer,
    CustomerForDeployToLocationPageData: CustomerForDeployToLocationPageReducer,
    LocationForDeployToLocationPageData: LocationForDeployToLocationPageReducer,
    DeploymentHistoryPageData: DeploymentHistoryPageReducer,
    CustomerForModulePageData: CustomerForModulePageReducer,
    ViewModuleDeploymentPageData: ViewModuleDeploymentPageReducer,
    DAReleaseNotePageData: DAReleaseNotePageReducer,
    ModulesUsingIdPageData: ModulesUsingIdPageReducer
    // VersionHistoryPageData: VersionHistoryPageReducer
});

function* rootSaga() {
    let sagas = [
        ...routeSagas,
        ...HomePageSagas,
        ...CustomerPageSagas,
        ...VersionHistoryDataPageSagas,
        ...DeploymentLocationPageSagas,
        ...ModulesForLocationPageSagas,
        ...DeploymentTimeLinePageSagas,
        ...DependentModulesPageSagas,
        ...DevReleaseNotePageSagas,
        ...EditReleaseNotePageSagas,
        ...VersionHistoryInReleaseNoteEditPageSagas,
        ...VersionForDeployToLocationPageSagas,
        ...CustomerForDeployToLocationPageSagas,
        ...LocationForDeployToLocationPageSagas,
        ...DeploymentHistoryPageSagas,
        ...CustomerForModulePageSagas,
        ...ViewModuleDeploymentPageSagas,
        ...DAReleaseNotePageSagas,
        ...ModulesUsingIdPageSagas
        // ...VersionHistoryPageSagas
    ];

    yield all(sagas.map(s => fork(s)));
}


function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    //const logger = createLogger();
    const middlewares = [routerMiddleware(history), sagaMiddleware];
    const store = createStore(rootReducer(history), {}, applyMiddleware(...middlewares));
    sagaMiddleware.run(rootSaga);
    return store;
}

export default configureStore;


