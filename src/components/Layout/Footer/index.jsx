import React from "react";
import styles from "./Footer.module.scss";

import PokeballIcon from "../../icons/PokeballIcon";
import { Link } from "react-router-dom";
import CopyrightIcon from "../../icons/CopyrightIcon";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul className={styles.left}>
        <Link to={"https://pokeapi.co/"} target="_blank">
          <PokeballIcon /> PokeApi
        </Link>
        <Link
          to={"https://github.com/AyoubTougui/pokemon-api-demo"}
          target="_blank"
        >
          <PokeballIcon /> Repository
        </Link>
      </ul>
      <div className={styles.right}>
        <CopyrightIcon />
        Open Source Project
      </div>
    </div>
  );
};

export default Footer;
