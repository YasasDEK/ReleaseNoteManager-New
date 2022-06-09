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

import React from "react";
import {Img} from "./Img";


export default function LoaderPage() {
    return <div className="content">
        <div className="row">
            <div className="col-md-12 text-center">
                <div className="loader-back">
                    <Img name={"loader.gif"}/>
                </div>
            </div>
        </div>
    </div>
}

