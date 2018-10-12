import React, { PureComponent } from 'react';
import { connect } from 'dva';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/pie';

class Chart extends PureComponent {

  
  render() {
    const { openOrClose } = this.props;
    const option = {
      title: {
        text: '设备开机率',
        x: 'center',
      },
      tooltip: {},
      series: [
        {
          type: 'pie',
          radius: [0, '50%'],
          center: ['50%', '50%'],
          // label: {
          //   normal: {
          //     position: 'inner',
          //   },
          // },
          // labelLine: {
          //   normal: {
          //     show: false,
          //   },
          // },
          data: openOrClose,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    return (
      <div>
        <ReactEcharts option={option} style={{ width: '100%', height: '100vw' }} />
      </div>
    );
  }
}

export default connect()(Chart);
