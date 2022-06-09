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

import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import {
    Button,
    Card,
    FormGroup,
    Input,
    Container,
    Row,
    Col,
    Label,
} from "reactstrap";
import HeaderNavBar from "../../../Common/HeaderNavBar"
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import { addDAReleaseNote } from "../../../../api/apiCalls"
import FooterBar from "../../../Common/FooterBar"

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

interface DeployToLocationProps {
    userDetails: any
}

const mdParser = new MarkdownIt(/* Markdown-it options */);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var todayDate = yyyy + '-' + mm + '-' + dd;

export default function CreateDAReleaseNote(props: DeployToLocationProps) {
    const { userDetails, ...other } = props
    const history = useHistory()
    const params = useParams<RouteParams>()

    const [heading, setHeading] = useState("");
    const [artifactLocation, setArtifactLocation] = useState("");
    const [md5sum, setMD5Sum] = useState("");
    const [testedAreas, setTestedAreas] = useState("");
    const [newFeatures, setNewFeatures] = useState("");
    const [foundBugs, setFoundBugs] = useState("");
    const [fixedBugs, setFixedBugs] = useState("");
    const [knownBugs, setKnownBugs] = useState("");
    const [limitations, setLimitations] = useState("");
    const [modulesReleased, setModulesReleased] = useState("");
    const [prerequisits, setPrerequisits] = useState("");
    const [deployInstructions, setDeployInstructions] = useState("");
    const [testCases, setTestCases] = useState("");
    const [patchInstructions, setPatchInstructions] = useState("");
    const [areasToBeTested, setAreasToBeTested] = useState("");
    const [testedBy, setTestedBy] = useState("")
    const [plannedStart, setPlannedStart] = useState(todayDate)
    const [plannedEnd, setPlannedEnd] = useState(todayDate)
    const [actualStart, setActualStart] = useState(todayDate)
    const [actualEnd, setActualEnd] = useState(todayDate)
    const [type, setType] = useState("");
    const [comment, setComment] = useState("")
    const [releasedBy, setReleaseBy] = useState(userDetails.fullName)

    function handleTestedAreas(html: any, text: any): void {
        setTestedAreas(html.text);
    }

    function handleMd5sum(html: any, text: any): void {
        setMD5Sum(html.text);
    }

    function handleNewFeatures(html: any, text: any): void {
        setNewFeatures(html.text);
    }

    function handleFoundBugs(html: any, text: any): void {
        setFoundBugs(html.text);
    }

    function handlefixedBugs(html: any, text: any): void {
        setFixedBugs(html.text);
    }

    function handleKnownBugs(html: any, text: any): void {
        setKnownBugs(html.text);
    }

    function handleLimitaions(html: any, text: any): void {
        setLimitations(html.text);
    }

    function handleModulesReleased(html: any, text: any): void {
        setModulesReleased(html.text);
    }

    function handlePrerequisits(html: any, text: any): void {
        setPrerequisits(html.text);
    }

    function handleDeployInstructions(html: any, text: any): void {
        setDeployInstructions(html.text);
    }

    function handleTestCases(html: any, text: any): void {
        setTestCases(html.text);
    }

    function handlePatchInstructions(html: any, text: any): void {
        setPatchInstructions(html.text);
    }

    function handleAreasToBetested(html: any, text: any): void {
        setAreasToBeTested(html.text);
    }

    function handleComments(html: any, text: any): void {
        setComment(html.text);
    }

    let daReleaseNoteInfo = {
        tagId: params.tagId,
        customerId: params.customerId,
        artifactLocation: artifactLocation,
        md5sum: md5sum,
        testedAreas: testedAreas,
        newFeatures: newFeatures,
        foundBugs: foundBugs,
        fixedBugs: fixedBugs,
        knownBugs: knownBugs,
        limitations: limitations,
        modulesReleased: modulesReleased,
        prerequisits: prerequisits,
        deployInstructions: deployInstructions,
        testCases: testCases,
        patchInstructions: patchInstructions,
        areasToBeTested: areasToBeTested,
        releasedBy: releasedBy,
        releasedDate: todayDate,
        testedBy: testedBy,
        plannedStart: plannedStart,
        plannedEnd: plannedEnd,
        actualStart: actualStart,
        actualEnd: actualEnd,
        type: type,
        comment: comment
    }

    function submitDetails() {
        addDAReleaseNote(daReleaseNoteInfo).then((val) => {
            console.log(val)
            alert("Data added successfully")
        }).catch((err) => {
            console.log(err)
            alert("some error occured")
        })
    }

    return (
        <><div>
            <HeaderNavBar selectedItem={"module"} />

            <div className="sub-header shadow-sm">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>Create {params.versionNo} DA release note</h6>
                        </div>
                        <div className="col-sm-6 text-right">
                            <Button className="btn btn-success w-25" id='saveToDraft' onClick={() => { submitDetails(); }}>Save to draft</Button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-shrink-0 without-left-menu">
                <Container className="mb-3">
                    <FormikStepper
                        initialValues={{}} onSubmit={(values) => {
                            submitDetails();
                            history.push("/webapp/home/versions/" + params.moduleId + "/" + params.moduleName)
                            // history.push("/home/da/view/" + params.moduleId + "/" + params.moduleName + "/" + params.versionNo + "/" + params.tagId + "/" + params.branchName + "/" + params.customerId + "/" + params.customerName)
                        }}>
                        <FormikStep>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="type">Release Note Type</Label>
                                            <Input
                                                value={type}
                                                type="select"
                                                name="type"
                                                id="type"

                                                onChange={(e) => {
                                                    setType(e.target.value);
                                                }}>
                                                <option defaultChecked>select one</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Cycle Closure">Cycle Closure</option>
                                                <option value="Release to Implementation">Release to Implementation</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Card>

                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="comment">Comments</Label>
                                        <MdEditor
                                            value={comment}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handleComments} />
                                    </Col>
                                </Row>
                            </Card>

                            {type == "Release to Implementation" ? <>
                                <Card className="card border-0 mt-3" body>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="artifactLocation">Artifact Location</Label>
                                                <Input
                                                    value={artifactLocation}
                                                    type="text"
                                                    name="artifactLocation"
                                                    id="artifactLocation"
                                                    placeholder="Artifact Location"
                                                    onChange={(e) => {
                                                        setArtifactLocation(e.target.value);
                                                    }} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className="card border-0 mt-3" body>
                                    <Row>
                                        <Col>
                                            <Label for="md5sum">md5sum of release files</Label>
                                            <MdEditor
                                                value={md5sum}
                                                style={{ height: "250px" }}
                                                renderHTML={(text) => mdParser.render(text)}
                                                onChange={handleMd5sum} />
                                        </Col>
                                    </Row>
                                </Card>
                            </> : null}
                        </FormikStep>
                        <FormikStep>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="testedAreas">Tested areas</Label>
                                        <MdEditor
                                            value={testedAreas}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handleTestedAreas} />
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="newFeatures">New Features</Label>
                                        <MdEditor
                                            value={newFeatures}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handleNewFeatures} />
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="foundBugs">Found Bugs</Label>
                                        <MdEditor
                                            value={foundBugs}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handleFoundBugs} />
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="fixedBugs">Fixed Bugs</Label>
                                        <MdEditor
                                            value={fixedBugs}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handlefixedBugs} />
                                    </Col>
                                </Row>
                            </Card>
                        </FormikStep>
                        <FormikStep>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="knownBugs">Known Bugs</Label>
                                        <MdEditor
                                            value={knownBugs}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handleKnownBugs} />
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="limitations">Limitations</Label>
                                        <MdEditor
                                            value={limitations}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handleLimitaions} />
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="modulesReleased">Modules Released</Label>
                                        <MdEditor
                                            value={modulesReleased}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handleModulesReleased} />
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="prerequisits">Prerequisits</Label>
                                        <MdEditor
                                            value={prerequisits}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handlePrerequisits} />
                                    </Col>
                                </Row>
                            </Card>
                        </FormikStep>
                        <FormikStep>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="deployInstructions">Deploy Instructions</Label>
                                        <MdEditor
                                            value={deployInstructions}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handleDeployInstructions} />
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="testCases">Test Cases</Label>
                                        <MdEditor
                                            value={testCases}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handleTestCases} />
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="patchInstructions">Patch Instructions</Label>
                                        <MdEditor
                                            value={patchInstructions}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handlePatchInstructions} />
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <Label for="areasToBeTested">Areas To Be Tested</Label>
                                        <MdEditor
                                            value={areasToBeTested}
                                            style={{ height: "250px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={handleAreasToBetested} />
                                    </Col>
                                </Row>
                            </Card>
                        </FormikStep>
                        <FormikStep>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="testedBy">Tested By</Label>
                                            <Input
                                                value={testedBy}
                                                type="text"
                                                name="testedBy"
                                                id="testedBy"
                                                placeholder="Tested By"
                                                onChange={(e) => {
                                                    setTestedBy(e.target.value);
                                                }} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="plannedStart">Planned Testing Cycle Start Date</Label>
                                            <Input
                                                value={plannedStart}
                                                type="date"
                                                name="plannedStart"
                                                id="plannedStart"
                                                // placeholder="Tested By"
                                                onChange={(e) => {
                                                    setPlannedStart(e.target.value);
                                                }} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="plannedStart">Planned Testing Cycle End Date</Label>
                                            <Input
                                                value={plannedEnd}
                                                type="date"
                                                name="plannedStart"
                                                id="plannedStart"
                                                // placeholder="Tested By"
                                                onChange={(e) => {
                                                    setPlannedEnd(e.target.value);
                                                }} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card border-0 mt-3" body>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="actualStart">Actual Testing Cycle Start Date</Label>
                                            <Input
                                                value={actualStart}
                                                type="date"
                                                name="actualStart"
                                                id="actualStart"
                                                // placeholder="Tested By"
                                                onChange={(e) => {
                                                    setActualStart(e.target.value);
                                                }} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="actualEnd">Actual Testing Cycle End Date</Label>
                                            <Input
                                                value={actualEnd}
                                                type="date"
                                                name="actualEnd"
                                                id="actualEnd"
                                                // placeholder="Tested By"
                                                onChange={(e) => {
                                                    setActualEnd(e.target.value);
                                                }} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Card>
                        </FormikStep>
                    </FormikStepper>
                </Container>
            </main>
        </div>
            <FooterBar /></>
    )
}

