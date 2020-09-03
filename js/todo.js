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
    newItem.type = "text"; //makes text from input field the li text
    newItem.disabled = true;
    newItem.value = input.value;

    // create a check btn
    var checkBtn = document.createElement("button");
    checkBtn.classList.add("check");
    checkBtn.innerHTML = `<i class="fa fa-check"></i>`;

    // create edit btn
    var pencilBtn = document.createElement("button");
    pencilBtn.classList.add("edit");
    pencilBtn.innerHTML = `<i class="fa fa-pencil" aria-hidden="true"></i>`;

    // create trash btn
    var trashBtn = document.createElement("button");
    trashBtn.classList.add("trash");
    trashBtn.innerHTML = `<i class="fa fa-trash"></i>`;

    // save btn
    let save = document.createElement('span');
    save.textContent = 'save!';
    save.classList.add('save');
    
    todos.appendChild(newItem);
    todos.appendChild(pencilBtn);
    todos.appendChild(checkBtn);
    todos.appendChild(trashBtn);

    ul.appendChild(todos); //adds div to ul
    input.value = ""; //Reset text input field


    //START STRIKETHROUGH
    // because it's in the function, it only adds it for new items
    function crossOut(e) {
        e.stopPropagation();
        const done = todos.classList.toggle("done");
        const line = newItem.classList.toggle("line");

        if(done&&line) {
            pencilBtn.removeEventListener("click", editTodoItem);
            newItem.classList.remove("editing");
            newItem.disabled = true;
            save.remove();
            todos.insertBefore(pencilBtn, checkBtn);
        } else {
            pencilBtn.addEventListener("click", editTodoItem);
        }
    }

    checkBtn.addEventListener("click", crossOut);
    //END STRIKETHROUGH


    // START ADD DELETE BUTTON
    trashBtn.addEventListener("click", deleteTodoItem);
    // END ADD DELETE BUTTON

    // EDIT TODO
    pencilBtn.addEventListener("click", editTodoItem);

    function editTodoItem() {
        
        newItem.disabled = false;
        newItem.classList.add("editing");
        newItem.focus();
        pencilBtn.remove();
        todos.insertBefore(save, checkBtn);

        //remove save & disable listener
        save.addEventListener('click', () => {
            console.log('i love you');
            newItem.classList.remove("editing");
            newItem.disabled = true;
            save.remove();
            todos.insertBefore(pencilBtn, checkBtn);
        });
    }

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