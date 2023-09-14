function addSection(colNum) {
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
    del.addEventListener("click", () => {removeSection(secNumber);});
    dropDown.appendChild(del);
    dropDownContainer.appendChild(tripleDot);
    dropDownContainer.appendChild(dropDown);
    dropDownContainer.style.cursor = "pointer";
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
    sectionHeader.addEventListener("mousedown", (event) => {sectionMoving(event, newSection);});
    const addTaskDiv = document.createElement("div");
    addTaskDiv.className = "add-task";
    addTaskDiv.innerHTML = "<img src=\"../images/plus.svg\" width=\"20px\" height=\"20px\">";
    addTaskDiv.addEventListener("click", () => {verifyTaskAdd(secNumber);});
    const taskText = document.createElement("div");
    taskText.textContent = "Add Task";
    taskText.style.fontSize = "14px";
    addTaskDiv.appendChild(taskText);
    container.appendChild(sectionHeader);
    container.appendChild(addTaskDiv);
    newSection.appendChild(container);
    const col = document.querySelector("[data-col=" + CSS.escape(colNum) + "]");
    const addSec = col.querySelector(".add-section");
    col.insertBefore(newSection, addSec);
}

function verifyTaskAdd(secNumber) {
    const dialog = document.querySelector("#task-dialog");
    dialog.querySelector(".dialog-header").childNodes[0].nodeValue = "Add Task";
    const button = dialog.querySelector("#task-submit")
    button.textContent = "Add Task";
    dialog.showModal();
    button.addEventListener("click", function taskTemp(event) {
        const taskName = dialog.querySelector("#task-name");
        const taskDue = dialog.querySelector("#task-due");
        const taskDesc = dialog.querySelector("#task-desc");
        if (taskName.validity.valueMissing) {
            taskName.setCustomValidity("Please fill out this field");
            taskName.addEventListener("input", function() {taskName.setCustomValidity("");});
            return;
        }
        const t = task(taskName.value, taskDue.value, taskDesc.value);
        taskName.value = null;
        taskDue.value = null;
        taskDesc.value = null;
        sections[secNumber].tasks.push(t);
        addTask(t, secNumber);
        dialog.close();
        button.removeEventListener("click", taskTemp);
        event.preventDefault();
    });
}

//Not very happy with how this currently works, will return to
function sectionMoving(event, newSection) {
    sectionHeader = newSection.querySelector(".section-header");
    if (!sectionHeader.contains(event.target) || sectionHeader === event.target) {
        document.addEventListener("mousemove", dragMouse);
        document.addEventListener("mouseup", closeDragMouse);
        const ogY = event.clientY;
        let xPos = 0;
        let yPos = 0;

        function dragMouse(event) {
            newSection.classList.toggle("dragging");
            event.preventDefault();
            xPos += event.movementX;
            yPos += event.movementY;
            newSection.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }

        function closeDragMouse(event) {
            document.removeEventListener("mouseup", closeDragMouse);
            document.removeEventListener("mousemove", dragMouse);
            elements = document.elementsFromPoint(event.clientX, event.clientY);
            for (var i = 0;i < elements.length;i++) {
                var elem = elements[i];
                if (elem.className === "section") {
                    var col = elem.parentElement;
                    if (event.clientY > ogY) col.insertBefore(newSection, elem.nextSibling);
                    else col.insertBefore(newSection, elem);
                    newSection.style.transform = null;
                    newSection.classList.toggle("dragging");
                    return;
                }
                if (elem.className === "add-section") {
                    var col = elem.parentElement;
                    col.insertBefore(newSection, elem);
                    newSection.style.transform = null;
                    newSection.classList.toggle("dragging");
                    return;
                }
            }
            var elements = document.elementsFromPoint(event.clientX, event.clientY - 25);
            for (var i = 0;i < elements.length;i++) {
                var elem = elements[i];
                if (elem.className === "section") {
                    var col = elem.parentElement;
                    col.insertBefore(newSection, elem.nextSibling);
                    newSection.style.transform = null;
                    newSection.classList.toggle("dragging");
                    return;
                }
            }
            elements = document.elementsFromPoint(event.clientX, event.clientY + 25);
            for (var i = 0;i < elements.length;i++) {
                var elem = elements[i];
                if (elem.className === "section" || elem.className === "add-section") {
                    var col = elem.parentElement;
                    col.insertBefore(newSection, elem);
                    newSection.style.transform = null;
                    newSection.classList.toggle("dragging");
                    return;
                }
            }
            elements = document.elementsFromPoint(event.clientX, event.clientY);
            for (var i = 0;i < elements.length;i++) {
                var elem = elements[i];
                if (elem.className === "col" && !elem.contains(newSection)) {
                    elem.insertBefore(newSection, elem.querySelector(".add-section"));
                }
            }
            newSection.style.transform = null;
            newSection.classList.toggle("dragging");
        }
    }
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
    t.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) editTask(secNumber, taskNumber);
    });
    const taskDropDownContainer = document.createElement("div");
    const taskDropDown = document.createElement("div");
    taskDropDown.className = "drop-down";
    const taskDel = document.createElement("div");
    taskDel.textContent = "Delete";
    taskDropDown.dataset.sec = secNumber;
    taskDropDown.dataset.task = taskNumber;
    taskDel.addEventListener("click", () => {removeTask(task, secNumber, taskNumber);});
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

