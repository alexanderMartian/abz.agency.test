import styles from "./button.module.scss";

const Button = ({text, type}) => {
  const style = (text === "Show more" ? styles.buttonBig : styles.button);
  return (
    <button className={style} type={type}>
      {text}
    </button>
  );
}

export default Button;