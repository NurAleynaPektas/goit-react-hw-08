import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <a className={styles.Link} href="/">
        Home
      </a>
      <a className={styles.Link} href="/contacts">
        Contacts
      </a>
    </nav>
  );
};

export default Navigation;
