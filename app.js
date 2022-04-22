//DOM elements
let form = document.querySelector('#task-form');
let taskInput = document.querySelector('#task');
let tasklist = document.querySelector('.collection');
let clean = document.querySelector('.clear-task');



loadListners();

function loadListners() {
    //load tasks
    document.addEventListener('DOMContentLoaded', loadTasks)
        //task add
    form.addEventListener('submit', addTask);
    //remove item
    tasklist.addEventListener('click', removeTask);
    clean.addEventListener('click', cleanLocalStorage);
}



///function addtask
function addTask(e) {
    if (taskInput.value === '') {

    } else {
        //create link item
        let li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //add input
        li.appendChild(document.createTextNode(taskInput.value));
        //create x btn
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-delete"></i>';
        // add to link item
        li.appendChild(link)
            //append li to ul
        tasklist.appendChild(li)
            //save to ls
        saveTask(taskInput.value)

        //clear input field
        taskInput.value = '';

    };

    e.preventDefault();
};
//filter

//remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('delete ' + e.target.parentElement.parentElement.textContent + ' ?')) {
            e.target.parentElement.parentElement.remove()
        };
        removeFromStorage(e.target.parentElement.parentElement);
        e.preventDefault()
    }
};
//load content
function loadTasks() {
    if (localStorage.getItem('tasks') != null) {

        tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.forEach(function(task) {
            //create link item
            let li = document.createElement('li');
            //add class
            li.className = 'collection-item';
            //add input
            li.appendChild(document.createTextNode(task));
            //create x btn
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-delete"></i>';
            // add to link item
            li.appendChild(link)
                //append li to ul
            tasklist.appendChild(li)

        });
    }
}
//cleAN local storage
function cleanLocalStorage() {
    if (confirm('are u sure?')) {
        while (tasklist.firstChild) {
            tasklist.removeChild(tasklist.firstChild)
        }
        localStorage.removeItem('tasks');
    };
};
let tasks;

function saveTask(task) {
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        console.log(tasks)
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
//remove single item
function removeFromStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}