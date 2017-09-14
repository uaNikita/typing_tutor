import Cookie from 'js-cookie';
import _ from 'lodash';

const cookieName = 'tt';

export const getUserCookie = () => Cookie.getJSON(cookieName);

export const updateUserCookie = obj => Cookie.set(cookieName, _.merge(Cookie.getJSON(cookieName), obj));

export const removeUserCookie = () => Cookie.remove(cookieName);
