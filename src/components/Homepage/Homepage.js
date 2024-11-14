import React, { useEffect, useState } from 'react';
import styles from './Homepage.module.css';

const Homepage = () => {
  const [genres, setGenres] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [playlists,setPlaylists] = useState([])
  const [genreDropdownStates, setGenreDropdownStates] = useState({});
  
  const genreArtistMapping = {
    rock: [
      { id: 1, artist: 'Queen', song: 'Bohemian Rhapsody' },
      { id: 2, artist: 'AC/DC', song: 'Back In Black' },
      { id: 3, artist: 'Nirvana', song: 'Smells Like Teen Spirit' },
      { id: 4, artist: 'Led Zeppelin', song: 'Stairway to Heaven' },
      { id: 5, artist: 'The Rolling Stones', song: 'Paint It, Black' }
    ],
    pop: [
      { id: 6, artist: 'Ariana Grande', song: 'No Tears Left to Cry' },
      { id: 7, artist: 'Taylor Swift', song: 'Shake It Off' },
      { id: 8, artist: 'Ed Sheeran', song: 'Shape of You' },
      { id: 9, artist: 'Dua Lipa', song: 'Levitating' },
      { id: 10, artist: 'Billie Eilish', song: 'Bad Guy' }
    ],
    "hip-hop": [
      { id: 11, artist: 'Kendrick Lamar', song: 'HUMBLE.' },
      { id: 12, artist: 'Drake', song: 'God’s Plan' },
      { id: 13, artist: 'Travis Scott', song: 'SICKO MODE' },
      { id: 14, artist: 'J. Cole', song: 'No Role Modelz' },
      { id: 15, artist: 'Lil Wayne', song: 'Lollipop' }
    ],
    electronic: [
      { id: 26, artist: 'Avicii', song: 'Wake Me Up' },
      { id: 27, artist: 'Daft Punk', song: 'Get Lucky' },
      { id: 28, artist: 'Deadmau5', song: 'Strobe' },
      { id: 29, artist: 'Calvin Harris', song: 'Summer' },
      { id: 30, artist: 'Skrillex', song: 'Bangarang' }
    ],
    "r&b": [
      { id: 31, artist: 'Frank Ocean', song: 'Thinkin Bout You' },
      { id: 32, artist: 'SZA', song: 'Good Days' },
      { id: 33, artist: 'H.E.R.', song: 'Best Part' },
      { id: 34, artist: 'The Weeknd', song: 'Blinding Lights' },
      { id: 35, artist: 'Alicia Keys', song: 'If I Ain’t Got You' }
    ],
    soul: [
      { id: 36, artist: 'Aretha Franklin', song: 'Respect' },
      { id: 37, artist: 'Marvin Gaye', song: 'What’s Going On' },
      { id: 38, artist: 'Al Green', song: 'Let’s Stay Together' },
      { id: 39, artist: 'Otis Redding', song: 'Sittin’ On The Dock of the Bay' },
      { id: 40, artist: 'Sam Cooke', song: 'A Change Is Gonna Come' }
    ]
  };

  useEffect(() => {
    fetch("http://localhost:3000/genres")
      .then((response) => response.json())
      .then((data) => setGenres(data));

    fetch("http://localhost:3000/playlists")
      .then((response) => response.json())
      .then((data) => setPlaylists(data));

    fetch("http://localhost:3000/topCharts")
      .then((response) => response.json())
      .then((chartData) => {
        const songIds = chartData.map(item => item.songId);
        fetch(`http://localhost:3000/songs?id=${songIds.join('&id=')}`)
          .then(response => response.json())
          .then(songs => setRecommendedSongs(songs));
      });
  }, []);

  // Function to handle genre selection
  const handleGenreSelect = (genreId) => {
    setGenreDropdownStates((prevState) => ({
      ...prevState,
      [genreId]: !prevState[genreId],
    }));
  };

  return (
    <div className={styles.homepageContainer}>
      <h1 className={styles.homepageTitle}>Discover Music</h1>

      {/* Genres Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Browse Genres</h2>
        <div className={styles.cardsContainer}>
          {genres.map((genre) => (
            <div key={genre.id} className={`${styles.card} ${styles.genreCard}`}>
              <button
                className={styles.genreButton}
                onClick={() => handleGenreSelect(genre.id)}
              >
                {genre.name}
              </button>

              {/* Dropdown for Artists */}
              {genreDropdownStates[genre.id] && genreArtistMapping[genre.name.toLowerCase()] && (
                <div className={styles.artistDropdown}>
                  {genreArtistMapping[genre.name.toLowerCase()].map((artist) => (
                    <div key={artist.id} className={styles.artistCard}>
                      <h4>{artist.artist}</h4>
                      <p>{artist.song}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    {/* Playlists Section */}
    <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Playlists</h2>
        <div className={styles.cardsContainer}>
          {playlists.map((playlist) => (
            <div key={playlist.id} className={`${styles.card} ${styles.playlistCard}`}>
              <img
                src={playlist.coverImageUrl || "https://via.placeholder.com/300"}
                alt={playlist.name}
                className={styles.cardImage}
              />
              <div className={styles.cardDetails}>
                <h3 className={styles.cardTitle}>{playlist.name}</h3>
                <p className={styles.cardDescription}>{playlist.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Songs Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recommended for You</h2>
        <div className={styles.cardsContainer}>
          {recommendedSongs.map((song) => (
            <div key={song.id} className={`${styles.card} ${styles.songCard}`}>
              <img
                src={song.coverImageUrl || "https://via.placeholder.com/300"}
                alt={song.title}
                className={styles.cardImage}
              />
              <div className={styles.cardDetails}>
                <h3 className={styles.cardTitle}>{song.title}</h3>
                <p className={styles.cardArtist}>By {song.artistId}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
