import { environment } from "../environments/environment.development";

const BASEURL = environment.BASEURL;

export const endpoints = {
    login: `${BASEURL}core/login/`,
    signup: `${BASEURL}core/signup/`,
}