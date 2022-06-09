import React, { PropsWithChildren } from "react"
// import { Link } from "react-router-dom"
// import { select } from "redux-saga/effects"
import companyLogoImage from "../../resources/images/company-logo.png";
// import Keycloak from 'keycloak-js'
import { keycloak } from "../../index"

export default function HeaderNavBar({ selectedItem }: PropsWithChildren<{ selectedItem: "module" | "customer" }>) {
    let moduleItemStyle = selectedItem === "module" ? "nav-item active" : "nav-item"
    let customerItemStyle = selectedItem === "customer" ? "nav-item active" : "nav-item"
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <a className="navbar-brand" href="#"><img src={companyLogoImage} /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className={moduleItemStyle}>
                            <a className="nav-link" href={'/webapp/home'}>Modules <span className="sr-only">(current)</span></a>
                        </li>
                        <li className={customerItemStyle}>
                            <a className="nav-link" href={'/webapp/customer'}>Customers</a>
                        </li>
                    </ul>
                    <div>
                        <button className="nav-link" onClick={() => keycloak.logout()} >Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}