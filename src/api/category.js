import axios from 'axios';

export const getContent = (id) => {
  return axios.get(`http://www.imooc.com/api/category/content/${id}`, {timeout: 100000}).then(res => {
    if (res.data.code === 0) {
      //   console.log(res.data);
      return res.data.content;
    }
    throw new Error('没有获取到数据');
  }).catch(err => {
    console.log(err);
  });
};
