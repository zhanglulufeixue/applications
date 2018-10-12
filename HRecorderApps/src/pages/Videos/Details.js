/*
 * @Author: syy
 * @Date: 2018-09-05 13:42:41
 * @Description: 描述
 * @Last Modified by: syy
 * @Last Modified time: 2018-10-11 17:31:55
 */
import React, { PureComponent } from 'react';
import styles from './Details.less';
import { connect } from 'dva';
import ShareModal from '../../components/ShareModal';
import { Icon } from 'antd-mobile';
import router from 'umi/router';
import noData from '../../assets/no-data.png';
import { appId } from '../../utils/config';
import DocumentTitle from 'react-document-title';
import defaultImg from '../../assets/bg.jpg';

let player = null;
class VideoDetails extends PureComponent {
  state = {
    isShare: false,
    isShowIntroduce: false,
  };

  componentDidMount() {
    const { videoPlayer } = this.props;
    const { videoId } = videoPlayer;
    const options = {
      fileID: videoId,
      appID: appId,
      bigPlayButton: false,
      plugins: {
        ContinuePlay: {
          // 开启续播功能
        },
      },
    };
    player = window.TCPlayer('video', options);
    player.play();
  }

  componentWillUnmount() {
    player.pause();
    player.dispose();
  }

  onElseVideoItemClick = item => {
    window.scrollTo(0, 0);
    const { dispatch } = this.props;
    player.pause();
    player.loadVideoByID({
      fileID: item.videoId,
      appID: appId,
    });
    dispatch({
      type: 'videoPlayer/changeState',
      payload: {
        uploadTime: item.uploadTime,
        description: item.description,
        videoName: item.videoTitle,
      },
    });

    dispatch({
      type: 'videoPlayer/getElseVideoList',
      payload: {
        videoId: item.videoId,
      },
    });

    dispatch({
      type: 'videoPlayer/viewCountAdd',
      payload: {
        videoId: item.videoId,
      },
    });
  };

  /**
   * 获取其他视频页面
   */
  getElseVideoList() {
    const { elseVideoList } = this.props.videoPlayer;
    const { onElseVideoItemClick } = this;
    return elseVideoList.map((item, index) => {
      const key = `list${index}`;
      return (
        <div
          key={key}
          className={styles.item}
          onClick={() => {
            onElseVideoItemClick({ ...item });
          }}
        >
          <div className={styles.imgLayout}>
            <img
              className={styles.videoSrc}
              src={item.thumb === '' ? defaultImg : item.thumb}
              alt=""
            />
          </div>
          <div className={styles.itemContentLayout}>
            <span className={styles.videoTitle}>{item.videoTitle}</span>
            <span className={styles.description}>{item.description}</span>
          </div>
        </div>
      );
    });
  }

  /**
   * 分享
   */
  share = () => {
    this.setState({
      isShare: true,
    });
  };

  // 取消分享框
  cancelShareHandler = () => {
    this.setState({
      isShare: false,
    });
  };

  /**
   * 返回到上一个页面，暂停播放器，并销毁掉
   */
  back = () => {
    router.push('/Videos');
    document.title = '录播移动端';
  };

  /**
   * 点击详情--简介，显示简介的具体内容
   */
  clickIntroduceHandler = () => {
    const { isShowIntroduce } = this.state;
    if (isShowIntroduce) {
      this.setState({
        isShowIntroduce: false,
      });
    } else {
      this.setState({
        isShowIntroduce: true,
      });
    }
  };

  render() {
    const { videoPlayer } = this.props;
    const { videoName, elseVideoList, viewCount, uploadTime, description } = videoPlayer;
    const { isShare, isShowIntroduce } = this.state;
    const shareModalProps = {
      isShare,
      cancelShareHandler: this.cancelShareHandler,
    };
    return (
      <DocumentTitle title={videoName}>
        <div>
          <Icon type="left" size="m" color="#fff" className={styles.back} onClick={this.back} />
          <video className={styles.video} id="video" />
          <div className={styles.detailsLayout}>
            <div className={styles.detail}>
              <span className={styles.content}>{videoName}</span>
              <span className={styles.count}>
                {viewCount}
                次播放
              </span>
              <span className={styles.uploadTime}>{uploadTime}</span>
            </div>
            <div className={styles.introduceLayout} onClick={this.clickIntroduceHandler}>
              <span className={styles.introduceText}>简介</span>
              <Icon type="right" size="m" className={styles.introduceImg} />
            </div>
            <div className={styles.share} onClick={this.share}>
              <i className="iconfont icon-tubiao212" />
            </div>
          </div>
          {isShowIntroduce ? (
            <div>
              <div className={styles.introduce}>简介</div>
              <span className={styles.introduceContent}>{description}</span>
            </div>
          ) : (
            <div>
              <div className={styles.line} />
              <div className={styles.elseVideoLayout}>
                <span className={styles.autorElseVideoTitle}>作者其他作品</span>
                {elseVideoList.length === 0 ? (
                  <div className={styles.noDataLayout}>
                    <img className={styles.noDataImg} src={noData} alt="" />
                    <div className={styles.noDataContent}>Opps！暂无视频信息</div>
                  </div>
                ) : (
                  <div className={styles.elseVideo}>{this.getElseVideoList()}</div>
                )}
              </div>
              {isShare && <ShareModal {...shareModalProps} />}
            </div>
          )}
        </div>
      </DocumentTitle>
    );
  }
}

function mapStateToProps({ videoPlayer }) {
  return {
    videoPlayer,
  };
}
export default connect(mapStateToProps)(VideoDetails);
