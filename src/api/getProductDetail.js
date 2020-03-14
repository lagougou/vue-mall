import jsonp from '../assets/js/jsonp';
import {jsonpOptions} from './config';

export const getProductDetail = (id) => {
  const url = 'https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/';
  const params = {
    api: 'mtop.taobao.detail.getdetail',
    ttid: '2017@taobao_h5_6.6.0',
    data: `{"itemNumId":"${id}"}`,
    // itemNumId: id,
    appKey: 12574478,
    dataType: 'jsonp',
    type: 'jsonp',
    v: '6.0'
  };
  return jsonp(url, params, jsonpOptions).then(res => {
    console.log('hahah90');
    console.log(res);
    if (res.result) {
      //   console.log(res);
      return res.result;
    }

    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};
