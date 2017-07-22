$(document).ready(function()
{
	// Initial array of topics
	var topics = ['Mickey Mouse', 'Donald Duck', 'Elsa', 'Buzz Lightyear', 'Winnie the Pooh'];

      function displayGif(){
		var topics = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url : queryURL,
			method: "GET"
		}).done(function(response){
				
			var results = response.data;

				gifPlay2();
				$(".topicButton").on("click", gifPlay2);

			function gifPlay2(){
				$("#gifView").empty();

				for (var k = 0; k <results.length; k++){

					var topicDiv = $("<div id='topicDivCSS'>");

					var subDiv =$("<div class='col-md-4'>");



					var stillURL = results[k].images.fixed_height_still.url;
	
					var animatedURL = results[k].images.fixed_height.url;
				
					var image = $("<img src>").attr({"src": stillURL,
					 	"data-changetostill": stillURL,
					 	"data-changetoanimate": animatedURL,
					 	"data-tochangestate": "stillstring"
					 							});

					image.addClass("gif");

					subDiv.append(image);

					// topicDiv.append(image);

					var gifRating = results[k].rating;
	
					var gifRatingText = $("<p>").text("Ratings: " + gifRating);	

					subDiv.append(gifRatingText);

					topicDiv.append(subDiv);

					$("#gifView").append(topicDiv);

				};//got the for loop to work
			}//gifPlay2 contains all 10 images to populate and also the ratings

		})//ajax closer;
	}
	function changeGif(){
		//this now sets up the if else statement where the data is already set earlier

		var varState = $(this).attr("data-tochangestate");//stillstring
 			//the variable state is set to a current state of stillstrings
		if (varState === "stillstring"){
		var gifMove = $(this).attr("data-changetoanimate");
			//grab the image that is animated
		$(this).attr("src", gifMove);
			//want to change this to the animated
		$(this).attr("data-tochangestate", "animated");	
		}
		//else should be the opposite it should have changed all the still to animated
		//which then changed the data-tochangestate into animated
		else {
		var gifStill = $(this).attr("data-changetostill");
			//which now since it is in the state of animated we can switch to a still gif
		$(this).attr("src", gifStill);
			//and also now change the data to turn into toChangeState.
		$(this).attr("data-tochangestate", "stillstring");
		};								
	}//closer for the changeGif

	function renderButtons(){
		$("#topicsView").empty();
		for (var i = 0; i<topics.length; i++){
		var b = $("<button>");
		b.addClass("topicButton");
		b.addClass('btn btn-warning');
		b.attr("data-name",topics[i]);
		b.text(topics[i]);
		$("#topicsView").append(b);
		}	
	}
	

	$("#addTopic").on("click", function(event){
		event.preventDefault();
		var newGif = $("#topicInput").val().trim();
		topics.push(newGif);
		renderButtons();
	})

renderButtons();
$(document).on("click", ".topicButton", displayGif);
$(document).on("click", ".gif", changeGif);

});
