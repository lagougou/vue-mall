import jsonp from 'jsonp';

const parseParam = (param) => {
  let params = [];
  for (let key in param) {
    params.push(`${key}=${param[key]}`);
  }
  return params.join('&');
};
export default (url, data, options) => {
  url += (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data);
  console.log(url);
  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
