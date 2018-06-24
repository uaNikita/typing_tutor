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
    obj = LZString.decompressFromEncodedURIComponent(obj);

    obj = JSON.parse(obj);
  }
  else {
    obj = {};
  }

  return obj;
};

const set = (obj) => {
  let cookie = JSON.stringify(obj);

  cookie = LZString.compressToEncodedURIComponent(cookie);

  Cookies.set(cookieName, cookie);
};


const path = (pathToProp, val) => {
  const obj = _.set(get(), pathToProp, val);

  set(obj);
};

const assign = (objToExtend) => {
  const obj = _.merge(get(), objToExtend);

  set(obj);
};

const clear = () => Cookies.remove(cookieName);

export default {
  get,
  set,
  path,
  assign,
  clear,
};
