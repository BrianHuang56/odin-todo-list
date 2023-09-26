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
    const headerText = document.createElement("div");
    headerText.className = "section-header-text";
    headerText.textContent = sections[secNumber].header;
    headerText.addEventListener("click", (event) => {
        const htInput = document.createElement("input");
        const ht = event.currentTarget;
        htInput.type = "text";
        const ogVal = ht.textContent;
        htInput.value = ogVal;
        const sh = ht.parentElement;
        sh.insertBefore(htInput, ht);
        ht.remove();
        htInput.select();
        event.stopPropagation();
        document.addEventListener("click", returnVal);
        htInput.addEventListener("keypress", (event) => {if (event.code == "Enter") {
            sections[newSection.dataset.sec].header = event.currentTarget.value;
            ht.textContent = event.currentTarget.value;
            htInput.remove();
            sh.insertBefore(ht, sh.firstChild);
            document.removeEventListener("click", returnVal);
        }});

        function returnVal(event) {
            if (event.target !== htInput) {
                sh.insertBefore(ht, htInput);
                htInput.remove();
                document.removeEventListener("click", returnVal);
            }
        }
    });
    sectionHeader.appendChild(headerText);
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
    addTaskDiv.addEventListener("click", () => {verifyTaskAdd(newSection.dataset.sec);});
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
    const button = dialog.querySelector("#task-submit");
    button.textContent = "Add Task";
    const taskName = dialog.querySelector("#task-name");
    const taskDue = dialog.querySelector("#task-due");
    const taskDesc = dialog.querySelector("#task-desc");
    const taskPrio = dialog.querySelector("#task-prio")
    const taskStatus = dialog.querySelector("#task-status");
    taskName.value = null;
    taskDue.value = null;
    taskDesc.value = null;
    taskPrio.value = "";
    taskStatus.value = "";
    dialog.showModal();
    button.addEventListener("click", function taskTemp(event) {
        if (taskName.validity.valueMissing) {
            taskName.setCustomValidity("Please fill out this field");
            taskName.addEventListener("input", () => {taskName.setCustomValidity("");});
            return;
        }
        if (taskPrio.value === "") {
            taskPrio.setCustomValidity("Please select a valid option");
            taskPrio.addEventListener("input", () => {taskPrio.setCustomValidity("")});
            return;
        }
        if (taskStatus.value === "") {
            taskStatus.setCustomValidity("Please select a valid option");
            taskStatus.addEventListener("input", () => {taskStatus.setCustomValidity("")});
            return;
        }
        const t = task(taskName.value, taskDue.value, taskDesc.value, taskPrio.value, taskStatus.value);
        taskName.value = null;
        taskDue.value = null;
        taskDesc.value = null;
        taskPrio.value = "";
        taskStatus.value = "";
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
        document.addEventListener("scroll", dragScroll);
        sectionHeader.style.cursor = "grabbing";
        const placeHolder = document.createElement("div");
        placeHolder.style.width = newSection.offsetWidth + "px";
        placeHolder.style.height = newSection.offsetHeight + "px";
        placeHolder.style.marginBottom = "3rem";
        placeHolder.id = "placeholder";
        const ogX = event.clientX;
        const rect = sectionHeader.getBoundingClientRect();
        const width = newSection.offsetWidth;
        newSection.classList.toggle("dragging");
        newSection.style.position = "fixed";
        newSection.parentElement.insertBefore(placeHolder, newSection.nextSibling);
        newSection.style.width = width + "px";
        newSection.style.zIndex = "200";
        const mid = rect.left + (rect.width / 2);
        const offSet = mid - ogX;
        let xPos = 0;
        let yPos = 0;
        let scroll = document.documentElement.scrollTop;
        let md = -1;

        function dragScroll() {
            yPos += document.documentElement.scrollTop - scroll;
            scroll = document.documentElement.scrollTop;
            newSection.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }

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
            }

            xPos += event.movementX;
            yPos += event.movementY;
            newSection.style.transform = `translate(${xPos}px, ${yPos}px)`;

            if (event.clientY < 50) {
                md = setInterval(function() {
                    scroll(-8);
                }, 10);
            }
    
            else if (event.clientY > (document.documentElement.clientHeight - newSection.clientHeight)) { 
                md = setInterval(function() {
                    scroll(8);
                }, 10);
            }
        }

        function closeDragMouse(event) {
            document.documentElement.style.maxHeight = null;
            const ph = document.getElementById("placeholder");
            ph.remove();
            document.removeEventListener("mouseup", closeDragMouse);
            document.removeEventListener("mousemove", dragMouse);
            document.removeEventListener("scroll", dragScroll);
            if (md !== -1) clearInterval(md);
            const currX = event.clientX + offSet;
            const currY = event.clientY;
            sectionHeader.style.cursor = "grab";
            newSection.classList.toggle("dragging");
            newSection.style.position = null;
            newSection.style.transform = null;
            newSection.style.width = null;
            newSection.style.zIndex = null;
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
    const text = document.createElement("p");
    text.className = "task-text";
    if (task.dueDate) text.innerHTML = task.name + "<br><span class=\"date\">" + task.dueDate + "</span>";
    else text.innerHTML = task.name;
    t.appendChild(text);
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
    const container = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "] > .section-container");
    const addTaskDiv = container.querySelector(".add-task");
    if (task.status === "0") t.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    else if (task.status === "1") t.style.backgroundColor = "rgba(255, 255, 0, 0.2)";
    else if (task.status === "2") t.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
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
    const taskPrio = dialog.querySelector("#task-prio");
    const taskStatus = dialog.querySelector("#task-status");
    taskName.value = t.name;
    taskDue.value = t.dueDate;
    taskDesc.value = t.desc;
    taskPrio.value = t.prio;
    taskStatus.value = t.status;
    dialog.showModal();
    button.addEventListener("click", function eTask(event) {
        if (taskName.validity.valueMissing) {
            taskName.setCustomValidity("Please fill out this field");
            taskName.addEventListener("input", function() {taskName.setCustomValidity("");});
            return;
        }
        if (taskPrio.value === "") {
            taskPrio.setCustomValidity("Please select a valid option");
            taskPrio.addEventListener("input", () => {taskPrio.setCustomValidity("")});
            return;
        }
        if (taskStatus.value === "") {
            taskStatus.setCustomValidity("Please select a valid option");
            taskStatus.addEventListener("input", () => {taskStatus.setCustomValidity("")});
            return;
        }
        const newT = task(taskName.value, taskDue.value, taskDesc.value, taskPrio.value, taskStatus.value);
        sections[secNumber].tasks[taskNumber] = newT;
        const edit = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "] > .section-container > [data-task=" + CSS.escape(taskNumber) + "]");
        if (taskDue.value) edit.querySelector("p").innerHTML =  taskName.value + "<br><span class=\"date\">" + taskDue.value + "</span>";
        else edit.querySelector("p").innerHTML = taskName.value;
        if (newT.status === "0") edit.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        else if (newT.status === "1") edit.style.backgroundColor = "rgba(255, 255, 0, 0.2)";
        else if (newT.status === "2") edit.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
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
    div.addEventListener("click", (event) => {
        input.focus();
        event.stopPropagation();
        document.addEventListener("click", () => {input.value = "";});
    });
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

const task = (n, due, d, p, s) => {
    let name = n;
    let dueDate = due;
    let desc = d;
    let prio = p;
    let status = s;
    return {name, dueDate, desc, prio, status};
}

var sections = [];
const addSectionDivs = document.getElementsByClassName("add-section");
const taskDialog = document.querySelector("#task-dialog");
const dialogBox = taskDialog.querySelector(".dialog-box");
const confirmDialog = document.querySelector("#confirmation-dialog");
const docHeader = document.querySelector("#header");
const content = document.querySelector("#content");
const footer = document.querySelector("#footer");
content.style.minHeight = document.documentElement.clientHeight - docHeader.clientHeight - footer.clientHeight - convertRemToPixels(3) + "px";

document.addEventListener("mousedown", function clickClose(event) {
    if (!dialogBox.contains(event.target)) {taskDialog.close();}
});

confirmDialog.querySelector("#confirm-cancel").addEventListener("click", () => {confirmDialog.close();});

dialogBox.querySelector("#task-cancel").addEventListener("click", (event) => {
    event.preventDefault();
    const inp = taskDialog.querySelectorAll("input, textarea");
    for (var i = 0;i < inp.length;i++) {
        inp[i].value = null;
    }
    taskDialog.close();
});

for (var i = 0;i < addSectionDivs.length;i++) {addSectionEvent(addSectionDivs[i]);}

document.addEventListener("click", (event) => {
    hideMenus(event);
    showMenus(event);
});