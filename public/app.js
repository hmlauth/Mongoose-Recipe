
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

$(document).on('click', '.add-note', function () {
    event.preventDefault();

    var id = $(this).attr('data-id');
    console.log(id);

    $.ajax({
        method: "GET",
        url: '/addnote/' + id,
    }).then(res => {
        console.log(res);
        const notes = res[0].notes;
        console.log('POPULATED!', notes);
        for (let i = 0; i < notes.length; i++) {
            const id = notes[i]._id;
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

    var addNote = {
        comment: comment
    };

    $.ajax({
        method: "POST",
        url: "/addnote/" + id,
        data: addNote
    }).then(res => {
        console.log("Note added!", res.notes);
    });
});

$(document).on('click',".delete-note", function () {
    event.preventDefault();

    var id = $(this).attr('data-id');
    $(this).closest("li").remove();

    $.ajax({
        method: "DELETE",
        url: "/deletenote/" + id,
    }).then(res => {
        console.log("Note deleted!", res);
    });

})

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
    var button = $("<button class='btn delete-note' data-id=" + id + ">X</button>");
    var li = $("<li class='note-comment'>" + comment + "</li>");
    li.prepend(button);
    noteContainer.append(li);
}