"use strict";

const todoForm = document.querySelector(".todoForm"),
  todoInput = document.querySelector(".inputTask"),
  todoList = document.querySelector(".taskList"),
  doneList = document.querySelector(".taskList_Done");

const TODOS_LS = "todos";
const DONETODO = "doneTodo";
let todos = [];
let doneTodo = [];

function plusDone(event, text) {
  const li = document.createElement("li");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  const btn = event.target;
  const doneId = parseInt(btn.parentNode.id);
  doneBtn.addEventListener("click", deleteDone);
  for (let i = 0; i < JSON.parse(localStorage.getItem("todos")).length; i++) {
    if (JSON.parse(localStorage.getItem("todos"))[i].id == doneId) {
      text = JSON.parse(localStorage.getItem("todos"))[i].text;
    }
  }

  const delLi = btn.parentNode;
  todoList.removeChild(delLi);
  const cleanTodos = todos.filter(function (todo) {
    return todo.id !== parseInt(delLi.id);
  });
  todos = cleanTodos;
  doneBtn.innerText = "✔︎";
  span.innerText = text;
  li.appendChild(doneBtn);
  doneBtn.classList.add("done_btn");
  li.appendChild(span);
  li.id = doneId;
  doneList.appendChild(li);
  const doneObj = {
    text: text,
    id: doneId,
  };
  doneTodo.push(doneObj);
  saveTodos();
  saveDone();
}

function paintDone(text) {
  const li = document.createElement("li");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = doneTodo.length + 1;
  doneBtn.innerText = "✔︎";
  span.innerText = text;
  li.appendChild(doneBtn);
  doneBtn.classList.add("done_btn");
  doneBtn.addEventListener("click", deleteDone);
  li.appendChild(span);
  li.id = newId;
  doneList.appendChild(li);
  const doneObj = {
    text: text,
    id: newId,
  };
  doneTodo.push(doneObj);
  saveDone();
}

function deleteDone(event) {
  const btn = event.target;
  const li = btn.parentNode;
  doneList.removeChild(li);
  const cleanDone = doneTodo.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  doneTodo = cleanDone;
  saveDone();
}

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const cleanTodos = todos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  todos = cleanTodos;
  saveTodos();
}

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function saveDone() {
  localStorage.setItem(DONETODO, JSON.stringify(doneTodo));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = todos.length + 1;
  doneBtn.innerText = "✔︎";
  delBtn.innerText = "–";
  delBtn.addEventListener("click", deleteTodo);
  doneBtn.addEventListener("click", plusDone);
  span.innerText = text;
  li.appendChild(doneBtn);
  doneBtn.classList.add("done_btn");
  li.appendChild(delBtn);
  delBtn.classList.add("del_btn");
  li.appendChild(span);
  li.id = newId;
  todoList.appendChild(li);
  const todoObj = {
    text: text,
    id: newId,
  };
  todos.push(todoObj);
  saveTodos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintTodo(currentValue);
  todoInput.value = "";
}

function loadTodos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  const loadDoneTodo = localStorage.getItem(DONETODO);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(function (todo) {
      paintTodo(todo.text);
    });
  }
  if (loadDoneTodo !== null) {
    const parsedDone = JSON.parse(loadDoneTodo);
    parsedDone.forEach(function (todo) {
      paintDone(todo.text);
    });
  }
}

function init() {
  loadTodos();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
