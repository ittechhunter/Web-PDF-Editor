import {Style} from '@react-pdf/types';


export const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME


export const AUTH_TOKEN = 'access_token'
export const AUTH_TOKEN_COOKIE = 'Authorization'
export const AUTH_REFRESH_TOKEN = 'refresh_token'
export const AUTH_LOGIN_REDIRECT = 'dashboard'
export const AUTH_LOGIN_URL = '/auth/login'
export const AUTH_REMEMBER_ME = 'remember_me';

export const COOKIE_DEFAULT_AGE = 10 * 365 * 24 * 60 * 60
export const COOKIE_PATH = process.env.NEXT_PUBLIC_COOKIE_PATH
export const COOKIE_SAME_SITE = 'Strict'
export const COOKIE_THEME = 'APP_THEME'
export const COOKIE_ENABLE_SECURE = process.env.NEXT_PUBLIC_ENABLE_COOKIE_SECURE === 'true'


export const IS_PRODUCTION = false
export const WEBAPP_URL = process.env.NEXT_PUBLIC_BASE_URL ?? ""
export const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ""


export const containerWidth = "80%";
export const maxWidth = 1170;

export const defaultFont = 16;
export const smallFont = 12;
export const largeFont = 22;

export const transition = "0.3s ease-out";

export const MAX_IMAGE_WIDTH = 350;

export const DefaultValues: Style = {
    fontFamily: "Fira Sans",
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    fontSize: 10
};

export const TOPHEIGHT = 40;