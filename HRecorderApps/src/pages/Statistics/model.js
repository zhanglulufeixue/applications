import { statistics } from '../../service/statistics';

export default {
  namespace: 'statistics',

  state: {
    stage: '九月第一周',
    kind: '',
    videoPlayerPic: '',
    liveVideoPic: '',
    tourCoursePic: '',
  },

  effects: {
    *statistics({ payload }, { select, put, call }) {
      const { stage, kind } = yield select(({ statistics }) => statistics);
      const query = { stage, kind };
      const data = yield call(statistics, query);
      if (data !== '' && data !== null) {
        if (data.code === 0) {
          if (data.result !== null) {
            let { videoPlayerP, liveVideoP, tourCourseP } = '';
            //kind: 1 点播; 2 直播; 3 巡课
            for (let i = 0; i < data.result.length; i++) {
              if (data.result[i].kind === '1') {
                videoPlayerP = data.result[i].picPath;
              } else if (data.result[i].kind === '2') {
                liveVideoP = data.result[i].picPath;
              } else if (data.result[i].kind === '3') {
                tourCourseP = data.result[i].picPath;
              }
            }
            yield put({
              type: 'changeState',
              payload: {
                videoPlayerPic: videoPlayerP,
                liveVideoPic: liveVideoP,
                tourCoursePic: tourCourseP,
              },
            });
          }
        }
      }
    },
  },

  reducers: {
    changeState(state, action) {
      return { ...state, ...action.payload };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {},
  },
};
