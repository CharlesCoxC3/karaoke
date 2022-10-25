
// Build Results UI and Get Lyrics
//
// API Method: track.lyrics.get (https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get)
// Base URL: https://api.musixmatch.com/ws/1.1/
// API: /track.lyrics.get

// 1. Take results from search and create a list.
// 2. When the user clicks an item in the list, call track.lyrics.get.
// 3. Save the response somehow.

function getLyrics() {

  let baseURL = "https://api.musixmatch.com/ws/1.1/"
  let endpoint = "track.lyrics.get"
  let apiKeyParameter = "&apikey=53800ed531eed893e70b433586eb11fb"
  let trackIdParameter = "&track_id=248716261" // temp (will get this from search later)

  let requestUrl = baseURL + endpoint + "?" + apiKeyParameter + trackIdParameter

  fetch(requestUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data.message.body.lyrics.lyrics_body)
    })

  console.log(requestUrl)
}

getLyrics()

// Get 
// curl --location --request GET "https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=json&callback=json&page=1&page_size=10&country=us&apikey=53800ed531eed893e70b433586eb11fb"

//
