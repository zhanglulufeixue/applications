import 'antd-mobile/dist/antd-mobile.css';
import styles from './index.css';
import Link from 'umi/link';
import router from 'umi/router';

function BasicLayout(props) {

  return (
    <div className={styles.normal}>
      <div className={styles.item} >
        <Link to="/Videos">视频</Link>
      </div>
      <div className={styles.item}>
      <Link to="/TourCourse">巡课</Link></div>
      <div className={styles.item} onClick={() => {
        router.push('/Lives');
      }}>直播</div>
      <div className={styles.item}><Link to="/Statistics">统计</Link></div>

    </div>
  );
}

export default BasicLayout;
