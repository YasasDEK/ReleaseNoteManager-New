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

import React, { useEffect } from "react"
import { useDispatch } from "react-redux";
import { HomePageEvent, useHomePageDataSelector } from "./index";
import { LoadingStatus } from "../../rootReducer/actions";
import LoaderPage from "../Common/LoaderPage";
import { Container } from "reactstrap";

import ModuleCardList from "./ModuleCardList"
import HeaderNavBar from "../Common/HeaderNavBar"
// import FooterBar from "../Common/FooterBar"

export default function HomePage() {

    const dispatch = useDispatch();

    const pageData = useHomePageDataSelector();

    useEffect(() => {
        dispatch({
            type: HomePageEvent.GET_MODULE_LIST
        })

        return function cleanUp() {
            dispatch({ type: HomePageEvent.RESET })
        }

    }, []);

    if (pageData.loadingStatus == LoadingStatus.LOADING_SUCCESS) {
        return (
            <div>
                <HeaderNavBar selectedItem={"module"} />
                <Container>
                    <ModuleCardList />
                    {/* <FooterBar /> */}
                </Container> 
            </div>
        )
    } else {
        return <LoaderPage />
    }
}
