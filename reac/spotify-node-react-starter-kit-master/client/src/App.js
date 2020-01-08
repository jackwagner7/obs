import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    console.log(token);
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '', artist: '', audio: ''},
      songs: ''

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
        console.log("!!!"),
        console.log(response),
        this.setState({
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url,
              artist: response.item.artists[0].name,
              artistID: response.item.artists[0].id,
            }
        });
      })
  }
  getArtistAlbums(){

    spotifyApi.getArtistAlbums(this.state.nowPlaying.artistID)
      .then((response) => {
        console.log(response);

        var albumNames = [];
        var songs = new Array();
        var arrayLength = response.limit;

        for (var i = 0; i < arrayLength; i++) {
          var albumID = response.items[i].id;
          spotifyApi.getAlbumTracks(albumID)
            .then((response2) => {
              for (var j = 0; response2.items[j] != null; j++){
                songs.push(response2.items[j]);
                console.log(songs[j]);
                console.log(songs.length);
              }

              this.setState({
                songs: songs
              })
            })
          console.log(songs.length)

          albumNames.push(response.items[i].name);
          console.log(albumNames[i]);

      }
      console.log(songs.length);

        this.setState({
          nowPlaying: {
              albums: response,
              albumNames: albumNames,
          }
        })
      })
  }
  playSong(){

    var a = new Audio();
    var max = this.state.songs.length-1;
    var num = Math.floor(Math.random() * (max-0) + 0) ;
    console.log(num)
    a.src = this.state.songs[num].preview_url;
    a.volume = 10/100;
    a.play();
    this.setState({
      nowPlaying: {
          song: this.state.songs[num].name,
          audio: a
      }
    })

  }
  fromPlaylist(){

    spotifyApi.getUserPlaylists('12139459029')
      .then(function(data) {
        console.log('User playlist', data);
        console.log(data.items[0].id)
        spotifyApi.getPlaylistTracks(this.token, data.items[0].id)
          .then(function(data) {
            console.log(data);
          }, function(err) {
            console.error(err);
          });

      }, function(err) {
        console.error(err);
      });
  }
  all(){
    this.getNowPlaying();
    this.getArtistAlbums();
    this.playSong();
  }
  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
          by { this.state.nowPlaying.artist }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
        { this.state.loggedIn &&
          <button onClick={() => this.getArtistAlbums()}>
            getArtistAlbums
          </button>
        }
        { this.state.loggedIn &&
          <button onClick={() => this.all()}>
            playSong
          </button>
        }
        { this.state.loggedIn &&
          <button onClick={() => this.fromPlaylist()}>
            fromPlaylist
          </button>
        }

      </div>
    );
  }
}

export default App;
