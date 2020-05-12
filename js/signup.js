if (localStorage.getItem("admin") == null) {
  let admin = {
    session: false,
    login: "admin",
    password: "1234"
  }
  localStorage.setItem("admin", JSON.stringify(admin));
}




buttons = document.getElementsByClassName("button");
sections = document.getElementsByClassName("section");
steps = document.getElementsByClassName("step");
var users = []
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}
user = {
  id: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  course: '',
  specialty: {},
  group: {},
  tasks: [],
  teamLeader: {
    request: false,
    admin: false,
  },
  isDisabled: false,
  session: false
}
function next(step) {
  if (step == 'step1') {
    let name_v = /^[a-z]+$/i;
    let surname_v = /^[a-z]+$/i;
    let email_v = /^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/;
    let name = document.getElementById("name");
    let surname = document.getElementById("surname");
    let email = document.getElementById("email");
    let check = true;
    if (users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == email.value) {
          alert("Account already exists!");
          return false;
        }
      }
    }
    if (name.value == null || name.value == "" || name_v.test(name.value) == false) {
      name.classList.add("error")
      setTimeout(function () {
        name.classList.remove('error');
      }, 300);
      check = false;
    }
    if (surname.value == null || surname.value == "" || surname_v.test(surname.value) == false) {
      surname.classList.add("error")
      setTimeout(function () {
        surname.classList.remove('error');
      }, 300);
      check = false;
    }
    if (email.value == null || email.value == "" || email_v.test(email.value) == false) {
      email.classList.add("error")
      setTimeout(function () {
        email.classList.remove('error');
      }, 300);
      check = false;
    }
    if (check) {
      sections[0].classList.remove('is-active');
      sections[1].classList.add('is-active');
      steps[1].classList.add('is-active');
      user.name = name.value;
      user.surname = surname.value;
      user.email = email.value;

    }
  }
  if (step == 'step2') {
    if (groupName != "") {
      sections[1].classList.remove('is-active');
      sections[2].classList.add('is-active');
      steps[2].classList.add('is-active');
    } else {
      document.getElementById("selects").classList.add("error")
      setTimeout(function () {
        document.getElementById("selects").classList.remove('error');
      }, 300);
    }
  }
  if (step = 'step3') {
    let password_v = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    let password = document.getElementById("password");
    let password2 = document.getElementById("password2");
    let check = true;
    if (password.value == null || password.value == "" || password_v.test(password.value) == false) {
      password.classList.add("error")
      setTimeout(function () {
        password.classList.remove('error');
      }, 300);
      check = false;
    }
    if (password2.value == null || password2.value == "" || password.value !== password2.value) {
      password2.classList.add("error")
      setTimeout(function () {
        password2.classList.remove('error');
      }, 300);
      check = false;
    }
    if (check) {
      user.password = password.value
      sendData();
    }
  }
}

let allSpecialty = [];
let allGroup = []


let courseNum;
async function selectCourse() {
  courseNum = document.getElementById("course").value;
  document.getElementById("loader").style.display = "block";
  document.getElementById("specialty").disabled = true;
  let res_data = await getSpecialty(courseNum)
  document.getElementById("specialty").disabled = false;
  allSpecialty = res_data
  document.getElementById("specialty").style.display = "block";
  document.getElementById("loader").style.display = "none";
  let str = "<option value='none'>Select specialty</option>";
  for (let i = 0; i < res_data.length; i++) {
    str += `<option value="${res_data[i].id}">${res_data[i].name_en}</option>`
  }
  document.getElementById("specialty").innerHTML = str;
  user.course = courseNum
}

let specialtyName
async function selectSpecialty() {
  specialtyName = document.getElementById("specialty").value;
  document.getElementById("loader").style.display = "block";
  document.getElementById("group").disabled = true;
  let res_data = await getGroup(specialtyName)
  document.getElementById("group").disabled = false;
  allGroup = res_data
  document.getElementById("loader").style.display = "none";
  let groups = "<option value='none'>Select group</option>"
  for (let i = 0; i < res_data.length; i++) {
    groups += `<option value="${res_data[i].id}">${res_data[i].name_en}</option>`
  }
  document.getElementById("group").style.display = "block";
  document.getElementById("group").innerHTML = groups;
}

let groupName
function selectGroup() {
  groupName = document.getElementById("group").value;
}


async function getSpecialty(courseNum) {
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  var targetUrl = `http://schedule.iitu.kz/rest/user/
  get_specialty.php?course=${courseNum}`
  let response = await fetch(proxyUrl + targetUrl);
  let data = await response.json()
  console.log(data.result)
  return data.result;
}

async function getGroup(id) {
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  var targetUrl = `http://schedule.iitu.kz/rest/user/
  get_group.php?course=${courseNum}&specialty_id=${id}`
  let response = await fetch(proxyUrl + targetUrl);
  let data = await response.json()
  console.log(data.result)
  return data.result;
}

var ID = function () {
  return Math.random().toString(36).substr(2, 9);
};


function sendData() {
  user.session = true;
  user.id = ID();
  for (let i = 0; i < allSpecialty.length; i++) {
    if (allSpecialty[i].id == specialtyName) {
      user.specialty = allSpecialty[i];
    }
  }
  for (let i = 0; i < allGroup.length; i++) {
    if (allGroup[i].id == groupName) {
      user.group = allGroup[i];
    }
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  document.location.href = 'index.html'
}


