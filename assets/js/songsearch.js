//variables 
var songsearchformE1 = document.querySelector('#search-form')
var songresultE1 = document.querySelector('#song-results')
var mxmatchurl = "http://api.musixmatch.com/ws/1.1/track.search"
var apikey = "apikey=53800ed531eed893e70b433586eb11fb"
var searchcriteria = "q_track="

// song search field
var songsubmitHandler = function (event) {
    event.preventDefault();
    var songsearch = songsearchformE1.ariaValueMax.trim();
    if (songsearch) {
        getsongs(songsearch);

        songresultE1.textContent = '';
        songsearchformE1 = '';
    }
};

// search button for songs
var songsearchbutton = function (event) {
    var language =  event.target.getAttribute('data-language');
    if (language) {
        getfeaturedsong(language);

        songresultE1.textContent = '';
    }
};

// fetching results for songs
var getsongresults = function (songsearch) {
    var apiUrl = mxmatchurl + "?" + apikey + "&" + searchcriteria + songsearch
    fetch(apiUrl)
        .then(function (response){
            if (response.ok) {
                console.log(response);
                response.json().then(function (data){
                    console.log(data);
                    displaysongs(data,);
            });
        }

    });
};

// displaying songs
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
