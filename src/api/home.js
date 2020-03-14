import axios from 'axios';
import { Promise } from 'core-js';

import jsonp from '../assets/js/jsonp';
import { HOME_RECOMMEND_PAGE, jsonpOptions } from './config';

export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider', {timeout: 10000})
    .then(res => {
      if (res.data.code === 0) {
        return res.data.slider;
      }
      throw new Error('没有获取到数据');
    })
    .catch(err => {
      if (err) {
        console.log(err);
        return [{
          linkUrl: 'http://www.imooc.com',
          picUrl: require('@/assets/img/404.png')
        }];
      }
    })
    .then(data => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      });
      // eslint-disable-next-line vue/script-indent
    });
};

// 获取热门的数据
export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PAGE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  };
  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.code === '200') {
      return res;
    }
    throw new Error('获取推荐商品数据失败');
  }).catch(err => {
    console.log(err);
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};
