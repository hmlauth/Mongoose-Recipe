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

$(document).on('click','.add-note', function() {
    event.preventDefault();

    var thisId = $(this).attr('data-id');

    $.ajax({
        method: "GET",
        url: '/addnote/' + thisId,
    }).then( res => {
        console.log('Notes populated!', res);
        // If there's a note in the article

    });

});

$(document).on('click',".save-note", function() {
    event.preventDefault();

    var thisId = $(this).attr('data-id');
    console.log(thisId);
    // closest model body to the button i'm clicking
    var modal = $(this).closest(".modal");
    var modalTitle = modal.find(".modal-title").text();
    var modalBody = modal.find(".modal-body");
    var newComment = modalBody.find("textarea").val();
    $(".note-container").append("<li>" + newComment + "</li>");

    var addNote = {
        title: modalTitle,
        comment: newComment
    };
    console.log('addNote', addNote);
    // Run a POST request to add recipe to dbCookbook, using information stored in card.
    $.ajax({
        method: "POST",
        url: "/addnote/" + thisId,
        data: addNote
    }).then( res => {
        console.log("Note added!", res);
        // If there's a note in the article

    });
});