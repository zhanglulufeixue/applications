import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Icon, NavBar ,InputItem, Button, DatePicker, List, Toast } from 'antd-mobile';
import styles from './Order.less';
import router from 'umi/router';
import { createForm } from 'rc-form';


class orderModal extends PureComponent {

  state = {
    scanState: '0', // 0-未扫描  1-第一次扫描 2-两次及两次以上扫描
  };

  componentDidUpdate() {
    const { form } = this.props;
    const { getFieldValue } = form;
    if(getFieldValue('liveTitle') && getFieldValue('liveTitle').length > 30) {
      Toast.info('直播名称最多30个字');
    }
  }

  // 取消预约按钮回调
  cancelHandler = () => {
    router.push('/Lives');
  };

  // 点击预约按钮事件
  orderHandler = () => {
    const { form, dispatch, liveVideo } = this.props;
    const { orderOrEdit } = liveVideo;
    const { validateFields } = form;
    validateFields((err, value) => {
      if(err) {
        Toast.info('请填写完整信息');
        return;
      }
      dispatch({
        type: 'liveVideo/changeState',
        payload: {
          orderContent: {
            title: value.liveTitle,
            startTime: `${moment(value.startDate).format('YYYY-MM-DD')} ${moment(value.startTime).format('HH:mm:ss')}`,
            endTime: `${moment(value.startDate).format('YYYY-MM-DD')} ${moment(value.endTime).format('HH:mm:ss')}`,
          },
        },
      });

      if(orderOrEdit === '0') {
        dispatch({
          type: 'liveVideo/saveLiveRoom',
          payload: {
           title: value.liveTitle,
           startTime: `${moment(value.startDate).format('YYYY-MM-DD')} ${moment(value.startTime).format('HH:mm:ss')}`,
           endTime: `${moment(value.startDate).format('YYYY-MM-DD')} ${moment(value.endTime).format('HH:mm:ss')}`,
          }
        });
      } else {
        dispatch({
          type: 'liveVideo/updateLiveRoom',
          payload: {
           title: value.liveTitle,
           startTime: `${moment(value.startDate).format('YYYY-MM-DD')} ${moment(value.startTime).format('HH:mm:ss')}`,
           endTime: `${moment(value.startDate).format('YYYY-MM-DD')} ${moment(value.endTime).format('HH:mm:ss')}`,
          }
        });
      }
    });
  };

  render() {
    const { form, liveVideo} = this.props;
    const { getFieldProps, getFieldValue } = form;
    const { orderOrEdit, liveDetailInfo, orderContent } = liveVideo;
    return (
      <div>
       <NavBar
          key='order'
          mode="light"
          icon={<Icon type="left" size="lg" />}
          onLeftClick={this.cancelHandler}
        >
          {orderOrEdit === '0' ? '预约直播' : '修改直播'}
        </NavBar>
        <form className={styles.form}>
          <div className={styles.row}>
            <span className={styles.leftName}>直播标题:</span>
            <InputItem {...getFieldProps('liveTitle', {
              initialValue: (liveDetailInfo && liveDetailInfo.title) || (orderContent && orderContent.title) || '',
              rules: [{
                required: true,
                message: '请输入直播标题',
              }
            ]
          })} placeholder="请输入直播标题" maxLength={30} ></InputItem>
          
            <div className={styles.line}></div>
          </div>
          <div className={styles.row}>
            <span className={styles.leftName}>直播教师:</span>
            <InputItem {...getFieldProps('liveTeacher', {
              initialValue: '张老师',
            })} clear disabled></InputItem>
            <div className={styles.line}></div>
          </div>
          <div className={styles.row}>
            <span className={styles.leftName}>直播日期:</span>
            <DatePicker
              {...getFieldProps('startDate', {
                initialValue: (liveDetailInfo && liveDetailInfo.startTime && new Date(liveDetailInfo.startTime)) || (orderContent && orderContent.startTime && new Date(orderContent.startTime)) ||'',
                rules: [{
                  required: true,
                  message: '请选择直播日期',
                }]
              })}
              mode='date'
              minDate={new Date()}
            >
                <List.Item arrow="horizontal"></List.Item>
            </DatePicker>
            <div className={styles.line}></div>
          </div>
          <div className={styles.row}>
            <span className={styles.leftName}>开始时间:</span>
            <DatePicker
              {...getFieldProps('startTime', {
                initialValue: (liveDetailInfo && liveDetailInfo.startTime && new Date(liveDetailInfo.startTime)) ||  (orderContent && orderContent.startTime && new Date(orderContent.startTime)) ||'',
                rules: [{
                  required: true,
                  message: '请选择开始时间',
                }
                ]
              })}
              mode='time'
              minDate={getFieldValue('startDate') === '' ? new Date() : moment(moment().format('YYYY-MM-DD')).isBefore(moment(getFieldValue('startDate')).format('YYYY-MM-DD')) 
              ? new Date() 
              : new Date(new Date().getTime() + 4 * 3600 * 1000)}
              disabled={(getFieldValue('startDate') === '' || getFieldValue('startDate') === undefined) ? true : false}
            >
                <List.Item arrow="horizontal"></List.Item>
            </DatePicker>
            <div className={styles.line}></div>
          </div>
          <div className={styles.row}>
            <span className={styles.leftName}>结束时间:</span>
            <DatePicker
              {...getFieldProps('endTime', {
                initialValue: (liveDetailInfo && liveDetailInfo.startTime && new Date(liveDetailInfo.endTime)) || (orderContent && orderContent.endTime && new Date(orderContent.endTime)) || '',
                rules: [{
                  required: true,
                  message: '请选择结束时间',
                }
                ]
              })}
              mode='time'
              minDate={ getFieldValue('startTime')}
              disabled={(getFieldValue('startTime') === '' || getFieldValue('startTime') === undefined) ? true : false}
            >
                <List.Item arrow="horizontal"></List.Item>
            </DatePicker>
            <div className={styles.line}></div>
          </div>
          <div className={styles.row}>
            <span className={styles.leftName}>直播教室:</span>
            {/* <span className={styles.scan}>扫一扫</span> */}
            <span className={styles.bindRoom}>已绑定</span>
          </div>
          <div  className={styles.btns}>
            <Button inline onClick={this.orderHandler}>预约</Button>
          </div>
        </form>
      </div>
    
    );
  }
}
function mapStateToProps({ liveVideo }) {
  return {
    liveVideo,
  };
}

export default connect(mapStateToProps)(createForm()(orderModal));