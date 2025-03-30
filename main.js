class TodoDatabase {
  toDoCount = 0;
  todos = [];
  constructor(todoListSelector = ".todo-list") {
    this.todoList = document.querySelector(todoListSelector);
    this.addButton = document.querySelector(".add-task");
    this.addButton.addEventListener("click", () => {
      const taskInputElement = document.querySelector(".input-field");
      const testTaskInput = taskInputElement.value;
      const validationMessage = document.querySelector(".validation-message");

      if (taskInputElement.value.length > 0) {
        this.createTask({
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

  createTask(task) {
    const taskStatus = this.createElement(
      "input",
      undefined,
      "checkbox-container",
      "change",
      () => {
        if (taskStatus.checked) {
          taskDescription.classList.add("crossed-out");
        } else {
          taskDescription.classList.remove("crossed-out");
        }
      }
    );
    taskStatus.type = "checkbox";
    taskStatus.checked = task.completed;

    const taskDescription = this.createElement("p", task.description);

    const listItem = this.createElement("li");

    const taskRemoved = this.createElement(
      "span",
      "✖",
      "remove-task",
      "click",
      () => {
        listItem.remove();
        this.countingToDos();
      }
    );

    const editTask = this.createElement(
      "span",
      "✐ᝰ",
      "edit-task",
      "click",
      () => {
        const inputField = this.createElement(
          "input",
          taskDescription.textContent,
          undefined,
          "blur",
          () => {
            taskDescription.textContent =
              inputField.value || taskDescription.textContent;
            listItem.replaceChild(taskDescription, inputField);
          }
        );
        listItem.replaceChild(inputField, taskDescription);
        inputField.type = "text";
        inputField.value = taskDescription.textContent;
        inputField.focus();
      }
    );

    const clearTask = document.querySelector(".delete-button");
    clearTask.addEventListener("click", () => {
      this.todoList.innerHTML = "";
      this.countingToDos();
    });

    listItem.appendChild(taskStatus);
    listItem.appendChild(taskDescription);
    listItem.appendChild(editTask);
    listItem.appendChild(taskRemoved);

    this.todoList.appendChild(listItem);
    this.countingToDos();
  }

  countingToDos() {
    this.toDoCount = document.querySelectorAll("li").length;
    const toDoText = document.querySelector(".todo-count");
    toDoText.innerHTML = this.toDoCount;
  }

  createElement(
    elementType,
    content = "",
    className = "",
    event,
    addEventListener,
    querySelector
  ) {
    const element = document.createElement(elementType);

    if (content) {
      element.innerHTML = content;
    }

    if (className) {
      element.classList.add(className);
    }

    if (event && addEventListener) {
      element.addEventListener(event, addEventListener);
    }

    if (querySelector) {
      const targetElement = document.querySelector(querySelector);
      targetElement.appendChild(element);
    }

    return element;
  }
}

const myDatabase = new TodoDatabase();

myDatabase.createTask({ description: "Get groceries", completed: false });
myDatabase.createTask({ description: "Finish homework", completed: true });
