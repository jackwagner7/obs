import React, { Component } from 'react';
import './App.css';
import Tile from './components/Tile';
import Timer from './components/Timer';
import BandTile from './components/BandTile';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

async function getPlaylistTracks(){
  var i = 0;
  var tracks = []
  while(true){
    let response = await spotifyApi.getPlaylistTracks("user", "37i9dQZF1EjiLog6VoUqES", {offset: i})
    console.log(response)

    for(var j = 0; j<response.items.length; j++){
      var track = response.items[j].track;
      console.log(track)

      if(!track.is_local){
        if(track.preview_url==null){
          var trackID = track.id;
          let r2 = await spotifyApi.getTrack(trackID, {market: "US"});
          track = r2;
      }
      }
      if(track.preview_url!=null){
        tracks.push(track);
      }
      i++;
      console.log(i);

    }
    if(i>=response.total){
      break
    }
  }
  console.log(tracks);
  return tracks
}




class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.getPlaylistTracks();
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '', audio: '', track: '', artist: ''},
      albums: '',
      input: '',
      usedNames: [],
      tracks: [],
      wins: [],
      fails: [],
      correct: {song: false, artist: false},
      timer: 0,
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }



  getRandomTrack(){
    this.state.correct.song = false;
    this.state.correct.artist = false;
      var tracks = this.state.tracks;
      console.log(tracks)
      if(this.state.nowPlaying.audio != ""){
        this.state.nowPlaying.audio.pause();
      }
      console.log(tracks);
      var a = new Audio();
      var max = tracks.length;
      var num = Math.floor(Math.random() * (max-0) + 0);
      var x = 0;
      while (this.state.usedNames.indexOf(tracks[num].name) >= 0){
        var num = Math.floor(Math.random() * (max-0) + 0);
        x++;
        if(x>50){
          this.state.usedNames = [];
          break
        }
      }
      var track = tracks[num];
      console.log(track);
      a.src = track.preview_url;
      this.state.usedNames.push(track.name);
      console.log(this.state.usedNames)
      a.volume = 10/100;
      a.play();
      console.log(track)
      console.log(track.preview_url)
      this.setState({
        nowPlaying: {
          name: track.name,
          audio: a,
          track: track
        }
      })
  }

  getPlaylistTracks(){
    getPlaylistTracks()
      .then(response =>{
          this.setState({
            tracks: response
        });
      })

}


  onChange(a){
    this.setState({input: a})
    if(this.state.nowPlaying.audio.currentTime > 10){
      console.log("aaa");
      this.skipTrack();
    }
  }

  _handleKeyPress = (a) => {
    if (a.key === 'Enter') {
      this.checkMatch()
      if(this.state.correct.song && this.state.correct.artist){
        console.log("winner winner");
        this.state.wins.push({track: this.state.nowPlaying.track, win: true});
        this.getRandomTrack();
      }
      this.setState({input: ''})
    }
  }

  skipTrack(){
    this.state.fails.push({track: this.state.nowPlaying.track, win: false});
    this.getRandomTrack();
  }
  pauseTrack(){
    if(this.state.nowPlaying.audio != ""){
      this.state.nowPlaying.audio.pause();
    }
  }


  checkMatch(){
    var input = this.state.input.toLowerCase().trim().replace(/[^\w\s-]/g,'');
    var songName = this.state.nowPlaying.name.toLowerCase().trim().replace(/[^\w\s-]/g,'');
    var artistName = this.state.nowPlaying.track.artists[0].name.toLowerCase().trim().replace(/[^\w\s-]/g,'');

    if(input == songName){
      this.state.correct.song = true;
    }
    songName = songName.split(" - ");
    if(input == songName[0]){
      this.state.correct.song = true;
    }
    songName = songName[0].split(" (");
    if(input == songName[0][0]){
      this.state.correct.song = true;
    }
    songName = songName[0].split("/");
    if(input == songName[0][0][0]||songName[0][0][1]){
      this.state.correct.song = true;
    }
    if(input == artistName){
      this.state.correct.artist = true;
    }
    songName = artistName.split(" - ");
    if(input == artistName[0]){
      this.state.correct.artist = true;
    }
    songName = artistName[0].split(" (");
    if(input == artistName[0][0]){
      this.state.correct.artist = true;
    }
    songName = artistName[0].split("/");
    if(input == artistName[0][0][0]||artistName[0][0][1]){
      this.state.correct.artist = true;
    }
  }


  getArtistImages(){
    spotifyApi.getArtist("0abIHznUj0oKhDB29cpBZ9")
      .then(response =>{
        console.log(response);

      })

  }


  render() {


    let winsList = this.state.wins.map(win => (
      <Tile track={win.track}  win={win.win}> </Tile>
    ))
    let failsList = this.state.fails.map(fail => (
      <Tile track={fail.track}  win={fail.win}> </Tile>
    ))

    return (
      <div className="App">
        {!this.state.loggedIn &&
        <a href='http://localhost:8888' > Login to Spotify </a>
        }
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        {
          <button onClick={() => this.getRandomTrack()}>
            Play!
          </button>
        }
        {
          <button onClick={() => this.skipTrack()}>
            Skip
          </button>
        }
        {
          <button onClick={() => this.pauseTrack()}>
            Stop
          </button>

        }
        {
          <button onClick={() => this.getArtistImages()}>
            Test
          </button>

        }
        <div>
        <input onChange={e => this.onChange(e.target.value)}  onKeyPress={this._handleKeyPress}  value={this.state.input}/>
        </div>
        {this.state.correct.song && <div> {this.state.nowPlaying.name} </div>}
        {!this.state.correct.song && <div> ??? </div>}
        -
        {this.state.correct.artist && <div> {this.state.nowPlaying.track.artists[0].name} </div>}
        {!this.state.correct.artist && <div> ??? </div>}
        <BandTile artistName="AAA" artistImage="https://i.scdn.co/image/676104939c19b8824f226d95008d4e4a8d3e642c" />
        <ul className ="wins">
          {winsList}
        </ul>
        <ul className="fails">
          {failsList}
        </ul>
      </div>



    );
  }
}

export default App;
