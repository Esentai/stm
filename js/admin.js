let users = JSON.parse(localStorage.getItem("users"));
let admin = JSON.parse(localStorage.getItem("admin"));

if (admin.session) {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("auth").style.display = "block";
}

function logout() {
  admin.session = false;
  localStorage.setItem("admin", JSON.stringify(admin));
  location.reload();

}


function login() {
  login = document.getElementById("login").value;
  password = document.getElementById("password").value;
  if (admin.login == login && admin.password == password) {
    document.getElementById("loginForm").style.display = "none"
    document.getElementById("auth").style.display = "block"
    admin.session = true;
    localStorage.setItem("admin", JSON.stringify(admin));
  } else {
    alert("Error!!!")
  }
}

showUsers()
checkBtn();
function showUsers() {
  let table = document.getElementById("admin")
  for (let i = 0; i < users.length; i++) {
    var row = table.insertRow(i + 1);
    let teamLeader = users[i].teamLeader.request ? `<button id="${users[i].id}" class="adminBtn" onclick="access('${users[i].email}')">Access</button>` : ""
    row.insertCell(0).innerHTML = users[i].name
    row.insertCell(1).innerHTML = users[i].surname
    row.insertCell(2).innerHTML = users[i].email
    row.insertCell(3).innerHTML = users[i].course
    row.insertCell(4).innerHTML = users[i].specialty.name_en
    row.insertCell(5).innerHTML = users[i].group.name_en
    row.insertCell(6).innerHTML = `<button>Disable</button>`
    row.insertCell(7).innerHTML = teamLeader
    row.insertCell(8).innerHTML = `<button class="adminBtn btnDefault">Update</button>`
    row.insertCell(9).innerHTML = `<button onclick="deleteUser('${users[i].email}')"  class="adminBtn btnDelete">Delete</button>`
  }
}

function access(email) {
  console.log("ok")
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      users[i].teamLeader.admin = !users[i].teamLeader.admin;
      localStorage.setItem("users", JSON.stringify(users));
      location.reload();
    }
  }
}

function checkBtn() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].teamLeader.admin && users[i].teamLeader.request) {
      document.getElementById(`${users[i].id}`).style.backgroundColor = "#28a745"
    } else if (users[i].teamLeader.request) {
      document.getElementById(`${users[i].id}`).style.backgroundColor = "#C82333"
    }
  }
}

function deleteUser(email) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      users.splice(i, 1);
      localStorage.setItem("users", JSON.stringify(users));
      location.reload();
    }
  }
}