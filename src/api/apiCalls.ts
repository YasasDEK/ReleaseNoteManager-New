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

import {CustomerList, 
    ModuleList, 
    VersionHistoryList, 
    DeploymentLocationList, 
    ModulesForLocationList, 
    DeploymentTimeLineList,
    DependentModulesList,
    AddDevReleaseNote,
    DeployToLocation,
    ViewDevReleaseNoteList,
    VersionHistoryInEditReleaseNoteList,
    VersionForDeployToLocationList,
    LocationForDeployToLocationList,
    CustomerForDeployToLocationList,
    DeploymentHistoryForReleaseNoteList,
    VersionHistoryDataList,
    ViewModuleDeploymentList,
    AddDAReleaseNote,
    EditDAReleaseNote,
    ViewDAReleaseNoteList

} from "./apiDomain";


function getApiServerUrl(): String {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return "http://127.0.0.1:10001";
    } else {
        return window.location.origin;
    }
}


const JSON_HEADER = {
    'Content-Type': 'application/json'
};

function processJsonBody(json: { [key: string]: any }) {
    // console.log("json",json)
    // console.log("error",json.error)
    if (json.error) {
        const err: any = new Error(json.error);
        err.status = json.status;
        return Promise.reject(err)
    }
    return json
}


//01) Customers main page
export async function getCustomerList(): Promise<CustomerList> {
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/customers/get`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respCustomer",resp);
    const json = await resp.json();
    return processJsonBody(json) as CustomerList
}

//02) Modules main page
export async function getModuleList(): Promise<ModuleList> {
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/modules/get`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respModule",resp);
    const json = await resp.json();
    return processJsonBody(json) as ModuleList
}
        
//03) Modules page -> version history page
let moduleId = 0;

export function getModuleId(modId: any) {
    moduleId = modId;
}

