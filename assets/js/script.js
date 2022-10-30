
// Create a container for songs.
let songsContainer = document.getElementById("songs-container")

// Create a "Top Tracks" header and append it to the songs container.
let topTracksHeader = document.createElement("h3")
topTracksHeader.textContent = "Top Tracks"
songsContainer.append(topTracksHeader)

// Create an empty list, add an ID to it, and append it to the songs container.
let topTracksList = document.createElement("ul")
topTracksList.setAttribute("id", "top-tracks-list")
songsContainer.append(topTracksList)

// Create a container for lyrics.
let lyricsContainer = document.getElementById("lyrics-container")

// Create global API variables.
let baseURL = "https://api.musixmatch.com/ws/1.1/"
let apiKey = "&apikey=53800ed531eed893e70b433586eb11fb"

// Get Top Tracks
function getTopTracks() {
  // Endpoint:
  let endpoint = "chart.tracks.get" // docs: https://developer.musixmatch.com/documentation/api-reference/track-chart-get

  // Parameters:
  let country = "&country=us"
  let page = "&page=1"
  let pageSize = "&page_size=10" // if page=1, this is top X
  let chartName = "&top" // "top" and "hot" are good choices
  let onlyReturnTracksWithLyrics = "&f_has_lyrics=1"

  // Request URL:
  let requestUrl = baseURL + endpoint + "?" + apiKey + country + page + pageSize + chartName + onlyReturnTracksWithLyrics

  // Call and display the results:
  fetch(requestUrl)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {    
    for (let i = 0; i < data.message.body.track_list.length; i++) {
      // Create an empty list item for each track.
      let listItem = document.createElement("li")
      
      // Create a button for each track, and add a class, the track ID and name, and the artist name to it.
      let getLyricsButton = document.createElement("button")
      getLyricsButton.textContent = "   Get Lyrics"
      getLyricsButton.setAttribute("class", "get-lyrics-button")
      getLyricsButton.setAttribute("data-track-id", data.message.body.track_list[i].track.track_id)
      getLyricsButton.setAttribute("data-track-name", data.message.body.track_list[i].track.track_name)
      getLyricsButton.setAttribute("data-artist-name", data.message.body.track_list[i].track.artist_name)
      
      // Add the track name and artist to each list item.
      listItem.textContent =
        "“" + data.message.body.track_list[i].track.track_name + "”" +
        " by " +
        data.message.body.track_list[i].track.artist_name +
        " - "
      
      // Append the button to each list item.
      listItem.appendChild(getLyricsButton)

      // Append the list item to the list.
      topTracksList.appendChild(listItem)
    }
  })

}

getTopTracks()

// Get Lyrics
function getLyrics(event) {
  // Clear the lyrics container before displaying the lyrics again.
  lyricsContainer.innerHTML = ""

  // Get the track ID from the click event.
  let trackId = event.target.getAttribute("data-track-id")
  
  // Endpoint:
  let endpoint = "track.lyrics.get" // docs: https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get
  
  // Parameters:
  let track = "&track_id=" + trackId
  
  // Request URL:
  let requestUrl = baseURL + endpoint + "?" + apiKey + track

  // Call and display the results:
  fetch(requestUrl)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    // Create a header and append the track and artist name to it.
    let lyricsHeader = document.createElement("h3")
    lyricsHeader.textContent =
      "“" + event.target.getAttribute("data-track-name") + "”" +
      " by " +
      event.target.getAttribute("data-artist-name")
    lyricsContainer.append(lyricsHeader)
    
    // Create an array of lyric lines.
    let lyrics = data.message.body.lyrics.lyrics_body.split("\n")
    
    // Remove last three lines (**note:** only applicable for the free version).
    lyrics.pop(lyrics.pop(lyrics.pop()))

    for (let i = 0; i < lyrics.length; i++) {
      // Create a line break and append it after each line.
      let lineBreak = document.createElement("br")
      lyricsContainer.append(lyrics[i])
      lyricsContainer.append(lineBreak)
    }
  })

}

songsContainer.addEventListener("click", getLyrics)
