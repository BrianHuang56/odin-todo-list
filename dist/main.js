(()=>{function e(e,t){if(sectionHeader=t.querySelector(".section-header"),!sectionHeader.contains(e.target)||sectionHeader===e.target){document.addEventListener("mousemove",n),document.addEventListener("mouseup",(function e(o){document.removeEventListener("mouseup",e),document.removeEventListener("mousemove",n),l=document.elementsFromPoint(o.clientX,o.clientY);for(var a=0;a<l.length;a++){if("section"===(i=l[a]).className){var c=i.parentElement;return o.clientY>s?c.insertBefore(t,i.nextSibling):c.insertBefore(t,i),t.style.transform=null,void t.classList.toggle("dragging")}if("add-section"===i.className)return(c=i.parentElement).insertBefore(t,i),t.style.transform=null,void t.classList.toggle("dragging")}var l=document.elementsFromPoint(o.clientX,o.clientY-25);for(a=0;a<l.length;a++)if("section"===(i=l[a]).className)return(c=i.parentElement).insertBefore(t,i.nextSibling),t.style.transform=null,void t.classList.toggle("dragging");for(l=document.elementsFromPoint(o.clientX,o.clientY+25),a=0;a<l.length;a++)if("section"===(i=l[a]).className||"add-section"===i.className)return(c=i.parentElement).insertBefore(t,i),t.style.transform=null,void t.classList.toggle("dragging");for(l=document.elementsFromPoint(o.clientX,o.clientY),a=0;a<l.length;a++){var i;"col"!==(i=l[a]).className||i.contains(t)||i.insertBefore(t,i.querySelector(".add-section"))}t.style.transform=null,t.classList.toggle("dragging")}));const s=e.clientY;let o=0,a=0;function n(e){t.classList.toggle("dragging"),e.preventDefault(),o+=e.movementX,a+=e.movementY,t.style.transform=`translate(${o}px, ${a}px)`}}}function t(e,t){const n=document.querySelector("#task-dialog");n.querySelector(".dialog-header").childNodes[0].nodeValue="Edit Task";const s=n.querySelector("#task-submit");s.textContent="Edit Task";const o=c[e].tasks[t],l=n.querySelector("#task-name"),i=n.querySelector("#task-due"),r=n.querySelector("#task-desc");l.value=o.name,i.value=o.dueDate,r.value=o.desc,n.showModal(),s.addEventListener("click",(function o(d){if(l.validity.valueMissing)return l.setCustomValidity("Please fill out this field"),void l.addEventListener("input",(function(){l.setCustomValidity("")}));const u=a(l.value,i.value,r.value);c[e].tasks[t]=u,document.querySelector("[data-sec="+CSS.escape(e)+"][data-task="+CSS.escape(t)+"]").childNodes[0].nodeValue=c[e].tasks[t].name,s.removeEventListener("click",o),n.close(),d.preventDefault()}))}function n(e){return e*parseFloat(getComputedStyle(document.documentElement).fontSize)}function s(n){const s=n.querySelector(".new-section-input");n.addEventListener("click",(()=>{s.focus()})),s.addEventListener("focusin",(()=>{n.style.opacity="1",n.style.cursor="text"})),s.addEventListener("focusout",(()=>{n.style.opacity="0.5",n.style.cursor="pointer"})),s.addEventListener("keydown",(n=>{if("Enter"===n.code&&""!==s.value){var l=o(s.value);c.push(l),function(n){const s=c.length-1,o=document.createElement("div");o.className="section",o.dataset.sec=s;const l=document.createElement("div"),i=document.createElement("img");i.src="../images/dots-vertical.svg",i.style.width="20px",i.className="triple-dot";const r=document.createElement("div");r.className="drop-down",r.dataset.sec=s;const d=document.createElement("div");d.textContent="Delete",d.addEventListener("click",(()=>{!function(e){const t=document.querySelector("#confirmation-dialog");t.showModal(),t.querySelector("#confirm-submit").addEventListener("click",(()=>{t.close(),setTimeout((()=>{}),150),c.splice(e,1);const n=document.querySelector("[data-sec="+CSS.escape(e)+"]");n.querySelector(".section-container").style.opacity="0",n.style.maxHeight="0px",n.style.fontSize="0px",setTimeout((function(){n.remove()}),400)}))}(s)})),r.appendChild(d),l.appendChild(i),l.appendChild(r),l.style.cursor="pointer";const u=document.createElement("div");u.className="section-container",u.dataset.sec=c.length-1;const m=document.createElement("div");m.textContent=c[s].header,m.className="section-header",m.appendChild(l),m.addEventListener("mouseenter",(e=>{e.currentTarget.querySelector("img").style.opacity="1"})),m.addEventListener("mouseleave",(e=>{e.currentTarget.querySelector("img").style.opacity="0"})),m.addEventListener("mousedown",(t=>{e(t,o)}));const v=document.createElement("div");v.className="add-task",v.innerHTML='<img src="../images/plus.svg" width="20px" height="20px">',v.addEventListener("click",(()=>{!function(e){const n=document.querySelector("#task-dialog");n.querySelector(".dialog-header").childNodes[0].nodeValue="Add Task";const s=n.querySelector("#task-submit");s.textContent="Add Task",n.showModal(),s.addEventListener("click",(function o(l){const i=n.querySelector("#task-name"),r=n.querySelector("#task-due"),d=n.querySelector("#task-desc");if(i.validity.valueMissing)return i.setCustomValidity("Please fill out this field"),void i.addEventListener("input",(function(){i.setCustomValidity("")}));const u=a(i.value,r.value,d.value);i.value=null,r.value=null,d.value=null,c[e].tasks.push(u),function(e,n){const s=c[n].tasks.length-1,o=document.createElement("div");o.className="task",o.textContent=e.name,o.dataset.sec=n,o.dataset.task=s,o.addEventListener("mouseenter",(e=>{e.currentTarget.querySelector("img").style.opacity="1"})),o.addEventListener("mouseleave",(e=>{e.currentTarget.querySelector("img").style.opacity="0"})),o.addEventListener("click",(e=>{e.target===e.currentTarget&&t(n,s)}));const a=document.createElement("div"),l=document.createElement("div");l.className="drop-down";const i=document.createElement("div");i.textContent="Delete",l.dataset.sec=n,l.dataset.task=s,i.addEventListener("click",(()=>{!function(e,t,n){const s=document.querySelector("#confirmation-dialog");s.showModal(),s.querySelector("#confirm-submit").addEventListener("click",(()=>{s.close(),setTimeout((()=>{}),150),c[t].removeTask(e);const o=document.querySelector("[data-sec="+CSS.escape(t)+"][data-task="+CSS.escape(n)+"]");o.children[0].style.display="none",o.style.maxHeight="0px",o.style.opacity="0",o.style.fontSize="0",o.style.padding="0",setTimeout((function(){o.remove()}),300)}))}(e,n,s)}));const r=document.createElement("img");r.src="../images/dots-vertical.svg",r.style.width="20px",r.className="triple-dot",l.appendChild(i),a.appendChild(r),a.appendChild(l),o.appendChild(a);const d=document.querySelector("[data-sec="+CSS.escape(n)+"] .section-container"),u=d.querySelector(".add-task");d.insertBefore(o,u)}(u,e),n.close(),s.removeEventListener("click",o),l.preventDefault()}))}(s)}));const p=document.createElement("div");p.textContent="Add Task",p.style.fontSize="14px",v.appendChild(p),u.appendChild(m),u.appendChild(v),o.appendChild(u);const y=document.querySelector("[data-col="+CSS.escape(n)+"]"),g=y.querySelector(".add-section");y.insertBefore(o,g)}(n.currentTarget.parentElement.dataset.col),s.value="",s.blur()}}))}const o=e=>{let t=[];return{header:e,tasks:t,removeTask:e=>{t.splice(e,1)}}},a=(e,t,n)=>({name:e,dueDate:t,desc:n});var c=[];const l=document.getElementsByClassName("add-section"),i=document.querySelector("#task-dialog"),r=i.querySelector(".dialog-box"),d=document.querySelector("#confirmation-dialog");document.addEventListener("mousedown",(function(e){r.contains(e.target)||i.close()})),d.querySelector("#confirm-cancel").addEventListener("click",(()=>{d.close()})),r.querySelector("#task-cancel").addEventListener("click",(e=>{e.preventDefault();const t=i.querySelectorAll("input, textarea");for(var n=0;n<t.length;n++)t[n].value=null;i.close()}));for(var u=0;u<l.length;u++)s(l[u]);document.addEventListener("click",(e=>{!function(e){var t=document.querySelector(".active");t&&t.parentElement!==e.target.parentElement&&!t.contains(e.target)&&(t.classList.remove("active"),t.style.opacity="0",t.parentElement.parentElement.classList.contains("task")?t.style.bottom="-"+(t.offsetHeight-n(.5)-15)+"px":t.style.bottom="-"+(t.offsetHeight-15)+"px",setTimeout((function(){t.style.visibility="hidden"}),300))}(e),function(e){if(e.target.classList.contains("triple-dot")){var t=e.target.parentElement.querySelector(".drop-down");t.classList.add("active"),t.parentElement.parentElement.classList.contains("task")?t.style.bottom="-"+(t.offsetHeight-n(.5)-15)+"px":t.style.bottom="-"+(t.offsetHeight-15)+"px",t.style.visibility="visible",t.parentElement.parentElement.classList.contains("task")?t.style.bottom="-"+(t.offsetHeight-n(.5))+"px":t.style.bottom="-"+t.offsetHeight+"px",t.style.opacity="1"}}(e)}))})();