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

import {
    Button,
    Container,
    Row,
    Col,
} from "reactstrap";

import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import React, { PropsWithChildren, useEffect } from "react";
import { useDevReleaseNotePageDataSelector, DevReleaseNotePageEvent, useDeploymentHistoryPageDataSelector, DeploymentHistoryPageEvent } from "./index";
import { ViewDevReleaseNote, DependentModuleVersion, DeploymentHistoryForReleaseNote } from "../../../../api/apiDomain";

import { useDispatch } from "react-redux";
import { LoadingStatus } from "../../../../rootReducer/actions";
import LoaderPage from "../../../Common/LoaderPage";
import { getModuleIdForRelease, getVersionNoforRelease, getTagIdForRelease, getCustomerIdforRelease } from "../../../../api/apiCalls"
import HeaderNavBar from "../../../Common/HeaderNavBar"
import FooterBar from "../../../Common/FooterBar"

interface RouteParams {
    module: string,
    name: string,
    version: string,
    tag: string,
    branch: string,
    customer: string
}

export default function ViewDevReleaseNotePage() {
    const params = useParams<RouteParams>();
    const history = useHistory()
    const pageData = useDevReleaseNotePageDataSelector();
    const deploymentHistory = useDeploymentHistoryPageDataSelector();
    const dispatch = useDispatch();
    const location = useLocation();
    getModuleIdForRelease(params.module)
    getVersionNoforRelease(params.version)
    getTagIdForRelease(params.tag)
    getCustomerIdforRelease(params.customer)

    useEffect(() => {
        dispatch({
            type: DevReleaseNotePageEvent.GET_RELEASE_NOTE_LIST
        })

        dispatch({
            type: DeploymentHistoryPageEvent.GET_DEPLOYMENT_HISTORY_LIST
        })

        return function cleanUp() {
            dispatch({ type: DevReleaseNotePageEvent.RESET }) &&
                dispatch({ type: DeploymentHistoryPageEvent.RESET })
        }

    }, []);

    if (pageData.loadingStatus == LoadingStatus.LOADING_SUCCESS &&
        deploymentHistory.loadingStatus == LoadingStatus.LOADING_SUCCESS) {

        return (
            <>
                <HeaderNavBar selectedItem={"module"} />

                <div className="sub-header shadow-sm">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>DEV Release Note</h6>
                            </div>
                            <div className="col-sm-8 text-right">
                                <Link to={
                                    {
                                        pathname: "/webapp/home/versions/view/deployment/" + params.module + "/" + params.name + "/" + params.version + "/" + params.customer,
                                        state: params.name
                                    }
                                }>
                                    <Button className="btn btn-success  w-20" id='deployToLocation'>Deploy to location</Button>
                                </Link>
                                <Link to={
                                    {
                                        pathname: "/webapp/home/versions/edit/" + params.module + "/" + params.name + "/" + params.version + "/" + params.tag + "/" + params.customer + "/" + params.branch,
                                        state: params.name
                                    }
                                }>
                                    <Button className="btn btn-light w-20" id='deployToLocation'>Edit DEV Release Note</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <main className="flex-shrink-0 without-left-menu">
                    <Container>
                        {pageData.data?.viewDevReleaseNote.map(rn => <ReleaseNote release={rn} key={rn.customerName + rn.applyOnTopOf} />)}
                    </Container>
                </main>
                <FooterBar />
            </>
        )
    } else {
        return <LoaderPage />
    }
}

