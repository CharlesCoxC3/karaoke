var songsearchformE1 = document.querySelector('#search-song-form')
var songresultE1 = document.querySelector('#song-results')


var songsubmitHandler = function (event) {
    event.preventDefault();
    var songsearch = songsearchformE1.ariaValueMax.trim();
    if (songsearch) {
        getsongs(songsearch);

        songresultE1.textContent = '';
        songsearchformE1 = '';
    }
};

var songsearchbutton = function (event) {
    var language =  event.target.getAttribute('data-language');
    if (language) {
        getfeaturedsong(language);

        songresultE1.textContent = '';
    }
};

var getsongresults = function (song) {
    var apiUrl = 'http://api.musixmatch.com/ws/1.1/track.search?q_track=' + song + '/?=json'
    fetch(apiUrl)
        .then(function (response){
            if (response.ok) {
                console.log(response);
                response.json().then(function (date){
                    console.log(data);
                    displayRepos(data, user);
            });
        }

    });
};

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
        
    }


}




//function handlesongsearch (songsearchformE1) {
 //   event.preventdefault()

    //var searchinput = document.getElementById('#songsearch-input');

 //   if (songsearchformE1) {
//        mixnmatchurl = 'http://api.musixmatch.com/ws/1.1/track.search?q_track=' + songsearchformE1 + '/?json';
 //       console.log ()
//    }

//    ;

//}

//var songsearchbutton = document.getElementById('#songsearch-button')