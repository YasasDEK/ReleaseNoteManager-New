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

import React, {useEffect} from "react"
import {useDispatch} from "react-redux";
import {CustomerPageEvent, useCustomerPageDataSelector} from "./index";
import {LoadingStatus} from "../../rootReducer/actions";
import LoaderPage from "../Common/LoaderPage";
import {Container} from "reactstrap";
import HeaderNavBar from "../Common/HeaderNavBar"
import FooterBar from "../Common/FooterBar"


// import MainNavbar from "../Items/NavBars/MainNavbar"
import CustomerCardList from "./CustomerCardList"

export default function CustomerHomePage() {

    const dispatch = useDispatch();

    const pageData = useCustomerPageDataSelector();

    useEffect(() => {
        dispatch({
            type: CustomerPageEvent.GET_CUSTOMER_LIST
        })

        return function cleanUp() {
            dispatch({type: CustomerPageEvent.RESET})
        }

    }, []);

    if (pageData.loadingStatus == LoadingStatus.LOADING_SUCCESS) {
        return (
            <div>
                <HeaderNavBar selectedItem={"customer"}/>
                <Container>
                    <CustomerCardList />
                </Container> 
                <FooterBar />
            </div>
        )
    } else {
        return <LoaderPage />
    }
}

