import React, { Component } from 'react';
import './Tile.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Tile extends Component {
  state = {
    track: this.props.track,
    win: this.props.win,
  }



  render() {
    console.log(this.state.win)
    return (
      <div className="tile" className={"tile" + (this.state.win ? 'win' : 'fail')}>
        <ul className="SA">
          <li className="songName"><b>{this.state.track.name}</b></li>
          <li className="artistName"><i>{this.state.track.artists[0].name}</i></li>
        </ul>
        <div className="albumArt">         <img src={this.state.track.album.images[0].url} style={{width: 100}} />       </div>
      </div>
    );
  }
}

export default Tile;
