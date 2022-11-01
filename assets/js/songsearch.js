
//variables
var mxmatchurl = "http://api.musixmatch.com/ws/1.1/track.search"
var apikey = "?apikey=496263128a610bd00481f1146808045b"
var corsproxy = "https://http-cors-proxy.p.rapidapi.com/"
var searchcriteria = "&q_track="
var page = "&page=1"
var page_size = "&page_size=5"
var lyric = "&f_has_lyrics"
var track_rating= "&s_track_rating=desc"
var searchoutputend = document.getElementById("song-container")
var searchInput = document.querySelector("#search-input")
var searchbutton = document.getElementById("search-button")
searchbutton.addEventListener("click", function(event){
  event.preventDefault()
  searchInput.textContent

  console.log(searchInput.value)
});

var searchfunction = searchInput.textContent
console.log(searchfunction)
var searchrequest = corsproxy + mxmatchurl + apikey + searchcriteria + page_size + page + lyric + track_rating
console.log(searchrequest)
fetch(searchrequest)
    .then(function (response) {
        if (response.ok) {
        console.log(response.status);
        return response.json();
        }})
    .then (function (data) {
        console.log(data);
        displaysongs(data);
      });

var displaysongs = function (songs, searchTerm) {
        if (songs.length ===0) {
            songresultE1.textContent = 'No songs Found. Try again!';
            return;
        }
        songresultE1.textContent = searchTerm;
        for (var i = 0; i < songs.length; i++) {
            songname = songs[i];
            var songE1 =document.createElement('div');
            songsE1.classList = 'search results';
            var songtitleE1 =document.createElement('span');
            songtitleE1.textContent = songname;
            
        };
    
    
    };
