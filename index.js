"use strict"
const toDoList = document.querySelector("#root");
                                                                      //todoForm
function todoform(add) {
    const container = document.createElement("form");

    container.innerHTML = `
<input type = "text" />
<button>Add</button>
`;

    container.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = container.querySelector("input").value;
        add(value)

    })

    return container;
}
                                                                              //listItem
function listItem(todo, onChange) {
    const container = document.createElement("div");
    todo.completed;
    container.innerHTML = `
    <label>
    <input type = "checkbox"  ${todo.completed ? "checked" : ""}/>
    ${todo.name}
    </label>
    `;

    const input = container.querySelector("input");
    input.addEventListener("change", (e) => {
        onChange(e.target.checked)
    })

    return container
}
                                                                               //list
function list(checklist, onChange) {
    const container = document.createElement("div");

    checklist.map(item => {
        return listItem(item, (change) => {
            item.completed = change;
            onChange()
        })
    }).forEach(el => {
        container.append(el)
    })


    return container;
};
//                                                                              todofoot
function todoFoot(todos,onChange) {
    const container = document.createElement("div");

    const completed = todos.filter(todo =>  todo.completed === true ).length
    container.innerHTML = `
    <span>${completed}/${todos.length} completed</span>
    <button>Clear Completed</button>
    `
   const button = container.querySelector("button");

   button.addEventListener("click",()=>{
onChange(todos.filter(todo=>todo.completed === false)
   )})


    return container;
}

function app() {
    let todos = [
        { name: "Learn JS", completed: false },
        { name: "Learn TS", completed: false },
        { name: "Learn React", completed: false },

    ];
    const container = document.createElement("div");

    function all() {
        container.innerHTML = "";
        container.append(todoform(function (newtext) {
            todos.push({
                name: newtext,
                completed: false
            })
            all()
        }));

        container.append(list(todos, () => {
            all();
        }));
        container.append(todoFoot(todos,(newtoDo)=>{
            todos = newtoDo;
            all()
        }))
    }


    all()
    return container
};

toDoList.append(app())



