import React from 'react';
import styles from './Footer.module.css'; // Import your CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>Thank you for using Musify! Hope you enjoyed the experience.</p>
      <p className={styles.footerText}>For inquiries, email us at:</p>
      <ul className={styles.footerLinks}>
        <li><a href="mailto:hamdi.yusuf@student.moringaschool.com">hamdi.yusuf@student.moringaschool.com</a></li>
        <li><a href="mailto:keith.githinji@student.moringaschool.com">keith.githinji@student.moringaschool.com</a></li>
        <li><a href="mailto:muraya.ngume@student.moringaschool.com">muraya.ngume@student.moringaschool.com</a></li>
      </ul>
      <div className={styles.footerBottom}>
        <p>&copy; Copyright 2024</p>
        <p>www.musify.com</p>
      </div>
    </footer>
  );
};

export default Footer;
