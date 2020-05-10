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
checkStatus();
function logout() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].session) {
      users[i].session = false;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
  document.location.href = 'login.html'
}

document.getElementById("fullname").innerHTML = currentUser.name + " " + currentUser.surname

let info = ""
info = `Email: ${currentUser.email}  </br>
Course: ${currentUser.course}  </br>
Specialty: ${currentUser.specialty.name_en}  </br>
Group: ${currentUser.group.name_en}  </br>
`
document.getElementById("info").innerHTML = info


function request() {
  users[userId].teamLeader.request = true;
  localStorage.setItem("users", JSON.stringify(users));
  checkStatus()
  alert("You have successfully sent a request, wait for an administrator response!")
}

function checkStatus() {
  button = document.getElementById("requestBtn")
  if (users[userId].teamLeader.request && users[userId].teamLeader.admin) {
    button.disabled = true;
    button.style.backgroundColor = "#28a745";
    button.style.color = "#fff";
  } else if (users[userId].teamLeader.request) {
    button.style.backgroundColor = "#ffc107";
    button.style.color = "#212529";
    button.disabled = true;
  } else {
    button.style.backgroundColor = "#C82333";
    button.style.color = "#fff";
  }
}