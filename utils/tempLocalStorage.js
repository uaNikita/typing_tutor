/*
* Util to keep temporary data which takes up big space for unauthorized users
*/

import LZString from 'lz-string';
import _ from 'lodash';

const name = 'ttt';

const get = () => {
  let obj = window.localStorage.getItem(name);

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
  const data = JSON.stringify(obj);
  const compresseddata = LZString.compressToEncodedURIComponent(data);

  window.localStorage.setItem(name, compresseddata);
};


const path = (pathToProp, val) => {
  const obj = _.set(get(), pathToProp, val);

  set(obj);
};

const assign = (objToExtend) => {
  const obj = _.merge(get(), objToExtend);

  set(obj);
};

const clear = () => window.localStorage.removeItem(name);

export default {
  get,
  set,
  path,
  assign,
  clear,
};
