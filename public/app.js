// // Front-End Routes
// alert("I'm working!");
// $(document).on("click", ".scrape", () => {
//     event.preventDefault();
//     $.ajax({
//         method: "GET",
//         url: "/scrape"
//         })
//         // With that done, add the note information to the page
//         .then( res => {
//             console.log("Scraped res!", res);
//     })
// });
console.log('hello');
$(document).on("click", ".save-recipe", function() {
        event.preventDefault();
        console.log("hello");
        //pull info from card
        console.log(this);

        var card = $(this).closest('.card');

        var savedRecipe = {
            title: card.find('h5').text(),
            summary: card.find('p').text() ,
            link: card.find('h5').attr('href'),
            imgSrc: card.find('img').attr('src')
        };
        console.log(savedRecipe);

        // Run a POST request to add recipe to dbCookbook, using information stored in card.
        $.ajax({
            method: "POST",
            url: "/saved",
            data: savedRecipe
        }).then( res => console.log("Saved res!", res))

    });