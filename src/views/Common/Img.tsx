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

import React, {PropsWithChildren} from 'react'

type ImgProps = PropsWithChildren<{ name: string, className?: string, imageWidth?: number, title?: string }>

export function Img({name, className, imageWidth, title}: ImgProps) {

    return <img alt={`${name} not found`} src={require(`./../../resources/images/${name}`)}
                width={imageWidth || undefined}
                className={className} title={title}/>
}