function editTask(secNumber, taskNumber) {
    const dialog = document.querySelector("#task-dialog");
    dialog.querySelector(".dialog-header").childNodes[0].nodeValue = "Edit Task";
    const button = dialog.querySelector("#task-submit")
    button.textContent = "Edit Task";
    const t = sections[secNumber].tasks[taskNumber];
    const taskName = dialog.querySelector("#task-name");
    const taskDue = dialog.querySelector("#task-due");
    const taskDesc = dialog.querySelector("#task-desc");
    taskName.value = t.name;
    taskDue.value = t.dueDate;
    taskDesc.value = t.desc;
    dialog.showModal();
    button.addEventListener("click", function eTask(event) {
        if (taskName.validity.valueMissing) {
            taskName.setCustomValidity("Please fill out this field");
            taskName.addEventListener("input", function() {taskName.setCustomValidity("");});
            return;
        }
        const newT = task(taskName.value, taskDue.value, taskDesc.value);
        sections[secNumber].tasks[taskNumber] = newT;
        const edit = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "][data-task=" + CSS.escape(taskNumber) + "]").childNodes[0];
        edit.nodeValue = sections[secNumber].tasks[taskNumber].name;
        button.removeEventListener("click", eTask);
        dialog.close();
        event.preventDefault();
    });
}


function removeSection(secNumber) {
    const confirmDialog = document.querySelector("#confirmation-dialog");
    confirmDialog.showModal();
    const submit = confirmDialog.querySelector("#confirm-submit");
    submit.addEventListener("click", () => {
        confirmDialog.close();
        setTimeout(() => {}, 150);
        sections.splice(secNumber, 1);
        const rem = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "]");
        const container = rem.querySelector(".section-container");
        container.style.opacity = "0";
        rem.style.maxHeight = "0px";
        rem.style.fontSize = "0px";
        setTimeout(function() {rem.remove();}, 400);
    })
}

function removeTask(task, secNumber, taskNumber) {
    const confirmDialog = document.querySelector("#confirmation-dialog");
    confirmDialog.showModal();
    const submit = confirmDialog.querySelector("#confirm-submit");
    submit.addEventListener("click", () => {
        confirmDialog.close();
        setTimeout(() => {}, 150);
        sections[secNumber].removeTask(task);
        const rem = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "][data-task=" + CSS.escape(taskNumber) + "]");
        const drop = rem.children[0];
        drop.style.display = "none";
        rem.style.maxHeight = "0px";
        rem.style.opacity = "0";
        rem.style.fontSize = "0";
        rem.style.padding = "0";
        setTimeout(function() {rem.remove();}, 300);
    });
}

function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function addSectionEvent(div) {
    const input = div.querySelector(".new-section-input");
    div.addEventListener("click", () => {input.focus();});
    input.addEventListener("focusin", () => {
        div.style.opacity = "1";
        div.style.cursor = "text";
    });
    input.addEventListener("focusout", () => {
        div.style.opacity = "0.5";
        div.style.cursor = "pointer";
    });
    input.addEventListener("keydown", (event) => {
        if (event.code === "Enter" && input.value !== "") {
            var newSection = section(input.value);
            sections.push(newSection);
            addSection(event.currentTarget.parentElement.dataset.col);
            input.value = "";
            input.blur();
        }
    });
}

function hideMenus(event) {
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
}

function showMenus(event) {
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
}

const section = (head) => {
    let header = head;
    let tasks = [];
    const removeTask = (ind) => {tasks.splice(ind, 1);};
    return {header, tasks, removeTask};
}

const task = (n, due, d) => {
    let name = n;
    let dueDate = due;
    let desc = d;
    return {name, dueDate, desc};
}

var sections = [];
const addSectionDivs = document.getElementsByClassName("add-section");
const taskDialog = document.querySelector("#task-dialog");
const dialogBox = taskDialog.querySelector(".dialog-box");
const confirmDialog = document.querySelector("#confirmation-dialog");

document.addEventListener("mousedown", function clickClose(event) {
    if (!dialogBox.contains(event.target)) {
        taskDialog.close();
    }
});

confirmDialog.querySelector("#confirm-cancel").addEventListener("click", () => {
    confirmDialog.close();
});

dialogBox.querySelector("#task-cancel").addEventListener("click", (event) => {
    event.preventDefault();
    const inp = taskDialog.querySelectorAll("input, textarea");
    for (var i = 0;i < inp.length;i++) {
        inp[i].value = null;
    }
    taskDialog.close();
});

for (var i = 0;i < addSectionDivs.length;i++) {
    addSectionEvent(addSectionDivs[i]);
}

document.addEventListener("click", (event) => {
    hideMenus(event);
    showMenus(event);
});