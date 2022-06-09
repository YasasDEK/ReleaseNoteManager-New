/*
 * (C) Copyright 2006-2020 hSenid Mobile Solutions (Pvt) Limited.
 *
 * All Rights Reserved.
 *
 * These materials are unpublished, proprietary, confidential source code of
 * hSenid Mobile Solutions (Pvt) Limited and constitute a TRADE SECRET
 * of hSenid Mobile Solutions (Pvt) Limited.
 *
 * hSenid Mobile Solutions (Pvt) Limited retains all title to and intellectual
 * property rights in these materials.
 *
 */

import { type } from "os";
import {components} from "../__generated/api";

/**
 * This wil expose the API domain objects as TypeScript types.
 */
export type Customer = components["schemas"]["Customer"]
export type CustomerList = components["schemas"]["CustomersList"]
export type Module = components["schemas"]["Module"]
export type ModuleList = components["schemas"]["ModulesList"]
export type VersionHistory = components["schemas"]["VersionHistory"]
export type VersionHistoryList = components["schemas"]["VersionHistoryList"]
export type DeploymentLocation = components["schemas"]["DeploymentLocation"]
export type DeploymentLocationList = components["schemas"]["DeploymentLocationList"]
export type ModulesForLocation = components["schemas"]["ModulesForLocation"]
export type ModulesForLocationList = components["schemas"]["ModulesForLocationList"]
export type DeploymentTimeLine = components["schemas"]["DeploymentTimeLine"]
export type DeploymentTimeLineList = components["schemas"]["DeploymentTimeLineList"]
export type DependentModules = components["schemas"]["DependentModule"]
export type DependentModulesList = components["schemas"]["DependentModuleList"]
export type AddDevReleaseNote = components ["schemas"]["AddDevReleaseNote"]
export type ViewDevReleaseNote = components["schemas"]["ViewDevReleaseNote"]
export type ViewDevReleaseNoteList = components ["schemas"]["ViewDevReleaseNoteList"]
export type VersionHistoryInEditReleaseNote = components["schemas"]["VersionHistoryInReleaseNote"]
export type VersionHistoryInEditReleaseNoteList = components["schemas"]["VersionHistoryInReleaseNoteList"]
export type EditReleaseNote = components["schemas"]["EditDevReleaseNote"]
export type DependentModuleVersion = components["schemas"]["DependentModuleVersion"]
export type LocationForDeployToLocation = components["schemas"]["LocationForDeployToLocation"]
export type LocationForDeployToLocationList = components["schemas"]["LocationForDeployToLocationList"]
export type CustomerForDeployToLocation = components["schemas"]["CustomerForDeployToLocation"]
export type CustomerForDeployToLocationList = components["schemas"]["CustomerForDeployToLocationList"]
export type VersionForDeployToLocation = components["schemas"]["VersionForDeployToLocation"]
export type VersionForDeployToLocationList = components["schemas"]["VersionForDeployToLocationList"]
export type DeployToLocation = components["schemas"]["DeployToLocation"]
export type DeploymentHistoryForReleaseNote = components["schemas"]["DeploymentHistoryForReleaseNote"]
export type DeploymentHistoryForReleaseNoteList = components["schemas"]["DeploymentHistoryForReleaseNoteList"]
export type AddTagData = components["schemas"]["AddTagData"]
export type VersionHistoryData = components["schemas"]["VersionHistoryData"]
export type VersionHistoryDataList = components["schemas"]["VersionHistoryDataList"]
export type VersionHistoryOtherData = components["schemas"]["VersionHistoryOtherData"]
export type CustomerForModule = components["schemas"]["Customer"]
export type CustomerForModuleList = components["schemas"]["CustomersList"]
export type DeployedLocation = components["schemas"]["DeployedLocation"]
export type ViewModuleDeployment = components["schemas"]["ViewModuleDeployment"]
export type ViewModuleDeploymentList = components["schemas"]["ViewModuleDeploymentList"] 
export type AddDAReleaseNote = components["schemas"]["AddDAReleaseNote"]
export type EditDAReleaseNote = components["schemas"]["EditDAReleaseNote"]
export type ViewDAReleaseNote = components["schemas"]["ViewDAReleaseNote"]
export type ViewDAReleaseNoteList = components["schemas"]["ViewDAReleaseNoteList"]