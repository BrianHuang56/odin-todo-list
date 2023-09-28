function addSection(sec, secNumber, addBefore) {
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
    headerText.textContent = sec.header;
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
    sectionHeader.addEventListener("mousedown", (event) => {sectionMoving(event, newSection, secNumber);});
    const tasks = document.createElement("div");
    tasks.className = "tasks";
    const addTaskDiv = document.createElement("div");
    addTaskDiv.className = "add-task";
    addTaskDiv.innerHTML = "<img src=\"../images/plus.svg\" width=\"20px\" height=\"20px\">";
    addTaskDiv.addEventListener("click", (event) => {
        event.stopImmediatePropagation();
        verifyTaskAdd(newSection.dataset.sec);
    });
    const taskText = document.createElement("div");
    taskText.textContent = "Add Task";
    taskText.style.fontSize = "14px";
    addTaskDiv.appendChild(taskText);
    container.appendChild(sectionHeader);
    tasks.appendChild(addTaskDiv);
    container.appendChild(tasks);
    newSection.appendChild(container);
    const col = document.querySelector("[data-col=" + CSS.escape(sec.col) + "]");
    const addBeforeDiv = col.querySelector(addBefore);
    col.insertBefore(newSection, addBeforeDiv);
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
    dialog.style.transform = "scale(1)";
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
        localStorage["sections"] = JSON.stringify(sections);
        addTask(t, secNumber);
        dialog.style.transform = "scale(0.05)";
        setTimeout(() => {dialog.close();}, 200);
        button.removeEventListener("click", taskTemp);
        event.preventDefault();
    });
}

function sectionMoving(event, newSection, secNumber) {
    sectionHeader = newSection.querySelector(".section-header");
    if (!sectionHeader.contains(event.target) || sectionHeader === event.target) {
        const addSec = document.querySelector(".add-section");
        const width = newSection.offsetWidth;
        newSection.style.width = width + "px";
        newSection.style.zIndex = "200";
        newSection.classList.toggle("dragging");
        newSection.style.position = "fixed";
        document.addEventListener("mousemove", dragMouse);
        document.addEventListener("mouseup", closeDragMouse);
        document.addEventListener("scroll", dragScroll);
        sectionHeader.style.cursor = "grabbing";
        const placeHolder = document.createElement("div");
        placeHolder.style.width = newSection.offsetWidth + "px";
        placeHolder.style.height = addSec.offsetHeight + "px";
        placeHolder.id = "placeholder";
        const ogX = event.clientX;
        const rect = sectionHeader.getBoundingClientRect();
        newSection.parentElement.insertBefore(placeHolder, newSection.nextSibling);
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
            var colChange = false;
            const ogNP = sections[secNumber].numPrev;
            const ogCol = sections[secNumber].col;
            if (currX > colZero.left && currX < colZero.left + colZero.width) {
                col = cols[0];
                if (sections[secNumber].col !== "0") {
                    sections[secNumber].col = "0";
                    colChange = true;
                }
            }
            else if (currX > colOne.left && currX < colOne.left + colOne.width) {
                col = cols[1];
                if (sections[secNumber].col !== "1") {
                    sections[secNumber].col = "1";
                    colChange = true;
                }
            }
            else if (currX > colTwo.left && currX < colTwo.left + colTwo.width) {
                col = cols[2];
                if (sections[secNumber].col !== "2") {
                    sections[secNumber].col = "2";
                    colChange = true;
                }
            }
            if (col === undefined) return;
            if (colChange) {
                const children = cols[ogCol].children;
                for (var i = 0;i < children.length;i++) {
                    var sn = children[i].dataset.sec;
                    if (sn !== undefined) sections[sn].numPrev -= 1;
                }
            }
            const children = col.children;
            var inserted = false;
            for (var i = 0;i < children.length;i++) {
                var child = children[i].getBoundingClientRect();
                if (child.y >= currY && !inserted) {
                    col.insertBefore(newSection, children[i]);
                    if (children[i].id === "placeholder") sections[secNumber].numPrev = i - 1;
                    else {
                        if (children[i].dataset.sec !== undefined) sections[children[i].dataset.sec].numPrev += 1;
                        sections[secNumber].numPrev = i;
                    }
                    inserted = true;
                }
                else if (inserted) {
                    var sn = children[i].dataset.sec;
                    if (sn !== undefined) {
                        if (colChange) sections[sn].numPrev += 1;
                        else if (sections[sn].numPrev < ogNP) sections[sn].numPrev += 1;
                    }
                }
            }
            if (!inserted) {
                const addSectionDiv = col.querySelector(".add-section");
                if (colChange) sections[secNumber].numPrev = children.length - 1;
                else sections[secNumber].numPrev = children.length - 3;
                col.insertBefore(newSection, addSectionDiv);
            }
            localStorage["sections"] = JSON.stringify(sections);
        }
    }
}

