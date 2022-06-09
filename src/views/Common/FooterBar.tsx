import React from "react"

var today = new Date();
var year = today.getFullYear();
export default function FooterBar() {
    return (
        <footer className="footer footer__without-sidebar mt-auto py-3">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-center">
                        Copyright © {year} <a href="http://www.hsenidmobile.com" target="_blank">hSenid Mobile</a>. All rights reserved. | <a href="">Terms</a> | <a href="">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}