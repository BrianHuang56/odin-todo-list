(()=>{function e(e,t){if(sectionHeader=t.querySelector(".section-header"),!sectionHeader.contains(e.target)||sectionHeader===e.target){document.addEventListener("mousemove",n),document.addEventListener("mouseup",(function e(o){stopY=!0,document.removeEventListener("mouseup",e),document.removeEventListener("mousemove",n);const s=o.clientX+c,a=o.clientY,l=document.querySelectorAll("[data-col]"),i=l[0].getBoundingClientRect(),r=l[1].getBoundingClientRect(),d=l[2].getBoundingClientRect();var u;if(s>i.left&&s<i.left+i.width?u=l[0]:s>r.left&&s<r.left+r.width?u=l[1]:s>d.left&&s<d.left+d.width&&(u=l[2]),void 0===u)return;const m=u.children;for(var v=0;v<m.length;v++){var y=m[v].getBoundingClientRect();if(console.log(y.y),y.y>=a)return u.insertBefore(t,m[v]),void(t.style.transform=null)}const p=u.querySelector(".add-section");u.insertBefore(t,p),t.style.transform=null}));const o=e.clientX,s=sectionHeader.getBoundingClientRect(),c=s.left+s.width/2-o;let a=0,l=0;function n(e){var n=function(e){var t=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.scrollLeft||document.body.scrollLeft;o||window.scrollTo(n,t+e)};t.classList.toggle("dragging"),e.preventDefault(),a+=e.movementX,l+=e.movementY;var o=!0;e.clientY<150&&(o=!1,n(-1),l+=1),e.clientY>document.documentElement.clientHeight-150&&!(window.innerHeight+window.scrollY>=document.body.offsetHeight)&&(o=!1,n(1),l-=1),t.style.transform=`translate(${a}px, ${l}px)`}}}function t(e,t){const n=document.querySelector("#task-dialog");n.querySelector(".dialog-header").childNodes[0].nodeValue="Edit Task";const o=n.querySelector("#task-submit");o.textContent="Edit Task";const s=a[e].tasks[t],l=n.querySelector("#task-name"),i=n.querySelector("#task-due"),r=n.querySelector("#task-desc");l.value=s.name,i.value=s.dueDate,r.value=s.desc,n.showModal(),o.addEventListener("click",(function s(d){if(l.validity.valueMissing)return l.setCustomValidity("Please fill out this field"),void l.addEventListener("input",(function(){l.setCustomValidity("")}));const u=c(l.value,i.value,r.value);a[e].tasks[t]=u,document.querySelector("[data-sec="+CSS.escape(e)+"] > .section-container > [data-task="+CSS.escape(t)+"]").childNodes[0].nodeValue=a[e].tasks[t].name,o.removeEventListener("click",s),n.close(),d.preventDefault()}))}function n(e){return e*parseFloat(getComputedStyle(document.documentElement).fontSize)}function o(n){const o=n.querySelector(".new-section-input");n.addEventListener("click",(()=>{o.focus()})),o.addEventListener("focusin",(()=>{n.style.opacity="1",n.style.cursor="text"})),o.addEventListener("focusout",(()=>{n.style.opacity="0.5",n.style.cursor="pointer"})),o.addEventListener("keydown",(n=>{if("Enter"===n.code&&""!==o.value){var l=s(o.value);a.push(l),function(n){const o=a.length-1,s=document.createElement("div");s.className="section",s.dataset.sec=o;const l=document.createElement("div"),i=document.createElement("img");i.src="../images/dots-vertical.svg",i.style.width="20px",i.className="triple-dot";const r=document.createElement("div");r.className="drop-down";const d=document.createElement("div");d.textContent="Delete",d.addEventListener("click",(()=>{!function(e){const t=document.querySelector("#confirmation-dialog");t.showModal();const n=t.querySelector("#confirm-submit");n.addEventListener("click",(function o(){t.close(),setTimeout((()=>{}),150),a.splice(e,1);const s=document.querySelector("[data-sec="+CSS.escape(e)+"]");s.querySelector(".section-container").style.opacity="0",s.style.maxHeight="0px",s.style.fontSize="0px",function(e){const t=document.querySelectorAll("[data-sec]");for(var n=0;n<t.length;n++){var o=t[n];o.dataset.sec>e&&(o.dataset.sec-=1)}}(e),setTimeout((function(){s.remove()}),400),n.removeEventListener("click",o)}))}(s.dataset.sec)})),r.appendChild(d),l.appendChild(i),l.appendChild(r),l.style.cursor="pointer";const u=document.createElement("div");u.className="section-container";const m=document.createElement("div");m.textContent=a[o].header,m.className="section-header",m.appendChild(l),m.addEventListener("mouseenter",(e=>{e.currentTarget.querySelector("img").style.opacity="1"})),m.addEventListener("mouseleave",(e=>{e.currentTarget.querySelector("img").style.opacity="0"})),m.addEventListener("mousedown",(t=>{e(t,s)}));const v=document.createElement("div");v.className="add-task",v.innerHTML='<img src="../images/plus.svg" width="20px" height="20px">',v.addEventListener("click",(()=>{!function(e){const n=document.querySelector("#task-dialog");n.querySelector(".dialog-header").childNodes[0].nodeValue="Add Task";const o=n.querySelector("#task-submit");o.textContent="Add Task",n.showModal(),o.addEventListener("click",(function s(l){const i=n.querySelector("#task-name"),r=n.querySelector("#task-due"),d=n.querySelector("#task-desc");if(i.validity.valueMissing)return i.setCustomValidity("Please fill out this field"),void i.addEventListener("input",(function(){i.setCustomValidity("")}));const u=c(i.value,r.value,d.value);i.value=null,r.value=null,d.value=null,a[e].tasks.push(u),function(e,n){const o=a[n].tasks.length-1,s=document.createElement("div");s.className="task",s.textContent=e.name,s.dataset.task=o,s.addEventListener("mouseenter",(e=>{e.currentTarget.querySelector("img").style.opacity="1"})),s.addEventListener("mouseleave",(e=>{e.currentTarget.querySelector("img").style.opacity="0"})),s.addEventListener("click",(e=>{e.target===e.currentTarget&&t(n,o)}));const c=document.createElement("div"),l=document.createElement("div");l.className="drop-down";const i=document.createElement("div");i.textContent="Delete",l.dataset.task=o,i.addEventListener("click",(()=>{!function(e,t){const n=document.querySelector("#confirmation-dialog");n.showModal();const o=n.querySelector("#confirm-submit");o.addEventListener("click",(function s(){n.close(),setTimeout((()=>{}),150),a[e].tasks.splice(t,1);const c=document.querySelector("[data-sec="+CSS.escape(e)+"] > .section-container > [data-task="+CSS.escape(t)+"]");c.children[0].style.display="none",c.style.maxHeight="0px",c.style.opacity="0",c.style.fontSize="0",c.style.padding="0",function(e,t){const n=document.querySelector("[data-sec="+CSS.escape(e)+"]").querySelectorAll("[data-task]");for(var o=0;o<n.length;o++){var s=n[o];s.dataset.task>t&&(s.dataset.task-=1)}}(e,t),setTimeout((function(){c.remove()}),300),o.removeEventListener("click",s)}))}(n,s.dataset.task)}));const r=document.createElement("img");r.src="../images/dots-vertical.svg",r.style.width="20px",r.className="triple-dot",l.appendChild(i),c.appendChild(r),c.appendChild(l),s.appendChild(c);const d=document.querySelector("[data-sec="+CSS.escape(n)+"] .section-container"),u=d.querySelector(".add-task");d.insertBefore(s,u)}(u,e),n.close(),o.removeEventListener("click",s),l.preventDefault()}))}(o)}));const y=document.createElement("div");y.textContent="Add Task",y.style.fontSize="14px",v.appendChild(y),u.appendChild(m),u.appendChild(v),s.appendChild(u);const p=document.querySelector("[data-col="+CSS.escape(n)+"]"),f=p.querySelector(".add-section");p.insertBefore(s,f)}(n.currentTarget.parentElement.parentElement.dataset.col),o.value="",o.blur()}}))}const s=e=>({header:e,tasks:[]}),c=(e,t,n)=>({name:e,dueDate:t,desc:n});var a=[];const l=document.getElementsByClassName("add-section"),i=document.querySelector("#task-dialog"),r=i.querySelector(".dialog-box"),d=document.querySelector("#confirmation-dialog");document.addEventListener("mousedown",(function(e){r.contains(e.target)||i.close()})),d.querySelector("#confirm-cancel").addEventListener("click",(()=>{d.close()})),r.querySelector("#task-cancel").addEventListener("click",(e=>{e.preventDefault();const t=i.querySelectorAll("input, textarea");for(var n=0;n<t.length;n++)t[n].value=null;i.close()}));for(var u=0;u<l.length;u++)o(l[u]);document.addEventListener("click",(e=>{!function(e){var t=document.querySelector(".active");t&&t.parentElement!==e.target.parentElement&&!t.contains(e.target)&&(t.classList.remove("active"),t.style.opacity="0",t.parentElement.parentElement.classList.contains("task")?t.style.bottom="-"+(t.offsetHeight-n(.5)-15)+"px":t.style.bottom="-"+(t.offsetHeight-15)+"px",setTimeout((function(){t.style.visibility="hidden"}),300))}(e),function(e){if(e.target.classList.contains("triple-dot")){var t=e.target.parentElement.querySelector(".drop-down");t.classList.add("active"),t.parentElement.parentElement.classList.contains("task")?t.style.bottom="-"+(t.offsetHeight-n(.5)-15)+"px":t.style.bottom="-"+(t.offsetHeight-15)+"px",t.style.visibility="visible",t.parentElement.parentElement.classList.contains("task")?t.style.bottom="-"+(t.offsetHeight-n(.5))+"px":t.style.bottom="-"+t.offsetHeight+"px",t.style.opacity="1"}}(e)}))})();