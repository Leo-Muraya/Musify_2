import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import styles from './NavBar.module.css';

const NavBar = () => {
    return(
        <nav className={styles.navbar}>
            <div className={styles["navbar-logo"]}>
                <FontAwesomeIcon icon={faMusic} className={styles["navbar-icon"]} />
                <h2>WELCOME TO MUSIFY</h2>
            </div>
            <ul className={styles["navbar-links"]}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/songs">Songs</Link></li>
                <li><Link to="/artists">Artists</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
