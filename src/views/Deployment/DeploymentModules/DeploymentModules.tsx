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
// nodejs library that concatenates classes
import {Link, useLocation, useParams, useHistory} from "react-router-dom";
import React, {PropsWithChildren, useEffect, useState} from "react";
import {useModulesForLocationPageDataSelector, ModulesForLocationPageEvent} from "./index";
import {ModulesForLocation} from "../../../api/apiDomain";

import {useDispatch} from "react-redux";
import {LoadingStatus} from "../../../rootReducer/actions";
import LoaderPage from "../../Common/LoaderPage";
import {getLocation, getCusId} from "../../../api/apiCalls"
import HeaderNavBar from "../../Common/HeaderNavBar"
import FooterBar from "../../Common/FooterBar"

interface RouteParams {
    customer: string,
    name: string,
    location: string,
}

export default function DeploymentModules() {
    const params = useParams<RouteParams>();
    const history = useHistory()
    getLocation(params.location);
    getCusId(params.customer)
    let location = useLocation();
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const pageData = useModulesForLocationPageDataSelector();
    let filteredList = pageData.data?.modulesForLocation.filter(
        (modulesForLocation) => {
            return modulesForLocation.module_name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
    );

    useEffect(() => {
        dispatch({
            type: ModulesForLocationPageEvent.GET_MODULES_FOR_LOCATION_LIST
        })

        return function cleanUp() {
            dispatch({type: ModulesForLocationPageEvent.RESET})
        }
    }, []);

    if (pageData.loadingStatus == LoadingStatus.LOADING_SUCCESS) {
        return (
            <>
                <HeaderNavBar selectedItem={"customer"}/>
                <div className="sub-header shadow-sm">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <h6 className="my-2 font-weight-bold">
                                    <button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i
                                        className="fas fa-angle-left"></i></button>
                                    Modules
                                </h6>
                            </div>
                            <div className="col-sm-6">
                                <div className="input-group">
                                    <input type="search" className="form-control"
                                           onChange={(e) => setSearch(e.target.value)} placeholder="Search Module"
                                           aria-label="Search Module" aria-describedby="button-addon1"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button" id="button-addon1"><i
                                            className="fas fa-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="flex-shrink-0 without-left-menu">
                    <div className="container">
                        <div className="card card-body border-0">
                            <div className="row">
                                <div className="col-sm-2">
                                    <p className="m-0 font-weight-bold">Customer:</p>
                                </div>
                                <div className="col-sm-10">
                                    <p className="m-0 sub-text font-weight-bold">{params.name}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <p className="m-0 font-weight-bold">Deployment Location:</p>
                                </div>
                                <div className="col-sm-10">
                                    <p className="m-0 sub-text font-weight-bold">{params.location}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {filteredList?.map(mfl => <ModulesForLocationCard modulesForLocation={mfl} key={mfl.id}/>)}
                        </div>
                    </div>
                </main>
                <FooterBar/>
            </>
        );
    } else {
        return <LoaderPage/>
    }
}

function ModulesForLocationCard({modulesForLocation}: PropsWithChildren<{ modulesForLocation: ModulesForLocation }>) {
    let location = useLocation();
    const params = useParams<RouteParams>();
    return (
        <div className="col-sm-4 mb-3">
            <div className="card card-body border-0 text-center">
                <p className="m-0 font-weight-bold">{modulesForLocation.module_name}</p>
                <p className="m-0 font-weight-bold">{modulesForLocation.version_no}</p>
                <div className="row mt-3 justify-content-center">
                    <div className="col-sm-3">
                        <Link title="View release note" className="btn btn-primary btn-circle" to={{
                            pathname: "/webapp/home/versions/devview/" + modulesForLocation.module_id + "/" + modulesForLocation.module_name + "/" + modulesForLocation.version_no + "/" + modulesForLocation.tagId + "/" + modulesForLocation.branchName + "/" + modulesForLocation.customer_id,
                            state: location.state
                        }}>R
                        </Link>
                    </div>
                    <div className="col-sm-3">
                        <Link title="View deployment timeline" className="btn btn-secondary btn-circle" to={{
                            pathname: "/webapp/customer/" + modulesForLocation.customer_id + "/" + params.name + "/deploymentlocation/" + modulesForLocation.deployment_location + "/modules/" + modulesForLocation.module_id + "/history/" + modulesForLocation.module_name,
                            state: location.state
                        }}><i className="fas fa-history"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
