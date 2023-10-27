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