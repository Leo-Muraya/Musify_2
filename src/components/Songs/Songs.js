import React, { useState, useEffect } from 'react';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({ title: '', artistId: '' });
  const [likedSongs, setLikedSongs] = useState({});

  // Fetch songs data on mount
  useEffect(() => {
    fetch('http://localhost:3000/songs')
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error('Error fetching songs:', error));
  }, []);

  // Add new song
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
        setNewSong({ title: '', artistId: '' }); // Clear input fields
      })
      .catch((error) => console.error('Error adding song:', error));
  };

  // Toggle like/dislike for song
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

  return (
    <div>
      <h1>Songs</h1>

      {/* Display songs */}
      <div>
        {songs.map((song) => (
          <div key={song.id}>
            <h2>{song.title}</h2>

            <button
              onClick={() => handleLikeSong(song.id)}
              style={{
                backgroundColor: likedSongs[song.id] ? 'green' : 'red',
                color: 'white',
                fontSize: '20px',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {likedSongs[song.id] ? (
                <span role="img" aria-label="heart">❤️</span>
              ) : (
                <span role="img" aria-label="heart">🤍</span>
              )}
              {likedSongs[song.id] ? ' Dislike' : ' Like'}
            </button>
          </div>
        ))}
      </div>

      {/* Add new song */}
      <div>
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
    </div>
  );
};

export default Songs;