function addTask(task, secNumber) {
    const taskNumber = sections[secNumber].tasks.length - 1;
    const t = document.createElement("div");
    t.className = "task";
    const text = document.createElement("p");
    const prio = document.createElement("span");
    prio.style.fontSize = "12px";
    switch (task.prio) {
        case "0": prio.innerHTML = "Top Priority";
        prio.style.color = "Red";
        prio.style.fontWeight = "Bold";
        break;
        case "1": prio.innerHTML = "High Priority";
        prio.style.color = "Red";
        break;
        case "2": prio.innerHTML = "Mid Priority";
        prio.style.color = "royalblue";
        break;
        case "3": prio.innerHTML = "Low Priority";
        prio.style.color = "Green";
        break;
        case "4": prio.innerHTML = "No Priority";
        prio.style.color = "darkgreen";
        break;
    }
    text.className = "task-text";
    if (task.dueDate) text.innerHTML = task.name + "<br><span class=\"date\">" + task.dueDate + "</span><br>" + prio.outerHTML;
    else text.innerHTML = task.name + "<br>" + prio.outerHTML;
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
        if (event.target.className !== "triple-dot") editTask(secNumber, taskNumber);
    });
    const taskDropDownContainer = document.createElement("div");
    const taskDropDown = document.createElement("div");
    taskDropDown.style.bottom = "0px";
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
    const tasks = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "] > .section-container > .tasks");
    const addTaskDiv = tasks.querySelector(".add-task");
    if (task.status === "0") t.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    else if (task.status === "1") t.style.backgroundColor = "rgba(255, 255, 0, 0.2)";
    else if (task.status === "2") t.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
    tasks.insertBefore(t, addTaskDiv);
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
    dialog.style.transform = "scale(1)";
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
        localStorage["sections"] = JSON.stringify(sections);
        const edit = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "] > .section-container > .tasks > [data-task=" + CSS.escape(taskNumber) + "]");
        const prio = document.createElement("span");
        prio.style.fontSize = "12px";
        switch (newT.prio) {
            case "0": prio.innerHTML = "Top Priority";
            prio.style.color = "Red";
            prio.style.fontWeight = "Bold";
            break;
            case "1": prio.innerHTML = "High Priority";
            prio.style.color = "Red";
            break;
            case "2": prio.innerHTML = "Mid Priority";
            prio.style.color = "royalblue";
            break;
            case "3": prio.innerHTML = "Low Priority";
            prio.style.color = "Green";
            break;
            case "4": prio.innerHTML = "No Priority";
            prio.style.color = "Green";
            break;
        }
        dialog.style.transform = "scale(0.05)";
        if (taskDue.value) edit.querySelector("p").innerHTML =  taskName.value + "<br><span class=\"date\">" + taskDue.value + "</span><br>" + prio.outerHTML;
        else edit.querySelector("p").innerHTML = taskName.value + "<br>" + prio.outerHTML;
        if (newT.status === "0") edit.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        else if (newT.status === "1") edit.style.backgroundColor = "rgba(255, 255, 0, 0.2)";
        else if (newT.status === "2") edit.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
        button.removeEventListener("click", eTask);
        setTimeout(() => {dialog.close();}, 200);
        event.preventDefault();
    });
}


function removeSection(secNumber) {
    const confirmDialog = document.querySelector("#confirmation-dialog");
    confirmDialog.showModal();
    confirmDialog.style.transform = "scale(1)";
    const submit = confirmDialog.querySelector("#confirm-submit");
    submit.addEventListener("click", function remSec() {
        confirmDialog.style.transform = "scale(0.05)";
        setTimeout(() => {confirmDialog.close();}, 200);
        setTimeout(() => {}, 150);
        const col = sections[secNumber].col;
        const np = sections[secNumber].numPrev;
        sections.splice(secNumber, 1);
        localStorage["sections"] = JSON.stringify(sections);
        const rem = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "]");
        const container = rem.querySelector(".section-container");
        container.style.opacity = "0";
        rem.style.maxHeight = "0px";
        rem.style.fontSize = "0px";
        setTimeout(() => {
            rem.remove();
            updateSections(secNumber, col, np);
        }, 400);
        submit.removeEventListener("click", remSec);
    });
}

