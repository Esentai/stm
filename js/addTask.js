let users = JSON.parse(localStorage.getItem("users"));
let currentUser;
let userId;
let userCheck = false;
if (users != null) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].session) {
      userId = i;
      currentUser = users[i];
      userCheck = true;
    }
  }
} else {
  document.location.href = 'login.html'
}
if (!userCheck) {
  document.location.href = 'login.html'
}
if (!currentUser.teamLeader.admin) {
  document.location.href = 'index.html'
}

document.getElementById("course").value = currentUser.course;
document.getElementById("specialty").value = currentUser.specialty.name_en
document.getElementById("group").value = currentUser.group.name_en

console.log(currentUser)
// today()
// function today() {
//   //2018-06-12T19:30
//   let date = new Date()
//   let year = date.getFullYear();
//   let month = date.getMonth();
//   let day = date.getDay();
//   let hours = date.getHours();
//   let minutes = date.getMinutes();
//   let str = `${year}-${month}-${day}T${hours}:${minutes}`;
//   console.log(str)
//   document.getElementById("time").value = str;

// }



function addTask() {
  let check = true
  let subname = document.getElementById("subname");
  let tname = document.getElementById("tname");
  var date = new Date(document.getElementById("time").value)
  if (subname.value == null || subname.value == "") {
    subname.classList.add("error")
    setTimeout(function () {
      subname.classList.remove('error');
    }, 300);
    check = false;
  }
  if (tname.value == null || tname.value == "") {
    tname.classList.add("error")
    setTimeout(function () {
      tname.classList.remove('error');
    }, 300);
    check = false;
  }
  if (date == null || date == "") {
    date.classList.add("error")
    setTimeout(function () {
      date.classList.remove('error');
    }, 300);
    check = false;
  }
  if (check) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].group.id == currentUser.group.id) {
        users[i].tasks.push({
          id: ID(),
          subname: subname.value,
          tname: tname.value,
          date: date.getTime(),
          completed: false
        })
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
    document.location.href = 'index.html'
  }

}
var ID = function () {
  return Math.random().toString(36).substr(2, 9);
};