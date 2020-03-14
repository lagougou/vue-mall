const sessionStorage = window.sessionStorage;

export default {
  set(key, val) {
    if (val === undefined) {
      return;
    }
    sessionStorage.setItem(key, serialize(val));
  },
  get(key, def) {
    const val = deserialize(sessionStorage.getItem(key));
    return val === undefined ? def : val;
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  }
};

function serialize(val) {
  return JSON.stringify(val);
}

function deserialize(val) {
  if (typeof val !== 'string') {
    return undefined;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return val || undefined;
  }
}
