import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import styles from './index.less';
import StatisticsChart from '../../components/Statstics/StatsticsChart';

class BasicLayout extends PureComponent {
  render() {
    const tab = [
      { title: '直播' },
      { title: '大屏' },
      { title: '录播' },
      { title: '班牌' },
      { title: '视频' },
    ];

    const mapLiveVideoProps = {
      teacherList: [
        { name: '张明阳', num: 20 },
        { name: '郑少芬', num: 16 },
        { name: '单云彦', num: 20 },
        { name: '张路路', num: 60 },
        { name: '候英豪', num: 100 },
        { name: '王龙飞', num: 20000 },
      ],
      isVideo: false, //是否是视频
      isHaveChart: false,
      type: 'live',
      toltalCount: 200,
      lookOrUpdataCount:666,
    };

    const mapVideoProps = {
      teacherList: [
        { name: '张明阳', num: 20 },
        { name: '郑少芬', num: 16 },
        { name: '单云彦', num: 20 },
        { name: '张路路', num: 60 },
        { name: '候英豪', num: 100 },
        { name: '王龙飞', num: 20000 },
      ],
      mostHotPlayList: [
        { name: '二次函数', num: 20 },
        { name: '文言文阅读', num: 16 },
        { name: '一次函数', num: 20 },
        { name: '英语语法', num: 60 },
        { name: '数学重点讲解', num: 100 },
        { name: '医院一次方程讲解', num: 20000 },
      ],
      mostHotPraise: [
        { name: 'SYY二次函数', num: 20 },
        { name: 'SYY文言文阅读', num: 16 },
        { name: 'SYY一次函数', num: 20 },
        { name: 'SYY英语语法', num: 60 },
        { name: 'SYY数学重点讲解', num: 100 },
        { name: 'SYY医院一次方程讲解', num: 20000 },
      ],
      isVideo: true, //是否是视频
      isHaveChart: false,
      type: 'video',
      toltalCount: 200,
      lookOrUpdataCount: 6666,
    };

    const mapCardProps = {
      activityList: [
        { name: '11-4班', num: 20 },
        { name: '11-5班', num: 16 },
        { name: '11-6班', num: 20 },
        { name: '11-1班', num: 60 },
        { name: '11-3班', num: 100 },
        { name: '11-2班', num: 20000 },
      ],
      toltalCount: 200,
      openOrClose: [{ name: '开机', value: 69.1 }, { name: '未开机', value: 30.9 }],
      type: 'card',
      isHaveChart: true,
    };

    const mapBroadCastProps = {
      type: 'broadCast',
      activityList: [
        { name: '11-4班', num: 20 },
        { name: '11-5班', num: 16 },
        { name: '11-6班', num: 20 },
        { name: '11-1班', num: 60 },
        { name: '11-3班', num: 100 },
        { name: '11-2班', num: 20000 },
      ],
      toltalCount: 200,
      openOrClose: [{ name: '开机', value: 69.1 }, { name: '未开机', value: 30.9 }],
      isHaveChart: true,
    };

    const mapBigScreenProps = {
      type: 'bigScreen',
      activityList: [
        { name: '11-4班', num: 20 },
        { name: '11-5班', num: 16 },
        { name: '11-6班', num: 20 },
        { name: '11-1班', num: 60 },
        { name: '11-3班', num: 100 },
        { name: '11-2班', num: 20000 },
      ],
      useList: [
        { name: '11-4班', num: 20 },
        { name: '11-5班', num: 16 },
        { name: '11-6班', num: 20 },
        { name: '11-1班', num: 60 },
        { name: '11-3班', num: 100 },
        { name: '11-2班', num: 20000 },
      ],
      toltalCount: 200,
      openOrClose: [{ name: '开机', value: 69.1 }, { name: '未开机', value: 30.9 }],
      isHaveChart: true,
    };

    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" size="lg" />}
          onLeftClick={() => {
            router.push('/');
          }}
        >
          统计
        </NavBar>
        <div className={styles.line} />
        <Tabs tabs={tab} initialPage={0}>
          {<StatisticsChart {...mapLiveVideoProps} />}
          {<StatisticsChart {...mapBigScreenProps} />}
          {<StatisticsChart {...mapBroadCastProps} />}
          {<StatisticsChart {...mapCardProps} />}
          {<StatisticsChart {...mapVideoProps} />}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps({ statistics }) {
  return {
    statistics,
  };
}

export default connect(mapStateToProps)(BasicLayout);
