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
import { DAReleaseNotePageEvent, useDAReleaseNotePageDataSelector } from "./index";
import { ViewDAReleaseNote } from "../../../../api/apiDomain";
import { getTagIdForDA, getCustomerIdForDA } from "../../../../api/apiCalls"

import { useDispatch } from "react-redux";
import { LoadingStatus } from "../../../../rootReducer/actions";
import LoaderPage from "../../../Common/LoaderPage";
// import { getModuleIdForRelease, getVersionNoforRelease, getTagIdForRelease, getCustomerIdforRelease } from "../../../api/apiCalls"
import HeaderNavBar from "../../../Common/HeaderNavBar"
import FooterBar from "../../../Common/FooterBar"

interface RouteParams {
    module: string,
    name: string,
    version: string,
    tag: string,
    branch: string,
    customer: string,
    customerName: string
}

export default function ViewDAReleaseNotePage() {
    const params = useParams<RouteParams>();
    const history = useHistory()
    const pageData = useDAReleaseNotePageDataSelector();
    const dispatch = useDispatch();
    const location = useLocation();
    getTagIdForDA(params.tag)
    getCustomerIdForDA(params.customer)

    useEffect(() => {

        dispatch({
            type: DAReleaseNotePageEvent.GET_DA_RELEASE_NOTE_LIST
        })

        return function cleanUp() {
            dispatch({ type: DAReleaseNotePageEvent.RESET })
        }

    }, []);

    if (pageData.loadingStatus == LoadingStatus.LOADING_SUCCESS) {

        if (pageData.data?.viewDAReleaseNote.length == 0) {
            return (
                <>
                    <HeaderNavBar selectedItem={"module"} />

                    <div className="sub-header shadow-sm">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-4">
                                    <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>DA Release Note</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <main className="flex-shrink-0 without-left-menu">
                        <Container>
                            <h2>DA Release Note Didn't Create Yet</h2>
                        </Container>
                    </main>

                    <FooterBar />
                </>
            )
        } else {
            return (
                <>
                    <HeaderNavBar selectedItem={"module"} />

                    <div className="sub-header shadow-sm">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-4">
                                    <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>DA Release Note</h6>
                                </div>
                                <div className="col-sm-8 text-right">
                                    <Link to={
                                        {
                                            pathname: "/webapp/home/da/edit/" + params.module + "/" + params.name + "/" + params.version + "/" + params.tag + "/" + params.branch + "/" + params.customer,
                                            state: params.name
                                        }
                                    }>
                                        <Button className="btn btn-light w-20" id='deployToLocation'>Edit DA Release Note</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <main className="flex-shrink-0 without-left-menu">
                        <Container>
                            {pageData.data?.viewDAReleaseNote.map(rn => <ReleaseNote release={rn} key={rn.tagId + rn.customerId + rn.artifactLocation} />)}
                        </Container>
                    </main>
                </>
            )
        }
    } else {
        return <LoaderPage />
    }
}

function ReleaseNote({ release }: PropsWithChildren<{ release: ViewDAReleaseNote }>) {
    const params = useParams<RouteParams>();
    var MarkdownIt = require('markdown-it'),
        md = new MarkdownIt();

    return (
        <>
            <div className="card card-body border-0">

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
                                <Col>{params.customerName}</Col>
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
                                {release.type == "Rejected" ?
                                    <span className="col-sm-2">
                                        <Col className="badge badge-danger">{release.type}</Col>
                                    </span> :
                                    release.type == "Cycle Closure" ?
                                        <span className="col-sm-2">
                                            <Col className="badge badge-warning">{release.type}</Col>
                                        </span> :
                                        <span className="col-sm-3">
                                            <Col className="badge badge-success">{release.type}</Col>
                                        </span>}
                            </Row>

                            {release.type == "released" ? <Row>
                                <Col md="3"><b>Artifact Location</b></Col>
                                <Col>{release.artifactLocation}</Col>
                            </Row> : null}

                            <Row>
                                <Col md="3"><b>Released By</b></Col>
                                <Col>{release.releasedBy}</Col>
                            </Row>
                            <Row>
                                <Col md="3"><b>Released Date</b></Col>
                                <Col>{release.releasedDate[0]}-{release.releasedDate[1]}-{release.releasedDate[2]}</Col>
                            </Row>
                            <Row>
                                <Col md="3"><b>Tested By</b></Col>
                                <Col>{release.testedBy}</Col>
                            </Row>
                        </p>
                    </div>
                </div>
                <hr></hr>

                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-light"><b><u>Cycle Details</u></b></span>
                    </div>
                    <div className="col-sm-10">
                        <p className="m-0">
                            <Row>
                                <Col md="4"><b>Planned Testing Cycle Start Date</b></Col>
                                <Col>{release.plannedStart[0]}-{release.plannedStart[1]}-{release.plannedStart[2]}</Col>
                            </Row>
                            <Row>
                                <Col md="4"><b>Planned Testing Cycle End Date</b></Col>
                                <Col>{release.plannedEnd[0]}-{release.plannedEnd[1]}-{release.plannedEnd[2]}</Col>
                            </Row>
                            <Row>
                                <Col md="4"><b>Actual Testing Cycle Start Date</b></Col>
                                <Col>{release.actualStart[0]}-{release.actualStart[1]}-{release.actualStart[2]}</Col>
                            </Row>
                            <Row>
                                <Col md="4"><b>Actual Testing Cycle End Date</b></Col>
                                <Col>{release.actualEnd[0]}-{release.actualEnd[1]}-{release.actualEnd[2]}</Col>
                            </Row>
                        </p>
                    </div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-warning"><b>Comments</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.comment) }}></div>
                </div>
            </div>

            {release.type == "released" ? <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-dark"><b>md5sum of release files</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.md5sum) }}></div>
                </div>
            </div> : null}

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-warning"><b>Tested areas</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.testedAreas) }}></div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-success"><b>New Features</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.newFeatures) }}></div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-danger"><b>Found Bugs</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.foundBugs) }}></div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-success"><b>Fixed Bugs</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.fixedBugs) }}></div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-dark"><b>Known Bugs</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.knownBugs) }}></div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-danger"><b>Limitations</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.limitations) }}></div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-dark"><b>Modules Released</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.modulesReleased) }}></div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-dark"><b>Prerequisits</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.prerequisits) }}></div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-primary"><b>Deploy Instructions</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.deployInstructions) }}></div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-dark"><b>Test Cases</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.testCases) }}></div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-primary"><b>Patch Instructions</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.patchInstructions) }}></div>
                </div>
            </div>

            <div className="card card-body border-0 mt-3">
                <div className="row mt-3">
                    <div className="col-sm-2">
                        <span className="badge badge-info"><b>Areas ToBe Tested</b></span>
                    </div>
                </div>
                <br></br>
                <div className="col-sm-10">
                    <div dangerouslySetInnerHTML={{ __html: md.render(release.areasToBeTested) }}></div>
                </div>
            </div>
        </>
    )
}

