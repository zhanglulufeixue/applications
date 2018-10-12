import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './ShareVideo.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { appId } from '../../utils/config';

let player = null;
class ShareWatch extends PureComponent {
  componentDidMount() {
    const fileID = '5285890782010672365';
    const options = {
      fileID: fileID, 
      appID: appId,
    };
    player = window.TCPlayer('shareVideo', options);
    player.play();
  }

  render() {
    return (
      <div className={styles.bg}>
        <video className={styles.video} id="shareVideo" />
        <span>求解一元一次方程</span>
      </div>
    );
  }
}

export default connect()(ShareWatch);
