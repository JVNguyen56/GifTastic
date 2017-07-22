$(document).ready(function()
{
	// Initial array of topics
			var topics = ['Smurfs', 'Sponge Bob', 'Mickey Mouse', 'Minions', 'Tom and Jerry'];

     	function displayGif() {
      		$('#gifView').empty();
        	var topics = $(this).attr("data-name");
        
        	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=dc6zaTOxFJmzC&limit=10";

      		//   // Creating an AJAX call for the specific movie button being clicked
     		$.ajax({
          		url: queryURL,
          		method: "GET"
     		}).done(function(response) {

     		// Creates a generic div to hold the topic
				var topicDiv = $('<div class="topicImage">');
					console.log(response);
				for (i=0; i < response.data.length; i++) 
				{
				var stillImage = response.data[i].images.fixed_height_still.url;
				// console.log(stillImage);

				var playImage = response.data[i].images.fixed_height.url;
				// console.log("Moving"+ playImage);

				var rating = response.data[i].rating;
					console.log(rating);

				// Creates an element to have the rating displayed
				var p = $('<p>').text( "Rating: " + rating.toUpperCase());
					topicDiv.append(p);

				var image = $("<img>").attr("src", stillImage); //Passes still image link to the image src
				image.attr("playsrc", playImage); //Creates playsrc attr and passes moving gif link to the image playsrc
				image.attr("stopsrc", stillImage); //Creates stopsrc attr and passes still image link to the image stopsrc
				
				topicDiv.append(image);

				// Puts the entire topic above the previous celebrities.
				$('#gifView').append(topicDiv);

				image.addClass('playClickedGif'); // Added a class to image tag


				}	
			});
		}

	   	function swapGif()
		{
				//Play Image 
				var playImage = $(this).attr('playsrc');
					console.log(playImage);
				//Stop Image 
				var stopImage = $(this).attr('stopsrc');
					console.log(stopImage);
				//Swap image condition
				if (playImage == $(this).attr('src'))
				{
				//This changes the image src
				$(this).attr('src', stopImage);
			}
				else
				{
				$(this).attr('src', playImage);
				}
		}
				// Generic function for displaying topic data 
		function renderButtons(){
				// Deletes the topics prior to adding new topics (this is necessary otherwise you will have repeat buttons)
				$("#topicsView").empty();
				// Loops through the array of topics
				for (var i = 0; i<topics.length; i++){
				// Dynamically generate buttons for each topic in the array
				var b = $("<button>"); 
				b.addClass("topicButton");
				b.addClass('btn btn-warning'); // Added a class 
				b.attr("data-name",topics[i]);
				b.text(topics[i]);
				$("#topicsView").append(b); // Added the button to the HTML
				}	
		}
				// This function handles events where one button is clicked
				$("#addTopic").on("click", function(event){
					event.preventDefault();
				// This line of code will grab the input from the textbox
				var newGif = $("#topicInput").val().trim();
					topics.push(newGif);
				renderButtons();
				})

				renderButtons();
				$(document).on("click", ".topicButton", displayGif);
				$(document).on('click', '.playClickedGif', swapGif);
});
