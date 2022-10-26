let songsContainer = document.getElementById("songs-container") // ** may need to edit the id name
let lyricsContainer = document.getElementById("lyrics-container") // ** may need to edit the id name

let baseURL = "https://api.musixmatch.com/ws/1.1/"
let apiKey = "&apikey=53800ed531eed893e70b433586eb11fb"

// Get Top Tracks
function getTopTracks() {
  // API endpoint:
  let endpoint = "chart.tracks.get" // docs: https://developer.musixmatch.com/documentation/api-reference/track-chart-get

  // API parameters:
  let country = "&country=us"
  let page = "&page=1"
  let pageSize = "&page_size=10" // if page=1, this is top X
  let chartName = "&top" // "top" and "hot" are good choices
  let onlyReturnTracksWithLyrics = "&f_has_lyrics=1"

  // API request URL:
  let requestUrl = baseURL + endpoint + "?" + apiKey + country + page + pageSize + chartName + onlyReturnTracksWithLyrics

  // Call and display the results.
  fetch(requestUrl)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    // Create an unordered list, add an ID, and append it to the song container.
    let topTracksList = document.createElement("ul")
    topTracksList.setAttribute("id", "top-tracks-list")
    songsContainer.append(topTracksList)
    
    for (let i = 0; i < data.message.body.track_list.length; i++) {
      // Create a list item for each track.
      let listItem = document.createElement("li")
      
      // Create a button for each track, and add a class and track ID.
      let getLyricsButton = document.createElement("button")
      getLyricsButton.textContent = "Get Lyrics"
      getLyricsButton.setAttribute("class", "get-lyrics-button")
      getLyricsButton.setAttribute("data-track-id", data.message.body.track_list[i].track.track_id)
      
      // Add the track name, artist, and button to each list item.
      listItem.textContent =
        "“" + data.message.body.track_list[i].track.track_name + "”" +
        " by " +
        data.message.body.track_list[i].track.artist_name
      listItem.appendChild(getLyricsButton)

      // Add the list item to the list.
      topTracksList.appendChild(listItem)

    }
  })

}

getTopTracks()

// Get Lyrics
function getLyrics(event) {
  // Clear the lyrics container before displaying new lyrics.
  lyricsContainer.innerHTML = ""

  // Get track ID from click event.
  let trackId = event.target.getAttribute("data-track-id")
  
  // API endpoint:
  let endpoint = "track.lyrics.get" // docs: https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get
  
  // API parameters:
  let track = "&track_id=" + trackId
  
  // API request URL:
  let requestUrl = baseURL + endpoint + "?" + apiKey + track

  // Call and display results.
  fetch(requestUrl)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    // Create an array of lyric lines.
    let lyrics = data.message.body.lyrics.lyrics_body.split("\n")
    // Remove last two lines.
    lyrics.pop(lyrics.pop())

    for (let i = 0; i < lyrics.length; i++) {
      // Create a line break and add one after each line.
      let lineBreak = document.createElement("br")
      lyricsContainer.append(lyrics[i])
      lyricsContainer.append(lineBreak)
    }

  })

}

songsContainer.addEventListener("click", getLyrics)
