import React, {useState, useEffect} from 'react';
import PropTypes, { func } from 'prop-types';
import styles from './Artists.module.css';

const Artists = () => (
  <div className={styles.Artists}>
    Artists Component
  </div>
);

function fetchArtists(){
   const [artist_name, setNames] = useState([])
   const [title , setTitle] = useState([])
   const [genre, setGenre] = useState([])
   const [image_url, setImage] = useState([])
   useEffect(() => {
      fetch('http://localhost:3000/artists')
      .then((res) => res.json())
      .then(data => setNames(data))
   },[])
   
   console.log(artist_name)

   useEffect(() => {
    
   }, [artist_name])

   return (
      <>
      </>
   );
}

function displayArtists(e){
  e.preventDefault()
  const artistDisplay = {
    title: title,
    genre: genre,
    image_url: image_url
  }
  fetch('http://localhost:3000/artists',{
    "method": "POST",
    "headers" :{
      "Content-type":"application/json"
    },
  })

}



export default Artists;
