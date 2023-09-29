(()=>{function e(e,o,s){const a=document.createElement("div");a.className="section",a.dataset.sec=o;const c=document.createElement("div"),i=document.createElement("img");i.src="../images/dots-vertical.svg",i.style.width="20px",i.className="triple-dot";const d=document.createElement("div");d.className="drop-down";const u=document.createElement("div");u.textContent="Delete",u.addEventListener("click",(()=>{!function(e){const t=document.querySelector("#confirmation-dialog");t.showModal(),t.style.transform="scale(1)";const n=t.querySelector("#confirm-submit");n.addEventListener("click",(function o(){t.style.transform="scale(0.05)",setTimeout((()=>{t.close()}),200),setTimeout((()=>{}),150);const s=r[e].col,a=r[e].numPrev;r.splice(e,1),localStorage.sections=JSON.stringify(r);const l=document.querySelector("[data-sec="+CSS.escape(e)+"]");l.querySelector(".section-container").style.opacity="0",l.style.maxHeight="0px",l.style.fontSize="0px",setTimeout((()=>{l.remove(),function(e,t,n){const o=document.querySelectorAll("[data-sec]");for(var s=0;s<r.length;s++){var a=o[s];a.dataset.sec>e&&(a.dataset.sec-=1),r[a.dataset.sec].col===t&&r[a.dataset.sec].numPrev>n&&(r[a.dataset.sec].numPrev-=1)}localStorage.sections=JSON.stringify(r)}(e,s,a)}),400),n.removeEventListener("click",o)}))}(a.dataset.sec)})),d.appendChild(u),c.appendChild(i),c.appendChild(d),c.style.cursor="pointer";const m=document.createElement("div");m.className="section-container";const v=document.createElement("div"),y=document.createElement("div");y.className="section-header-text",y.textContent=e.header,y.addEventListener("click",(e=>{const t=document.createElement("input"),n=e.currentTarget;t.type="text";const o=n.textContent;t.value=o;const s=n.parentElement;function l(e){e.target!==t&&(s.insertBefore(n,t),t.remove(),document.removeEventListener("click",l))}s.insertBefore(t,n),n.remove(),t.select(),e.stopPropagation(),document.addEventListener("click",l),t.addEventListener("keypress",(e=>{"Enter"==e.code&&(r[a.dataset.sec].header=e.currentTarget.value,n.textContent=e.currentTarget.value,t.remove(),s.insertBefore(n,s.firstChild),document.removeEventListener("click",l))}))})),v.appendChild(y),v.className="section-header",v.appendChild(c),v.addEventListener("mouseenter",(e=>{e.currentTarget.querySelector("img").style.opacity="1"})),v.addEventListener("mouseleave",(e=>{e.currentTarget.querySelector("img").style.opacity="0"})),v.addEventListener("mousedown",(e=>{t(e,a,o)}));const p=document.createElement("div");p.className="tasks";const g=document.createElement("div");g.className="add-task",g.innerHTML='<img src="../images/plus.svg" width="20px" height="20px">',g.addEventListener("click",(e=>{e.stopImmediatePropagation(),function(e){const t=document.querySelector("#task-dialog");t.querySelector(".dialog-header").childNodes[0].nodeValue="Add Task";const o=t.querySelector("#task-submit");o.textContent="Add Task";const s=t.querySelector("#task-name"),a=t.querySelector("#task-due"),c=t.querySelector("#task-desc"),i=t.querySelector("#task-prio"),d=t.querySelector("#task-status");s.value=null,a.value=null,c.value=null,i.value="",d.value="",t.showModal(),t.style.transform="scale(1)",o.addEventListener("click",(function u(m){if(s.validity.valueMissing)return s.setCustomValidity("Please fill out this field"),void s.addEventListener("input",(()=>{s.setCustomValidity("")}));if(""===i.value)return i.setCustomValidity("Please select a valid option"),void i.addEventListener("input",(()=>{i.setCustomValidity("")}));if(""===d.value)return d.setCustomValidity("Please select a valid option"),void d.addEventListener("input",(()=>{d.setCustomValidity("")}));const v=l(s.value,a.value,c.value,i.value,d.value);s.value=null,a.value=null,c.value=null,i.value="",d.value="",r[e].tasks.push(v),localStorage.sections=JSON.stringify(r),n(v,e),t.style.transform="scale(0.05)",setTimeout((()=>{t.close()}),200),o.removeEventListener("click",u),m.preventDefault()}))}(a.dataset.sec)}));const f=document.createElement("div");f.textContent="Add Task",f.style.fontSize="14px",g.appendChild(f),m.appendChild(v),p.appendChild(g),m.appendChild(p),a.appendChild(m);const S=document.querySelector("[data-col="+CSS.escape(e.col)+"]"),h=S.querySelector(s);S.insertBefore(a,h)}function t(e,t,n){if(sectionHeader=t.querySelector(".section-header"),!sectionHeader.contains(e.target)||sectionHeader===e.target){document.addEventListener("mousemove",s),document.addEventListener("mouseup",(function e(a){document.documentElement.style.maxHeight=null,document.getElementById("placeholder").remove(),document.removeEventListener("mouseup",e),document.removeEventListener("mousemove",s),document.removeEventListener("scroll",o),-1!==y&&clearInterval(y);const l=a.clientX+d,c=a.clientY;sectionHeader.style.cursor="grab",t.classList.toggle("dragging"),t.style.position=null,t.style.transform=null,t.style.width=null,t.style.zIndex=null;const i=document.querySelectorAll("[data-col]"),u=i[0].getBoundingClientRect(),m=i[1].getBoundingClientRect(),v=i[2].getBoundingClientRect();var p,g=!1;const f=r[n].numPrev,S=r[n].col;if(l>u.left&&l<u.left+u.width?(p=i[0],"0"!==r[n].col&&(r[n].col="0",g=!0)):l>m.left&&l<m.left+m.width?(p=i[1],"1"!==r[n].col&&(r[n].col="1",g=!0)):l>v.left&&l<v.left+v.width&&(p=i[2],"2"!==r[n].col&&(r[n].col="2",g=!0)),void 0===p)return;if(g){const e=i[S].children;for(var h=0;h<e.length;h++)void 0!==(L=e[h].dataset.sec)&&(r[L].numPrev-=1)}const E=p.children;var k=!1;for(h=0;h<E.length;h++)if(E[h].getBoundingClientRect().y>=c&&!k)p.insertBefore(t,E[h]),"placeholder"===E[h].id?r[n].numPrev=h-1:(void 0!==E[h].dataset.sec&&(r[E[h].dataset.sec].numPrev+=1),r[n].numPrev=h),k=!0;else if(k){var L;void 0!==(L=E[h].dataset.sec)&&(g||r[L].numPrev<f)&&(r[L].numPrev+=1)}if(!k){const e=p.querySelector(".add-section");r[n].numPrev=g?E.length-1:E.length-3,p.insertBefore(t,e)}localStorage.sections=JSON.stringify(r)})),sectionHeader.style.cursor="grabbing";const a=document.createElement("div");a.style.width=t.offsetWidth+"px",a.style.height=t.offsetHeight+"px",a.style.marginBottom="3rem",a.id="placeholder";const l=e.clientX,c=sectionHeader.getBoundingClientRect(),i=t.offsetWidth;t.classList.toggle("dragging"),t.style.position="fixed",t.parentElement.insertBefore(a,t.nextSibling),t.style.width=i+"px",t.style.zIndex="200";const d=c.left+c.width/2-l;let u=0,m=document.documentElement.scrollTop,v=-document.documentElement.scrollTop,y=-1;function o(){v+=document.documentElement.scrollTop-m,m=document.documentElement.scrollTop,t.style.transform=`translate(${u}px, ${v}px)`}function s(e){-1!==y&&(clearInterval(y),y=-1),e.preventDefault();var n=function(e){var t=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.scrollLeft||document.body.scrollLeft;const o=document.documentElement;return 0===t&&e<0||Math.abs(o.scrollHeight-o.scrollTop-o.clientHeight)<=1&&e>0?(clearInterval(y),void(y=-1)):void window.scrollTo(n,t+e)};u+=e.movementX,v+=e.movementY,t.style.transform=`translate(${u}px, ${v}px)`,e.clientY<50?y=setInterval((function(){n(-8)}),10):e.clientY>document.documentElement.clientHeight-t.clientHeight&&(y=setInterval((function(){n(8)}),10))}t.style.transform=`translate(${u}px, ${v}px)`}}function n(e,t){const n=r[t].tasks.length-1,s=document.createElement("div");s.className="task";const a=document.createElement("p"),l=document.createElement("span");switch(l.style.fontSize="12px",e.prio){case"0":l.innerHTML="Top Priority",l.style.color="Red",l.style.fontWeight="Bold";break;case"1":l.innerHTML="High Priority",l.style.color="Red";break;case"2":l.innerHTML="Mid Priority",l.style.color="royalblue";break;case"3":l.innerHTML="Low Priority",l.style.color="Green";break;case"4":l.innerHTML="No Priority",l.style.color="darkgreen"}a.className="task-text",e.dueDate?a.innerHTML=e.name+'<br><span class="date">'+e.dueDate+"</span><br>"+l.outerHTML:a.innerHTML=e.name+"<br>"+l.outerHTML,s.appendChild(a),s.dataset.task=n,s.addEventListener("mouseenter",(e=>{e.currentTarget.querySelector("img").style.opacity="1"})),s.addEventListener("mouseleave",(e=>{e.currentTarget.querySelector("img").style.opacity="0"})),s.addEventListener("click",(e=>{"triple-dot"!==e.target.className&&o(t,n)}));const c=document.createElement("div"),i=document.createElement("div");i.style.bottom="0px",i.className="drop-down";const d=document.createElement("div");d.textContent="Delete",i.dataset.task=n,d.addEventListener("click",(()=>{!function(e,t){const n=document.querySelector("#confirmation-dialog");n.showModal();const o=n.querySelector("#confirm-submit");o.addEventListener("click",(function s(){n.close(),setTimeout((()=>{}),150),r[e].tasks.splice(t,1);const a=document.querySelector("[data-sec="+CSS.escape(e)+"] > .section-container > .tasks > [data-task="+CSS.escape(t)+"]");a.children[0].style.display="none",a.style.maxHeight="0px",a.style.opacity="0",a.style.fontSize="0",a.style.padding="0",function(e,t){const n=document.querySelector("[data-sec="+CSS.escape(e)+"]").querySelectorAll("[data-task]");for(var o=0;o<n.length;o++){var s=n[o];s.dataset.task>t&&(s.dataset.task-=1)}localStorage.sections=JSON.stringify(r)}(e,t),setTimeout((function(){a.remove()}),300),o.removeEventListener("click",s)}))}(t,s.dataset.task)}));const u=document.createElement("img");u.src="../images/dots-vertical.svg",u.style.width="20px",u.className="triple-dot",i.appendChild(d),c.appendChild(u),c.appendChild(i),s.appendChild(c);const m=document.querySelector("[data-sec="+CSS.escape(t)+"] > .section-container > .tasks"),v=m.querySelector(".add-task");"0"===e.status?s.style.backgroundColor="rgba(255, 0, 0, 0.2)":"1"===e.status?s.style.backgroundColor="rgba(255, 255, 0, 0.2)":"2"===e.status&&(s.style.backgroundColor="rgba(0, 255, 0, 0.2)"),m.insertBefore(s,v)}function o(e,t){const n=document.querySelector("#task-dialog");n.querySelector(".dialog-header").childNodes[0].nodeValue="Edit Task";const o=n.querySelector("#task-submit");o.textContent="Edit Task";const s=r[e].tasks[t],a=n.querySelector("#task-name"),c=n.querySelector("#task-due"),i=n.querySelector("#task-desc"),d=n.querySelector("#task-prio"),u=n.querySelector("#task-status");a.value=s.name,c.value=s.dueDate,i.value=s.desc,d.value=s.prio,u.value=s.status,n.showModal(),n.style.transform="scale(1)",o.addEventListener("click",(function s(m){if(a.validity.valueMissing)return a.setCustomValidity("Please fill out this field"),void a.addEventListener("input",(function(){a.setCustomValidity("")}));if(""===d.value)return d.setCustomValidity("Please select a valid option"),void d.addEventListener("input",(()=>{d.setCustomValidity("")}));if(""===u.value)return u.setCustomValidity("Please select a valid option"),void u.addEventListener("input",(()=>{u.setCustomValidity("")}));const v=l(a.value,c.value,i.value,d.value,u.value);r[e].tasks[t]=v,localStorage.sections=JSON.stringify(r);const y=document.querySelector("[data-sec="+CSS.escape(e)+"] > .section-container > .tasks > [data-task="+CSS.escape(t)+"]"),p=document.createElement("span");switch(p.style.fontSize="12px",v.prio){case"0":p.innerHTML="Top Priority",p.style.color="Red",p.style.fontWeight="Bold";break;case"1":p.innerHTML="High Priority",p.style.color="Red";break;case"2":p.innerHTML="Mid Priority",p.style.color="royalblue";break;case"3":p.innerHTML="Low Priority",p.style.color="Green";break;case"4":p.innerHTML="No Priority",p.style.color="Green"}n.style.transform="scale(0.05)",c.value?y.querySelector("p").innerHTML=a.value+'<br><span class="date">'+c.value+"</span><br>"+p.outerHTML:y.querySelector("p").innerHTML=a.value+"<br>"+p.outerHTML,"0"===v.status?y.style.backgroundColor="rgba(255, 0, 0, 0.2)":"1"===v.status?y.style.backgroundColor="rgba(255, 255, 0, 0.2)":"2"===v.status&&(y.style.backgroundColor="rgba(0, 255, 0, 0.2)"),o.removeEventListener("click",s),setTimeout((()=>{n.close()}),200),m.preventDefault()}))}function s(t){const n=t.querySelector(".new-section-input");t.addEventListener("click",(e=>{n.focus(),e.stopPropagation(),document.addEventListener("click",(()=>{n.value=""}))})),n.addEventListener("focusin",(()=>{t.style.opacity="1",t.style.cursor="text"})),n.addEventListener("focusout",(()=>{t.style.opacity="0.5",t.style.cursor="pointer"})),n.addEventListener("keydown",(t=>{if("Enter"===t.code&&""!==n.value){var o=t.currentTarget.parentElement.parentElement,s=a(n.value,o.dataset.col,o.children.length-1);r.push(s),localStorage.sections=JSON.stringify(r),e(s,r.length-1,".add-section"),n.value="",n.blur()}}))}const a=(e,t,n)=>({header:e,tasks:[],col:t,numPrev:n}),l=(e,t,n,o,s)=>({name:e,dueDate:t,desc:n,prio:o,status:s});var r=[];const c=document.getElementsByClassName("add-section"),i=document.querySelector("#task-dialog"),d=i.querySelector(".dialog-box"),u=document.querySelector("#confirmation-dialog"),m=document.querySelector("#header"),v=document.querySelector("#content"),y=document.querySelector("#footer");v.style.minHeight=document.documentElement.clientHeight-m.clientHeight-y.clientHeight-3*parseFloat(getComputedStyle(document.documentElement).fontSize)+"px",void 0!==localStorage.sections&&function(){r=JSON.parse(localStorage.sections),console.log(r);for(var t=0;t<r.length;t++){for(var o=r[t],s=document.querySelector("[data-col="+CSS.escape(o.col)+"]").children,a=0;a<s.length;a++){if(void 0===s[a].dataset.sec){e(o,t,".add-section");break}var l=s[a].dataset.sec;if(r[l].numPrev>o.numPrev){e(o,t,"[data-sec="+CSS.escape(l)+"]");break}}var c=o.tasks;for(a=0;a<c.length;a++)n(c[a],t)}}(),document.addEventListener("mousedown",(function(e){if(i.open&&!d.contains(e.target)){i.style.transform="scale(0.05)",setTimeout((()=>{i.close()}),200);const e=d.querySelector("#task-submit"),t=e.cloneNode(!0);e.parentElement.replaceChild(t,e)}})),u.querySelector("#confirm-cancel").addEventListener("click",(()=>{u.style.transform="scale(0.05)",setTimeout((()=>{u.close()}),200)})),d.querySelector("#task-cancel").addEventListener("click",(e=>{e.preventDefault();const t=i.querySelectorAll("input, textarea");for(var n=0;n<t.length;n++)t[n].value=null;i.style.transform="scale(0.05)",setTimeout((()=>{i.close()}),200)}));for(var p=0;p<c.length;p++)s(c[p]);document.addEventListener("click",(e=>{!function(e){var t=document.querySelector(".active");t&&t.parentElement!==e.target.parentElement&&!t.contains(e.target)&&(t.classList.remove("active"),t.style.opacity="0",t.parentElement.parentElement.classList.contains("task")?t.style.bottom="0px":t.style.bottom="-"+(t.offsetHeight-15)+"px",setTimeout((function(){t.style.visibility="hidden"}),300))}(e),function(e){if(e.target.classList.contains("triple-dot")){var t=e.target.parentElement.querySelector(".drop-down");t.classList.add("active"),t.parentElement.parentElement.classList.contains("task")?t.style.bottom="0px":t.style.bottom="-"+(t.offsetHeight-15)+"px",t.style.visibility="visible",t.parentElement.parentElement.classList.contains("task")?t.style.bottom="-15px":t.style.bottom="-"+t.offsetHeight+"px",t.style.opacity="1"}}(e)}))})();