export async function getVersionHistoryList(): Promise<VersionHistoryList> {

    const resp = await fetch(`${getApiServerUrl()}/rnm-api/versions/get/${moduleId}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respVersion",resp);
    const json = await resp.json();
    return processJsonBody(json) as VersionHistoryList
}

let moduleIdForVersionHistory = 0;

export function getmoduleIdForVersionHistory(modId: any) {
    moduleIdForVersionHistory = modId;
}

export async function getVersionHistoryDataList(): Promise<VersionHistoryDataList> {

    const resp = await fetch(`${getApiServerUrl()}/rnm-api/getVersionHistoryData/${moduleIdForVersionHistory}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respVersion",resp);
    const json = await resp.json();
    return processJsonBody(json) as VersionHistoryDataList
}

export async function getModuleUsingIdList(): Promise<ModuleList> {
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/modulesUsingId/get/${moduleIdForVersionHistory}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respModule",resp);
    const json = await resp.json();
    return processJsonBody(json) as ModuleList
}

let moduleIdForDev = 0;
let tag = 0;

export function getmoduleIdForDev(modId: any) {
    moduleIdForDev = modId;
}

export function getTag(mod: any) {
    tag = mod;
}

//customer for module
export async function getCustomersForModuleList(): Promise<CustomerList> {

    const resp = await fetch(`${getApiServerUrl()}/rnm-api/getCustomersForModule/${moduleIdForDev}/${tag}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respVersion",resp);
    const json = await resp.json();
    return processJsonBody(json) as CustomerList
}



//04) customers page -> show all deployment locations
let customerId = 0;

export function getCustomerId(cusId: any) {
    customerId = cusId;
}

export async function getDeploymentLocationList(): Promise<DeploymentLocationList> {

    const resp = await fetch(`${getApiServerUrl()}/rnm-api/deployments/get/${customerId}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respVersion",resp);
    const json = await resp.json();
    return processJsonBody(json) as DeploymentLocationList
}

//05) Loaction page -> particular module
let location = '';
let cusId = 0;

export function getLocation(loc: any) {
    location = loc;
}

export function getCusId(cus: any) {
    cusId = cus
}

export async function getModulesForLocationList(): Promise<ModulesForLocationList> {

    const resp = await fetch(`${getApiServerUrl()}/rnm-api/modulesForLocation/get/${cusId}/${location}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respVersion",resp);
    const json = await resp.json();
    return processJsonBody(json) as ModulesForLocationList
}

// 06) deployment time line list
let locationHistory = '';
let cusIdHistory = 0;
let modIdHistory = 0;

export function getLocationHistory(loc: any) {
    locationHistory = loc;
}

export function getCusIdHistory(cus: any) {
    cusIdHistory = cus
}

export function getModIdHistory(mod: any) {
    modIdHistory = mod
}

export async function getDeploymentTimeLineList(): Promise<DeploymentTimeLineList> {

    const resp = await fetch(`${getApiServerUrl()}/rnm-api/timeline/get/${cusIdHistory}/${locationHistory}/${modIdHistory}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respVersion",resp);
    const json = await resp.json();
    return processJsonBody(json) as DeploymentTimeLineList
}

//Dependent Modules

export async function getDependentModulesList(): Promise<DependentModulesList> {

    const resp = await fetch(`${getApiServerUrl()}/rnm-api/dependent/get/${moduleIdForDev}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respVersion",resp);
    const json = await resp.json();
    return processJsonBody(json) as DependentModulesList
}


//add dev release note
export async function addDevReleaseNote(releaseNoteInfo: any): Promise<AddDevReleaseNote> {
    console.log("Json",JSON.stringify(releaseNoteInfo))
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/api/addDevReleaseNote`, {
        method: 'POST',
        headers: JSON_HEADER,
        body: JSON.stringify(releaseNoteInfo)
    });
    console.log("releaseNoteInfo",releaseNoteInfo);
    const json = await resp.json();
    // console.log("j",json)
    return processJsonBody(json) as AddDevReleaseNote
}

let tagIdForRelease = 0
let customerIdforRelease = 0

export function getTagIdForRelease(mod: any) {
    tagIdForRelease = mod;
}

export function getCustomerIdforRelease(ver: any) {
    customerIdforRelease = ver
}


//view release note
export async function getDevReleaseNoteList(): Promise<ViewDevReleaseNoteList> {

    const resp = await fetch(`${getApiServerUrl()}/rnm-api/devReleaseNote/get/${tagIdForRelease}/${customerIdforRelease}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respVersion",resp);
    const json = await resp.json();
    return processJsonBody(json) as ViewDevReleaseNoteList
}

let moduleIdForRelease = 0
let versionNoforRelease = ''

export function getModuleIdForRelease(mod: any) {
    moduleIdForRelease = mod;
}

export function getVersionNoforRelease(ver: any) {
    versionNoforRelease = ver
}

//get location for deploy to location list
export async function getDeploymentHistoryForReleaseNote(): Promise<DeploymentHistoryForReleaseNoteList> {
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/getDeploymentHistory/${moduleIdForRelease}/${versionNoforRelease}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    const json = await resp.json();
    return processJsonBody(json) as DeploymentHistoryForReleaseNoteList
}

//version history fro edit release note
let moduleIdForEditRelease = 0
let versionNoforEditRelease = ''

export function getModuleIdForEditRelease(mod: any) {
    moduleIdForEditRelease = mod;
}

export function getVersionNoforEditRelease(ver: any) {
    versionNoforEditRelease = ver
}

//view release note
export async function getReleaseNoteforEditRelease(): Promise<VersionHistoryInEditReleaseNoteList> {
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/releaseNoteEdit/get/${moduleIdForEditRelease}/${versionNoforEditRelease}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    // console.log("respVersion",resp);
    const json = await resp.json();
    return processJsonBody(json) as VersionHistoryInEditReleaseNoteList
}

//edit release note
export async function editDevReleaseNote(releaseNoteInfo: any) {
    console.log("Json",JSON.stringify(releaseNoteInfo))
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/api/editDevReleaseNote`, {
        method: 'POST',
        headers: JSON_HEADER,
        body: JSON.stringify(releaseNoteInfo)
    });
    console.log("releaseNoteInfo",releaseNoteInfo);
}

let moduleIdForDeployToLocation = 0

export function getModuleIdForDeployToLocation(mod: any) {
    moduleIdForDeployToLocation = mod;
}

//get version for deploy to location list
export async function getVersionForDeployToLocation(): Promise<VersionForDeployToLocationList> {
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/getVersionForDeployToLocation/${moduleIdForDeployToLocation}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    const json = await resp.json();
    return processJsonBody(json) as VersionForDeployToLocationList
}

//get location for deploy to location list
export async function getLocationForDeployToLocation(): Promise<LocationForDeployToLocationList> {
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/getLocationForDeployToLocation`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    const json = await resp.json();
    return processJsonBody(json) as LocationForDeployToLocationList
}

//get location for deploy to location list
export async function getCustomerForDeployToLocation(): Promise<CustomerForDeployToLocationList> {
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/getCustomerForDeployToLocation/${moduleIdForDeployToLocation}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    const json = await resp.json();
    return processJsonBody(json) as CustomerForDeployToLocationList
}

//deploy to location
export async function deployToLocation(deployToLocationDetails: any): Promise<DeployToLocation> {
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/api/deployToLocation`, {
        method: 'POST',
        headers: JSON_HEADER,
        body: JSON.stringify(deployToLocationDetails)
    });
    console.log("deployToLocationDetails",deployToLocationDetails);
    const json = await resp.json();
    return processJsonBody(json) as DeployToLocation
}

//add tag data


export async function addTagData(tagData: any): Promise<any> {
    console.log("Json",JSON.stringify(tagData))
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/api/addTagData`, {
        method: 'POST',
        headers: JSON_HEADER,
        body: JSON.stringify(tagData)
    });
    console.log("tagData",tagData);
    const json = await resp.json();
    // console.log("j",json)
    return processJsonBody(json) as any
}

let moduleIdForViewDeploy = 0
let customerIdForViewDeploy = 0
let versionForViewDeploy = ""
let locationForViewDeploy = "" 

export function getModuleIdForViewDeploy(mod: any) {
    moduleIdForViewDeploy = mod;
}

export function getCustomerIdForViewDeploy(mod: any) {
    customerIdForViewDeploy = mod;
}

export function getVersionForViewDeploy(mod: any) {
    versionForViewDeploy = mod;
}

export function getLocationForViewDeploy(mod: any) {
    locationForViewDeploy = mod;
}

//view module deployments
export async function viewModuleDeployment(): Promise<ViewModuleDeploymentList> {
    const resp = await fetch(`${getApiServerUrl()}/rnm-api/getModuleDeployment/${moduleIdForViewDeploy}/${versionForViewDeploy}/${locationForViewDeploy}/${customerIdForViewDeploy}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    const json = await resp.json();
    return processJsonBody(json) as ViewModuleDeploymentList
}

// add da release note
export async function addDAReleaseNote(daReleaseNoteInfo: any): Promise<AddDAReleaseNote> {

    const resp = await fetch(`${getApiServerUrl()}/rnm-api/api/addDAReleaseNote`, {
        method: 'POST',
        headers: JSON_HEADER,
        body: JSON.stringify(daReleaseNoteInfo)
    });
    const json = await resp.json();
    // console.log("j",json)
    return processJsonBody(json) as AddDAReleaseNote
}

// add da release note
export async function editDAReleaseNote(editReleaseNoteInfo: any): Promise<EditDAReleaseNote> {

    const resp = await fetch(`${getApiServerUrl()}/rnm-api/api/editDAReleaseNote`, {
        method: 'POST',
        headers: JSON_HEADER,
        body: JSON.stringify(editReleaseNoteInfo)
    });
    const json = await resp.json();
    return processJsonBody(json) as EditDAReleaseNote
}

let tagIdForDA = 0;
let customerIdForDA = 0;

export function getTagIdForDA(mod: any) {
    tagIdForDA = mod;
}

export function getCustomerIdForDA(mod: any) {
    customerIdForDA = mod;
}

//view DA release note
export async function getDAReleaseNoteList(): Promise<ViewDAReleaseNoteList> {

    const resp = await fetch(`${getApiServerUrl()}/rnm-api/daReleaseNote/get/${tagIdForDA}/${customerIdForDA}`, {
        method: 'GET',
        headers: JSON_HEADER,
        // body: JSON.stringify(regReq)
    });
    const json = await resp.json();
    return processJsonBody(json) as ViewDAReleaseNoteList
}

