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
import { useLocation, useParams, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Container, Col } from 'reactstrap';
import HeaderNavBar from "../../Common/HeaderNavBar"
import { LocationForDeployToLocation, CustomerForDeployToLocation, VersionForDeployToLocation } from "../../../api/apiDomain";
import { useDispatch } from "react-redux";
import {
    CustomerForDeployToLocationPageEvent,
    useCustomerForDeployToLocationPageDataSelector,
    VersionForDeployToLocationPageEvent,
    useVersionForDeployToLocationPageDataSelector,
    LocationForDeployToLocationPageEvent,
    useLocationForDeployToLocationPageDataSelector
} from "./index";
import { LoadingStatus } from "../../../rootReducer/actions";
import LoaderPage from "../../Common/LoaderPage";
import { getModuleIdForDeployToLocation, deployToLocation } from "../../../api/apiCalls"
import FooterBar from "../../Common/FooterBar"

interface RouteParams {
    module: string,
    name: string,
    version: string,
    customerId: string
}

interface DeployToLocationProps {
    userDetails: any
}

let depLo = ""
let cusId = 0

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var todayDate = yyyy + '-' + mm + '-' + dd;


export default function DeployToLocationPage(props: DeployToLocationProps) {

    const { userDetails, ...other } = props
    const dispatch = useDispatch();

    const customerData = useCustomerForDeployToLocationPageDataSelector();
    const VersionData = useVersionForDeployToLocationPageDataSelector();
    const LocationData = useLocationForDeployToLocationPageDataSelector();
    const params = useParams<RouteParams>()
    const history = useHistory()
    const location = useLocation();

    getModuleIdForDeployToLocation(params.module)

    const [customerId, setCustomerId] = useState(params.customerId);
    const [deploymentLocation, setDeploymentLocation] = useState("");
    const [moduleId, setModuleId] = useState(params.module);
    const [version, setVersion] = useState(params.version);
    const [appliedDate, setAppliedDate] = useState(todayDate);
    const [appliedBy, setAppliedBy] = useState(userDetails.fullName);
    const [comments, setComments] = useState("");
    const [previousVersion, setPreviousVersion] = useState("");
    const [status, setStatus] = useState("")

    let deployToLocationDetails = {
        customerId: customerId,
        deploymentLocation: deploymentLocation,
        moduleId: moduleId,
        versionNo: version,
        appliedDate: appliedDate,
        appliedBy: appliedBy,
        comments: comments,
        previousVersion: previousVersion,
        status: status
    }

    function deployDataToLocation() {
        if (deployToLocationDetails.status == "") {
            alert("status can not be empty")
        } else if (deployToLocationDetails.deploymentLocation == "") {
            alert("deployment location can not be empty")
        } else {
            deployToLocation(deployToLocationDetails).then((value) => {
                console.log(value)
                alert("Deployed to the loaction");
                history.push("/webapp/home/versions/" + params.module + "/" + params.name)
            }).catch((err) => {
                console.log(err)
                alert("Invalid request or check deployment location already available")
            })
        }
    }

    useEffect(() => {
        dispatch({
            type: CustomerForDeployToLocationPageEvent.GET_CUSTOMER_FOR_DEPLOY_TO_LIST
        })

        dispatch({
            type: VersionForDeployToLocationPageEvent.GET_VERSION_FOR_DEPLOY_TO_LOCATION_LIST
        })

        dispatch({
            type: LocationForDeployToLocationPageEvent.GET_LOCATION_FOR_DEPLOY_TO_LOCATION_LIST
        })

        return function cleanUp() {
            dispatch({ type: CustomerForDeployToLocationPageEvent.RESET }) &&
                dispatch({ type: VersionForDeployToLocationPageEvent.RESET }) &&
                dispatch({ type: LocationForDeployToLocationPageEvent.RESET })
        }

    }, []);

    if (customerData.loadingStatus == LoadingStatus.LOADING_SUCCESS &&
        VersionData.loadingStatus == LoadingStatus.LOADING_SUCCESS &&
        LocationData.loadingStatus == LoadingStatus.LOADING_SUCCESS) {

        return (
            <Container>
                <HeaderNavBar selectedItem={"module"} />

                <div className="sub-header shadow-sm">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>Deploy to Location</h6>
                            </div>
                            <div className="col-sm-8 text-right">
                                {/* <Link to={
                                    {
                                        pathname: "/home/versions/view/deployment/" + params.module + "/" + params.name + "/" + params.version,
                                        state: params.name
                                    }
                                }> */}
                                <button className="btn btn-success w-25" id='deployToLocation' onClick={() => { deployDataToLocation() }}>Deploy to location</button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </div>
                </div>

                <main className="flex-shrink-0 without-left-menu">
                    {/* <h2 className="text-success font-weight-bold mb-3">Deploy Module to location</h2>
                <h6><b>Module Name</b> - {params.name} | <b>Version</b> - {params.version}</h6>
                <br></br> */}
                    <div className="container">
                        <div className="card card-body border-0">
                            <div className="row">
                                <div className="col-sm-2">
                                    <p className="m-0 font-weight-bold">Module Name:</p>
                                </div>
                                <div className="col-sm-10">
                                    <p className="m-0 sub-text font-weight-bold">{params.name}</p>
                                </div>
                                <div className="col-sm-2">
                                    <p className="m-0 font-weight-bold">Version:</p>
                                </div>
                                <div className="col-sm-10">
                                    <p className="m-0 sub-text font-weight-bold">{params.version}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card card-body border-0 mt-3">

                            <Form>
                                <Col>
                                    <FormGroup row>
                                        <Label for="exampleSelect" sm={2}>Customer</Label>
                                        <Col md="6">
                                            <Input
                                                readOnly
                                                value={customerData.data?.customerForDeployToLocation.filter(cus => cus.customerId == parseInt(params.customerId))[0].customerName}
                                                type="text"
                                                name="select"
                                                id="customer"
                                            // onChange={(e) => {
                                            //     setCustomerId(e.target.value);
                                            //     setDeploymentLocation("")
                                            // }}
                                            >
                                                {/* <option value="" disabled selected>select one</option> */}
                                                {customerData.data?.customerForDeployToLocation.filter(cus => cus.customerId == parseInt(params.customerId)).map(cus => <Customers customer={cus} key={cus.customerId} />)}
                                            </Input>

                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleSelect" sm={2}>Location</Label>
                                        <Col md="6">
                                            <Input
                                                value={deploymentLocation}
                                                type="select"
                                                name="select"
                                                id="location"
                                                onChange={(e) => {
                                                    setDeploymentLocation(e.target.value);
                                                }}>
                                                <option value="" disabled selected>select one</option>
                                                {LocationData.data?.locationForDeployToLocation.filter((val) => val.customerId == parseInt(customerId)).map(loc => <Location Location={loc} key={loc.customerId + loc.deploymentLocation} />)}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleSelect" sm={2}>Previous version</Label>
                                        <Col md="6">
                                            <Input
                                                value={previousVersion}
                                                type="select"
                                                name="select"
                                                id="exampleSelect"
                                                onChange={(e) => {
                                                    setPreviousVersion(e.target.value)
                                                }}>
                                                <option value="">select one</option>
                                                {VersionData.data?.deployToLocationGetDataList.filter((val) => val.customerId == parseInt(customerId) && val.deploymentLocation == deploymentLocation && val.versionNo !== params.version).map(dep => <PreviousVersion deploy={dep} key={dep.id} />)}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleSelect" sm={2}>Status</Label>
                                        <Col md="6">
                                            <Input
                                                type="select"
                                                name="select"
                                                id="exampleSelect"
                                                onChange={(e) => {
                                                    setStatus(e.target.value)
                                                }}>
                                                <option value="" disabled selected>select one</option>
                                                <option>Planned</option>
                                                <option>Active</option>
                                                <option>Rejected</option>
                                                <option>Retierd</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleText" sm={2}>Comments</Label>
                                        <Col md="6">
                                            <Input
                                                value={comments}
                                                type="textarea"
                                                name="text"
                                                id="comment"
                                                onChange={(e) => {
                                                    setComments(e.target.value)
                                                }} />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Form>
                        </div>
                    </div>
                </main>
                <FooterBar />
            </Container>
        )
    } else {
        return <LoaderPage />
    }
}

