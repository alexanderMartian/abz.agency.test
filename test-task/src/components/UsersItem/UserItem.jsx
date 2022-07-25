import styles from "./UsersItem.module.scss";

const UserItem = ({photo, name, position, email, phone}) => {

  const textReduction = (text) => {
    return text.substr(0, 17)+ "..."
  }

  return (
    <div className={styles.container}>
      <img className={styles.photo} src={photo} alt="userPhoto"/>
      <p className={styles.name}>{name.length > 15 ? textReduction(name) : name}</p>
      <div className={styles.blockInfo}>
        <p>{position}</p>
        <p>{email.length > 20 ? textReduction(email) : email }</p>
        <p>{phone}</p>
      </div>
    </div>
  );
}

export default UserItem;
