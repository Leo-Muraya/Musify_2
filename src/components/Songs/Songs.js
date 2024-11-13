import React, { useState, useEffect } from 'react';
import styles from './Songs.module.css';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [newSong, setNewSong] = useState({ title: '', artistId: '' });
  const [likedSongs, setLikedSongs] = useState({});
  const [showArtistDetails, setShowArtistDetails] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/songs')
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error('Error fetching songs:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/artists')
      .then((response) => response.json())
      .then((data) => setArtists(data))
      .catch((error) => console.error('Error fetching artists:', error));
  }, []);

  const handleAddSong = () => {
    fetch('http://localhost:3000/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSong),
    })
      .then((response) => response.json())
      .then((addedSong) => {
        setSongs([...songs, addedSong]);
        setNewSong({ title: '', artistId: '' });
      })
      .catch((error) => console.error('Error adding song:', error));
  };

  const handleLikeSong = (id) => {
    const updatedLikes = { ...likedSongs, [id]: !likedSongs[id] };
    setLikedSongs(updatedLikes);

    fetch(`http://localhost:3000/songs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ liked: updatedLikes[id] }),
    })
      .then((response) => response.json())
      .then(() => console.log('Song like status updated'))
      .catch((error) => console.error('Error updating like status:', error));
  };

  const toggleArtistDetails = (id) => {
    setShowArtistDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const getBio = (song, artist) => {
    return artist?.bio || `This is a great song titled "${song.title}" by ${artist?.name || 'an amazing artist'}.`;
  };

  return (
    <div className={styles.songs}>
      <h1>Songs</h1>

      <div className={styles.addSongContainer}>
        <h3>Add a New Song</h3>
        <input
          type="text"
          placeholder="Song Title"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Artist ID"
          value={newSong.artistId}
          onChange={(e) => setNewSong({ ...newSong, artistId: e.target.value })}
        />
        <button onClick={handleAddSong}>Add Song</button>
      </div>

      <div>
        {songs.map((song) => {
          const artist = artists.find((artist) => artist.id === song.artistId);
          return (
            <div key={song.id} className={styles.songItem}>
              <div
                className={styles.songTitle}
                onClick={() => toggleArtistDetails(song.id)}
              >
                {artist && (
                  <img
                    src={artist.picture}
                    alt={artist.name}
                    className={styles.artistImage}
                  />
                )}
                <h2>{song.title}</h2>
              </div>

              {showArtistDetails[song.id] && (
                <div className={styles.songDetails}>
                  <p><strong>Bio:</strong> {getBio(song, artist)}</p>
                </div>
              )}

              <button
                onClick={() => handleLikeSong(song.id)}
                className={`${styles.likeButton} ${likedSongs[song.id] ? styles.liked : ''}`}
              >
                {likedSongs[song.id] ? '❤️ Dislike' : '🤍 Like'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Songs;
