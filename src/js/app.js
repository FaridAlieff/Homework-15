let tasks = [];

function createTask() {
  const taskNameInput = document.getElementById('taskName');
  const taskName = taskNameInput.value;
  if (taskName.trim() === '') {
      alert('Task adını daxil edin!');
      return;
  }

  const task = {
      id: Date.now(),
      name: taskName,
      status: 'open'
  };

  tasks.push(task);
  updateTaskList('open');
  updateTotalTaskCount();
  updateDB();

  // Inputu təmizlə
  taskNameInput.value = '';
}

function handleKeyDown(event) {
  if (event.key === 'Enter') {
      createTask();
  }
}


function updateTaskList(status) {
    const taskList = document.getElementById(`${status}Div`);
    taskList.innerHTML = `<h2>${status[0].toUpperCase() + status.slice(1)}</h2>`;

    const filteredTasks = tasks.filter(task => task.status === status);
    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.draggable = true;
        taskElement.classList.add('task');
        taskElement.textContent = task.name;
        taskElement.setAttribute('data-id', task.id);
        taskElement.setAttribute('data-status', task.status);
        taskElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-id'));
        });
        taskList.appendChild(taskElement);
    });
}

function updateTotalTaskCount() {
    const totalTaskCount = document.getElementById('totalTaskCount');
    totalTaskCount.textContent = tasks.length;
}

function allowDrop(event) {
  event.preventDefault();
  const target = event.target;
  if (target.classList.contains('task-list')) {
      target.classList.add('active');
  } else {
      const taskLists = document.querySelectorAll('.task-list');
      taskLists.forEach(list => list.classList.remove('active'));
  }
}

// Elementi buraxdıqda
function drop(event, status) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData('text/plain');
  const task = tasks.find(task => task.id.toString() === taskId);
  if (task) {
      const taskIndex = tasks.findIndex(t => t.id.toString() === taskId);
      task.status = status;
      updateTaskList(status);
      updateTotalTaskCount();
      updateDB();
      removeActiveClass();
  }
}

function updateDB() {
    // JSON faylını yeniləmək üçün kodu burada əlavə edə bilərsiniz.
}

// Elementi silmək üçün funksiya
function deleteTask(event) {
  const taskId = event.dataTransfer.getData('text/plain');
  const task = tasks.find(task => task.id.toString() === taskId);
  if (task) {
      const taskIndex = tasks.findIndex(t => t.id.toString() === taskId);
      tasks.splice(taskIndex, 1);
      updateTaskList(task.status);
      updateTotalTaskCount();
      updateDB();
  }
}

// İkon üzərinə hover olduğu zaman aktivləşdirmə funksiyası
function iconHover() {
  const deleteIcon = document.getElementById('deleteIcon');
  deleteIcon.classList.add('active');
}

// İkondan ayrıldığınız zaman aktivliyi söndürmə funksiyası
function iconUnhover() {
  const deleteIcon = document.getElementById('deleteIcon');
  deleteIcon.classList.remove('active');
}

// Elementi silmək üçün funksiya
function deleteTask(event) {
  const taskId = event.dataTransfer.getData('text/plain');
  const task = tasks.find(task => task.id.toString() === taskId);
  if (task) {
      const taskIndex = tasks.findIndex(t => t.id.toString() === taskId);
      tasks.splice(taskIndex, 1);
      updateTaskList(task.status);
      updateTotalTaskCount();
      updateDB();
  }
}

// Elementi sürüşdürdükdə aktivliyi söndürmə funksiyası
function removeActiveClass() {
  const taskLists = document.querySelectorAll('.task-list');
  taskLists.forEach(list => list.classList.remove('active'));
}

// Elementi sürüşdürüldükdə
function drag(event) {
  const taskId = event.target.getAttribute('data-id');
  event.dataTransfer.setData('text/plain', taskId);
}