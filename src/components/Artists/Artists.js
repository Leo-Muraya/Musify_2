import React, { useState, useEffect } from 'react';
import styles from './Artists.module.css'; 

function Artists() {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState({});
  const [loading, setLoading] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:3000/artists')
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const fetchSongs = (artistId) => {
    setLoading(artistId); 
    fetch(`http://localhost:3000/songs?artistId=${artistId}`)
      .then((res) => res.json())
      .then((data) => {
        setSongs((prevSongs) => ({
          ...prevSongs,
          [artistId]: data
        }));
        setLoading(null); 
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(null);
      });
  };

  return (
    <section className={styles.cardsContainer}>
      <h1>Artists</h1>
      <div className={styles.cardGrid}>
        {artists.map((artist) => (
          <article key={artist.id} className={styles.card} onClick={() => fetchSongs(artist.id)}>
            <div className={styles.cardImageContainer}>
              <img
                src={artist.picture}
                alt={artist.name}
                className={styles.cardImage}
              />
            </div>
            <footer className={styles.cardFooter}>
              <h2 className={styles.cardName}>{artist.name}</h2>
              {loading === artist.id ? (
                <p>Loading songs...</p>
              ) : (
                <ul className={styles.listOfSongs}>
                  {Array.isArray(songs[artist.id]) && songs[artist.id].length > 0 ? (
                    songs[artist.id].map((song) => (
                      <li key={song.id} className={styles.songItem}>
                        <img
                          src={song.coverImageUrl}
                          alt={song.title}
                          className={styles.songCover}
                        />
                        <span>{song.title}</span>
                      </li>
                    ))
                  ) : (
                    <p></p>
                  )}
                </ul>
              )}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Artists;
