import styles from "./UsersItem.module.scss";
import {useDispatch} from 'react-redux';
import {showMessage, hideMessage} from "../../store/reducers/messageReducer";


const UserItem = ({photo, name, position, email, phone}) => {
  const dispatch = useDispatch();

  const textModernization = (item) => {
    return item.length > 18 ? item.substr(0, 18)+ "..." : item
  }

  const openMessage = (fieldName, target) => {
    if (fieldName.length > 17) {
      let left = target.getBoundingClientRect().left;
      let bottom = target.getBoundingClientRect().bottom;

      if (left > 390 && fieldName.length > 30) {
        left = left - 100;
      }

      if (fieldName === name) {
        bottom = bottom - 50;
      }

      dispatch(showMessage({text: fieldName, coordinates: {left, bottom}}))
    }
  }

  const closeMessage = (fieldName) => {
    if (fieldName.length > 17) {
      dispatch(hideMessage());
    }
  }

  return (
    <div className={styles.container}>
      <img className={styles.photo} src={photo} alt="userPhoto"/>
      <p onMouseOver={ ({target}) => {openMessage(name, target) }}
         onMouseOut={ () => {closeMessage(name) }}
         className={styles.name}
      >
        {textModernization(name)}
      </p>
      <div className={styles.blockInfo}>
        <p>{position}</p>
        <p onMouseOver={ ({target}) => {openMessage(email, target) }}
           onMouseOut={ () => {closeMessage(email) }}
        >
          {textModernization(email)}
        </p>
        <p>{phone}</p>
      </div>
    </div>
  );
}

export default UserItem;
