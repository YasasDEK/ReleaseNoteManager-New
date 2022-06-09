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
import React, { PropsWithChildren, useState, useEffect, useRef } from "react";
import { useVersionHistoryDataPageDataSelector, VersionHistoryDataPageEvent, useModulesUsingIdPageDataSelector, ModulesUsingIdPageEvent } from "./index";
import { VersionHistoryData, VersionHistoryOtherData, DeployedLocation,Module } from "../../api/apiDomain";
import { useDispatch } from "react-redux";
import { LoadingStatus } from "../../rootReducer/actions";
import LoaderPage from "../Common/LoaderPage";
import { getmoduleIdForVersionHistory } from "../../api/apiCalls"
import HeaderNavBar from "../Common/HeaderNavBar"
import FooterBar from "../Common/FooterBar"
import AddNewTag from "../AddNewTag/AddNewTag"

interface RouteParams {
    module: string,
    name: string
}

export default function VersionHistoryPage() {

    const params = useParams<RouteParams>();
    const history = useHistory()
    const pageData = useVersionHistoryDataPageDataSelector();
    const moduleData = useModulesUsingIdPageDataSelector();
    const [search, setSearch] = useState("");
    let filteredList = pageData.data?.versionHistoryData.filter(
        (version) => {
            return version.versionNo.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
    );

    const dispatch = useDispatch();
    let location = useLocation();
    let moduleId = params.module;
    let moduleName = params.name;
    getmoduleIdForVersionHistory(moduleId);


    useEffect(() => {
        dispatch({
            type: VersionHistoryDataPageEvent.GET_VERSION_DATA_LIST
        })

        dispatch({
            type: ModulesUsingIdPageEvent.GET_MODULE_LIST
        })

        return function cleanUp() {
            dispatch({ type: VersionHistoryDataPageEvent.RESET }) &&
            dispatch({ type: ModulesUsingIdPageEvent.RESET })
        }

    }, []);

    if (pageData.loadingStatus == LoadingStatus.LOADING_SUCCESS &&
        moduleData.loadingStatus == LoadingStatus.LOADING_SUCCESS) {

        return (
            <>
                <HeaderNavBar selectedItem={"module"} />

                <div className="sub-header shadow-sm">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>Version History</h6>
                            </div>
                            <div className="col-sm-6 text-right">
                                <Link className="btn btn-primary" to={{
                                    pathname: "/webapp/home/versions/" + moduleId + "/" + moduleName + "/createnewtag",
                                    state: params.name
                                }}>
                                    {/* <button className="btn btn-primary" onClick={() => <AddNewTag buttonLabel={"Hello"} className ={""} />}> */}
                                    Create New
                                {/* </button> */}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="flex-shrink-0 without-left-menu">
                    <div className="container">
                        <div className="card card-body border-0">
                            <div className="row">
                                <div className="col-sm-2">
                                    <p className="m-0 font-weight-bold">Module Name:</p>
                                </div>
                                <div className="col-sm-10">
                                    <p className="m-0 sub-text font-weight-bold">{params.name}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <p className="m-0 font-weight-bold">Git Location:</p>
                                </div>
                                <div className="col-sm-10">
                                    <Link target='_blank' to={{
                                        pathname: moduleData.data?.modules[0].git
                                    }}>
                                        <p className="m-0 sub-text font-weight-bold">{moduleData.data?.modules[0].git}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card card-body border-0 mt-3">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="input-group">
                                        <input type="search" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Search by Version" aria-label="Search by Version" aria-describedby="button-addon1" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button" id="button-addon1"><i className="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive p-0 mt-3">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Version</th>
                                            <th className="text-center">Customer</th>
                                            <th className="text-center">Date</th>
                                            <th >Current Active Deployment</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredList?.map(ver => <TableRow version={ver} key={ver.tagId + ver.versionNo} />)}
                                    </tbody>
                                </table>
                            </div>
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

function TableRow({ version }: PropsWithChildren<{ version: VersionHistoryData }>) {
    const params = useParams<RouteParams>();
    let location = useLocation();

    if (version.details.length == 0) {
        return (
            <>
                <tr>
                    <td>
                        <Link title="View dev release note" className="btn btn-primary btn-sm" to={{
                            pathname: "/webapp/home/versions/" + params.module + "/" + version.tagId + "/" + version.versionNo + "/" + params.name + "/" + version.branchName + "/createdevnewrelease"
                        }}>+
                </Link> {version.versionNo}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </>
        )
    } else {

        return (
            <>
                {version.details?.map((data, i) => {
                    let col = i == 0 ? <td rowSpan={version.details.length}>
                        <Link title="View dev release note" className="btn btn-primary btn-sm" to={{
                            pathname: "/webapp/home/versions/" + params.module + "/" + version.tagId + "/" + version.versionNo + "/" + params.name  + "/" + version.branchName  + "/createdevnewrelease"
                        }}>+
                </Link> {version.versionNo}
                    </td> : null
                    return (<Customer other={data} versionCol={col} key={data.customerId} />)

                }
                )
                }

            </>

        )
    }

    function Customer({ other, versionCol }: PropsWithChildren<{ other: VersionHistoryOtherData, versionCol: any }>) {
        const params = useParams<RouteParams>();
        let location = useLocation();
        let da = 0;
        other.deploymentData.filter((data) => data.deploymentLocation == "da").length == 0 ? da = 0 : da = 1
        return (
            <>
                <tr>
                    {versionCol}
                    <td className="text-center">{other.customerName}</td>
                    <td className="text-center" align="center">{other.date[0]}-{other.date[1]}-{other.date[2]}</td>
                    <td>{other.deploymentData?.map(data => <DeploymentData deployment={data} key={data.deploymentLocation} />)}</td>
                    <td className="text-center">
                        <Link title="View dev release note" to={{
                            pathname: "/webapp/home/versions/devview/" + params.module + "/" + params.name + "/" + version.versionNo + "/" + version.tagId + "/" + version.branchName + "/" + other.customerId
                        }}>Dev release note
                        </Link>
                        <br></br>
                        {da == 1 ? (<Link title="View dev release note" to={{
                            pathname: "/webapp/home/da/view/" + params.module + "/" + params.name + "/" + version.versionNo + "/" + version.tagId + "/" + version.branchName + "/" + other.customerId + "/" + other.customerName
                        }}>DA release note
                        </Link>) : null}
                    </td>
                </tr>
            </>

        )


        function DeploymentData({ deployment }: PropsWithChildren<{ deployment: DeployedLocation }>) {
            const params = useParams<RouteParams>();
            let location = useLocation();
            return (
                <>
                    <Link title="View dev release note" to={{
                        pathname: "/webapp/home/versions/deployment/view/" + params.module + "/" + params.name + "/" + other.customerId + "/" + other.customerName + "/" + deployment.deploymentLocation + "/" + version.versionNo + "/" + version.tagId + "/" + version.branchName
                    }}>{deployment.deploymentLocation}<br></br>
                    </Link>

                </>

            )
        }
    }
}

function Date({ other }: PropsWithChildren<{ other: VersionHistoryOtherData }>) {
    const params = useParams<RouteParams>();
    let location = useLocation();
    return (
        <>
            <tr>
                <td>{other.date[0]}-{other.date[1]}-{other.date[2]}</td>
            </tr>
        </>

    )
}