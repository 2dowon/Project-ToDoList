const pendingList = document.querySelector(".js-pending"),
  finishedList = document.querySelector(".js-finished"),
  form = document.querySelector(".js-toDoForm"),
  input = form.querySelector("input");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks, finishedTasks;

function getTaskObject(text) {
  return {
    id: String(Date.now()),
    text
  };
}

function savePendingTask(task) {
  pendingTasks.push(task);
}

function findInFinished(taskId) {
  return finishedTasks.find(function(task) {
    return task.id === taskId;
  });
}

function findInPending(taskId) {
  return pendingTasks.find(function(task) {
    return task.id === taskId;
  });
}

function removeFromPending(taskId) {
  pendingTasks = pendingTasks.filter(function(task) {
    return task.id !== taskId;
  });
}

function removeFromFinished(taskId) {
  finishedTasks = finishedTasks.filter(function(task) {
    return task.id !== taskId;
  });
}

function addToFinished(task) {
  finishedTasks.push(task);
}

function addToPending(task) {
  pendingTasks.push(task);
}

function deleteTask(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  removeFromPending(li.id);
  saveState();
}

function handleFinishClick(e) {
  const li = e.target.parentNode;
  pendingList.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  addToFinished(task);
  paintFinishedTask(task);
  saveState();
}

function handleBackClick(e) {
  const li = e.target.parentNode;
  finishedList.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  addToPending(task);
  paintPendingTask(task);
  saveState();
}

function templateLi(task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("i");
    span.innerText = task.text;
    li.setAttribute("class", "hoverAction");
    delBtn.setAttribute("class", "far fa-trash-alt");
    delBtn.style.visibility = "hidden";
    delBtn.addEventListener("click", deleteTask);
    li.addEventListener("mouseenter", (e) => {
      delBtn.style.visibility = "visible";
      delBtn.style.color = "#d00000";
    });
    li.addEventListener("mouseleave", (e) => {
      delBtn.style.visibility = "hidden";
    });
    li.append(span, delBtn);
    li.id = task.id;
    return li;
}

function paintPendingTask(task) {
  const pendingLi = templateLi(task);
  pendingLi.addEventListener("click", handleFinishClick);
  pendingList.append(pendingLi);
}

function paintFinishedTask(task) {
  const finishedLi = templateLi(task);
  finishedLi.addEventListener("click", handleBackClick);
  finishedList.append(finishedLi);
}

function saveState() {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function loadState() {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function restoreState() {
  pendingTasks.forEach(function(task) {
    paintPendingTask(task);
  });
  finishedTasks.forEach(function(task) {
    paintFinishedTask(task);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const taskObj = getTaskObject(input.value);
  input.value = "";
  paintPendingTask(taskObj);
  savePendingTask(taskObj);
  saveState();
}

function init() {
  form.addEventListener("submit", handleFormSubmit);
  loadState();
  restoreState();
}
init();