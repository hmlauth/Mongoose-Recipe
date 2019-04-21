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

// populate add note modal with previous notes already saved
// Query will use the unique recipe ID and it's associated notes
$(document).on('click','.add-note', function() {
    event.preventDefault();

    var thisId = $(this).attr('data-id');
    console.log(thisId);

    $.ajax({
        method: "GET",
        url: '/addnote/' + thisId,
    }).then( res => {
        const notes = res[0].notes;
        console.log('POPULATED!', notes);
        for (let i = 0; i < notes.length; i++) {
            const comment = notes[i].comment;
            $(".note-container").append("<li>" + comment + "</li><button class='btn delete-button'>X</button>");
        }

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
    $(".note-container").append("<li>" + newComment + "</li><button class='btn delete-button'>X</button>");

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
    });
});