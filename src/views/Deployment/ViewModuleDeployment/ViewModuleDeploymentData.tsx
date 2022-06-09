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

import React, { PropsWithChildren, useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import HeaderNavBar from "../../Common/HeaderNavBar"
import { useViewModuleDeploymentPageDataSelector, ViewModuleDeploymentPageEvent } from "./index"
import { useDispatch } from "react-redux";
import { LoadingStatus } from "../../../rootReducer/actions";
import LoaderPage from "../../Common/LoaderPage";
import { getModuleIdForViewDeploy, getCustomerIdForViewDeploy, getVersionForViewDeploy, getLocationForViewDeploy } from "../../../api/apiCalls"
import { ViewModuleDeployment } from "../../../api/apiDomain"
import { Button, Col, Popover, PopoverBody, PopoverHeader, Row } from "reactstrap";
import { getTagIdForDA, getCustomerIdForDA } from "../../../api/apiCalls"
import { useDAReleaseNotePageDataSelector, DAReleaseNotePageEvent } from "./index";
import FooterBar from "../../Common/FooterBar"

interface RouteParams {
    moduleId: string,
    moduleName: string,
    customerId: string,
    customerName: string,
    location: string,
    versionNo: string,
    tagId: string,
    branchName: string
}
export default function ViewModuleDeploymentData() {
    const params = useParams<RouteParams>();
    const history = useHistory()
    const pageData = useViewModuleDeploymentPageDataSelector();
    const isAvailable = useDAReleaseNotePageDataSelector();
    const dispatch = useDispatch();
    getModuleIdForViewDeploy(params.moduleId)
    getCustomerIdForViewDeploy(params.customerId)
    getVersionForViewDeploy(params.versionNo)
    getLocationForViewDeploy(params.location)
    getTagIdForDA(params.tagId)
    getCustomerIdForDA(params.customerId)


    const [action, setAction] = useState(<p></p>)

    function getAction() {
        if (params.location == "da") {
            if (isAvailable.data?.viewDAReleaseNote.length == 0) {
                return (
                    setAction(
                        <>
                            <Link to={{
                                pathname: "/webapp/home/versions/deployment/view/" + params.moduleId + "/" + params.moduleName + "/" + params.customerId + "/" + params.customerName + "/" + params.location + "/" + params.versionNo + "/" + params.tagId + "/" + params.branchName + "/da"
                            }}>
                                <button className="btn btn-sm btn-primary">Create {params.versionNo} DA Release Note</button>
                            </Link>
                            <button className="btn btn-sm btn-primary mt-3">Create Cycle closure</button>
                        </>
                    )
                )
            } else {
                return (
                    setAction(
                        <>
                            <button className="btn btn-sm btn-primary" disabled>Create {params.versionNo} DA Release Note &#9989;</button>
                            <button className="btn btn-sm btn-primary mt-3">Create Cycle closure</button>
                        </>
                    )
                )
            }
        } else {
            setAction(
                <>
                    <button className="btn btn-sm btn-primary mt-3">Create Implementation Release Note</button>
                </>
            )
        }


    }

    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    useEffect(() => {
        dispatch({
            type: ViewModuleDeploymentPageEvent.GET_MODULE_DEPLOYMENT_LIST
        })

        dispatch({
            type: DAReleaseNotePageEvent.GET_DA_RELEASE_NOTE_LIST
        })

        return function cleanUp() {
            dispatch({ type: ViewModuleDeploymentPageEvent.RESET }) &&
                dispatch({ type: DAReleaseNotePageEvent.RESET })
        }

    }, []);

    if (pageData.loadingStatus == LoadingStatus.LOADING_SUCCESS &&
        isAvailable.loadingStatus == LoadingStatus.LOADING_SUCCESS) {

        return (
            <>
                <HeaderNavBar selectedItem={"module"} />

                <div className="sub-header shadow-sm">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>View Module Deployment</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="flex-shrink-0 without-left-menu">
                    <div className="container">
                        <div className="card card-body border-0">
                            <div className="row">
                                <div className="col-sm-2">
                                    <p className="m-0 font-weight-bold">Module</p>
                                </div>
                                <div className="col-sm-10">
                                    <p className="m-0 sub-text font-weight-bold">{params.moduleName}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <p className="m-0 font-weight-bold">Customer</p>
                                </div>
                                <div className="col-sm-10">
                                    <p className="m-0 sub-text font-weight-bold">{params.customerName}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <p className="m-0 font-weight-bold">Version No</p>
                                </div>
                                <div className="col-sm-10">
                                    <p className="m-0 sub-text font-weight-bold">{params.versionNo}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <p className="m-0 font-weight-bold">Deployment Location</p>
                                </div>
                                <div className="col-sm-10">
                                    <p className="m-0 sub-text font-weight-bold">{params.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card card-body border-0  mt-3">
                            <div className="row mt-3">
                                <div className="col-sm-10">
                                    <p className="m-0">
                                        <Row>
                                            <Col md="3"><b>Release Note</b></Col>
                                            <Col><Link to={"/webapp/home/versions/devview/" + params.moduleId + "/" + params.moduleName + "/" + params.versionNo + "/" + params.tagId + "/" + params.branchName + "/" + params.customerId}><Button className="btn btn-sm btn-success">View</Button></Link></Col>
                                            <Col className="text-right">
                                                <button id="Popover1" className="btn btn-sm btn-secondary" onClick={getAction}>Actions</button>
                                                <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                                                    <PopoverHeader>Actions</PopoverHeader>
                                                    <PopoverBody>{action}</PopoverBody>
                                                </Popover>
                                            </Col>
                                        </Row>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {pageData.data?.viewModuleDeployment.map(data => <Data data={data} key={data.customerId + data.moduleId} />)}

                    </div>
                </main>
                <FooterBar />
            </>

        )

    } else {
        return <LoaderPage />
    }
}

function Data({ data }: PropsWithChildren<{ data: ViewModuleDeployment }>) {

    return (
        <>
            <div className="card card-body border-0  mt-3">
                <div className="row mt-3">
                    <div className="col-sm-10">
                        <p className="m-0">
                            <Row>
                                <Col md="3"><b>Deployed Date</b></Col>
                                <Col>{data.appliedDate[0]}-{data.appliedDate[1]}-{data.appliedDate[2]}</Col>
                            </Row>
                            <Row>
                                <Col md="3"><b>Deployed By</b></Col>
                                <Col>{data.appliedBy}</Col>
                            </Row>
                            <Row>
                                <Col md="3"><b>Previous version</b></Col>
                                <Col>{data.previousVersion}</Col>
                            </Row>
                            <Row>
                                <Col md="3"><b>Status</b></Col>
                                {data.status == "Rejected" ? <span className="col-sm-2">
                                        <Col className="badge badge-danger">{data.status}</Col>
                                    </span> : <Col>{data.status}</Col>
                                }

                            </Row>
                            <Row>
                                <Col md="3"><b>Comments</b></Col>
                                <Col>{data.comments}</Col>
                            </Row>
                        </p>
                    </div>
                </div>
            </div>
        </>

    )
}