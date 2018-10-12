import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './StatsticsChart.less';
import img from '../../assets/bg.jpg';
import ChartCard from '../../components/Statstics/ChartCard';
import ChartBigScreen from '../../components/Statstics/ChartBigScreen';
import ChartBoardCast from '../../components/Statstics/ChartBoardCast';

class StatsticsChart extends PureComponent {
  getList = list => {
    const { isHaveChart } = this.props;
    return list.map((item, index) => {
      const key = `list${index}`;
      return (
        <div key={key} className={styles.listItem}>
          {index === 0 ? (
            <div className={styles.orderNumberOne}>{index + 1}</div>
          ) : index === 1 ? (
            <div className={styles.orderNumberTwo}>{index + 1}</div>
          ) : index === 2 ? (
            <div className={styles.orderNumberThree}>{index + 1}</div>
          ) : (
            <div className={styles.orderNumberFour}>{index + 1}</div>
          )}
          <span className={styles.name}>{item.name}</span>
          {isHaveChart ? (
            <span className={styles.num}>
              {item.num}
              小时
            </span>
          ) : (
            <span className={styles.num}>{item.num}次</span>
          )}
        </div>
      );
    });
  };

  render() {
    const {
      activityList,  //活跃度排行
      mostHotPlayList,  //最热播放
      mostHotPraise,  //最热点赞
      teacherList,  //教师排行
      useList,  //软件使用排行

      toltalCount,
      lookOrUpdataCount,

      openOrClose,//图表的开机关机数据

      type,  //类型：直播、视频、班牌、大屏、录播
      isHaveChart,  //是否有图表
      isVideo,  //是否是视频，区别直播以及视频
    } = this.props;
    
    const { getList } = this;
    const mapChartProps = {
      openOrClose,
    };
    return (
      <div>
        <div className={styles.totleDataLayoutItem}>
          {type === 'bigScreen' ? (
            <div>
              <img className={styles.totleNumImg} src={img} alt="" />
              <div className={styles.totleNumContent}>大屏总数</div>
              <div className={styles.totleCiNum}>{toltalCount}</div>
              <div className={styles.ci}>台</div>
            </div>
          ) : type === 'broadCast' ? (
            <div>
              <img className={styles.totleNumImg} src={img} alt="" />
              <div className={styles.totleNumContent}>录播总数</div>
              <div className={styles.totleCiNum}>{toltalCount}</div>
              <div className={styles.ci}>台</div>
            </div>
          ) : type === 'card' ? (
            <div>
              <img className={styles.totleNumImg} src={img} alt="" />
              <div className={styles.totleNumContent}>班牌总数</div>
              <div className={styles.totleCiNum}>{toltalCount}</div>
              <div className={styles.ci}>台</div>
            </div>
          ) : type === 'live' ? (
            <div>
              <div className={styles.toltalItem}>
                <img className={styles.totleNumImg} src={img} alt="" />
                <div className={styles.totleNumContent}>直播总数</div>
                <div className={styles.totleCiNum}>{toltalCount}</div>
                <div className={styles.ci}>个</div>
              </div>
              <div className={styles.toltalItem}>
                <img className={styles.totleNumImg} src={img} alt="" />
                <div className={styles.totleNumContent}>观看总人数</div>
                <div className={styles.totleRenNum}>{lookOrUpdataCount}</div>
                <div className={styles.ci}>人</div>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.toltalItem}>
                <img className={styles.totleNumImg} src={img} alt="" />
                <div className={styles.totleNumContent}>视频总数</div>
                <div className={styles.totleCiNum}>{toltalCount}</div>
                <div className={styles.ci}>个</div>
              </div>
              <div className={styles.toltalItem}>
                <img className={styles.totleNumImg} src={img} alt="" />
                <div className={styles.totleNumContent}>本周更新视频</div>
                <div className={styles.totleRenNum}>{lookOrUpdataCount}</div>
                <div className={styles.ci}>人</div>
              </div>
            </div>
          )}
        </div>
        {type === 'bigScreen' ? (
          <div>{<ChartBigScreen {...mapChartProps} />}</div>
        ) : type === 'broadCast' ? (
          <div>{<ChartBoardCast {...mapChartProps} />}</div>
        ) : (
          type === 'card' && <div>{<ChartCard {...mapChartProps} />}</div>
        )}
        {isHaveChart ? (
          <div className={styles.list}>
            <div className={styles.card}>
              <div className={styles.listTitle}>活跃度排行</div>
              <div className={styles.listLayout}>{getList(activityList)}</div>
            </div>
            {type === 'bigScreen' && (
              <div className={styles.card}>
                <div className={styles.listTitle}>软件使用排行</div>
                <div className={styles.listLayout}>{getList(useList)}</div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.list}>
            {isVideo && (
              <div>
                <div className={styles.card}>
                  <div className={styles.listTitle}>最热播放</div>
                  <div className={styles.listLayout}>{getList(mostHotPlayList)}</div>
                </div>
                <div className={styles.card}>
                  <div className={styles.listTitle}>最热点赞</div>
                  <div className={styles.listLayout}>{getList(mostHotPraise)}</div>
                </div>
              </div>
            )}
            <div className={styles.card}>
              <div className={styles.listTitle}>教师排行</div>
              <div className={styles.listLayout}>{getList(teacherList)}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect()(StatsticsChart);
