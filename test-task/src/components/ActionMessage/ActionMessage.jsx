import {useSelector} from 'react-redux';
import styles from './ActionMessage.module.scss';

const ActionMessage = () => {
  const {isActive, text, coordinates} = useSelector(({message}) => message);
  const style = {left: coordinates.left  + "px", top: (coordinates.bottom  - 60) + "px"};

  if (!isActive) {
    return null;
  }

  return (
    <div
      style={style} className={styles.showInfo}>
      <p>{text}</p>
    </div>
  )
}

export default ActionMessage;
