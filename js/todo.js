var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");


function inputLength() {
    return input.value.length;
}

function listLength() {
    return item.length;
}

function createListElement() {

    // create a div
    var todos = document.createElement("div");
    todos.classList.add("todos");

    // create input
    var newItem = document.createElement("input"); // creates an element "li"
    newItem.disabled = true;
    newItem.type = "text"; //makes text from input field the li text
    newItem.value = input.value;

    // create a check btn
    var checkBtn = document.createElement("button");
    checkBtn.classList.add("check");
    checkBtn.innerHTML = `<i class="fa fa-check"></i>`;

    // create trash btn
    var trashBtn = document.createElement("button");
    trashBtn.classList.add("trash");
    trashBtn.innerHTML = `<i class="fa fa-trash"></i>`;

    todos.appendChild(newItem);
    todos.appendChild(checkBtn);
    todos.appendChild(trashBtn);

    ul.appendChild(todos); //adds div to ul
    input.value = ""; //Reset text input field


    //START STRIKETHROUGH
    // because it's in the function, it only adds it for new items
    function crossOut() {
        todos.classList.toggle("done");
        newItem.classList.toggle("line");
    }

    checkBtn.addEventListener("click", crossOut);
    //END STRIKETHROUGH


    // START ADD DELETE BUTTON
    trashBtn.addEventListener("click", deleteTodoItem);
    // END ADD DELETE BUTTON

    // EDIT TODO
    // todos.addEventListener("click", editTodoItem);

   
    // function editTodoItem() {
    //     todos.focus();
    //     newItem.disabled = false;
    //     checkBtn.style.display = "inline-block";
        
    // }

    // checkBtn.addEventListener('click', function() {
    //     newItem.disabled = true;
    //     todos.removeChild(checkBtn);
    // });

   



    //DELETE TODO
    function deleteTodoItem() {
        ul.removeChild(todos);
    }
    //END DELETE
}


function addListAfterClick() {
    if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
        createListElement();
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) { //this now looks to see if you hit "enter"/"return"
        //the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
        createListElement();
    }
}


enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);