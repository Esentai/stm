let selectBtns = document.getElementsByClassName("selectBtn");

function select(num) {
  if (num == 0) {
    selectBtns[0].classList.add("selectBtn_active")
    selectBtns[1].classList.remove("selectBtn_active")
    document.getElementById("tasks").style.display = "block"
    document.getElementById("schedule").style.display = "none"
  } else {
    selectBtns[1].classList.add("selectBtn_active")
    selectBtns[0].classList.remove("selectBtn_active")
    document.getElementById("tasks").style.display = "none"
    document.getElementById("schedule").style.display = "block"
  }
}

let users = JSON.parse(localStorage.getItem("users"));
let currentUser;
let userCheck = false;
if (users != null) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].session) {
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
console.log(currentUser.teamLeader.admin)

if (currentUser.disable) {
  document.getElementById("mainContent").style.display = "none";
  document.getElementById("disableMessage").style.display = "block";

}
if (currentUser.teamLeader.admin) {
  document.getElementById("addBtn").style.display = "block"
}




function logout() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].session) {
      users[i].session = false;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
  document.location.href = 'login.html'
}

document.getElementById("name").innerHTML = `Welcome, ${currentUser.name}!`
console.log(currentUser)

$(document).ready(function () {
  var d = new Date();
  var n = d.getDay();

  if (n == 1) {
    $("#btn1").addClass("buttonActive");
    $('#1').css("display", "table");
  }
  if (n == 2) {
    $("#btn2").addClass("buttonActive");
    $('#2').css("display", "table");
  }
  if (n == 3) {
    $("#btn3").addClass("buttonActive");
    $('#3').css("display", "table");
  }
  if (n == 4) {
    $("#btn4").addClass("buttonActive");
    $('#4').css("display", "table");
  }
  if (n == 5) {
    $("#btn5").addClass("buttonActive");
    $('#5').css("display", "table");
  }
  if (n == 6) {
    $("#btn6").addClass("buttonActive");
    $('#6').css("display", "table");
  }
  if (n == 0) {
    $("#btn1").addClass("buttonActive");
    $('#1').css("display", "table");
  }
  $("#btn1").click(function () {
    def();
    $("#btn1").addClass("buttonActive");
    $('#1').css("display", "table");

  });
  $("#btn2").click(function () {
    def();
    $("#btn2").addClass("buttonActive");
    $('#2').css("display", "table");
  });
  $("#btn3").click(function () {
    def();
    $("#btn3").addClass("buttonActive");
    $('#3').css("display", "table");
  });
  $("#btn4").click(function () {
    def();
    $("#btn4").addClass("buttonActive");
    $('#4').css("display", "table");
  });
  $("#btn5").click(function () {
    def();
    $("#btn5").addClass("buttonActive");
    $('#5').css("display", "table");
  });
  $("#btn6").click(function () {
    def();
    $("#btn6").addClass("buttonActive");
    $('#6').css("display", "table");
  });
});


function def() {
  document.getElementById("btn1").classList.remove("buttonActive");
  document.getElementById("btn2").classList.remove("buttonActive");
  document.getElementById("btn3").classList.remove("buttonActive");
  document.getElementById("btn4").classList.remove("buttonActive");
  document.getElementById("btn5").classList.remove("buttonActive");
  document.getElementById("btn6").classList.remove("buttonActive");
  document.getElementById("1").style.display = 'none';
  document.getElementById("2").style.display = 'none';
  document.getElementById("3").style.display = 'none';
  document.getElementById("4").style.display = 'none';
  document.getElementById("5").style.display = 'none';
  document.getElementById("6").style.display = 'none';
}


