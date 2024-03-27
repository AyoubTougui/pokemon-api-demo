import React from "react";
import PokemonIcon from "../../icons/PokemonIcon";
import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className={styles.nav}>
      <Link to={"/"} className={styles.icon}>
        <PokemonIcon />
      </Link>
    </div>
  );
};

export default Nav;
