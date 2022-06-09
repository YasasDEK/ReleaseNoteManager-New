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
// import MDEditor from "@uiw/react-md-editor";
// reactstrap components
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

import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import { useLocation, useParams, useHistory } from "react-router-dom";
import React, { PropsWithChildren, useState, useEffect } from "react";
import {
    useVersionHistoryInReleaseNoteEditPageDataSelector,
    VersionHistoryInReleaseNoteEditPageEvent,
    useDependentModulesPageDataSelector,
    DependentModulesPageEvent,
    useEditReleaseNotePageDataSelector,
    EditReleaseNotePageEvent
} from "./index";
import { 
    ViewDevReleaseNote, 
    DependentModules, 
    VersionHistoryInEditReleaseNote, 
    DependentModuleVersion } from "../../../../api/apiDomain";
import { useDispatch } from "react-redux";
import { LoadingStatus } from "../../../../rootReducer/actions";
import LoaderPage from "../../../Common/LoaderPage";
// import { getModuleId } from "../../api/apiCalls"
import { editDevReleaseNote } from "../../../../api/apiCalls"
// import { version } from "webpack";
import { 
    getTagIdForRelease, 
    getCustomerIdforRelease, 
    getModuleIdForRelease, 
    getVersionNoforRelease, 
    getModuleIdForEditRelease, 
    getVersionNoforEditRelease, 
    getmoduleIdForDev } from "../../../../api/apiCalls"
// import { release } from "os";
// import VersionHistoryPage from "../../../VesionHistoryPage/VersionHistoryPage";
// import { goBack } from "connected-react-router";
import HeaderNavBar from "../../../Common/HeaderNavBar"
import FooterBar from "../../../Common/FooterBar";


interface RouteParams {
    module: string,
    name: string,
    version: string,
    tag: string,
    customer: string,
    branch: string
}

interface data {
    module: String,
    version: String
}

let dependentModulesArray: data[] = []

const mdParser = new MarkdownIt(/* Markdown-it options */);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var todayDate = yyyy + '-' + mm + '-' + dd;

const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));

export default function EditDevReleaseNote() {
    const params = useParams<RouteParams>();
    const pageData = useVersionHistoryInReleaseNoteEditPageDataSelector();
    const dependentModulesData = useDependentModulesPageDataSelector();
    const editPageData = useEditReleaseNotePageDataSelector();
    // console.log("editPageData = ", editPageData)

    var arr: string[] = [];

    const obj = {}
    let location = useLocation();
    let StateString = JSON.stringify(location.state);
    const dispatch = useDispatch();
    getmoduleIdForDev(params.module);
    getModuleIdForRelease(params.module)
    getVersionNoforRelease(params.version)
    getModuleIdForEditRelease(params.module)
    getVersionNoforEditRelease(params.version)
    getTagIdForRelease(params.tag)
    getCustomerIdforRelease(params.customer)

    useEffect(() => {
        dispatch({
            type: VersionHistoryInReleaseNoteEditPageEvent.GET_VERSION_LIST
        })

        dispatch({
            type: DependentModulesPageEvent.GET_DEPENDENT_MODULES_LIST
        })

        dispatch({
            type: EditReleaseNotePageEvent.GET_EDIT_RELEASE_NOTE_LIST
        })

        return function cleanUp() {
            dispatch({ type: VersionHistoryInReleaseNoteEditPageEvent.RESET }) &&
                dispatch({ type: DependentModulesPageEvent.RESET }) &&
                dispatch({ type: EditReleaseNotePageEvent.RESET })
        }

    }, []);

    if (pageData.loadingStatus == LoadingStatus.LOADING_SUCCESS
        && dependentModulesData.loadingStatus == LoadingStatus.LOADING_SUCCESS
        && editPageData.loadingStatus == LoadingStatus.LOADING_SUCCESS
    ) {

        return (
            <>
                <HeaderNavBar selectedItem={"module"} />
                <main className="flex-shrink-0 without-left-menu">
                    <Container className="mb-3">
                        {editPageData.data?.viewDevReleaseNote.map(edp => <ContentPage editData={edp} key={edp.customerName} />)}
                    </Container>
                </main>
            </>
        );
    } else {
        return <LoaderPage />
    }
}

