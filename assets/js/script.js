
// Build Results UI and Get Lyrics
// ==================================================
// Breakdown:
// 1. Take results from search and create a list.
// 2. When the user clicks an item in the list, call track.lyrics.get.
// 3. Save the response somehow.

let baseURL = "https://api.musixmatch.com/ws/1.1/"
let apiKey = "&apikey=53800ed531eed893e70b433586eb11fb"

// Get Top Tracks (nice to have)
function getTopTracks() {
  // Elements
  let topTracksList = document.getElementById("top-tracks-list")

  // Endpoint
  let endpoint = "chart.tracks.get" // Docs: https://developer.musixmatch.com/documentation/api-reference/track-chart-get

  // Parameters
  let country = "&country=us"
  let page = "&page=1"
  let pageSize = "&page_size=10" // if page=1, this is top X
  let chartName = "&top" // "top" and "hot" are good choices
  let onlyReturnTracksWithLyrics = "&f_has_lyrics=1"

  // Request URL
  let requestUrl = baseURL + endpoint + "?" + apiKey + country + page + pageSize + chartName + onlyReturnTracksWithLyrics

  fetch(requestUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data.message.body.track_list) // ** top tracks

      for (let i = 0; i < data.message.body.track_list.length; i++) {
        // Create a list item for each track.
        let listItem = document.createElement("li")
        // Add the track name to each list item.
        listItem.textContent = "“" + data.message.body.track_list[i].track.track_name + "”" + " by " + data.message.body.track_list[i].track.artist_name
        // Add the list item to the list.
        topTracksList.appendChild(listItem)
      }
    })

}

// function getLyrics() {
//   let endpoint = "track.lyrics.get" // Docs: https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get
  
//   // Parameters
//   let track = "&track_id=248716261" // ** temp (will get this from search later)
  
//   // Request URL
//   let requestUrl = baseURL + endpoint + "?" + apiKey + track

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json()
//     })
//     .then(function (data) {
//       console.log(data) // ** response
//       console.log(data.message.body.lyrics.lyrics_body) // ** track lyrics
//     })
  
// }

getTopTracks()
// getLyrics()
