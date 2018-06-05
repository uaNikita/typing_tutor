/*
* Util to keep temporary data for unauthorized users
*/

import Cookies from 'js-cookie';
import LZString from 'lz-string';
import _ from 'lodash';

const cookieName = 'tt_temp';

const get = () => {
  let obj = Cookies.get(cookieName);

  if (obj) {
    obj = decodeURIComponent(obj);

    obj = LZString.decompress(obj);

    obj = JSON.parse(obj);
  }
  else {
    obj = {};
  }

  return obj;
};


const set = c => {
  let cookie = JSON.stringify(c);

  cookie = LZString.compress(cookie);

  cookie = encodeURIComponent(cookie);

  Cookies.set(cookieName, cookie);
};


const path = (pathToProp, val) => {
  const cookie = _.set(get(), pathToProp, val);

  set(cookieName, cookie);
};

const assign = obj => {
  const cookie = _.merge(get(), obj);

  set(cookieName, cookie);
};

const clear = () => Cookies.remove(cookieName);

export default {
  get,
  set,
  path,
  assign,
  clear,
};
