//Select elements
const clear = document.querySelector(".clear");
const addToDoButton = document.querySelector(".add-to-do");
const input = document.querySelector("input");
const dateElement = document.querySelector("#date");
const list = document.querySelector("#list");

///Clsses names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_TROUH = "lineThrough";

//list of todo`s and id
let toDoList = [],
  id = 0;

let data = localStorage.getItem("ToDo");

//check data in localStorage
if (data) {
  toDoList = JSON.parse(data);
  id = toDoList.length + 1;
  loadToDoList(toDoList);
} else {
  toDoList = [];
  id = 0;
}
//Set today Date
const today = new Date();
const options = { day: "numeric", weekday: "short", month: "short" };

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do

function addToDo(todo, id, done, trash) {
  if (trash) return;

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_TROUH : "";
  const position = "beforeend";

  let listItem = ` <li class="item">
    <i class="fa ${DONE} co" job="complete" id=${id}></i>
    <p class="text ${LINE}">${todo}</p>
    <i class="fa fa-trash de" job="delete" id=${id}></i>
  </li>`;
  list.insertAdjacentHTML(position, listItem);
}

//Add element by Enter kety hit

document.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    toDo = input.value;
    if (toDo) {
      toDoList.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      addToDo(toDo, id, false, false);

      localStorage.setItem("ToDo", JSON.stringify(toDoList));
      id++;
    }
    input.value = "";
  }
});

//complete ToDo
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_TROUH);
  toDoList[element.id].done = toDoList[element.id].done ? false : true;
}

//remove ToDO
function deleteToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  toDoList[element.id].trash = true;
}

list.addEventListener("click", (event) => {
  let element = event.target;
  let elementJob = element.attributes.job.value;
  if (elementJob == "complete") {
    completeToDo(element);
    localStorage.setItem("ToDo", JSON.stringify(toDoList));
  }
  if (elementJob == "delete") {
    deleteToDo(element);
    localStorage.setItem("ToDo", JSON.stringify(toDoList));
  }
});

//load ToDo list from localStorage
function loadToDoList(list) {
  try {
    list.forEach((item) => {
      addToDo(item.name, item.id, item.done, item.trash);
    });
  } catch (err) {
    console.error(err);
  }
}

//clear data from localStorage

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

// add toDo by hit plus Button
addToDoButton.addEventListener("click", (event) => {
  toDo = input.value;
  if (toDo) {
    addToDo(toDo, id, false, false);
    toDoList.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
    });
    localStorage.setItem("ToDo", JSON.stringify(toDoList));
    id++;
  }
  input.value = "";
});
