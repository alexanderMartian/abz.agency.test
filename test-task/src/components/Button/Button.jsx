import styles from "./button.module.scss";

const Button = ({text, type, disabled, getUsers}) => {
  const style = (text === "Show more" ? styles.buttonBig : styles.button);

  return (
    <button
      onClick={() => {getUsers()}}
      className={style}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;