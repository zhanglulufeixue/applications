/**
 * 分享底部弹窗组件
 * 
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Modal, Toast } from 'antd-mobile';
import styles from './ShareModal.less';
import router from 'umi/router';
import { createForm } from 'rc-form';
import shareIcon from '../assets/yay.jpg';

class orderModal extends PureComponent {

  state = {
    
  };

  cancelHandler = () => {
    router.push('/liveVideo/liveVideo');
  };

  shareHandler = () => {
    Toast.info('分享成功123');
    global.wx.ready(function(){
      // 分享给好友
      global.wx.onMenuShareAppMessage({
        title: '123456', // 分享标题
        desc: '123123', // 分享描述
        link: 'https://mp.weixin.qq.com/s/ho6x32ZkFzHDDe1fVqLkrQ?tdsourcetag=s_pctim_aiomsg', // 分享链接
        imgUrl: 'imgUrl', // 分享图标
        success: function () {
          // doShareDone()
          Toast.info('123');
        },
        cancel: function () {
          // doShareCancel()
          Toast.info('456');
        }
      })
      
      global.wx.error(function(res){  
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。  
        console.log('res', res);
      });

     // 分享到朋友圈
     global.wx.onMenuShareTimeline({
        title: 'title', // 分享标题
        link: 'https://mp.weixin.qq.com/s/ho6x32ZkFzHDDe1fVqLkrQ?tdsourcetag=s_pctim_aiomsg', // 分享链接
        imgUrl: 'imgUrl', // 分享图标
        success: function () {
          // doShareDone()
          Toast.info('789');
        },
        cancel: function () {
          // doShareCancel()
          Toast.info('0123');
        }
      })
    })
  };

  render() {
    const { isShare, cancelShareHandler} = this.props;

    return (
      <Modal
          transparent
          visible={isShare}
          onClose={cancelShareHandler}
      >
        <div className={styles.shareContent}>
          <img className={styles.iconInfo} onClick={this.shareHandler} src={shareIcon} alt=''/>
          <img className={styles.iconInfo} onClick={this.shareHandler} src={shareIcon} alt=''/>
          <img className={styles.iconInfo} onClick={this.shareHandler} src={shareIcon} alt=''/>
        </div>
      </Modal>
    );
  }
}
function mapStateToProps({ liveVideo }) {
  return {
    liveVideo,
  };
}

export default connect(mapStateToProps)(createForm()(orderModal));