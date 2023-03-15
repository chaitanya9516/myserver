var data;
//communicate with the server and fetching list of dir or files in the path and store them in the session storage.
function getnames() {
  // debugger;
  $.ajax({
    url: "http://127.0.0.1:5000/mnamesloc",
    type: "GET",
    dataType: "json",
    success: function (res) {
      // debugger;
      writeMnames(res);
    },
    error: function (err) {
      alert("unable to load please try again" + err);
      console.log(err);
    },
  });
}

//Below functions creates the elements in the dom.
function writeMnames(res) {
  // debugger;
  data = res;
  //Below if condition is to check the folder has some files or not
  if (data.length == 0) {
    // document.body.innerHTML = "No files found!";
    document.getElementById("mnames").innerHTML += "No files found!";
  } else {
    sessionStorage.setItem("source", data);
    // var img = document.createElement("img");
    for (let i = 0; i < data.length; i++) {
      // debugger;
      let fol = !data[i].includes(".");
      let movies = data[i].includes(
        ".mp4",
        ".mkv",
        ".flv",
        ".avi",
        ".mov",
        ".mpeg",
        ".mpg"
      );
      if (fol) {
        //creating folder icon
        let img = document.createElement("img");
        img.src =
          "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\icons\\folder.jpg";
        // document.body.appendChild(img);
        document.write("<br>");
        var a = document.createElement("a");
        // a.setAttribute("onclick", "getId(this) ; superFunc()");
        a.setAttribute("onclick", "getId(this)");
        a.style = "text-decoration:none";
        a.style.font = "bold 15px arial,sans-serif";
        a.style.color = "#000000";
        var linkText = document.createTextNode(data[i]);
        a.appendChild(linkText);
        a.title = data[i];
        a.href =
          "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\dir.html";
        //change the url when deploying
        a.id = i;
        document.body.appendChild(img);
        document.body.appendChild(a);
      } else if (movies) {
        let img = document.createElement("img");
        img.src =
          "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\icons\\movies.jpg";
        // document.body.appendChild(img);
        document.write("<br>");
        var a = document.createElement("a");
        // a.setAttribute("onclick", "getId(this) ; superFunc()");
        a.setAttribute("onclick", "getId(this)");
        a.style = "text-decoration:none";
        a.style.font = "bold 15px arial,sans-serif";
        a.style.color = "#000000";
        var linkText = document.createTextNode(data[i]);
        a.appendChild(linkText);
        a.title = data[i];
        a.href =
          "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\videoplayer.html";
        //change the url when deploying
        a.id = i;
        // let mnamesDiv = document.getElementById("mnames");
        // mnamesDiv.appendChild(img);
        // mnamesDiv.appendChild(a);
        document.body.appendChild(img);
        document.body.appendChild(a);
      } else {
        //icon
        let img = document.createElement("img");
        img.src =
          "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\icons\\file.jpg";
        document.write("<br>");
        var a = document.createElement("a");
        // a.setAttribute("onclick", "getId(this) ; superFunc()");
        a.setAttribute("onclick", "getId(this)");
        a.style = "text-decoration:none";
        a.style.font = "bold 15px arial,sans-serif";
        a.style.color = "#000000";
        var linkText = document.createTextNode(data[i]);
        a.appendChild(linkText);
        a.title = data[i];
        a.href =
          "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\files.html";
        //change the url when deploying
        a.id = i;
        document.body.appendChild(img);
        document.body.appendChild(a);
      }
    }
  }
}

//Removing line for the
function removeLine() {
  document.getElementById(i).style = "text-decoration:none";
}

function back() {
  let history = sessionStorage.getItem("history");
  let myArray = history.split("\\");
  myArray.pop();
  myArray.join("\\");

  $.ajax({
    url: "http://127.0.0.1:5000/mnamesloc", //change cheyali
    type: "POST",
    data: {
      url: myArray,
    },
    dataType: "json",
    success: function (res) {
      // debugger;
      //getting data from server and creating elements for the data
      writeMnames(res);
    },
    error: function (err) {
      alert("unable to load please try again");
      console.log(err);
    },
  });
}

// function getnames(yes) {
//   $.ajax({
//     url: "http://127.0.0.1:5000/mnamesloc",
//     type: "GET",
//     dataType: "json",
//     success: function (res) {
//       // debugger;
//       writeMnames(res);
//     },
//     error: function (err) {
//       alert("unable to load please try again" + err);
//       console.log(err);
//     },
//   });
// } old function with no changes

function createFolder() {
  let foo = prompt("Folder Name");
  let bar = confirm("Confirm or deny");
  if (bar == true) {
    $.ajax({
      url: "http://127.0.0.1:5000/createFolder",
      type: "POST",
      dataType: "json",
      data: foo,
      success: function (resp) {
        if (resp.msg == "success") {
          writeMnames(res);
          alert("Folder created");
        }
      },
      error: function (err) {
        alert("unable to load please try again" + err);
        console.log(err);
      },
    });
  }
}

// This function is used to identify, which element is clicked and get the extact element id then it is store in sessionstorage
function getId(btn) {
  let id = btn.id;
  sessionStorage.setItem("id", id);
}

function showDiv() {
  // debugger; show/hide div for upload
  const btn = document.getElementById("uploaddiv2");
  let div = window.getComputedStyle(btn).display;
  if (div == "none") {
    div = document.getElementById("uploaddiv2").style.display = "flex"; //'block'
  } else {
    div = document.getElementById("uploaddiv2").style.display = "none";
  }
}

function uploadFile() {
  let formData = new FormData();
  formData.append("file", fileupload.files[0]);
  $.ajax({
    url: "http://127.0.0.1:5000",
    data: formData,
    type: "POST",
    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    processData: false, // NEEDED, DON'T OMIT THIS
    // ... Other options like success and etc
  });
  alert("The file has been uploaded successfully.");
}

function del() {
  // have to create check box
  // then have to know which item is selected
  // then using python os lib remove the file
}

function video(path) {
  let video = document.createElement("VIDEO");
  if (video.canPlayType("video/mp4")) {
    video.setAttribute("src", path);
  } else {
    video.setAttribute("src", path);
  }
  video.setAttribute("width", "620");
  video.setAttribute("height", "640");
  video.setAttribute("controls", "controls");
  document.body.appendChild(video);
}
