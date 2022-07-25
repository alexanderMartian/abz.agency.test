import {useSelector} from 'react-redux';
import styles from './ActionMessage.module.scss';

function ActionMessage() {
  const {isActive, type, text} = useSelector(({message}) => message);

  if (!isActive) {
    return null;
  }

  if (type === "showInfo") {
    return (
      <div className={styles.showInfo}>
        <p>{text}</p>
      </div>
    )
  }

  if (type !== "showInfo") {
    return (
      <div className={type === 'success' ? styles.successful : styles.error}>
        <p>{text}</p>
      </div>
    );
  }
}

export default ActionMessage;
