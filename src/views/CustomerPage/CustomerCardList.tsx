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
import { useCustomerPageDataSelector } from ".";
import { Customer } from "../../api/apiDomain";
// import FooterBar from "../Common/FooterBar";

export default function CustomerCardList() {

    const pageData = useCustomerPageDataSelector();
    const [search, setSearch] = useState("");
    let filteredList = pageData.data?.customers.filter(
        (customers) => {
            return customers.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
    );

    return (
        <>
            <div className="sub-header shadow-sm">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h6 className="my-3 font-weight-bold">Customers</h6>
                        </div>
                        <div className="col-sm-6">
                            <div className="input-group">
                                <input type="search" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Search Customers" aria-label="Search Customers" aria-describedby="button-addon1" />
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
                        {filteredList?.map(cus => <CustomerCard customer={cus} key={cus.id} />)}
                    </div>
                </div>
            </main>

            {/* <FooterBar /> */}
        </>
    );
}

function CustomerCard({ customer }: PropsWithChildren<{ customer: Customer }>) {
    return (
        <div className="col-sm-4 mb-3">
            <Link to={
                {
                    pathname: `/webapp/customer/${customer.id}/${customer.name}/deploymentlocation`,
                    state: `${customer.name}`
                }
            }>

                <div className="card card-body border-0">
                    <p className="m-0 font-weight-bold">{customer.name}</p>
                </div>
            </Link>
        </div>
    )
}

