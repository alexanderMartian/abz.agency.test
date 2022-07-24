import styles from "./UsersItem.module.scss";

const UserItem = ({photo, name, position, email, phone}) => {

  return (
    <div className={styles.container}>
      <img className={styles.photo} src={photo} alt="userPhoto"/>
      <p className={styles.name}>{name}</p>
      <div className={styles.blockInfo}>
        <p>{position}</p>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </div>
  );
}

export default UserItem;
