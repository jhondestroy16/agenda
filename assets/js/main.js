const form = document.getElementById("formTask");
const btnClear = document.getElementById("clear");

form.addEventListener("submit", saveTask);
btnClear.addEventListener("click",clearTask);

function saveTask(e) {
    e.preventDefault();

    const taskName = document.getElementById("taskName");
    let title = taskName.value;
    // console.log(title);
    let description = document.getElementById("taskDescription").value;
    // console.log(description);

    let task = {
        title,
        description
    };
    console.log(task);
    if(task.title != "" && task.description != ""){
        if(localStorage.getItem("tasks")===null){
            let tasks = [];
            tasks.push(task);
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }else{
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks.push(task);
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }
    }else{
        alert("Campos requeridos");
    }

    form.reset();
    getTask();
}

function getTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    const tasksView = document.getElementById("tasks");
    tasksView.innerHTML = "";

    if (tasks != null){
        for(let i = 0; i <tasks.length;i++){
            let title = tasks[i].title;
            let description = tasks[i].description;
    
            tasksView.innerHTML+=`<div class = "card mb-2>"
                                        <div class = "card-body">
                                            <p>${title}: <br>${description}</p>
                                            <a class="btn btn-outline-danger float-end" onclick="deleteTask('${title}')">Eliminar</a>
                                        </div>
                                 </div>`;
        }
    }
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem("tasks"))

    for(let i = 0; i < tasks.length;i++){
        let titleTask = tasks[i].title;
        if(title==titleTask){
            tasks.splice(i,1);
        }
    }
    localStorage.setItem("tasks",JSON.stringify(tasks));
    getTask();
}

function clearTask() {
    localStorage.removeItem("tasks")
    getTask();
}
getTask();