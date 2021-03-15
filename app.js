window.addEventListener("load", showNote());
function darkMode(){
  let modeimage = document.getElementById("modeimage");
  // Dark Mode Element:
  let top = document.getElementById("top")
  let bottom = document.getElementById("bottom")
  let taskbar = document.getElementById("taskbar")
  let inputbar = document.getElementById("inputbar")
  let forstyles = document.getElementById("forstyles")
  let filtertwo = document.getElementById("filtertwo")
  // Animating dark mode:
  modeimage.classList.add("rotateimage");
  setTimeout(()=>{
      let imagechange = modeimage.parentElement.children[1];
      modeimage.classList.add("loweropacity")
      if(imagechange.getAttribute("src") == "images/icon-sun.svg"){
          imagechange.setAttribute("src", "images/icon-moon.svg")    
      }
      else{
          imagechange.setAttribute("src", "images/icon-sun.svg")
      }
      modeimage.classList.remove("rotateimage")
      setTimeout(()=>{
          modeimage.classList.remove("loweropacity")
      },300)
  },500)
  // Adding dark mode function
  function makeDark(id, className){
      if(id.classList.contains(className)){
          // Animating while removing class:
          top.classList.add("darktopbackground");
          bottom.classList.add("darkbottombackground")
          taskbar.classList.add("darktaskandinputbacground")
          inputbar.classList.add("darktaskandinputbacground")
          id.classList.remove(className)
          // Removing animations:
          setTimeout(()=>{
              top.classList.remove("darktopbackground");
              bottom.classList.remove("darkbottombackground")
              taskbar.classList.remove("darktaskandinputbacground")
              inputbar.classList.remove("darktaskandinputbacground")
          },300)
      }
      else{
          // Animation while adding class:
          top.classList.add("topbackground");
          bottom.classList.add("bottombackground")
          taskbar.classList.add("taskandinputbacground")
          inputbar.classList.add("taskandinputbacground")
          id.classList.add(className)
          // Removing animations:
          setTimeout(()=>{
              top.classList.remove("topbackground");
              bottom.classList.remove("bottombackground")
              taskbar.classList.remove("taskandinputbacground")
              inputbar.classList.remove("taskandinputbacground")
          },300)
      }
  }
  // Creating dark elements:
  makeDark(top, "darktop")
  makeDark(bottom, "darkbottom")
  makeDark(inputbar, "darkinputbar")
  makeDark(taskbar, "darktaskbar")
  makeDark(forstyles,"darkforstyles")
  makeDark(filtertwo, "darkfiltertwo")
}
function unDoneNotes() {
  document.getElementById("tasks").innerHTML = "";
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let note = JSON.parse(localStorage.getItem("notes"));
  for (i = 0; i < note.length; i++) {
    if (note[i] != null) {
      document.getElementById("tasks").innerHTML += `<div class="task">
      <input type="checkbox" name="" id="" onclick="completeNote(this)">
      <p>${note[i]}</p>
    </div><hr>`;
    }
  }
}
function doneNotes() {
  let doneNotes = localStorage.getItem("doneNotes");
  if (doneNotes == null) {
    doneNotesObj = [];
  } else {
    doneNotesObj = JSON.parse(doneNotes);
  }
  let doneNote = JSON.parse(localStorage.getItem("doneNotes"));
  for (let i = 0; i < doneNote.length; i++) {
    if (doneNote[i] != null) {
      document.getElementById("tasks").innerHTML += `<div class="task">
          <input type="checkbox" name="" id="" checked onclick="rewriteNote(this)">
          <p class="noteDone">${doneNote[i]}</p>
        </div><hr>`;
    }
  }
}
// Making Notes:
function showNote() {
  if(JSON.parse(localStorage.getItem("doneNotes")).length == 0 && JSON.parse(localStorage.getItem("notes")).length == 0){
    document.getElementById("tasks").innerHTML = "<h2 style='text-align:center;margin-top:10px'>ADD NOTES HERE</h2>"
  }
  else{
    unDoneNotes();
    doneNotes();
  }
}
function addNote() {
  let addTxt = document.getElementById("note");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNote()
  addTxt.value = "";
  let note = JSON.parse(localStorage.getItem("notes"));

  setTimeout(() => {
    document.getElementById("mainButton").checked = false;
  }, 300);
}
function completeNote(mainElement) {
  if (mainElement.checked == false) {
    mainElement.parentElement.children[1].classList.remove("noteDone");
  } else if (mainElement.checked == true) {
    mainElement.parentElement.classList.add("opacitymanagerone")

    let doneNotes = localStorage.getItem("doneNotes");
    if (doneNotes == null) {
      doneNotesObj = [];
    } else {
      doneNotesObj = JSON.parse(doneNotes);
    }
    let mainNote = mainElement.parentElement.children[1].innerText;
    doneNotesObj.push(mainNote);
    localStorage.setItem("doneNotes", JSON.stringify(doneNotesObj));
    let doneNote = JSON.parse(localStorage.getItem("doneNotes"));
    let localNotes = JSON.parse(localStorage.getItem("notes"));
    setTimeout(()=>{
      for (let i = 0; i < localNotes.length; i++) {
        if (mainNote == localNotes[i]) {
          localNotes.splice(i,1);
          localNotes = localNotes;
          localStorage.setItem("notes", JSON.stringify(localNotes));
          showNote();
          mainElement.parentElement.classList.remove("opacitymanagerone")
        }
      }
    },300)
  }
}
function colorChange(element, siblingone, siblingtwo) {
  element.classList.add("bluecolor");
  if (siblingone.classList.contains("bluecolor")) {
    siblingone.classList.remove("bluecolor");
  }
  if (siblingtwo.classList.contains("bluecolor")) {
    siblingtwo.classList.remove("bluecolor");
  }
}
function noteFilter2() {
  document.getElementById("tasks").innerHTML = "";
  unDoneNotes()
}
function noteFilter3() {
  document.getElementById("tasks").innerHTML = "";
  doneNotes()
}
function clearCompleted() {
  let paraElement = document.getElementsByClassName("noteDone")
  for(let i=0; i<paraElement.length;i++){
    paraElement[i].classList.add("opacitymanagerone")
    setTimeout(()=>{paraElement[i].parentElement.classList.remove("opacitymanagerone")},300)
  }
  localStorage.setItem("doneNotes", "[]");
  setTimeout(()=>{
    showNote();
  }, 300)
}
function rewriteNote(mainElement) {
  let addTxt = mainElement.parentElement.children[1].innerText;
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  let doneNotes = localStorage.getItem("doneNotes");
  if (doneNotes == null) {
    doneNotesObj = [];
  } else {
    doneNotesObj = JSON.parse(doneNotes);
  }
  let mainNote = mainElement.parentElement.children[1].innerText;
  let doneNote = JSON.parse(localStorage.getItem("doneNotes"));
  for (let i = 0; i < doneNote.length; i++) {
    if (mainNote == doneNote[i]) {
      doneNote.splice(i, 1);
      doneNote = doneNote;
      localStorage.setItem("doneNotes", JSON.stringify(doneNote));
    }
  }
  showNote();
}
setInterval(() => {
  let length = (document.getElementsByClassName("task").length) - (document.getElementsByClassName("noteDone").length);
  document.getElementById("itemsleft").innerText = `${length} items left`;
});