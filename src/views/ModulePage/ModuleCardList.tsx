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

import React, { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
import { useHomePageDataSelector } from ".";
import { Module } from "../../api/apiDomain";
import FooterBar from "../Common/FooterBar"

export default function ModuleCardList() {
    const pageData = useHomePageDataSelector();
    const [search, setSearch] = useState("");
    // const [modId, setModId] = useState(1); 
    let filteredList = pageData.data?.modules.filter(
        (modules) => {
            return modules.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
    );

    return (
        
        <><div className="sub-header shadow-sm">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h6 className="my-3 font-weight-bold">Modules</h6>
                    </div>
                    <div className="col-sm-6">
                        <div className="input-group">
                            <input type="search" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Search Modules" aria-label="Search Modules" aria-describedby="button-addon1" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" id="button-addon1"><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <main className="flex-shrink-0 without-left-menu">
                <div className="container">
                    <div className="row">
                        {filteredList?.map(mod => <ModuleCard module={mod} key={mod.id} />)}
                    </div>
                </div>
            </main>
            <FooterBar />
        </>

    );
}

function ModuleCard({ module }: PropsWithChildren<{ module: Module }>) {
    return (
        <div className="col-sm-4 mb-3">
            <Link to={
                {
                    pathname: `/webapp/home/versions/${module.id}/${module.name}`,
                    state: `${module.git}`,

                }
            }>
                <div className="card card-body border-0">
                    <p className="m-0 font-weight-bold">{module.name}</p>
                </div>
            </Link>
        </div>
    )
}
