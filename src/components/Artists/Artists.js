import React, {useState, useEffect} from 'react';
import PropTypes, { func }from 'prop-types';
import styles from './Artists.module.css';


//artist display
function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
     fetch('http://localhost:3000/artists')
     .then(res => res.json()) 
     .then(data => setArtists(data)) 
     .catch(error => console.error("Error:", error));
  }, []);
 
  return (
   <div >
     <h1>Artists</h1>
     <ul>
       {artists.map(artists => (
         <li key={artists.id}>
           <h2>{artists.name}</h2>
           <img src={artists.picture} alt={artists.name} width="200" />
         </li>
       ))}
     </ul>
   </div>
  );
}

export default Artists;
