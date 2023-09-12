function display() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(addSectionDiv);
    for (var i = 0;i < sections.length;i++) {
        var val = sections[i].header;
        var tasks = sections[i].tasks;
        var newSection = document.createElement("div");
        newSection.className = "section";
        newSection.dataset.sec = i;
        var dropDownContainer = document.createElement("div");
        var tripleDot = document.createElement("img");
        tripleDot.src = "../images/dots-vertical.svg";
        tripleDot.style.width = "20px";
        tripleDot.className = "triple-dot";
        var dropDown = document.createElement("div");
        dropDown.className = "drop-down";
        dropDown.dataset.sec = i;
        var del = document.createElement("div");
        del.textContent = "Delete";
        del.addEventListener("click", (event) => {
            var secNum = event.currentTarget.parentElement.dataset.sec;
            sections.splice(secNum, 1);
            var rem = document.querySelector("[data-sec=" + CSS.escape(secNum) + "]");
            var container = rem.querySelector(".section-container");
            container.style.opacity = "0";
            rem.style.maxHeight = "0px";
            rem.style.fontSize = "0px";
            setTimeout(function() {rem.remove();}, 500);
        });
        dropDown.appendChild(del);
        dropDownContainer.appendChild(tripleDot);
        dropDownContainer.appendChild(dropDown);
        var container = document.createElement("div");
        container.className = "section-container";
        container.dataset.sec = i;
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
                    sections[parseInt(inp.parentElement.parentElement.parentElement.dataset.sec)].tasks.push(t);
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
            t.dataset.sec = i;
            t.dataset.task = x;
            t.addEventListener("mouseenter", (event) => {
                var img = event.currentTarget.querySelector("img");
                img.style.opacity = "1";
            });
            t.addEventListener("mouseleave", (event) => {
                var img = event.currentTarget.querySelector("img");
                img.style.opacity = "0";
            });
            var taskDropDownContainer = document.createElement("div");
            var taskDropDown = document.createElement("div");
            taskDropDown.className = "drop-down";
            var taskDel = document.createElement("div");
            taskDel.textContent = "Delete";
            taskDropDown.dataset.sec = i;
            taskDropDown.dataset.task = x;
            taskDel.addEventListener("click", (event) => {
                var secNum = event.currentTarget.parentElement.dataset.sec;
                var task = event.currentTarget.parentElement.dataset.task;
                sections[secNum].removeTask(task);
                var rem = document.querySelector("[data-sec=" + CSS.escape(secNum) + "][data-task=" + CSS.escape(task) + "]");
                var drop = rem.children[0];
                drop.style.display = "none";
                rem.style.maxHeight = "0px";
                rem.style.opacity = "0";
                rem.style.fontSize = "0";
                rem.style.padding = "0";
                setTimeout(function() {rem.remove();}, 700);
            });
            taskDropDown.appendChild(taskDel);
            taskDropDownContainer.appendChild(tripleDot.cloneNode("true"));
            taskDropDownContainer.appendChild(taskDropDown);
            t.appendChild(taskDropDownContainer);
            container.insertBefore(t, addTaskDiv);
        }
        content.insertBefore(newSection, addSectionDiv);
    }
}

function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const section = (head) => {
    let header = head;
    let tasks = [];
    const addTask = (t) => {tasks.push(t);};
    const removeTask = (ind) => {tasks.splice(ind, 1);};
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

document.addEventListener("click", (event) => {
    var act = document.querySelector(".active");
    if (act && act.parentElement !== event.target.parentElement && !act.contains(event.target)) {
        act.classList.remove("active");
        act.style.opacity = "0";
        if (act.parentElement.parentElement.classList.contains("task")) {
            act.style.bottom = "-" + (act.offsetHeight - convertRemToPixels(0.5) - 15) + "px";
        }
        else act.style.bottom = "-" + (act.offsetHeight - 15) + "px";
        setTimeout(function() {act.style.visibility = "hidden";}, 300);
    }
    if (event.target.classList.contains("triple-dot")) {
        var drop = event.target.parentElement.querySelector(".drop-down");
        drop.classList.add("active");
        if (drop.parentElement.parentElement.classList.contains("task")) {
            drop.style.bottom = "-" + (drop.offsetHeight - convertRemToPixels(0.5) - 15) + "px";
        }
        else drop.style.bottom = "-" + (drop.offsetHeight - 15) + "px";
        drop.style.visibility = "visible";
        if (drop.parentElement.parentElement.classList.contains("task")) {
            drop.style.bottom = "-" + (drop.offsetHeight - convertRemToPixels(0.5)) + "px";
        }
        else drop.style.bottom = "-" + (drop.offsetHeight) + "px";
        drop.style.opacity = "1";
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