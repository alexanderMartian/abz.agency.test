import styles from "./UsersItem.module.scss";
import {useDispatch} from 'react-redux';
import {showMessage, hideMessage} from "../../store/reducers/messageReducer";
import {useRef} from "react";

const UserItem = ({photo, name, position, email, phone}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const textModernization = (item) => {
    return item.length > 18 ? item.substr(0, 18)+ "..." : item
  }

  const openMessage = (fieldName) => {
    if (fieldName.length > 17) {
      let left = inputRef.current.getBoundingClientRect().left;
      let bottom = inputRef.current.getBoundingClientRect().bottom;

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
    <div ref={inputRef} className={styles.container}>
      <img className={styles.photo} src={photo} alt="userPhoto"/>
      <p onMouseOver={ () => {openMessage(name) }}
         onMouseOut={ () => {closeMessage(name) }}
         className={styles.name}
      >
        {textModernization(name)}
      </p>
      <div className={styles.blockInfo}>
        <p>{position}</p>
        <p onMouseOver={ () => {openMessage(email) }}
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
