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
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import React, { PropsWithChildren, useState, useEffect } from "react";
import {
    useVersionHistoryDataPageDataSelector,
    VersionHistoryDataPageEvent,
    useDependentModulesPageDataSelector,
    DependentModulesPageEvent,
    useCustomerForModulePageDataSelector,
    CustomerForModulePageEvent
} from "./index";
import { VersionHistoryData, DependentModules, CustomerForModule } from "../../../../api/apiDomain";
import { useDispatch } from "react-redux";
import { LoadingStatus } from "../../../../rootReducer/actions";
import LoaderPage from "../../../Common/LoaderPage";
import { getmoduleIdForDev, getTag, addDevReleaseNote } from "../../../../api/apiCalls"
import { version } from "webpack";
import HeaderNavBar from "../../../Common/HeaderNavBar"
import FooterBar from "../../../Common/FooterBar"

interface RouteParams {
    module: string,
    tagId: string,
    version: string,
    name: string,
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

export default function CreateDevReleaseNote() {
    const params = useParams<RouteParams>();
    const pageData = useVersionHistoryDataPageDataSelector();
    const dependentModulesData = useDependentModulesPageDataSelector();
    const customersForModulesData = useCustomerForModulePageDataSelector();
    const history = useHistory()

    var arr: string[] = [];
    pageData.data?.versionHistoryData.filter((val) =>
        arr.push(val.versionNo),
    )

    const obj = {}
    let location = useLocation();
    let StateString = JSON.stringify(location.state);
    const dispatch = useDispatch();
    let tagId = params.tagId;
    getmoduleIdForDev(params.module);
    getTag(params.tagId)

    const [customer, setCustomer] = useState("");
    const [applyTopOf, setApplyTopOf] = useState("");
    const [dependentVersion, setDependentVersion] = useState("");
    const [docName, setDocName] = useState("");
    const [buildInstructions, setBuildInstructions] = useState("");
    const [pdInstructions, setPdInstructions] = useState("");
    const [featureSummary, setFeatureSummary] = useState("");
    const [knownIssues, setKnownIssues] = useState("");
    const [fixedBugs, setFixedBugs] = useState("");
    const [areasToBeTested, setAreasToBeTested] = useState("");
    const [releaseBy, setReleaseBy] = useState("");
    const [type, setType] = useState("")
    const [releaseDate, setReleaseDate] = useState(todayDate);

    let devReleaseNoteInfo = {
        tagId: parseInt(params.tagId),
        customerId: customer,
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

    function submitDetails() {
        // console.log(devReleaseNoteInfo.customerId)
        // var isAvailable = rfalse
        // for (var i = 0; i < arr.length; i++) {
        //     if (releaseNoteInfo.versionNo == arr[i]) {
        //         isAvailable = true
        //     }
        // }

        if (devReleaseNoteInfo.customerId == "") {
            alert("customer can't be empty")
        } else {
            addDevReleaseNote(devReleaseNoteInfo).then((value) => {
                console.log("vale", value)
                alert("Data added successfully");
            }).catch((err) => {
                console.log("errr", err)
                alert("Invalid Version Number");
            })
        }
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

    useEffect(() => {
        dispatch({
            type: VersionHistoryDataPageEvent.GET_VERSION_DATA_LIST
        })

        dispatch({
            type: DependentModulesPageEvent.GET_DEPENDENT_MODULES_LIST
        })

        dispatch({
            type: CustomerForModulePageEvent.GET_CUSTOMER_FOR_MODULE_LIST
        })

        return function cleanUp() {
            dispatch({ type: VersionHistoryDataPageEvent.RESET }) &&
                dispatch({ type: DependentModulesPageEvent.RESET }) &&
                dispatch({ type: CustomerForModulePageEvent.RESET })
        }

    }, []);

    if (pageData.loadingStatus == LoadingStatus.LOADING_SUCCESS &&
        dependentModulesData.loadingStatus == LoadingStatus.LOADING_SUCCESS &&
        customersForModulesData.loadingStatus == LoadingStatus.LOADING_SUCCESS) {
        return (
            <>
                <HeaderNavBar selectedItem={"module"} />

                <div className="sub-header shadow-sm">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>Create {params.name} new  dev release note</h6>
                            </div>
                            <div className="col-sm-6 text-right">
                                <Button className="btn btn-success w-25" id='saveToDraft' onClick={() => { submitDetails() }}>Save to draft</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="flex-shrink-0 without-left-menu">

                    <Container className="mb-3">
                        <FormikStepper
                            initialValues={{
                                customer: '',
                                dependentVersion: '',
                                applyTopOf: '',
                                pgw: '',
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
                                submitDetails();
                                history.push("/webapp/home/versions/" + params.module + "/" + params.name)
                            }}>

                            <FormikStep>
                                <Card className="card border-0 mt-3" body>
                                    <Row>
                                        <Col md={6}>

                                            <FormGroup>
                                                <Label for="applyTopOf">Customer</Label>
                                                <Input
                                                    value={customer}
                                                    type="select"
                                                    name="customer"
                                                    id="customer"
                                                    onChange={(e) => {
                                                        setCustomer(e.target.value);
                                                    }}>
                                                    <option defaultChecked>select one</option>
                                                    {customersForModulesData.data?.customers.map(cus => <Customer customer={cus} key={cus.id} />)}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>

                                            <FormGroup>
                                                <Label for="applyTopOf">Apply Top of</Label>
                                                <Input
                                                    value={applyTopOf}
                                                    type="select"
                                                    name="applyTopOf"
                                                    id="applyTopOf"
                                                    onChange={(e) => {
                                                        setApplyTopOf(e.target.value);
                                                    }}>
                                                    <option defaultChecked>select one</option>
                                                    {pageData.data?.versionHistoryData.filter(data => data.versionNo !== params.version).map(ver => <ApplyOnTopOf version={ver} key={ver.tagId + ver.versionNo} />)}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>

                                            <FormGroup>
                                                <Label for="type">Type</Label>
                                                <Input
                                                    value={type}
                                                    type="select"
                                                    name="type"
                                                    id="type"
                                                    onChange={(e) => {
                                                        setType(e.target.value);
                                                    }}>
                                                    <option defaultChecked>select one</option>
                                                    <option value="full">Full</option>
                                                    <option value="patch">Patch</option>
                                                    {/* {pageData.data?.versionHistoryData.filter(data => data.versionNo !== params.version).map(ver => <ApplyOnTopOf version={ver} key={ver.tagId + ver.versionNo} />)} */}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card className="card border-0 mt-3" body>
                                    <Label for="dependentversion" tag="h6">Dependent Version</Label>
                                    <Row>
                                        <Col md={6}>
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
                                    <Button id="next2" onClick={() => { submitDetails(); }}>Save to draft</Button>
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
                                    <Button id='next3' onClick={() => { submitDetails(); }}>Save to draft</Button>
                                </Col> */}
                                </Card>
                            </FormikStep>
                            <FormikStep>
                                <Card className="card border-0 mt-3" body>
                                    <Col md={6}>
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
                                        <FormGroup>
                                            <Label for="releaseDate">Release Date</Label>
                                            <Input
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
                        </FormikStepper>
                    </Container>
                </main>
                <FooterBar />
            </>
        );
    } else {
        return <LoaderPage />
    }
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

function ApplyOnTopOf({ version }: PropsWithChildren<{ version: VersionHistoryData }>) {
    return (
        <option>{version.versionNo}</option>
    )
}

function Customer({ customer }: PropsWithChildren<{ customer: CustomerForModule }>) {
    return (
        <option value={customer.id}>{customer.name}</option>
    )
}

function getArray(module: String, version: String) {

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

function DependentModuleLabels({ modules }: PropsWithChildren<{ modules: DependentModules }>) {

    const dependentModulesData = useDependentModulesPageDataSelector();

    return (
        <FormGroup>
            <Label for={modules.name}>{modules.name}</Label>
            <Input
                type="select"
                onChange={(e) => {
                    getArray(modules.name, e.target.value)
                }}
            >
                <option key={0}>Not Applicable</option>
                {modules.versions.map(value =>
                    <option key={value}>{value}</option>

                )}
            </Input>
        </FormGroup>
    )
}
