import React, { useState, useEffect } from 'react';
import styles from './Artists.module.css'; // Assuming you are using CSS Modules

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/artists')
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <section className={styles.cardsContainer}>
      <h1 >Artists</h1>
      <div className={styles.cardGrid}>
        {artists.map((artist) => (
          <article key={artist.id} className={styles.card}>
            <div className={styles.cardImageContainer}>
              <img
                src={artist.picture}
                alt={artist.name}
                className={styles.cardImage}
              />
            </div>
            <footer className={styles.cardFooter}>
              <h2 className={styles.cardName}>{artist.name}</h2>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Artists;
