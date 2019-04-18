// Front-End Routes

$(document).ready( () => {
    $(".scrape").on("click", event => {
        event.preventDefault();
        $.ajax({
            method: "GET",
            url: "/scrape"
          })
            // With that done, add the note information to the page
            .then(function(data) {
              console.log("data", data);
        })
    })
});