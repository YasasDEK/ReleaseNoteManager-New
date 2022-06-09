import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import configureStore from "./rootReducer/store";
import { Provider } from "react-redux";
import { MainUi } from "./views/MainUi/MainUi";
import Keycloak from 'keycloak-js'
import jwt_decode from 'jwt-decode';

export let keycloak = Keycloak({
    url: getKeycloakUrl() + '/auth',
    realm: 'release-note-manager',
    clientId: 'release-note-manager'
});

export function getKeycloakUrl(): String {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return "http://localhost:9090";
    } else {
        return window.location.origin;
    }
}

function loggedUserRole(token: any): string {
    try {
        const decoded = jwt_decode(token);
        // @ts-ignore
        let realmAccess = (decoded || {}).realm_access;
        return (realmAccess || {}).roles[0];
    } catch (error) {
        return "undefined"
    }
}

function loggedUserName(token: any): string {
    try {
        const decoded = jwt_decode(token);
        // @ts-ignore
        let name = (decoded || {}).preferred_username;
        // console.log("name",name)
        return (name || "")
    } catch (error) {
        return "undefined"
    }
}

function loggedFullName(token: any): string {
    try {
        const decoded = jwt_decode(token);
        // @ts-ignore
        let fullName = (decoded || {}).name;
        return (fullName || "")
    } catch (error) {
        return "undefined"
    }
}

function userDetails(token: any): object {
    return { userRole: loggedUserRole(token), userName: loggedUserName(token), fullName: loggedFullName(token) }
}

const store = configureStore();

function Root() {
    return (
        <Provider store={store}>
            <MainUi userDetails={userDetails(keycloak.token)}/>
        </Provider>
    );
}

// function getRouterBasePath() {
//     if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//         return "";
//     } else {
//         return "/portal";
//     }
// }

// function onKeycloakEvent(e: any) {
//     console.log("onKeycloakEvent", e)
// }
//
// function onKeycloakTokens(e: any) {
//     console.log("onKeycloakTokens", e)
// }
//
// export const keycloak = Keycloak({
//     "realm": "training-portal",
//     "url": `${getKeycloakUrl()}/auth/`,
//     "clientId": "training-portal-web"
// });

keycloak.init({ onLoad: 'login-required', "checkLoginIframe": false })
    .success((auth) => {

        if (!auth) {
            window.location.reload();
        } else {
            console.info("Authenticated");
        }


        // console.log("keycloak", keycloak.token)
        // console.log(userDetails(keycloak.token))
        ReactDOM.render(<Root />, document.getElementById('root'));

        if (keycloak.token != null) {
            localStorage.setItem("access-token", keycloak.token);
        }
        if (keycloak.refreshToken != null) {
            localStorage.setItem("refresh-token", keycloak.refreshToken);
        }

    }).error(() => {
        console.error("Authenticated Failed");
    });


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