//edit page
function ContentPage({ editData }: PropsWithChildren<{ editData: ViewDevReleaseNote }>) {
    dependentModulesArray = []

    const params = useParams<RouteParams>();
    const pageData = useVersionHistoryInReleaseNoteEditPageDataSelector();
    const dependentModulesData = useDependentModulesPageDataSelector();
    const history = useHistory()
    editData.dependentVersion.filter((data) => data.version !== params.version).map((val: { module: any; version: any; }) => {
        dependentModulesArray.push({
            module: val.module,
            version: val.version
        })
    })

    // const [branchName, setBranchName] = useState(editData.branchName);
    const [applyTopOf, setApplyTopOf] = useState(editData.applyOnTopOf);
    const [dependentVersion, setDependentVersion] = useState(dependentModulesArray);
    const [docName, setDocName] = useState(editData.docName);
    const [buildInstructions, setBuildInstructions] = useState(editData.buildInstructions);
    const [pdInstructions, setPdInstructions] = useState(editData.pdInstructions);
    const [featureSummary, setFeatureSummary] = useState(editData.featureSummary);
    const [knownIssues, setKnownIssues] = useState(editData.knowIssues);
    const [fixedBugs, setFixedBugs] = useState(editData.fixedBugs);
    const [areasToBeTested, setAreasToBeTested] = useState(editData.areasToBeTested);
    const [releaseBy, setReleaseBy] = useState(editData.releaseBy);
    const [releaseDate, setReleaseDate] = useState(todayDate);
    const [type, setType] = useState(editData.type)

    let releaseNoteInfo = {
        tagId: parseInt(params.tag),
        customerId: parseInt(params.customer),
        // branchName: branchName,
        dependentVersion: dependentModulesArray,
        applyOnTopOf: applyTopOf,
        docName: docName,
        buildInstructions: buildInstructions,
        pdInstructions: pdInstructions,
        featureSummary: featureSummary,
        knowIssues: knownIssues,
        fixedBugs: fixedBugs,
        areasToBeTested: areasToBeTested,
        releaseBy: releaseBy,
        releaseDate: releaseDate,
        type: type
    }

    function handleBuildInstructionsChange(html: any, text: any): void {
        setBuildInstructions(html.text);
    }

    function handlePdInstructionsChange(html: any, text: any): void {
        setPdInstructions(html.text);
    }

    function handleFeatureSummaryChange(html: any, text: any): void {
        setFeatureSummary(html.text);
    }

    function handleKnownIssuesChange(html: any, text: any): void {
        setKnownIssues(html.text);
    }

    function handleFixedBugsChange(html: any, text: any): void {
        setFixedBugs(html.text);
    }

    function handleAreasToBeTested(html: any, text: any): void {
        setAreasToBeTested(html.text);
    }

    function submitDetails() {
        editDevReleaseNote(releaseNoteInfo).then((value) => {
            // console.log(value)
            alert("release note successfully updated")
        }).catch((err) => {
            // console.log("errr", err)
            alert("Some Error occured");
        })

    }

    const location = useLocation()

    return (
        <>
            <div className="sub-header shadow-sm">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>Edit {params.name} DEV release note</h6>
                        </div>
                        <div className="col-sm-6 text-right">
                            <Button className="btn btn-success w-25" id='next3' onClick={() => { submitDetails(); }}>Save to draft</Button>
                        </div>
                    </div>
                </div>
            </div>

            <FormikStepper
                initialValues={{
                    versionNo: '',
                    branchName: '',
                    applyTopOf: '',
                    dependentVersion: '',
                    docName: '',
                    buildInstructions: '',
                    pdInstructions: '',
                    featureSummary: '',
                    knownIssues: '',
                    fixedBugs: '',
                    areasToBeTested: '',
                    releaseBy: '',
                    releaseDate: "0001-01-01"
                }} onSubmit={(values) => {
                    submitDetails()
                    history.push("/webapp/home/versions/" + params.module + "/" + params.name)
                    // window.location.reload();
                }}>
                {/* <Form autoComplete="off"> */}
                <FormikStep>
                    <Card className="card border-0 mt-3" body>
                        <Row>
                            <Col md={6}>
                                {/*Version NO*/}
                                <FormGroup>
                                    <Label for="versionNo">Version NO</Label>
                                    <Input
                                        readOnly
                                        value={params.version}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/*Version NO*/}
                                <FormGroup>
                                    <Label for="versionNo">Customer</Label>
                                    <Input
                                        readOnly
                                        value={editData.customerName}
                                    />
                                </FormGroup>
                            </Col>
                            {/* <Col md={6}>
                                <FormGroup>
                                    <Label for="branchName">Branch Name</Label>
                                    <Input
                                        value={branchName}
                                        type="text"
                                        name="branchName"
                                        id="branchName"
                                        placeholder="branch name"
                                        onChange={(e) => {
                                            setBranchName(e.target.value);
                                        }} />
                                </FormGroup>
                            </Col> */}
                        </Row>
                        <Row>
                            <Col md={6}>
                                {/*Apply to of*/}
                                <FormGroup>
                                    <Label for="applyTopOf">Apply Top of</Label>
                                    <Input
                                        value={applyTopOf}
                                        type="select"
                                        name="applyTopOf"
                                        id="applyTopOf"
                                        onChange={(e) => {
                                            setApplyTopOf(e.target.value);
                                        }} >
                                        <option defaultChecked>select one</option>
                                        {pageData.data?.versionHistoryInReleaseNote.map(ver => <ApplyOnTopOf version={ver} key={ver.version_no} />)}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                {/*Apply to of*/}
                                <FormGroup>
                                    <Label for="type">Type</Label>
                                    <Input
                                        value={type}
                                        type="select"
                                        name="type"
                                        id="type"
                                        onChange={(e) => {
                                            setType(e.target.value);
                                        }} >
                                        <option defaultChecked>select one</option>
                                        <option value="full">Full</option>
                                        <option value="patch">patch</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Card>
                    {/*Dependent version*/}
                    <Card className="card border-0 mt-3" body>
                        <Label for="dependentversion" tag="h6">Dependent Version</Label>
                        <Row>
                            <Col md={6}>
                                {/* {editData.dependentVersion.map(rn => <DependentModVersion data={rn} key={rn.module + rn.version} />)} */}
                                {dependentModulesData.data?.dependentModules.map(dep => <DependentModuleLabels modules={dep} key={dep.id} />)}
                            </Col>
                        </Row>
                    </Card>
                    <Card className="card border-0 mt-3" body>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="docName">CR/SRS Doc Name</Label>
                                    <Input
                                        value={docName}
                                        type="text"
                                        name="docName"
                                        id="docName"
                                        placeholder="CR/SRS Doc Name"
                                        onChange={(e) => {
                                            setDocName(e.target.value);
                                        }} />
                                </FormGroup>
                            </Col>
                        </Row>
                        {/* <Col md={6}>
                            <Button id='next1' onClick={() => { submitDetails() }}>Save to draft</Button>
                        </Col> */}
                    </Card>

                </FormikStep>
                <FormikStep>
                    <Card className="card border-0 mt-3" body>
                        <Row>
                            <Col>
                                <Label for="buildInstructions">Build Instructions</Label>
                                <MdEditor
                                    value={buildInstructions}
                                    style={{ height: "250px" }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={handleBuildInstructionsChange} />
                            </Col>
                        </Row>
                    </Card>
                    <Card className="card border-0 mt-3" body>
                        <Row>
                            <Col>
                                <Label for="pdInstructions">Patch/Deployment Instructions</Label>
                                <MdEditor
                                    value={pdInstructions}
                                    style={{ height: "250px" }}
                                    renderHTML={(text1) => mdParser.render(text1)}
                                    onChange={handlePdInstructionsChange} />
                            </Col>
                        </Row>
                        {/* <Col md={6}>
                            <Button id="next2" onClick={() => { submitDetails() }}>Save to draft</Button>
                        </Col> */}
                    </Card>
                </FormikStep>
                <FormikStep>
                    <Card className="card border-0 mt-3" body>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="featureSummary">Feature Summary</Label>
                                    <MdEditor
                                        value={featureSummary}
                                        style={{ height: "250px" }}
                                        renderHTML={(text) => mdParser.render(text)}
                                        onChange={handleFeatureSummaryChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="knownIssues">Known Issues</Label>
                                    <MdEditor
                                        value={knownIssues}
                                        style={{ height: "250px" }}
                                        renderHTML={(text) => mdParser.render(text)}
                                        onChange={handleKnownIssuesChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="fixedBugs">Fixed Bugs</Label>
                                    <MdEditor
                                        value={fixedBugs}
                                        style={{ height: "250px" }}
                                        renderHTML={(text) => mdParser.render(text)}
                                        onChange={handleFixedBugsChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="areasToBeTested">Areas to be Tested</Label>
                                    <MdEditor
                                        value={areasToBeTested}
                                        style={{ height: "250px" }}
                                        renderHTML={(text) => mdParser.render(text)}
                                        onChange={handleAreasToBeTested} />
                                </FormGroup>
                            </Col>
                        </Row>
                        {/* <Col md={6}>
                            <Button id='next3' onClick={() => { submitDetails() }}>Save to draft</Button>
                        </Col> */}
                    </Card>
                </FormikStep>
                <FormikStep>
                    <Card className="card border-0 mt-3" body>
                        <Col md={6}>
                            {/*Version NO*/}
                            <FormGroup>
                                <Label for="releaseBy">Release By</Label>
                                <Input
                                    value={releaseBy}
                                    type="text"
                                    name="releaseBy"
                                    id="releaseBy"
                                    placeholder="Release By"
                                    onChange={(e) => {
                                        setReleaseBy(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            {/*Branch name*/}
                            <FormGroup>
                                <Label for="releaseDate">Release Date</Label>
                                <Input
                                    // value="2" 
                                    value={releaseDate}
                                    type="date"
                                    name="releaseDate"
                                    id="releaseDate"
                                    placeholder="Release Date"
                                    onChange={(e) => {
                                        setReleaseDate(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>
                    </Card>
                </FormikStep>
                {/* </Form> */}
            </FormikStepper>
            <FooterBar />
        </>
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
                                    {isSubmitting ? 'Submittinng' : isLastStep() ? 'submit' : 'next'}
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

function ApplyOnTopOf({ version }: PropsWithChildren<{ version: VersionHistoryInEditReleaseNote }>) {
    // const params = useParams<RouteParams>();
    return (
        <option>{version.version_no}</option>
    )
}

export interface testing {
    module: String,
    version: String
}

function DependentModVersion({ data }: PropsWithChildren<{ data: DependentModuleVersion }>) {
    return (
        <Col>{data.module} - {data.version}</Col>

    )
}

function getArray(module: String, version: String) {

    // tes(module)

    if (dependentModulesArray.length == 0) {
        dependentModulesArray.push({
            module: module,
            version: version
        })
    } else {
        var isModuleAvailable = false

        for (var i = 0; i < dependentModulesArray.length; i++) {
            if (dependentModulesArray[i].module == module) {
                dependentModulesArray[i].version = version
                isModuleAvailable = true
            }
        }

        if (!isModuleAvailable) {
            dependentModulesArray.push({
                module: module,
                version: version
            })
        }
    }
}

function tes(module: String) {
    // console.log(module)
    let verionForModule = dependentModulesArray.find(x => x.module == module)
    if (verionForModule?.module != undefined) {
        return verionForModule.version.toString()
    }
    return "Not Applicable"
}

function DependentModuleLabels({ modules }: PropsWithChildren<{ modules: DependentModules }>) {

    const editPageData = useEditReleaseNotePageDataSelector();
    // console.log(dependentModulesArray.find(val => val.module == modules.name)?.version.toString(),"ASD")
    return (
        <FormGroup>
            <Label for={modules.name}>{modules.name}</Label>
            <Input
                type="select"
                // value={dependentModulesArray.find(val => val.module == modules.name)?.version.toString()}
                onChange={(e) => {
                    getArray(modules.name, e.target.value);
                }}
            >
                {modules.versions.map(value =>
                    <option key={value}>{value}</option>
                )}
                <option key={0} selected>Not Applicable</option>

            </Input>
        </FormGroup>
    )
}
