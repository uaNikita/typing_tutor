import Cookies from 'js-cookie';
import LZString from 'lz-string';
import _ from 'lodash';

const getObjFromCookie = cookie => {
  let obj = decodeURIComponent(cookie);

  obj = LZString.decompress(obj);

  obj = JSON.parse(obj);

  return obj;
}

export default Cookies.withConverter({
  read: (value, name) => {
    let obj;

    if (name === 'tt_temp') {
      obj = {};

      if (value) {
        obj = getObjFromCookie(value);
      }
    }

    return obj;
  },
  write: (value, name) => {
    let cookie;

    if (name === 'tt_temp') {
      cookie = Cookies.get(name);

      if (cookie) {
        cookie = getObjFromCookie(cookie);
      }
      else {
        cookie = {};
      }

      _.merge(cookie, JSON.parse(value));

      cookie = JSON.stringify(cookie);

      cookie = LZString.compress(cookie);

      cookie = encodeURIComponent(cookie);
    }

    return cookie;
  },
});
