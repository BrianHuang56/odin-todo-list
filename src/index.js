function display() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(addSectionDiv);
    for (var i = 0;i < sections.length;i++) {
        var val = sections[i].header;
        var tasks = sections[i].tasks;
        var newSection = document.createElement("div");
        newSection.className = "section";
        newSection.id = i;
        var dropDownContainer = document.createElement("div");
        var tripleDot = document.createElement("img");
        tripleDot.src = "../images/dots-vertical.svg";
        tripleDot.style.width = "20px";
        tripleDot.className = "triple-dot";
        tripleDot.addEventListener("click", (event) => {
            var drop = event.currentTarget.parentElement.querySelector(".head-drop-down");
            drop.style.display = "block";
            drop.classList.add("active");
        });
        var headerDropDown = document.createElement("div");
        headerDropDown.className = "head-drop-down";
        var del = document.createElement("div");
        del.textContent = "Delete";
        headerDropDown.appendChild(del);
        dropDownContainer.appendChild(tripleDot);
        dropDownContainer.appendChild(headerDropDown);
        var container = document.createElement("div");
        container.className = "section-container";
        var sectionHeader = document.createElement("div");
        sectionHeader.textContent = val;
        sectionHeader.className = "section-header";
        sectionHeader.appendChild(dropDownContainer);
        sectionHeader.addEventListener("mouseenter", (event) => {
            var img = event.currentTarget.querySelector("img");
            img.style.opacity = "1";
        });
        sectionHeader.addEventListener("mouseleave", (event) => {
            var img = event.currentTarget.querySelector("img");
            img.style.opacity = "0";
        });
        var addTaskDiv = document.createElement("div");
        addTaskDiv.className = "add-task";
        addTaskDiv.innerHTML = "<img src=\"../images/plus.svg\" width=\"20px\" height=\"20px\">";
        var taskInput = document.createElement("input");
        taskInput.placeholder = "Add Task";
        taskInput.type = "text";
        taskInput.addEventListener("focusin", (event) => {event.currentTarget.parentElement.style.opacity = "1";});
        taskInput.addEventListener("focusout", (event) => {event.currentTarget.parentElement.style.opacity = "0.5";});
        taskInput.addEventListener("keydown", (event) => {
            if (event.code === "Enter") {    
                var inp = event.currentTarget;
                if (inp.value !== "") {
                    var t = task(inp.value);
                    sections[parseInt(inp.parentElement.parentElement.parentElement.id)].tasks.push(t);
                    display();
                    inp.value = "";
                    inp.blur();
                }
            }
        });
        addTaskDiv.appendChild(taskInput);
        container.appendChild(sectionHeader);
        container.appendChild(addTaskDiv);
        newSection.appendChild(container);
        for (var x = 0;x < tasks.length;x++) {
            var t = document.createElement("div");
            t.className = "task";
            t.textContent = tasks[x].name;
            t.appendChild(tripleDot.cloneNode("true"));
            t.addEventListener("mouseenter", (event) => {
                var img = event.currentTarget.querySelector("img");
                img.style.opacity = "1";
            });
            t.addEventListener("mouseleave", (event) => {
                var img = event.currentTarget.querySelector("img");
                img.style.opacity = "0";
            });
            container.insertBefore(t, addTaskDiv);
        }
        content.insertBefore(newSection, addSectionDiv);
    }
}

const section = (head) => {
    let header = head;
    let tasks = [];
    const addTask = (t) => {tasks.push(t);};
    const removeTask = (t) => {
        var ind = tasks.indexOf(t);
        if (ind !== -1) tasks.splice(ind, ind);
    };
    return {header, tasks, addTask, removeTask};
}

const task = (val) => {
    let name = val;
    let dueDate = undefined;
    const changeDueDate = (date) => {dueDate = date};
    return {name, dueDate, changeDueDate};
}

var sections = [];
const addSectionDiv = document.getElementById("add-section");
const input = document.getElementById("new-section-name");
window.addEventListener("click", () => {
    var act = document.querySelector(".active");
    if (act) {
        act.classList.remove("active");
        act.style.display = "none";
    }
});
addSectionDiv.addEventListener("click", () => {input.focus();});
input.addEventListener("focusin", () => {
    addSectionDiv.style.opacity = "1";
    addSectionDiv.style.cursor = "text";
});
input.addEventListener("focusout", () => {
    addSectionDiv.style.opacity = "0.5";
    addSectionDiv.style.cursor = "pointer";
});
input.addEventListener("keydown", (event) => {
    if (event.code === "Enter" && input.value !== "") {
        var newSection = section(input.value);
        sections.push(newSection);
        display();
        input.value = "";
        input.blur();
    }
});