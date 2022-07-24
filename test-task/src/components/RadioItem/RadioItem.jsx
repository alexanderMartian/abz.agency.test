import styles from "./RadioItem.module.scss";

const RadioItem = ({name, position_id, selectedValue, handleChange, setFieldValue}) => {

  return (
    <label className={styles.label} onClick={ () => setFieldValue("position_id", position_id)}>
      <input className={styles.realRadio}
             type="radio" name="position_id"
             value={name} checked={selectedValue === name}
             onChange={handleChange}
      />
      <span className={styles.customRadio}/>
      <span className={styles.radioName}>{name}</span>
    </label>
  );
}

export default RadioItem;