console.log('hello');

$(document).on("click", ".save-recipe", function() {
        event.preventDefault();

        var card = $(this).closest('.card');
        var savedRecipe = {
            title: card.find('h5').text(),
            summary: card.find('p').text() ,
            link: card.find('h5').attr('href'),
            img: card.find('img').attr('src')
        };
        console.log(savedRecipe);

        // Run a POST request to add recipe to dbCookbook, using information stored in card.
        $.ajax({
            method: "POST",
            url: "/saved",
            data: savedRecipe
        }).then( res => console.log("Saved res!", res))

    });

// $(document).on("click",".all-recipes", function() {
//     event.preventDefault();

//     $.ajax({
//         method: "GET",
//         url: "/allrecipes"
//     }).then (res => console.log("Saved Recipes!", res))

//     // window.location = '/allrecipes'

// })