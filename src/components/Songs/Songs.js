import React, { useState, useEffect } from 'react';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [newSong, setNewSong] = useState({ title: '', artistId: '' });
  const [likedSongs, setLikedSongs] = useState({});
  const [showArtistDetails, setShowArtistDetails] = useState({});

  // Fetch songs
  useEffect(() => {
    fetch('http://localhost:3000/songs')
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error('Error fetching songs:', error));
  }, []);

  // Fetch artists
  useEffect(() => {
    fetch('http://localhost:3000/artists')
      .then((response) => response.json())
      .then((data) => setArtists(data))
      .catch((error) => console.error('Error fetching artists:', error));
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
        setNewSong({ title: '', artistId: '' });  
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

  // Toggle artist details dropdown
  const toggleArtistDetails = (id) => {
    setShowArtistDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <h1>Songs</h1>

      {/* Display songs */}
      <div>
        {songs.map((song) => {
          const artist = artists.find((artist) => artist.id === song.artistId);
          return (
            <div key={song.id} style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginBottom: '10px',
                }}
                onClick={() => toggleArtistDetails(song.id)}
              >
                {artist && (
                  <img
                    src={artist.picture}
                    alt={artist.name}
                    width="50"
                    height="50"
                    style={{ marginRight: '10px', borderRadius: '50%' }}
                  />
                )}
                <h2>{song.title}</h2>
              </div>

              {/* Artist details dropdown */}
              {showArtistDetails[song.id] && artist && (
                <div style={{ marginLeft: '60px', marginBottom: '10px' }}>
                  <p><strong>Artist:</strong> {artist.name}</p>
                  <p><strong>Genre:</strong> {artist.genre}</p>
                  <p><strong>Bio:</strong> {artist.bio}</p>
                </div>
              )}

              {/* Like button */}
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
                  marginLeft: '10px',
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
          );
        })}
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
