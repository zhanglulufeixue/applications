/**
 * 预约失败列表路由组件
 * 
 */
import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Steps, Button, Calendar, Icon, NavBar, Toast } from 'antd-mobile';
import styles from './OrderFailList.less';
import router from 'umi/router';
import { createForm } from 'rc-form';

class orderFailList extends PureComponent {

  state = {
    show: false,
    startTime : '',
    endTime: '',
    currentDate: moment(),
  };

  // 取消预约按钮回调
  cancelHandler = () => {
    router.push('/Lives');
  };

  // 点击预约按钮事件
  adjustHandler = () => {
    router.push('/Lives/components/Order');
  };

  // 日历选择日期
  onConfirm = (startTime, endTime) => {
    const { dispatch } = this.props;
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false,
      startTime,
      endTime,
      currentDate: moment(startTime),
    });

    dispatch({
      type: 'liveVideo/getUseStatus',
      payload: {
        ydDate: moment(startTime).format('YYYY-MM-DD'), 
      },
    });
  }

  // 日历取消
  onCancel = () => {
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false,
      startTime: undefined,
      endTime: undefined,
    });
  }

  // 点击日期弹出日历
  timeClick = () => {
    this.setState({
        show: true,
      });
  }

  // 左侧日期点击
  leftDateClick = () => {
    const { currentDate } = this.state;
    const { dispatch } = this.props;

    if(moment(currentDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
      Toast.info('已是当前日期');
      return false;
    }
    const newDate = currentDate.add(-1, 'day');

    this.setState({
      currentDate: newDate,
    });
    dispatch({
      type: 'liveVideo/getUseStatus',
      payload: {
        ydDate: moment(newDate).format('YYYY-MM-DD'), 
      },
    });
    this.forceUpdate();

  };

  // 右侧日期点击
  rightDateClick = () => {
    const { currentDate } = this.state;
    const { dispatch } = this.props;
    const newDate = currentDate.add(1, 'day');
    
    this.setState({
      currentDate: newDate,
    });
    dispatch({
      type: 'liveVideo/getUseStatus',
      payload: {
        ydDate: moment(newDate).format('YYYY-MM-DD'), 
      },
    });

    this.forceUpdate();

  };

  createSteps = (title, index) => {
    const { liveVideo } = this.props;
    const { orderFailDurationList } = liveVideo;
       console.log('orderFailDurationList', orderFailDurationList);
    // if(arr && arr.length > 0) {
      // return arr.map((item, index) => {
      //   console.log('item', item)
        return <Steps.Step title={title} key={index} 
              description={
              <div 
              className={orderFailDurationList && orderFailDurationList[index] && orderFailDurationList[index] === 1
              ? styles.description
              : styles.descriptionOrder
              }
              >
              {orderFailDurationList && orderFailDurationList[index] && orderFailDurationList[index] === 1 ? '直播已满' : '可预约'}
              </div>
              } 
              icon={<div className={styles.stepIcon}></div>} /> 
      // });
    // }
    
  };

  render() {
    const { createSteps } = this;
    const { show, currentDate } = this.state;
    const { liveVideo } = this.props;
    const { isOrderFail } = liveVideo;

    const arr = [{title: '08:00', index: '0'}, {title: '09:00', index: '1'},{title: '10:00', index: '2'},{title: '11:00', index: '3'},
    {title: '12:00', index: '4'},{title: '13:00', index: '5'},{title: '14:00', index: '6'},{title: '15:00', index: '7'},
    {title: '16:00', index: '8'},{title: '17:00', index: '9'},];
    return (
        <div>
          <NavBar
            key='order'
            mode="light"
            icon={<Icon type="left" size="lg" />}
            onLeftClick={this.cancelHandler}
          >
          预约失败
          </NavBar>
          {
            isOrderFail
            ? <span className={styles.mark}>原因：当前直播数量已达到上限，无法预约</span> // 该教室所选时间已被占用
            : <div>
                <span className={styles.mark}>原因：当前直播数量已达到上限，无法预约</span>  
                <div className={styles.timeSelect} >
                  <Icon type='left' onClick={this.leftDateClick} style={{ verticalAlign: 'middle'}}></Icon>
                  <span className={styles.date}  onClick={this.timeClick}>{currentDate.format('YYYY-MM-DD') || ''}</span>
                  <Icon type='right' onClick={this.rightDateClick} style={{ verticalAlign: 'middle'}}></Icon>
                </div>
                <Calendar
                    type={'one'}
                    visible={show}
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                    minDate={new Date()}
                    defaultDate={new Date()}
                ></Calendar>
                <div className={styles.stepBar}>
                  <Steps size="small" direction="vertical" current={10}>
                       {createSteps('08:00', '0')}
                       {createSteps('09:00', '1')}
                       {createSteps('10:00', '2')}
                       {createSteps('11:00', '3')}
                       {createSteps('12:00', '4')}
                       {createSteps('13:00', '5')}
                       {createSteps('14:00', '6')}
                       {createSteps('15:00', '7')}
                       {createSteps('16:00', '8')}
                       {createSteps('17:00', '9')}
                       {/* {createSteps(arr)} */}
                      <Steps.Step title="18：00" description='' icon={<div className={styles.stepIcon}></div>} />
                    </Steps>
                </div>
                <div  className={styles.btns}>
                    <Button inline onClick={this.adjustHandler}>调整时间</Button>
                </div>
            </div>
          }
           
        </div>
    );
  }
}
function mapStateToProps({ liveVideo }) {
  return {
    liveVideo,
  };
}

export default connect(mapStateToProps)(createForm()(orderFailList));