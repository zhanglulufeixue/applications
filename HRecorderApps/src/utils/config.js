/*
 * @Author: syy
 * @Date: 2018-09-11 09:31:22
 * @Description: 描述
 * @Last Modified by: lulu Zhang
 * @Last Modified time: 2018-10-11 17:10:18
 */

const ipSign = '192.168.16.17';
const ip = '192.168.16.17';
const port = '8401';

module.exports = {
  name: 'app',

  service: {
    // server: `http://${ip}:8801/`,
    server: `http://${ip}:8401/`,
    ip,
    ipSign,
    port,
  },
  appId: '1257645122',
};
