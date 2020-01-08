import { Component, OnInit } from '@angular/core';
import Spotify from 'spotify-web-api-js/'

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {
  album: string;
  access_token: string;
  loggedIn: boolean;
  spotifyApi: string;

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




  constructor() {

  }
  ngOnInit() {
    this.spotifyApi = new Spotify();
    this.spotifyApi.setAccessToken('BQA0wxwSL6pjs9hIeZvER99-vWQnGZTcRiEboAU4CH4FYhsbkXafrht03gqRjJUbpVnnsnmHcnyBt4uymUyUg3yEHt796-4QMAzUWdc37myo4cu0KObYYiMY06cSuWOfYGe0bPzKMBKMhOi-g97oPb-OFdma4neLMTG0BA');
    const params = this.getHashParams();
    console.log(params)
    if (typeof params['access_token'] != 'undefined') {
      this.spotifyApi.setAccessToken(params['access_token']
      );
    };
    var album = "AAA";
    this.spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
      .then(function(data) {
        console.log('Artist albums', data);
        console.log(data.items[0].name);
        album = data.items[0].name;
        this.album
        console.log(album)
      }, function(err) {
        console.error(err);
      });
    console.log(this.album);


  }

}