function Customers({ customer }: PropsWithChildren<{ customer: CustomerForDeployToLocation }>) {
    return (
        <option value={customer.customerId}>
            {customer.customerName}
        </option>
    )
}

function PreviousVersion({ deploy }: PropsWithChildren<{ deploy: VersionForDeployToLocation }>) {
    return (
        <option value={deploy.versionNo}>{deploy.versionNo}</option>
    )
    // if (depLo !== "" && cusId !== 0) {
    //     if (deploy.deploymentLocation == depLo && deploy.customerId == cusId) {
    //         return (
    //             <option value={deploy.versionNo}>{deploy.versionNo}</option>
    //         )
    //     } else {
    //         return (
    //             null
    //         )
    //     }
    // } else {
    //     return (
    //         null
    //     )
    // }
}

function Location({ Location }: PropsWithChildren<{ Location: LocationForDeployToLocation }>) {
    return (
        <option value={Location.deploymentLocation}>{Location.deploymentLocation}</option>
    )
    // if (cusId !== 0) {
    //     if (Location.customerId == cusId) {
    // return (
    //     <option value={Location.deploymentLocation}>{Location.deploymentLocation}</option>
    // )
    //     } else {
    //         return (
    //             null
    //         )
    //     }
    // } else {
    //     return (
    //         null
    //     )
    // }
}