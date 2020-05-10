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
  document.location.href = 'HomePage.html'
}

document.getElementById("course").value = currentUser.course;
document.getElementById("specialty").value = currentUser.specialty.name_en
document.getElementById("group").value = currentUser.group.name_en

console.log(currentUser)

function addTask() {
  let subname = document.getElementById("subname").value;
  let tname = document.getElementById("tname").value;
  var date = new Date(document.getElementById("time").value)
  console.log(date)
}