import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();
const err = 'E';
const data = 'D';

class App extends Component {
  constructor(){
    super();

    spotifyApi.setAccessToken('BQA0wxwSL6pjs9hIeZvER99-vWQnGZTcRiEboAU4CH4FYhsbkXafrht03gqRjJUbpVnnsnmHcnyBt4uymUyUg3yEHt796-4QMAzUWdc37myo4cu0KObYYiMY06cSuWOfYGe0bPzKMBKMhOi-g97oPb-OFdma4neLMTG0BA');
    // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
      if (err) err=this.err;
      else data=this.data;
    });

  }

  test() {

  }

  render() {

    return (

      <div className="App">
      f
        {document.write(err)}
      </div>
    );
  }
}

export default App;
