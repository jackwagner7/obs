import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    this.state = {
      nowPlaying: { name: 'Not Checked', artist: '' }
    }
  }

  getAllSongsFromArtist(artistID){
    console.log("!!!!!");
    spotifyApi.getArtistTopTracks("1ououJVWgWsHWMYDLvT7sH", "US")
      .then((response) => {
        console.log(response)
      })
  }
  render() {
    return (
      <div className="App">
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        { <button onClick={() => this.getAllSongsFromArtist()}>
            getAllSongsFromArtist
          </button>
        }
      </div>
    );
  }
}

export default App;
