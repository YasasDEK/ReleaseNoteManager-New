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

import React, { useEffect } from "react"

import { useDispatch } from "react-redux";
import {
    Switch,
    Route,
    BrowserRouter,
} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from '../../router/router'
import ModulePage from "../ModulePage/ModulePage";
// import "./../../resources/css/bootstrap.min.css"
// import "./../../resources/css/paper-dashboard.css?v=2.0.1"
// import "./../../resources/css/styles.css"
import "./../../resources/css/fontawesome-free-5.14.0-web/css/all.css"
import "./../../resources/css/animate.css"
import "./../../resources/css/style.css"
// import "./../../resources/css/bootstrap.min.css"
import AnotherPage from "../AnotherPage/AnotherPage";
import VersionHistoryPage from "../VesionHistoryPage/VersionHistoryPage"
import CustomerHomePage from "../CustomerPage/CustomerHomePage"
import DeploymentLocationPage from "../Deployment/DeploymentLocationPage/DeploymentLocationPage"
import DeploymentModules from "../Deployment/DeploymentModules/DeploymentModules"
import CreateDevReleaseNote from "../ReleaseNote/DEV/CreateDevReleaseNote/CreateDevReleaseNote"
import DeploymentTimeLine from "../Deployment/DeploymentTimeLine/DeploymentTimeLinePage"
import ViewDevReleaseNotePage from "../ReleaseNote/DEV/ViewDevReleaseNote/ViewDevReleaseNotePage"
import EditDevReleaseNote from "../ReleaseNote/DEV/EditDevReleaseNote/EditDevReleaseNote"
import DeployToLocationPage from "../Deployment/DeployToLocation/DeployToLocationPage"
import AddNewTag from "../AddNewTag/AddNewTag"
import ViewModuleDeploymentData from "../Deployment/ViewModuleDeployment/ViewModuleDeploymentData"
import CreateDAReleaseNote from "../ReleaseNote/DA/CreateDAReleaeNote/CreateDAReleaseNote"
import ViewDAReleaseNotePage from "../ReleaseNote/DA/ViewDAReleaseNote/ViewDAReleaseNotePage"
import EditDAReleaseNote from "../ReleaseNote/DA/EditDAReleaseNote/EditDAReleaseNote"

interface MainUiProps {
    userDetails: any
}

// const ROLES = {
//     USER: "app-user",
//     ADMIN: "app-admin",
// };

// function renderSwitch(userDetails: any) {
//     console.log("user",userDetails)
//     switch (userDetails.userRole) {
//         case ROLES.USER:
//             return <Redirect exact from="/" to="/another" />;
//         case ROLES.ADMIN:
//             return <Redirect exact from="/" to="/another" />;
//         default:
//             return <Redirect exact from="/" to="/another" />;;
//     }
// }

export function MainUi(props: MainUiProps) {
    // console.log("props",props)
    const dispatch = useDispatch();
    const { userDetails, ...other } = props

    useEffect(() => {
        // dispatch(setUserAction(userDetails));
    }, []);

    return (
        <>
            <ConnectedRouter history={history}>
                <div className="wrapper ">
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/webapp/home" render={() => <ModulePage />} />
                            <Route exact path="/webapp/another" render={() => <AnotherPage />} />
                            <Route exact path="/webapp/home/versions/:module/:name" render={() => <VersionHistoryPage />} />
                            <Route exact path="/webapp/home/versions/:module/:tagId/:version/:name/:branch/createdevnewrelease" render={() => <CreateDevReleaseNote />} />
                            <Route exact path="/webapp/customer" render={() => <CustomerHomePage />} />
                            <Route exact path="/webapp/customer/:customer/:name/deploymentlocation" render={() => <DeploymentLocationPage />} />
                            <Route exact path="/webapp/customer/:customer/:name/deploymentlocation/:location/modules" render={() => <DeploymentModules />} />
                            <Route exact path="/webapp/customer/:customer/:name/deploymentlocation/:location/modules/:module/history/:moduleName" render={() => <DeploymentTimeLine />} />
                            <Route exact path="/webapp/home/versions/devview/:module/:name/:version/:tag/:branch/:customer" render={() => <ViewDevReleaseNotePage />} />
                            <Route exact path="/webapp/home/versions/edit/:module/:name/:version/:tag/:customer/:branch" render={() => <EditDevReleaseNote />} />
                            <Route exact path="/webapp/home/versions/view/deployment/:module/:name/:version/:customerId" render={() => <DeployToLocationPage userDetails={userDetails}/>} />
                            <Route exact path="/webapp/home/versions/:module/:name/createnewtag" render={() => <AddNewTag />} />
                            <Route exact path="/webapp/home/versions/deployment/view/:moduleId/:moduleName/:customerId/:customerName/:location/:versionNo/:tagId/:branchName" render={() => <ViewModuleDeploymentData />} />
                            <Route exact path="/webapp/home/versions/deployment/view/:moduleId/:moduleName/:customerId/:customerName/:location/:versionNo/:tagId/:branchName/da" render={() => <CreateDAReleaseNote userDetails={userDetails}/>} />
                            <Route exact path="/webapp/home/da/view/:module/:name/:version/:tag/:branch/:customer/:customerName" render={() => <ViewDAReleaseNotePage />} />
                            <Route exact path="/webapp/home/da/edit/:moduleId/:moduleName/:versionNo/:tagId/:branchName/:customerId" render={() => <EditDAReleaseNote userDetails={userDetails}/>} />
                            <Route exact path="/*" render={() => <ModulePage />} />
                        </Switch>
                    </BrowserRouter>
                </div>

            </ConnectedRouter>

        </>
    )
}


{/* <Route exact path="/home" render={() => 
                            userDetails.userRole == ROLES.USER || userDetails.userRole == ROLES.ADMIN ? 
                            <ModulePage /> : <AnotherPage />} /> */}