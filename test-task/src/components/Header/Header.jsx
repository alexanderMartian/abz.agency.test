import styles from "./Header.module.scss";
import {ReactComponent as Logo} from './svg/Logo.svg';
import Button from "../Button/Button";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Logo/>
        <div className={styles.Buttons}>
          <Button text={"Users"} type={"button"}/>
          <Button text={"Sign Up"} type={"button"}/>
        </div>
      </header>
      <div className={styles.imagesBackground}>
        <h1 className={styles.title}>Test assignment for front-end developer</h1>
        <p className={styles.info}>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
        <Button text={"Sign Up"} type={"button"}/>
      </div>
    </>
    );
}

export default Header;