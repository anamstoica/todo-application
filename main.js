class TodoDatabase {
  todoCount = 0;
  todos = [];
  constructor(todoListSelector = ".todo-list") {
    this.todoList = document.querySelector(todoListSelector);
    this.addButton = document.querySelector(".add-task");
    this.addButton.addEventListener("click", () => {
      const taskInputElement = document.querySelector(".input-field");
      const testTaskInput = taskInputElement.value;
      const validationMessage = document.querySelector(".validation-message");

      if (taskInputElement.value.length > 0) {
        this.createTodo({
          description: taskInputElement.value,
          completed: false,
        });
        taskInputElement.value = "";
        validationMessage.style.display = "none";
      } else {
        validationMessage.style.display = "initial";
      }
    });
  }

  createTodo(todo) {
    this.addTodo(todo);
    this.render();
  }

  addTodo(todo) {
    if (!todo.description || todo.completed === undefined) {
      throw new Error("This is not a todo");
    }
    this.todos.push(todo);
  }

  updateTodo(index, newDescription) {
    if (index < 0 || index >= this.todos.length) return;
    this.todos[index].description = newDescription;
    this.render();
  }

  removeTask(index) {
    if (index < 0 || index >= this.todos.length) return;
    this.todos.splice(index, 1);
    this.render();
  }

  clearTodos() {
    this.todos = [];
    this.render();
  }

  countTodos() {
    this.todoCount = this.todos.length;
  }

  render() {
    this.todoList.innerHTML = "";
    const todoList = this.todoList;

    this.todos.forEach((todo, index) => {
      const listItem = document.createElement("li");

      const taskStatus = document.createElement("input");
      taskStatus.type = "checkbox";
      taskStatus.checked = todo.completed;
      taskStatus.addEventListener("change", () => {
        this.todos[index].completed = taskStatus.checked;
        this.render(); // Re-render after checking/unchecking a task
      });

      const taskDescription = document.createElement("p");
      taskDescription.textContent = todo.description;
      if (todo.completed) taskDescription.classList.add("crossed-out");

      const editTask = document.createElement("span");
      editTask.textContent = "✐ᝰ";
      editTask.classList.add("edit-task");
      editTask.addEventListener("click", () => {
        const newDescription = prompt("Edit task:", todo.description);
        if (newDescription !== null) this.updateTodo(index, newDescription);
      });

      const taskRemoved = document.createElement("span");
      taskRemoved.textContent = "✖";
      taskRemoved.classList.add("remove-task");
      taskRemoved.addEventListener("click", () => this.removeTask(index));

      listItem.appendChild(taskStatus);
      listItem.appendChild(taskDescription);
      listItem.appendChild(editTask);
      listItem.appendChild(taskRemoved);

      todoList.appendChild(listItem);
    });

    // Update the todo count in the UI
    const todoCountElement = document.querySelector(".todo-count");
    todoCountElement.textContent = this.todoCount;
  }
}

const myDatabase = new TodoDatabase();

myDatabase.createTodo({ description: "Get groceries", completed: false });
myDatabase.createTodo({ description: "Finish homework", completed: true });
