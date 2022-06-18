let tasks = localStorage.getItem('tasks') === null? [] : JSON.parse(localStorage.getItem('tasks'));
let id = document.querySelector('#id');
let task = document.querySelector('#task');
let assignee = document.querySelector('#assignee');
let taskStatus = document.querySelector('#status');
let addTask = document.querySelector('#addTask');
let todayDate = new Date();
let thead = document.querySelector('#thead');
let tbody = document.querySelector('#tbody');
let search = document.querySelector('#search');
let filter = document.querySelector('#filter');

let removeTask;
let checkTask;

id.value = tasks.length? parseInt(tasks[tasks.length-1].id) + 1: 1;

function refreshTable (tasks){
    tbody.innerHTML = '';
    tasks.map(task => {
        let row = document.createElement('tr');
        row.innerHTML=`
                <td>${task.id}</td>
                <td>${task.task}</td>
                <td>${task.assignee}</td>
                <td>${task.status?'Done':'Pending'}</td>
                <td>${task.created}</td>
                <td>
                    ${task.status?'':
                    `<a href="#" class="check-item" title="Check Task as Done">
                        <i class="fa fa-check" data-id=${task.id}></i>
                    </a>`}
                    <a href="#" class="delete-item" title="Delete Task">
                        <i class="fa fa-remove"  data-id=${task.id}></i>
                    </a>
                </td>`;
        tbody.appendChild(row);
    })
}
refreshTable(tasks);

function saveTask(e){
    e.preventDefault();
    // disable add task button
    addTask.disabled = true;
    if(task.value === '' ){
        alert('Please enter a task');
    } else {
        let newTask = {
            id: id.value,
            task: task.value,
            assignee: assignee.value,
            status: taskStatus.checked,
            created: `${(todayDate.getMonth()+1).toString().padStart(2,"0")}/${todayDate.getDate()}/${todayDate.getFullYear()}`
        }
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        id.value = parseInt(id.value) + 1;
        task.value = '';
        taskStatus.checked = false;

        refreshTable(tasks);
    }
    // wait 3 seconds and enable add task button
    setTimeout(() => {
        // enable add task button
        addTask.disabled = false;
    }, 3000);
}

function deleteTask(e){
    e.preventDefault();
    if(e.target.classList.contains('fa-remove')){
        removeTask = e.target.dataset.id;
        tasks = tasks.filter(task => task.id != removeTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTable(tasks);
    } else if(e.target.classList.contains('fa-check')){
        checkTask = e.target.dataset.id;
        tasks.map(task => {
            if(task.id == checkTask){
                task.status = true;
            }
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTable(tasks);
    }
}

function searchName(e){
    e.preventDefault();
    let searchName = search.value;
    let filteredTasks = tasks.filter(task => task.assignee.toLowerCase().includes(searchName.toLowerCase()));
    refreshTable(filteredTasks);
}

function filterStatus(e){
    e.preventDefault();
    if(e.target.value === 'all'){
        refreshTable(tasks);
    } else {
        let filteredTasks = tasks.filter(task => task.status.toString() == e.target.value);
        refreshTable(filteredTasks);
    }
}

function sortColumn(e) {
    e.preventDefault();
    if(e.target.classList.contains('fa-sort')){
        e.target.classList.remove('fa-sort');
        e.target.classList.add('fa-sort-up');
    }
    if(e.target.classList.contains('fa-sort-up')){
        tasks.sort((a,b) => {
            return new Date(a.created) - new Date(b.created);
        });
        refreshTable(tasks);
        e.target.classList.remove('fa-sort-up');
        e.target.classList.add('fa-sort-down');
    } else if(e.target.classList.contains('fa-sort-down')){
        tasks.sort((a,b) => {
            return new Date(a.created) - new Date(b.created);
        }).reverse();
        e.target.classList.remove('fa-sort-down');
        e.target.classList.add('fa-sort-up');
    }
    console.log(tasks);
    refreshTable(tasks);
}

addTask.addEventListener('click',saveTask);
tbody.addEventListener('click', deleteTask);
thead.addEventListener('click', sortColumn);
search.addEventListener('keyup', searchName);
filter.addEventListener('change', filterStatus);
