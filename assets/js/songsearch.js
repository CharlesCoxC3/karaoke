
//variables search
var mxmatchurl = "http://api.musixmatch.com/ws/1.1/track.search"
var apikey = "?&apikey=53800ed531eed893e70b433586eb11fb"
var corsproxy = "https://corsproxy.io/?"
var searchcriteria = "&q_artist="
var page = "&page=1"
var page_size = "&page_size=5"
var lyric = "&f_has_lyrics"
var track_rating= "&s_track_rating=desc"
//variables display
var songsContainer = document.getElementById("songs-container")
let SearchresultsH = document.createElement("h3")
SearchresultsH.textContent = "Search Results"
songsContainer.append(SearchresultsH)
let songsList = document.createElement("ul")
songsList.setAttribute("id", "search-results-list")
songsContainer.append(songsList)

//
var searchInput = document.querySelector("#search-input")
var searchbutton = document.getElementById("search-button")
searchbutton.addEventListener("click", function(event){
    event.preventDefault()
    searchInput.textContent
    var searchfunction = searchInput.textContent
    console.log(searchfunction)
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
        for (var i = 0; i < data.message.body.track_list.length; i++) {
            var songs = document.createElement("li")
            songs.textcontent = data.message.body.track_list[i].track.track_name + "by" + data.message.body.track_list[i].track.artist_name
           songsList.appendChild(songs)
       

      }})
    })
    