//pick validations
export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {

}

//view page
export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>
}

//creating the next back submit buttons and view the pages according to the steps
export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    const childrenArray = React.Children.toArray(children) as React.ElementType<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step] as React.ElementType<FormikStepProps>;
    const [completed, setCompleted] = useState(false);

    function isLastStep() {
        return step === childrenArray.length - 1;
    }

    return (
        <>
            <Formik {...props}
                onSubmit={async (values, helpers) => {
                    if (isLastStep()) {
                        await props.onSubmit(values, helpers);
                        setCompleted(true);
                        helpers.resetForm();
                    } else {
                        setStep(s => s + 1);
                    }
                }}>

                {({ isSubmitting }) => (
                    <Form autoComplete="off">
                        <Card body>
                            <Stepper alternativeLabel activeStep={step}>
                                {childrenArray.map((child, index) => (
                                    <Step className="step-bar__step-indicator" key={index} completed={step > index || completed}>
                                        <StepLabel />
                                    </Step>
                                ))}
                            </Stepper>
                        </Card>
                        {currentChild}

                        <div className="row mt-3 justify-content-end">
                            {step > 0 ?
                                <div className="col-sm-2">
                                    <Button className="btn btn-light w-100" disabled={isSubmitting} onClick={() => setStep(s => s - 1)}>
                                        Back
                                    </Button>
                                </div> : null}
                            <div className="col-sm-2">
                                <Button className="btn btn-success w-100" disabled={isSubmitting} type="submit">
                                    {isSubmitting ? 'Submittinng' : isLastStep() ? 'Submit' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}
