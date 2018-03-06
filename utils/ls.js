import _ from 'lodash';

const varName = 'touchToType';

const get = () => {
  let obj = window.localStorage.getItem(varName);

  if (obj) {
    obj = JSON.parse(obj);
  }
  else {
    obj = {};
  }

  return obj;
};

const set = (path, val) => window.localStorage.setItem(varName, JSON.stringify(_.set(get(), path, val)));

const update = obj => window.localStorage.setItem(varName, JSON.stringify(_.merge(get(), obj)));

const clear = () => window.localStorage.removeItem(varName);

export default {
  get,
  set,
  update,
  clear,
};
