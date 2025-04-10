// CODE EXPLAINED channel
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
        if (item.done) {
            document.getElementById(item.id)?.classList.add(CHECK);
            document.getElementById(item.id)?.classList.remove(UNCHECK);
        }
    });
}


clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();


dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
 const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const text = `<li class="item">
  <i class="fa ${DONE} complete" job="complete" id="${id}"></i>
  <p class="text ${LINE}">${toDo}</p>
  <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
</li>`;


  const position = "beforeend";
  list.insertAdjacentHTML(position, text); 
}

document.addEventListener("keyup", function (event) { 
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }

                          });

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[Number(element.id)].done = !LIST[Number(element.id)].done;

}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") { 
    removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});