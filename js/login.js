if (localStorage.getItem("admin") == null) {
  let admin = {
    session: false,
    login: "admin",
    password: "1234"
  }
  localStorage.setItem("admin", JSON.stringify(admin));
}


var users = []
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}

function login() {
  email = document.getElementById("email")
  password = document.getElementById("password");
  let check = true;
  let auth = false;
  if (email.value == null || email.value == "") {
    email.classList.add("error")
    setTimeout(function () {
      email.classList.remove('error');
    }, 300);
    check = false;
  }
  if (password.value == null || password.value == "") {
    password.classList.add("error")
    setTimeout(function () {
      password.classList.remove('error');
    }, 300);
    check = false;
  }
  if (users.length > 0 && check) {
    for (let i = 0; i < users.length; i++) {
      if (email.value == users[i].email && password.value == users[i].password) {
        users[i].session = true
        localStorage.setItem("users", JSON.stringify(users));
        document.location.href = 'HomePage.html'
        auth = true;
      }
    }
    if (!auth) {
      document.getElementById("error_message").innerHTML = "An account does not exist!"
    }
  }
}