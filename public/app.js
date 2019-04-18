// Front-End Routes

$(document).ready( () => {

    // if scrape more recipes button is clicked, scrape for recipes
    $(".scrape").on("click", event => {
        event.preventDefault();
        $.ajax({
            method: "GET",
            url: "/scrape"
          })
            // With that done, add the note information to the page
            .then(function(data) {
              console.log("Scraped Data!", data);
        })
    })

    // if saved recipe button is clicked then save that specific recipe
    $(".save-recipe").on("click", event => {
        event.preventDefault();
        $.ajax({
            method: "POST",
            url: "/saved"
        }).then(
            data => {
                console.log("Saved Data!", data)
            }
        )
    })
});