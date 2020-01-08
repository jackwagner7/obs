import React, { Component } from 'react';
import './BandTile.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class BandTile extends Component {
  state = {
    artistName: this.props.artistName,
    artistImage: this.props.artistImage,
  }

  render() {
    console.log(this.state.win)
    return (
      <div className="BandTile">
        <div className="artistName">  {this.state.artistName}    </div>
        <div className="artistImage">         <img src={this.state.artistImage} style={{width: 100}} />       </div>

      </div>
    );
  }
}

export default BandTile;