function updateSections(secNumber, col, np) {
    const sectionsDiv = document.querySelectorAll("[data-sec]");
    for (var i = 0;i < sections.length;i++) {
        var s = sectionsDiv[i];
        if (s.dataset.sec > secNumber) {
            s.dataset.sec -= 1;
        }
        if (sections[s.dataset.sec].col === col && sections[s.dataset.sec].numPrev > np) {
            sections[s.dataset.sec].numPrev -= 1;
        }
    }
    localStorage["sections"] = JSON.stringify(sections);
}

function removeTask(secNumber, taskNumber) {
    const confirmDialog = document.querySelector("#confirmation-dialog");
    confirmDialog.showModal();
    const submit = confirmDialog.querySelector("#confirm-submit");
    submit.addEventListener("click", function remTask() {
        confirmDialog.close();
        setTimeout(() => {}, 150);
        sections[secNumber].tasks.splice(taskNumber, 1);
        const rem = document.querySelector("[data-sec=" + CSS.escape(secNumber) + "] > .section-container > .tasks > [data-task=" + CSS.escape(taskNumber) + "]");
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
    localStorage["sections"] = JSON.stringify(sections);
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
            var col = event.currentTarget.parentElement.parentElement;
            var newSection = section(input.value, col.dataset.col, col.children.length - 1);
            sections.push(newSection);
            localStorage["sections"] = JSON.stringify(sections);
            addSection(newSection, sections.length - 1, ".add-section");
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
            act.style.bottom = "0px";
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
            drop.style.bottom = "0px";
        }
        else drop.style.bottom = "-" + (drop.offsetHeight - 15) + "px";
        drop.style.visibility = "visible";
        if (drop.parentElement.parentElement.classList.contains("task")) {
            drop.style.bottom = "-15px";
        }
        else drop.style.bottom = "-" + (drop.offsetHeight) + "px";
        drop.style.opacity = "1";
    }
}

function displayStorage() {
    sections = JSON.parse(localStorage["sections"]);
    console.log(sections);
    for (var i = 0;i < sections.length;i++) {
        var sec = sections[i];
        var col = document.querySelector("[data-col=" + CSS.escape(sec.col) + "]");
        var children = col.children;
        for (var x = 0;x < children.length;x++) {
            if (children[x].dataset.sec !== undefined) {
                var sn = children[x].dataset.sec;
                if (sections[sn].numPrev > sec.numPrev) {
                    addSection(sec, i, "[data-sec=" + CSS.escape(sn) + "]");
                    break;
                }
            }
            else {
                addSection(sec, i, ".add-section");
                break;
            }
        }
        var tasks = sec.tasks;
        for (var x = 0;x < tasks.length;x++) addTask(tasks[x], i);
    }
}

const section = (head, c, np) => {
    let header = head;
    let tasks = [];
    let col = c;
    let numPrev = np;
    return {header, tasks, col, numPrev};
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

if (localStorage["sections"] !== undefined) displayStorage();

document.addEventListener("mousedown", function clickClose(event) {
    if (taskDialog.open && !dialogBox.contains(event.target)) {
        taskDialog.style.transform = "scale(0.05)";
        setTimeout(() => {taskDialog.close();}, 200);
        const btn = dialogBox.querySelector("#task-submit");
        const clone = btn.cloneNode(true);
        btn.parentElement.replaceChild(clone, btn);
    }
});

confirmDialog.querySelector("#confirm-cancel").addEventListener("click", () => {
    confirmDialog.style.transform = "scale(0.05)";
    setTimeout(() => {confirmDialog.close();}, 200);
});

dialogBox.querySelector("#task-cancel").addEventListener("click", (event) => {
    event.preventDefault();
    const inp = taskDialog.querySelectorAll("input, textarea");
    for (var i = 0;i < inp.length;i++) {
        inp[i].value = null;
    }
    taskDialog.style.transform = "scale(0.05)";
    setTimeout(() => {taskDialog.close();}, 200);
});

for (var i = 0;i < addSectionDivs.length;i++) {addSectionEvent(addSectionDivs[i]);}

document.addEventListener("click", (event) => {
    hideMenus(event);
    showMenus(event);
});