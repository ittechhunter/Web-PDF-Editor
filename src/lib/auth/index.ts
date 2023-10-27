import type {NextRequest} from 'next/server';
import { NextResponse } from 'next/server'

import {destroyCookie, setCookie} from 'nookies';
import jwtDecode from "jwt-decode";

import {
    AUTH_TOKEN_COOKIE,
    COOKIE_PATH,
    COOKIE_SAME_SITE,
    AUTH_LOGIN_URL,
    AUTH_LOGIN_REDIRECT,
    AUTH_REMEMBER_ME,
    COOKIE_DEFAULT_AGE,
    COOKIE_ENABLE_SECURE,
    AUTH_TOKEN,
    AUTH_REFRESH_TOKEN,

} from "@/lib/constants";
// import type {Token} from "@/openapi/client-node";
import store from '@/store';

/**
 *
 * @param data
 * @param remember
 */
export const setAuthCookies = (data: any, remember: boolean) => {
    let maxAge;

    if (remember) {
        maxAge = COOKIE_DEFAULT_AGE;
        setCookie(null, AUTH_REMEMBER_ME, 'true', {
            path: COOKIE_PATH,
            maxAge: COOKIE_DEFAULT_AGE,
            secure: COOKIE_ENABLE_SECURE,
            sameSite: COOKIE_SAME_SITE,
        });
    }
    setCookie(null, AUTH_TOKEN_COOKIE, `Bearer ${data[AUTH_TOKEN]}`, {
        path: COOKIE_PATH,
        maxAge,
        secure: COOKIE_ENABLE_SECURE,
        sameSite: COOKIE_SAME_SITE,
    });
    if (data[AUTH_REFRESH_TOKEN]) {
        setCookie(null, AUTH_REFRESH_TOKEN, data[AUTH_REFRESH_TOKEN], {
            path: COOKIE_PATH,
            maxAge,
            secure: COOKIE_ENABLE_SECURE,
            sameSite: COOKIE_SAME_SITE,
        });
    }
};

export const destroyAuthCookies = () => {
    destroyCookie({}, AUTH_TOKEN_COOKIE, {path: COOKIE_PATH, sameSite: COOKIE_SAME_SITE,})
    destroyCookie({}, AUTH_REFRESH_TOKEN, {path: COOKIE_PATH, sameSite: COOKIE_SAME_SITE,})
    destroyCookie({}, AUTH_REMEMBER_ME, {path: COOKIE_PATH, sameSite: COOKIE_SAME_SITE,})
}

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export async function verifyAuth(request: NextRequest) {
    const url = request.nextUrl.clone()
    const token = request.cookies.get(AUTH_TOKEN_COOKIE)
    const baseUrl = url.pathname
    if (!token) {
        url.pathname = AUTH_LOGIN_URL
        url.searchParams.set('nextUrl', baseUrl)
        return NextResponse.redirect(url)
    }
    const isValid = checkToken(token.value.toString());

    if (!isValid) {
        url.pathname = AUTH_LOGIN_URL
        url.searchParams.set('nextUrl', baseUrl)
        destroyAuthCookies()
        store.dispatch.auth.logout()
        return NextResponse.redirect(url)
    }
    try {
        return NextResponse.next()
    } catch (err) {
        url.pathname = AUTH_LOGIN_URL
        url.searchParams.set('nextUrl', baseUrl)
        return NextResponse.redirect(url)
    }
}




export async function mainPageAuth(request: NextRequest) {
    const url = request.nextUrl.clone()

    const token = request.cookies.get(AUTH_TOKEN_COOKIE)
    if (token) {
        const isValid = checkToken(token.value.toString());
        if (!isValid) {
            destroyAuthCookies()
            store.dispatch.auth.logout()
            url.pathname = AUTH_LOGIN_URL
            return NextResponse.redirect(url)
        }
        url.pathname = AUTH_LOGIN_REDIRECT
        return NextResponse.redirect(url)
    }
}


export const checkToken = (token: string) => {
    const [schema, _token] = token.split(' ');
    if (schema !== 'Bearer') {
        return false;
    }
    try {
        jwtDecode(_token);
        return true;
    } catch (error) {
        return false;
    }
}
