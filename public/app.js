console.log('hello');

$(document).on("click", ".save-recipe", function () {
    event.preventDefault();

    var card = $(this).closest('.card');
    var savedRecipe = {
        title: card.find('h5').text(),
        summary: card.find('p').text(),
        link: card.find('h5').attr('href'),
        img: card.find('img').attr('src')
    };
    console.log(savedRecipe);

    // Run a POST request to add recipe to dbCookbook, using information stored in card.
    $.ajax({
        method: "POST",
        url: "/saved",
        data: savedRecipe
    }).then(res => console.log("Saved res!", res))

});

// populate add note modal with previous notes already saved. Query will use the unique recipe ID and it's associated notes
$(document).on('click', '.add-note', function () {
    event.preventDefault();

    var thisId = $(this).attr('data-id');
    console.log(thisId);

    $.ajax({
        method: "GET",
        url: '/addnote/' + thisId,
    }).then(res => {
        const id = res[0]._id;
        const notes = res[0].notes;
        console.log('POPULATED!', notes);
        for (let i = 0; i < notes.length; i++) {
            const comment = notes[i].comment;

            listNote(id, comment);

        }

    });

});

$(document).on('click', ".save-note", function () {
    event.preventDefault();

    var id = $(this).attr('data-id');
    // closest model body to the button i'm clicking
    var modal = $(this).closest(".modal");
    var modalTitle = modal.find(".modal-title").text();
    var modalBody = modal.find(".modal-body");
    var comment = modalBody.find("textarea").val();
    modalBody.find('textarea').val("");

    listNote(id, comment);

    var addNote = {
        title: modalTitle,
        comment: comment
    };

    $.ajax({
        method: "POST",
        url: "/addnote/" + id,
        data: addNote
    }).then(res => {
        console.log("Note added!", res);
    });
});

$(document).on('click', ".delete-recipe", function() {
    event.preventDefault();

    var id = $(this).attr('data-id');
    $(this).closest(".card").remove();

    $.ajax({
        method: "DELETE",
        url: "/deleterecipe/" + id,
    }).then(res => {
        console.log("Recipe deleted!", res);
    });
});

// helper function to add notes to recipe
function listNote(id, comment) {
    var noteContainer = $(".note-container");
    var button = $("<button class='btn delete-button' data-id=" + id + ">X</button>");
    var li = $("<li>" + comment + "</li>");
    li.prepend(button);
    noteContainer.append(li);
}