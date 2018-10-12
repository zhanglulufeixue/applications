import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-flash';
import styles from './Share.less';
import ShareModal from '../../../components/ShareModal.js';

const flash = require('videojs-swf/dist/video-js.swf');

class ParentWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }
  componentDidMount() {
    const that = this;
    setTimeout(() => {
      const {
        // 视频播放路径
        src,
      } = that.props;

      const videoJsOptions = {
        techOrder: ['flash', 'html5'],
        // controlBar: {
        //   volumeMenuButton: { inline: false },
        //   playToggle: false,
        // },
        autoplay: true,
        language: 'zh-CN',
        controls: true,
        playbackRates: [0.5, 1, 1.5, 2],
        nativeAudioTracks: true,
        // sources: [
        //   {
        //     // src: 'http://jq22com.qiniudn.com/jq22-sp.mp4',
        //     // src: '//media.html5media.info/video.mp4',
        //     src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
        //     // src: 'rtsp://192.168.21.247/stream7',
        //     // type: 'rtmp/flv/m3u8/mp4',
        //   },
        // ],

        preload: 'auto',
        loop: true,
        live: true,
        poster: '',
        flash: {
          swf: 'video-js.swf',
          hls: {
            withCredentials: true,
          },
        },
      
      };

      this.player = videojs('parentVideo', videoJsOptions, () => {});
      this.player.play();
    }, 1000);
  }


  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // 分享直播内容
  shareLiveHandler = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'liveVideo/changeState',
      payload: {
        isShare: true, 
      },
    });
  };

  // 取消分享事件
   cancelShareHandler = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'liveVideo/changeState',
      payload: {
        isShare: false, 
      },
    });
  };

  render() {
    const { liveVideo } = this.props;
    const { isShare} = liveVideo;
    const shareModalProps = {
      isShare,
      cancelShareHandler: this.cancelShareHandler,
    };
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
        }}
      >
        <div
            style={{
                width: '100%',
                height: '30%',
                padding: 0,
          }}
        >
        <video
          id="parentVideo"
          controls
          style={{
            width: '100%',
            height: '100%',
            padding: 0,
          }}
          className="video-js vjs-default-skin vjs-big-play-centered vjs-fluid"
        >
          <source src="http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8" type="application/x-mpegURL" />
        </video>
        </div>
       
        <div>
            <div className={styles.videoName}>期末考试冲刺</div>
            <div className={styles.videoTime}>2018.08.27 08.00至10:00</div>
            <div className={styles.videoCount}>1.2万人观看</div>
            <div className={styles.videoTeacher}>张老师</div>
            <Icon className={styles.videoShare} type='left' onClick={() => {
              this.shareLiveHandler();
            }}></Icon>
        </div>
        {isShare && <ShareModal {...shareModalProps}></ShareModal>}
      </div>
    );
  }
}

function mapStateToProps({ liveVideo }) {
  return {
    liveVideo,
  };
}

export default connect(mapStateToProps)(ParentWatch);
