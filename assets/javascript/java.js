// initial array of animals
$(document).ready(function () {

  var animals = ["dog", "cat", "bird", "aardvark"];





  //inputs.push($("usrInputElementId").val())

  function renderButtons() {
    console.log("hi");

    $("#whereButtonsGo").empty();

    $("#animals-input").click(function () {

      $("#animals-input").push(animals);

    })

    // looping through animals

    for (var i = 0; i < animals.length; i++) {

      var a = $("<button>");
      a.addClass("animal-input");
      a.attr("data-name", animals[i]);
      a.text(animals[i]);
      $("#whereButtonsGo").append(a);

    }


    $(document).on("click", "#add-animal", function (event) {

      console.log(event)

      event.preventDefault();

      $("#whereButtonsGo").empty();

      var animal = $("#animals-input").val().trim();

      animal.push(animals);

      renderButtons();
    });



    renderButtons();



    // adding giphs 

    $(document).on("click", ".animal-input", function () {
      var gifLink = $(this).attr("data-name");

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifLink + "&api_key=ODnWYjkF8eZOoOz29jtiSXzHNhKQTzmW&limit=10"

      $.ajax({
        url: queryURL,
        method: "GET"
      })

        .then(function (response) {
          console.log(queryURL);
          console.log(response);

          var results = response.data;

          // looping through each result
          for (var i = 0; i < results.length; i++) {
            var animalsDiv = $("<div>");

            // console.log(results[i])


            var animalsImage = $("<img>");
            animalsImage.attr({
              "src": results[i].images.fixed_height.url,
              "data-animate": results[i].images.fixed_height.url,
              "data-state": "animate",
              "data-still": results[i].images.fixed_height_still.url
            });

            animalsDiv.append(animalsImage);
            animalsImage.addClass("animalGif")

            $(".gifs-appear-here").prepend(animalsDiv);

            console.log("animals image " + animalsDiv)
          }

          //starts and stops gifs

        });

    })

    $(document).on("click", ".animalGif", function () {
      console.log($(this))
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
      }

    });

  });