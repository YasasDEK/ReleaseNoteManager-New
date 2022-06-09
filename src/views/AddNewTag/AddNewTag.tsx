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
import HeaderNavBar from "../Common/HeaderNavBar"
import { useParams, useHistory } from "react-router-dom";
import { addTagData } from "../../api/apiCalls"


interface RouteParams {
  module: string,
  name: string
}

export default function AddNewTag() {
  const history = useHistory()
  const params = useParams<RouteParams>();
  const [moduleId, setModuleId] = useState(params.module);
  const [versionNo, setVersionNo] = useState("");
  const [branchName, setBranchName] = useState("");

  let tagData = {
    moduleId: moduleId,
    versionNo: versionNo,
    branchName: branchName
  }

  function submitTagData() {
    if (tagData.versionNo === "") {
      alert("version number cannot be empty")
    } else if(tagData.branchName === "") {
      alert("branch name cannot be empty")
    } else {
      addTagData(tagData).then((value) => {
        if (value === "Available") {
          alert("version number already available")
        } else {
          alert("A new tag added successfully")
          history.push("/webapp/home/versions/" + params.module + "/" + params.name)
        }

      }).catch((err) => {
        alert("invalid version")
      })
    }
  }

  return (
    <><HeaderNavBar selectedItem={"module"} />

      <div className="sub-header shadow-sm">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <h6 className="my-2 font-weight-bold"><button className="btn btn-light py-2 mr-3" onClick={() => history.goBack()}><i className="fas fa-angle-left"></i></button>Add a New Tag</h6>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-shrink-0 without-left-menu">
        <div className="card card-body border-0 mt-3">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label>Version No</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Version No"
                    onChange={(e) => setVersionNo(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Branch Name</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Branch Name"
                    onChange={(e) => setBranchName(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 justify-content-end">
          <div className="col-sm-2">
            <button className="btn btn-primary w-100" onClick={() => submitTagData()}>Submit</button>
          </div>
        </div>


      </main>

    </>
  )
}

