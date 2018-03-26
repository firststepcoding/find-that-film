const API_KEY = 'REPLACE_WITH_YOUR_KEY';

// When I click the button with an id of "searchForFilm", call the "findMovies" function. 
$(function () {
  $('#findThatFilm').click(findMovies);
})

function findMovies() {
  // Read the text from an HTML element with an id of "userInput"
  var inputString = $('#userInput').val();
  // Make a call to the OMDB API with the search String we collected from the user input.
  loadDataFromAPI(inputString);
}

function loadDataFromAPI(searchString) {
  // Form an HTTP API request String that includes the desired searchString in the url.
  var requestString = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchString}`;

  // Make the API request.
  // 
  // When a result comes back, pass the data into the  
  // processAPIResult function
  $.getJSON(requestString, processAPIResults);
}

function processAPIResults(data) {
  var poster_base_url = "https://image.tmdb.org/t/p/w500";
  if (data && data.results.length > 0) {
    var firstResult = data.results[0];

    $('.results').fadeIn(2000);
    $('#title').html(firstResult.title);
    $('#poster').attr("src", poster_base_url + firstResult.poster_path);
    $('#releasedate').html("Released on 1/1/2000");
    $('#synopsis').html(firstResult.overview);
    $('#starring').html("");
  } else {
    $('#title').html("Sorry, we weren't able to find the film you were looking for. Maybe you made a mistake?");
    $('#releaseyear').html("");
    $('#starring').html("");
    $('#synopsis').html("");
  }
}