import styles from "./RadioContainer.module.scss";
import RadioItem from "../RadioItem/RadioItem";


const RadioContainer = ({positions, setFieldValue, selectedValue, setSelectedValue}) => {

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div className={styles.radioTitle}>Select your position</div>
      <div className={styles.radioWrapper}>
        {positions && positions.map( (item) => {
          return <RadioItem
            setFieldValue={setFieldValue}
            position_id={item.id}
            key={item.id}
            name={item.name}
            handleChange={handleChange}
            selectedValue={selectedValue}
          />
        })}
      </div>
    </>
  );
}

export default RadioContainer;