function ReleaseNote({ release }: PropsWithChildren<{ release: ViewDevReleaseNote }>) {
    const params = useParams<RouteParams>();
    const deploymentHistory = useDeploymentHistoryPageDataSelector();

    // const mdParser = new MarkdownIt()
    const location = useLocation();
    var MarkdownIt = require('markdown-it'),
        md = new MarkdownIt();
    // var result = md.render("# yess");
    return (
        <>
            {/* <main className="flex-shrink-0 without-left-menu"> */}
            <div className="container">
                <div className="card card-body border-0">
                    {/* <h6 className="font-weight-bold">January 2020</h6> */}
                    <div className="row mt-3">
                        <div className="col-sm-2">
                            <span className="badge badge-light"><b><u>Basic Details</u></b></span>
                        </div>
                        <div className="col-sm-10">
                            <p className="m-0">
                                <Row>
                                    <Col md="3"><b>Module Name</b></Col>
                                    <Col>{params.name}</Col>
                                </Row>
                                <Row>
                                    <Col md="3"><b>Version NO</b></Col>
                                    <Col>{params.version}</Col>
                                </Row>
                                <Row>
                                    <Col md="3"><b>Branch Name</b></Col>
                                    <Col>{params.branch}</Col>
                                </Row>
                                <Row>
                                    <Col md="3"><b>Customer Name</b></Col>
                                    <Col>{release.customerName}</Col>
                                </Row>
                                <Row>
                                    <Col md="3"><b>Apply on top of</b></Col>
                                    <Col>{release.applyOnTopOf}</Col>
                                </Row>
                            </p>
                        </div>
                    </div>
                    <hr></hr>

                    <div className="row mt-3">
                        <div className="col-sm-2">
                            <span className="badge badge-light"><b><u>Other Details</u></b></span>
                        </div>
                        <div className="col-sm-10">
                            <p className="m-0">
                                <Row>
                                    <Col md="3"><b>Type</b></Col>
                                    <Col>{release.type}</Col>
                                </Row>
                                <Row>
                                    <Col md="3"><b>Dependent Version</b></Col>
                                    <Col>{release.dependentVersion.map(rn => <DependentModVersion data={rn} key={rn.module + rn.version} />)}</Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col md="3"><b>CR/SRS Doc Name</b></Col>
                                    <Col>{release.docName}</Col>
                                </Row>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="card card-body border-0 mt-3">
                    <div className="row mt-3">
                        <div className="col-sm-2">
                            <span className="badge badge-info"><b>Deployment History</b></span>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <p className="m-0">
                            <div className="table-responsive p-0 mt-3">
                                <table className="table table-striped">
                                    <tr>
                                        <th>Customer</th>
                                        <th>Deployment Location</th>
                                        <th>date</th>
                                    </tr>
                                    {deploymentHistory.data?.deploymentHistoryForReleaseNote.filter((val) => val.customerId == parseInt(params.customer)).map(dh => <DeploymentHistory data={dh} key={dh.deploymentId} />)}
                                </table>
                            </div>
                        </p>
                    </div>
                </div>


                <div className="card card-body border-0 mt-3">
                    <div className="row mt-3">
                        <div className="col-sm-2">
                            <span className="badge badge-dark"><b>Build Instructions</b></span>
                        </div>
                    </div>
                    <br></br>
                    <div className="col-sm-10">
                        <div dangerouslySetInnerHTML={{ __html: md.render(release.buildInstructions) }}></div>
                    </div>

                </div>

                <div className="card card-body border-0 mt-3">
                    <div className="row mt-3">
                        <div className="col-sm-2">
                            <span className="badge badge-dark"><b>Patch/Deployment Instructions</b></span>
                        </div>
                    </div>
                    <br></br>
                    <div className="col-sm-8">
                        <div dangerouslySetInnerHTML={{ __html: md.render(release.pdInstructions) }}></div>
                    </div>
                </div>

                <div className="card card-body border-0 mt-3">

                    <div className="row mt-3">
                        <div className="col-sm-2">
                            <span className="badge badge-info">Feature Summary</span>
                        </div>
                    </div>
                    <br></br>
                    <div className="col-sm-10">
                        <div dangerouslySetInnerHTML={{ __html: md.render(release.featureSummary) }}></div>
                    </div>


                    <hr></hr>

                    <div className="row mt-3">
                        <div className="col-sm-2">
                            <span className="badge badge-danger">Known Issues</span>
                        </div>
                    </div>
                    <br></br>
                    <div className="col-sm-10">
                        <div dangerouslySetInnerHTML={{ __html: md.render(release.knowIssues) }}></div>
                    </div>


                    <hr></hr>

                    <div className="row mt-3">
                        <div className="col-sm-2">
                            <span className="badge badge-success">Fixed Bugs</span>
                        </div>
                    </div>
                    <br></br>
                    <div className="col-sm-10">
                        <div dangerouslySetInnerHTML={{ __html: md.render(release.fixedBugs) }}></div>
                        {/* <p>{release.fixedBugs}</p> */}
                    </div>

                    <hr></hr>

                    <div className="row mt-3">
                        <div className="col-sm-2">
                            <span className="badge badge-warning">Areas To Be Tested</span>
                        </div>
                    </div>
                    <br></br>
                    <div className="col-sm-10">
                        <div dangerouslySetInnerHTML={{ __html: md.render(release.areasToBeTested) }}></div>
                        {/* <p>{release.areasToBeTested}</p> */}
                    </div>


                </div>

                <div className="card card-body border-0 mt-3">
                    <Row>
                        <Col md="3"><b>Released By</b></Col>
                        <Col>{release.releaseBy}</Col>
                    </Row>
                    <Row>
                        <Col md="3"><b>Released Date</b></Col>
                        <Col>{release.releaseDate[0]}-{release.releaseDate[1]}-{release.releaseDate[2]}</Col>
                    </Row>
                </div>

            </div>

            {/* </main> */}

            {/* <Card body>
                <Row>
                    <Col md="6">
                        <ListGroup>
                            <ListGroupItem className="justify-content-between"><Row><Col><b>Module Name</b></Col> <Col>{params.name}</Col></Row></ListGroupItem>
                            <ListGroupItem className="justify-content-between"><Row><Col><b>Version NO</b></Col> <Col>{release.versionNo}</Col></Row></ListGroupItem>
                            <ListGroupItem className="justify-content-between"><Row><Col><b>Branch Name</b></Col> <Col>{release.branchName}</Col></Row></ListGroupItem>
                            <ListGroupItem className="justify-content-between"><Row><Col><b>Apply on top of</b></Col> <Col>{release.applyOnTopOf}</Col></Row></ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col alignContent="center" align="center">
                        <Link to={
                            {
                                pathname: "/home/versions/view/deployment/" + params.module + "/" + params.version,
                                state: location.state
                            }
                        }>
                            <Button className="btn"
                                color="primary"
                                type="button">
                                <span className="btn-inner--text">
                                    Deploy to location
                                </span>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Card> */}
            {/* <Card body>
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroupItem className="justify-content-between"><Row><Col><b>Dependent Version</b></Col><Col>
                                {release.dependentVersion.map(rn => <DependentModVersion data={rn} key={rn.module + rn.version} />)}</Col></Row></ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroupItem className="justify-content-between"><Row><Col><b>CR/SRS Doc Name</b></Col> <Col>{release.docName}</Col></Row></ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </Card> */}
            {/* <Card body>
                <h6 className="justify-content-between"><b><u>Build Instructions</u></b></h6>
                <div dangerouslySetInnerHTML={{ __html: md.render(release.buildInstructions) }}></div> */}
            {/* <MdEditor
                    value={release.buildInstructions}
                    renderHTML={(text) => mdParser.render(text)} /> */}
            {/* </Card>
            <Card body>
                <h6 className="justify-content-between"><b><u>Patch/Deployment Instructions</u></b></h6>
                <div dangerouslySetInnerHTML={{ __html: md.render(release.pdInstructions) }}></div> */}
            {/* <MdEditor
                    value={release.pdInstructions}
                    renderHTML={(text) => mdParser.render(text)} /> */}
            {/* <MarkdownIt / */}
            {/* </Card> */}
            {/* <Card body>
                <h6 className="justify-content-between"><b>Feature Summary</b></h6>

            </Card>
            <Card body>
                <h6 className="justify-content-between"><b>Known Issues</b></h6>
                {release.knowIssues}
            </Card>
            <Card body>
                <h6 className="justify-content-between"><b>Fixed Bugs</b></h6>
                {release.fixedBugs}
            </Card>
            <Card body>
                <h6 className="justify-content-between"><b>Areas to be Tested</b></h6>
                {release.areasToBeTested}
            </Card> */}
            {/* <Card body>
                <Row>
                    <Col md="6">
                        <ListGroup>
                            <ListGroupItem className="justify-content-between"><Row><Col><b>Released By</b></Col> <Col>{release.releaseBy}</Col></Row></ListGroupItem>
                            <ListGroupItem className="justify-content-between"><Row><Col><b>Released Date</b></Col> <Col>{release.releaseDate[0]}-{release.releaseDate[1]}-{release.releaseDate[2]}</Col></Row></ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </Card> */}
        </>
    )
}

function DependentModVersion({ data }: PropsWithChildren<{ data: DependentModuleVersion }>) {
    if (data.version !== "Not Applicable") {
        return (
            <Col><Row>{data.module} - {data.version}</Row></Col>
        )
    } else {
        return null
    }
}

function DeploymentHistory({ data }: PropsWithChildren<{ data: DeploymentHistoryForReleaseNote }>) {
    return (
        <>
            <tr>
                <td><span className="responsive-mobile-heading"></span>{data.customerName}</td>
                <td><span className="responsive-mobile-heading"></span>{data.deploymentLocation}</td>
                <td><span className="responsive-mobile-heading"></span>{data.appliedDate[0]}-{data.appliedDate[1]}-{data.appliedDate[2]} </td>
            </tr>
        </>

        // <Col><Row>{data.customerName} - {data.deploymentLocation} - {data.appliedDate}</Row></Col>
    )
}