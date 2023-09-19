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
    const del = document.createElement("div");
    del.textContent = "Delete";
    del.addEventListener("click", () => {removeSection(newSection.dataset.sec);});
    dropDown.appendChild(del);
    dropDownContainer.appendChild(tripleDot);
    dropDownContainer.appendChild(dropDown);
    dropDownContainer.style.cursor = "pointer";
    const container = document.createElement("div");
    container.className = "section-container";
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

function sectionMoving(event, newSection) {
    sectionHeader = newSection.querySelector(".section-header");
    if (!sectionHeader.contains(event.target) || sectionHeader === event.target) {
        document.addEventListener("mousemove", dragMouse);
        document.addEventListener("mouseup", closeDragMouse);
        const ogX = event.clientX;
        const rect = sectionHeader.getBoundingClientRect();
        const width = newSection.offsetWidth;
        newSection.classList.toggle("dragging");
        newSection.style.position = "absolute";
        newSection.style.width = width + "px";
        const mid = rect.left + (rect.width / 2);
        const offSet = mid - ogX;
        let xPos = 0;
        let yPos = 0;
        let md = -1;

        function dragMouse(event) {
            if (md !== -1) {
                clearInterval(md);
                md = -1;
            }
            event.preventDefault();

            var scroll = function (stepY) {
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                const html = document.documentElement;
                if (scrollY === 0 && stepY < 0) {
                    clearInterval(md);
                    md = -1;
                    return;
                }
                if (Math.abs(html.scrollHeight - html.scrollTop - html.clientHeight) <= 1  && stepY > 0) {
                    clearInterval(md);
                    md = -1;
                    return;
                }
                window.scrollTo((scrollX), (scrollY + stepY));
                yPos += stepY;
                newSection.style.transform = `translate(${xPos}px, ${(yPos)}px)`;
            }

            xPos += event.movementX;
            newSection.style.transform = `translate(${xPos}px, ${yPos}px)`;

            if (event.clientY < 75) {
                md = setInterval(function() {
                    scroll(-4);
                }, 10);
            }
    
            else if (event.clientY > (document.documentElement.clientHeight - newSection.clientHeight)) { 
                md = setInterval(function() {
                    scroll(4);
                }, 10);
            }
            else {
                yPos += event.movementY;
                newSection.style.transform = `translate(${xPos}px, ${yPos}px)`;
            }
        }

        function closeDragMouse(event) {
            document.removeEventListener("mouseup", closeDragMouse);
            document.removeEventListener("mousemove", dragMouse);
            if (md !== -1) clearInterval(md);
            const currX = event.clientX + offSet;
            const currY = event.clientY;
            newSection.classList.toggle("dragging");
            newSection.style.position = null;
            newSection.style.transform = null;
            newSection.style.width = null;
            const cols = document.querySelectorAll("[data-col]");
            const colZero = cols[0].getBoundingClientRect();
            const colOne = cols[1].getBoundingClientRect();
            const colTwo = cols[2].getBoundingClientRect();
            var col;
            if (currX > colZero.left && currX < colZero.left + colZero.width) col = cols[0];
            else if (currX > colOne.left && currX < colOne.left + colOne.width) col = cols[1];
            else if (currX > colTwo.left && currX < colTwo.left + colTwo.width) col = cols[2];
            if (col === undefined) return;
            const children = col.children;
            for (var i = 0;i < children.length;i++) {
                var child = children[i].getBoundingClientRect();
                if (child.y >= currY) {
                    col.insertBefore(newSection, children[i]);
                    return;
                }
            }
            const addSectionDiv = col.querySelector(".add-section");
            col.insertBefore(newSection, addSectionDiv);
        }
    }
}

function addTask(task, secNumber) {
    const taskNumber = sections[secNumber].tasks.length - 1;
    const t = document.createElement("div");
    t.className = "task";
    t.textContent = task.name;
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
    taskDropDown.dataset.task = taskNumber;
    taskDel.addEventListener("click", () => {removeTask(secNumber, t.dataset.task);});
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
        const edit = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "] > .section-container > [data-task=" + CSS.escape(taskNumber) + "]").childNodes[0];
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
    submit.addEventListener("click", function remSec() {
        confirmDialog.close();
        setTimeout(() => {}, 150);
        sections.splice(secNumber, 1);
        const rem = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "]");
        const container = rem.querySelector(".section-container");
        container.style.opacity = "0";
        rem.style.maxHeight = "0px";
        rem.style.fontSize = "0px";
        updateSections(secNumber);
        setTimeout(function() {rem.remove();}, 400);
        submit.removeEventListener("click", remSec);
    });
}

function updateSections(secNumber) {
    const sections = document.querySelectorAll("[data-sec]");
    for (var i = 0;i < sections.length;i++) {
        var s = sections[i];
        if (s.dataset.sec > secNumber) {
            s.dataset.sec -= 1;
        }
    }
}

function removeTask(secNumber, taskNumber) {
    const confirmDialog = document.querySelector("#confirmation-dialog");
    confirmDialog.showModal();
    const submit = confirmDialog.querySelector("#confirm-submit");
    submit.addEventListener("click", function remTask() {
        confirmDialog.close();
        setTimeout(() => {}, 150);
        sections[secNumber].tasks.splice(taskNumber, 1);
        const rem = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "] > .section-container > [data-task=" + CSS.escape(taskNumber) + "]");
        const drop = rem.children[0];
        drop.style.display = "none";
        rem.style.maxHeight = "0px";
        rem.style.opacity = "0";
        rem.style.fontSize = "0";
        rem.style.padding = "0";
        updateTasks(secNumber, taskNumber);
        setTimeout(function() {rem.remove();}, 300);
        submit.removeEventListener("click", remTask);
    });
}

function updateTasks(secNumber, taskNumber) {
    const section = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "]");
    const tasks = section.querySelectorAll("[data-task]");
    for (var i = 0;i < tasks.length;i++) {
        var t = tasks[i];
        if (t.dataset.task > taskNumber) {  
            t.dataset.task -= 1;
        }
    }
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
            addSection(event.currentTarget.parentElement.parentElement.dataset.col);
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
    return {header, tasks};
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