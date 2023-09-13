function display() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(addSectionDiv);
    for (var i = 0;i < sections.length;i++) {
        var val = sections[i].header;
        var tasks = sections[i].tasks;
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
                setTimeout(function() {rem.remove();}, 300);
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
function addSection() {
    const secNumber = sections.length - 1;
    const newSection = document.createElement("div");
    newSection.className = "section";
    newSection.dataset.sec = secNumber;
    const dropDownContainer = document.createElement("div");
    const tripleDot = document.createElement("img");
    tripleDot.src = "../images/dots-vertical.svg";
    tripleDot.style.width = "20px";
    tripleDot.className = "triple-dot";
    const dropDown = document.createElement("div");
    dropDown.className = "drop-down";
    dropDown.dataset.sec = secNumber;
    const del = document.createElement("div");
    del.textContent = "Delete";
    del.addEventListener("click", (event) => {
        const secNum = event.currentTarget.parentElement.dataset.sec;
        sections.splice(secNum, 1);
        const rem = document.querySelector("[data-sec=" + CSS.escape(secNum) + "]");
        const container = rem.querySelector(".section-container");
        container.style.opacity = "0";
        rem.style.maxHeight = "0px";
        rem.style.fontSize = "0px";
        setTimeout(function() {rem.remove();}, 300);
    });
    dropDown.appendChild(del);
    dropDownContainer.appendChild(tripleDot);
    dropDownContainer.appendChild(dropDown);
    const container = document.createElement("div");
    container.className = "section-container";
    container.dataset.sec = sections.length - 1;
    const sectionHeader = document.createElement("div");
    sectionHeader.textContent = sections[secNumber].header;
    sectionHeader.className = "section-header";
    sectionHeader.appendChild(dropDownContainer);
    sectionHeader.addEventListener("mouseenter", (event) => {
        const img = event.currentTarget.querySelector("img");
        img.style.opacity = "1";
    });
    sectionHeader.addEventListener("mouseleave", (event) => {
        const img = event.currentTarget.querySelector("img");
        img.style.opacity = "0";
    });
    const addTaskDiv = document.createElement("div");
    addTaskDiv.className = "add-task";
    addTaskDiv.innerHTML = "<img src=\"../images/plus.svg\" width=\"20px\" height=\"20px\">";
    const taskInput = document.createElement("input");
    taskInput.placeholder = "Add Task";
    taskInput.type = "text";
    taskInput.addEventListener("focusin", (event) => {event.currentTarget.parentElement.style.opacity = "1";});
    taskInput.addEventListener("focusout", (event) => {event.currentTarget.parentElement.style.opacity = "0.5";});
    taskInput.addEventListener("keydown", (event) => {
        if (event.code === "Enter") {    
            const inp = event.currentTarget;
            if (inp.value !== "") {
                const t = task(inp.value);
                sections[secNumber].tasks.push(t);
                addTask(t, secNumber);
                inp.value = "";
                inp.blur();
            }
        }
    });
    addTaskDiv.appendChild(taskInput);
    container.appendChild(sectionHeader);
    container.appendChild(addTaskDiv);
    newSection.appendChild(container);
    const addSec = document.getElementById("add-section");
    const toAdd = addSec.parentElement;
    toAdd.appendChild(newSection);
    const colNum = parseInt(toAdd.dataset.col) + 1;
    var col;
    if (colNum === 3) col = document.querySelector("[data-col=" + CSS.escape(0) + "]");
    else col = document.querySelector("[data-col=" + CSS.escape(colNum) + "]");
    col.appendChild(addSec);
}

function addTask(task, secNumber) {
    const taskNumber = sections[secNumber].tasks.length - 1;
    const t = document.createElement("div");
    t.className = "task";
    t.textContent = task.name;
    t.dataset.sec = secNumber;
    t.dataset.task = taskNumber;
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
    taskDropDown.dataset.sec = secNumber;
    taskDropDown.dataset.task = taskNumber;
    taskDel.addEventListener("click", () => {
        var secNum = secNumber;
        var task = taskNumber;
        sections[secNum].removeTask(task);
        var rem = document.querySelector("[data-sec=" + CSS.escape(secNum) + "][data-task=" + CSS.escape(task) + "]");
        var drop = rem.children[0];
        drop.style.display = "none";
        rem.style.maxHeight = "0px";
        rem.style.opacity = "0";
        rem.style.fontSize = "0";
        rem.style.padding = "0";
        setTimeout(function() {rem.remove();}, 300);
    });
    const tripleDot = document.createElement("img");
    tripleDot.src = "../images/dots-vertical.svg";
    tripleDot.style.width = "20px";
    tripleDot.className = "triple-dot";
    taskDropDown.appendChild(taskDel);
    taskDropDownContainer.appendChild(tripleDot);
    taskDropDownContainer.appendChild(taskDropDown);
    t.appendChild(taskDropDownContainer);
    const container = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "] .section-container");
    const addTaskDiv = container.querySelector(".add-task");
    container.insertBefore(t, addTaskDiv);
}

function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const section = (head) => {
    let header = head;
    let tasks = [];
    const removeTask = (ind) => {tasks.splice(ind, 1);};
    return {header, tasks, removeTask};
}

const task = (val) => {
    let name = val;
    let dueDate = undefined;
    let desc = "";
    return {name, dueDate, desc};
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
        addSection();
        input.value = "";
        input.blur();
    }
});