showTasks()
function showTasks() {
  let table = document.getElementById("task_table");
  for (let i = 0; i < currentUser.tasks.sort(compare).sort(compare2).length; i++) {
    let row = table.insertRow(i + 1);
    row.insertCell(0).innerHTML = currentUser.tasks[i].subname
    row.insertCell(1).innerHTML = currentUser.tasks[i].tname
    row.insertCell(2).id = i + 99
    timer(currentUser.tasks[i].date, i + 99)
    row.insertCell(3).innerHTML = `<button id="${currentUser.tasks[i].id}" onclick="completed('${currentUser.tasks[i].id}')" class="completedBtn">Completed</button>`

  }
}
checkTasks()
function completed(id) {
  for (let i = 0; i < currentUser.tasks.length; i++) {
    if (currentUser.tasks[i].id == id) {
      currentUser.tasks[i].completed = true;
      updateData()
      checkTasks()

    }
  }
}
function updateData() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id = currentUser.id) {
      users[i] = currentUser;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
}
function checkTasks() {
  for (let i = 0; i < currentUser.tasks.length; i++) {
    if (currentUser.tasks[i].completed) {
      document.getElementById(`${currentUser.tasks[i].id}`).style.backgroundColor = "#28a745"
    } else {
      document.getElementById(`${currentUser.tasks[i].id}`).style.backgroundColor = "#C82333"
    }
  }
}



function compare2(a, b) {
  const bandA = a.completed
  const bandB = b.completed
  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}



function compare(a, b) {
  const bandA = a.date
  const bandB = b.date
  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}


function timer(time, id) {
  var countDownDate = time
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById(`${id}`).innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";
    if (distance < 0) {
      clearInterval(x);
      document.getElementById(`${id}`).innerHTML = "EXPIRED";
    }
    if (days == 0) {
      document.getElementById(`${id}`).style.color = "#C82333"
    }
  }, 1000);
}



showSchedule()
let schedule_data = [];
let schedule;
async function showSchedule() {
  document.getElementById("loader").style.display = "block";
  schedule = await getSchedule();
  document.getElementById("loader").style.display = "none";
  for (let i = 1; i <= 6; i++) {
    if (schedule.timetable[i] != null) {
      schedule_data.push({
        day: i,
        data: schedule.timetable[i],
      })
    }
  }
  showTable();
}

function showTable() {
  console.log(schedule_data)
  for (let i = 0; i < schedule_data.length; i++) {
    let table = document.getElementById(`${schedule_data[i].day}`)
    let leng = Object.keys(schedule_data[i].data).length
    let scheduleCheck = false;
    for (let j = 1; j <= leng; j++) {
      if (schedule_data[i].data[j] != null) {
        scheduleCheck = true;
        var row = table.insertRow(j);
        row.insertCell(0).innerHTML = getSubjectTime(schedule.times[schedule_data[i].data[j][0].time_id].start_time) + " - " + getSubjectTime(schedule.times[schedule_data[i].data[j][0].time_id].end_time)
        row.insertCell(1).innerHTML = schedule.subjects[schedule_data[i].data[j][0].subject_id].subject_en
        if (schedule_data[i].data[j][0].bundle_id < 459) {
          row.insertCell(2).innerHTML = schedule.bundles[schedule_data[i].data[j][0].bundle_id][0].name_en
        } else {
          let str = ""
          for (let k = 0; k < schedule.bundles[schedule_data[i].data[j][0].bundle_id].name.length; k++) {
            str += schedule.bundles[schedule_data[i].data[j][0].bundle_id].name[k].name_en + " ";
          }
          row.insertCell(2).innerHTML = str
        }
      } else if (scheduleCheck) {
        leng++;
        var row = table.insertRow(j);
        row.insertCell(0).innerHTML = ""
        row.insertCell(1).innerHTML = "Open hours"
        row.insertCell(2).innerHTML = ""
      } else {
        leng++;
        var row = table.insertRow(j);
      }
    }
  }
}
function getSubjectTime(time) {
  let str = time.split(":")
  let current = str[0] + ":" + str[1];
  return current;

}

async function getSchedule() {
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  var targetUrl = `http://schedule.iitu.kz/rest/user/get_timetable_block.php?block_id=${currentUser.group.id}`
  let response = await fetch(proxyUrl + targetUrl);
  let data = await response.json()
  console.log(data)
  return data;
}


