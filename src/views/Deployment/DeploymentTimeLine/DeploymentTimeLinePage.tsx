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
// nodejs library that concatenates classes

import { useLocation, useParams, useHistory } from "react-router-dom";
import React, { PropsWithChildren, useEffect } from "react";
import { useDeploymentTimeLinePageDataSelector, DeploymentTimeLinePageEvent } from "./index";
import { DeploymentTimeLine } from "../../../api/apiDomain";

import { useDispatch } from "react-redux";
import { LoadingStatus } from "../../../rootReducer/actions";
import LoaderPage from "../../Common/LoaderPage";
import { getCusIdHistory, getModIdHistory, getLocationHistory } from "../../../api/apiCalls"
import HeaderNavBar from "../../Common/HeaderNavBar"
import FooterBar from "../../Common/FooterBar"

interface RouteParams {
  customer: string,
  name: string,
  location: string,
  module: string,
  moduleName: string
}

export default function DeploymentTimeLinePage() {
  const params = useParams<RouteParams>();
  const history = useHistory()
  getLocationHistory(params.location);
  getCusIdHistory(params.customer);
  getModIdHistory(params.module);
  let location = useLocation();
  const dispatch = useDispatch();
  const pageData = useDeploymentTimeLinePageDataSelector();

  useEffect(() => {
    dispatch({
      type: DeploymentTimeLinePageEvent.GET_DEPLOYMENT_TIME_LINE_LIST
    })

    return function cleanUp() {
      dispatch({ type: DeploymentTimeLinePageEvent.RESET })
    }
  }, []);

  if (pageData.loadingStatus == LoadingStatus.LOADING_SUCCESS) {
    return (
      <>
        <HeaderNavBar selectedItem={"customer"} />
        <div className="sub-header shadow-sm">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>Module Deployment TimeLine</h6>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-shrink-0 without-left-menu">
          <div className="container">
            <div className="card card-body border-0">
              <div className="row">
                <div className="col-sm-2">
                  <p className="m-0 font-weight-bold">Customer:</p>
                </div>
                <div className="col-sm-10">
                  <p className="m-0 sub-text font-weight-bold">{params.name}</p>
                </div>
                <div className="col-sm-2">
                  <p className="m-0 font-weight-bold">Deployment Location:</p>
                </div>
                <div className="col-sm-10">
                  <p className="m-0 sub-text font-weight-bold">{params.location}</p>
                </div>
                <div className="col-sm-2">
                  <p className="m-0 font-weight-bold">Module Name:</p>
                </div>
                <div className="col-sm-10">
                  <p className="m-0 sub-text font-weight-bold">{params.moduleName}</p>
                </div>
              </div>
            </div>
            <div className="card card-body border-0 mt-3">
              <div className="table-responsive p-0 mt-3">
                <table className="table table-borderless table-striped">
                  <thead>
                    <tr>
                      <th /*style="width: 20%"*/>Version</th>
                      <th /*style="width: 20%"*/>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.data?.deploymentTimeLine.map(dtl => <TableRow deploymentTimeLine={dtl} key={dtl.id} />)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <FooterBar />
      </>
    );
  } else {
    return <LoaderPage />
  }
}

function TableRow({ deploymentTimeLine }: PropsWithChildren<{ deploymentTimeLine: DeploymentTimeLine }>) {
  return (
    <>
      <tr>
        <td><span className="responsive-mobile-heading">Version</span>{deploymentTimeLine.version_no}</td>
        <td><span className="responsive-mobile-heading">Date</span>{deploymentTimeLine.applied_date[0]}-{deploymentTimeLine.applied_date[1]}-{deploymentTimeLine.applied_date[2]}</td>
      </tr>
    </>
  )
}