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

import {PortalState} from "./store";
import {shallowEqual, useSelector} from "react-redux";

export enum LoadingStatus {
    LOADING_STARTED = 1,
    LOADING_SUCCESS = 2,
    LOADING_ERROR = 3
}


export function usePortalStateSelector<T>(selector: (ev: PortalState) => T): T {
    return useSelector<PortalState, T>(ev => selector(ev), shallowEqual)

}
