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
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import React, { PropsWithChildren, useEffect } from "react";
import { useDeploymentLocationPageDataSelector, DeploymentLocationPageEvent } from "./index";
import { DeploymentLocation } from "../../../api/apiDomain";

import { useDispatch } from "react-redux";
import { LoadingStatus } from "../../../rootReducer/actions";
import LoaderPage from "../../Common/LoaderPage";
import { getCustomerId } from "../../../api/apiCalls"
import HeaderNavBar from "../../Common/HeaderNavBar"
import FooterBar from "../../Common/FooterBar"

interface RouteParams {
    customer: string,
    name: string
}

export default function DeploymentLocationPage() {
    const params = useParams<RouteParams>();
    const history = useHistory()
    const pageData = useDeploymentLocationPageDataSelector();
    const dispatch = useDispatch();
    let location = useLocation();
    getCustomerId(params.customer);

    useEffect(() => {
        dispatch({
            type: DeploymentLocationPageEvent.GET_DEPLOYMENT_LIST
        })

        return function cleanUp() {
            dispatch({ type: DeploymentLocationPageEvent.RESET })
        }

    }, []);

    if (pageData.loadingStatus == LoadingStatus.LOADING_SUCCESS) {

        return (
            <>
                <HeaderNavBar selectedItem={"customer"} />
                <div className="sub-header shadow-sm">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>Deployment Location</h6>
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
                        </div>
                        <div className="row mt-3">
                            {pageData.data?.deploymentLocation.map(dep => <DeploymentLocationCard deploymentLocation={dep} key={dep.deployment_location} />)}
                        </div>
                    </div>
                </main>
                <FooterBar />
            </>
        )
    } else {
        return <LoaderPage />
    }
}

function DeploymentLocationCard({ deploymentLocation }: PropsWithChildren<{ deploymentLocation: DeploymentLocation }>) {
    const params = useParams<RouteParams>();

    return (
        <div className="col-sm-4 mb-3">
            <Link to={
                {
                    pathname: "/webapp/customer/" + params.customer + "/" + params.name + "/deploymentlocation/" + deploymentLocation.deployment_location + "/modules/",
                    state: params.name,
                }
            }>
                <div className="card card-body border-0">
                    <p className="m-0 font-weight-bold">{deploymentLocation.deployment_location}</p>
                </div>
            </Link>
        </div>
    )
}



