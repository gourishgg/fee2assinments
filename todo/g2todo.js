(function(){
    // Array to store todo objects: {id, text, completed}
    const todos = [];

    // Setup UI Layout
    const todocontainer = document.querySelector(".todo");

    const inputContainer = document.createElement("div");
    inputContainer.className = "input-container";

    const inputtask = document.createElement("input");
    inputtask.placeholder = "What needs to be done?";
    inputtask.type = "text";

    const btn = document.createElement("button");
    btn.textContent = "ADD";
    btn.className = "btn-add";

    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Search tasks";
    searchInput.type = "text";

    const searchBtn = document.createElement("button");
    searchBtn.textContent = "SEARCH";
    searchBtn.className = "btn-search";

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "CLEAR";
    clearBtn.className = "btn-clear";

    const todolist = document.createElement("div");
    todolist.className = "todo-list";

    inputContainer.append(inputtask, btn);
    searchContainer.append(searchInput, searchBtn, clearBtn);
    todocontainer.append(inputContainer, searchContainer, todolist);

    function makeId(){
        return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
    }

    function matchesSearch(taskText){
        const query = searchInput.value.trim().toLowerCase();
        return !query || taskText.toLowerCase().includes(query);
    }

    function renderTasks(){
        todolist.innerHTML = "";

        const hasVisibleTasks = todos.some(task => matchesSearch(task.text));
        if (!hasVisibleTasks && searchInput.value.trim()) {
            const emptyMsg = document.createElement("p");
            emptyMsg.textContent = "No tasks match your search.";
            todolist.append(emptyMsg);
            return;
        }

        todos.forEach(taskObj => {
            if (matchesSearch(taskObj.text)) {
                rendertask(taskObj);
            }
        });
    }

    function rendertask(taskObj){
        const todoitem = document.createElement("div");
        todoitem.className = "todo-item";
        todoitem.dataset.id = taskObj.id;
        todoitem.style.border = "2px solid black";
        todolist.style.border = "3px solid red";
        todoitem.style.margin = "5px";

        const contentDiv = document.createElement("div");
        contentDiv.className = "todo-content";
        const p = document.createElement("p");
        p.textContent = taskObj.text;
        contentDiv.append(p);

        const actionsDiv = document.createElement("div");
        actionsDiv.className = "action-buttons";

        const completebtn = document.createElement("button");
        completebtn.textContent = taskObj.completed ? "UNDO" : "COMPLETE";
        completebtn.className = "btn-complete";

        if(taskObj.completed) {
            todoitem.classList.add("completed");
            todoitem.style.backgroundColor = "lightgreen";
        }

        const editbtn = document.createElement("button");
        editbtn.textContent = "EDIT";
        editbtn.className = "btn-edit";

        const deletebtn = document.createElement("button");
        deletebtn.textContent = "DELETE";
        deletebtn.className = "btn-delete";

        actionsDiv.append(completebtn, editbtn, deletebtn);
        todoitem.append(contentDiv, actionsDiv);
        todolist.prepend(todoitem);

        deletebtn.addEventListener("click", function(){
            const index = todos.findIndex(t => t.id === taskObj.id);
            if (index !== -1) {
                todos.splice(index,1);
            }
            renderTasks();
        });

        completebtn.addEventListener("click", function(){
            taskObj.completed = !taskObj.completed;
            completebtn.textContent = taskObj.completed ? "UNDO" : "COMPLETE";

            if (taskObj.completed) {
                todoitem.classList.add("completed");
                todoitem.style.backgroundColor = "lightgreen";
            } else {
                todoitem.classList.remove("completed");
                todoitem.style.backgroundColor = "";
            }
        });

        editbtn.addEventListener("click", function(){
            const isEditing = todoitem.dataset.editing === 'true';

            if (!isEditing){
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'edit-input';
                input.value = taskObj.text;

                contentDiv.replaceChild(input, p);
                editbtn.textContent = 'SAVE';
                editbtn.className = 'btn-save';
                todoitem.dataset.editing = 'true';

                completebtn.style.display = 'none';
                input.focus();

                input.addEventListener('keydown', function(e){
                    if (e.key === 'Enter') { editbtn.click(); }
                    if (e.key === 'Escape') {
                        contentDiv.replaceChild(p, input);
                        editbtn.textContent = 'EDIT';
                        editbtn.className = 'btn-edit';
                        todoitem.dataset.editing = 'false';
                        completebtn.style.display = 'inline-block';
                    }
                });
            } else {
                const input = contentDiv.querySelector('input');
                const newText = input.value.trim();

                if (!newText) {
                    input.focus();
                    return;
                }

                taskObj.text = newText;
                p.textContent = taskObj.text;
                contentDiv.replaceChild(p, input);

                editbtn.textContent = 'EDIT';
                editbtn.className = 'btn-edit';
                todoitem.dataset.editing = 'false';
                completebtn.style.display = 'inline-block';
                renderTasks();
            }
        });
    }

    function addtodo(){
        const text = inputtask.value.trim();
        if (!text) {
            inputtask.focus();
            return;
        }

        const taskObj = { id: makeId(), text: text, completed: false };
        todos.unshift(taskObj);
        renderTasks();

        inputtask.value = "";
        inputtask.focus();
    }

    btn.addEventListener("click", addtodo);
    inputtask.addEventListener("keydown", function(e){
        if (e.key === "Enter"){
            addtodo();
        }
    });

    searchBtn.addEventListener("click", renderTasks);
    searchInput.addEventListener("keydown", function(e){
        if (e.key === "Enter"){
            renderTasks();
        }
    });

    clearBtn.addEventListener("click", function(){
        searchInput.value = "";
        renderTasks();
        searchInput.focus();
    });

    renderTasks();
})();