function ajax(urlData) {
  $.ajax({
    url: "http://127.0.0.1:5000/mnamesloc",
    type: "POST",
    dataType: "json",
    data: {
      url: urlData,
    },
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

//communicate with the server and fetching list of dir or files in the path and store them in the session storage.
function getnames(url) {
  // debugger;
  if (url != null) {
    ajax(url);
  } else {
    ajax("C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\");
  }
}

function writeElements(data) {
  var divElement = document.getElementById("folderContent");

  for (let i = 0; i < data.length; i++) {
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onclick", "delId(this)");
    checkbox.id = i;
    let span = document.createElement("span");
    span.setAttribute("class", "material-icons");
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
      span.innerText = "folder";
    } else if (movies) {
      span.innerText = "movie";
    } else {
      span.innerText = "description";
    }
    var br = document.createElement("br");
    var a = document.createElement("a");
    a.setAttribute("onclick", "getId(this)");
    a.style = "text-decoration:none";
    a.style.font = "bold 22px Cinzel,sans-serif";
    a.style.color = "rgb(23 23 23)";
    var linkText = document.createTextNode(data[i]);
    a.appendChild(linkText);
    a.title = data[i];
    if (fol) {
      a.href =
        "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\dir.html";
    } else if (movies) {
      a.href =
        "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\videoplayer.html";
    } else {
      a.href =
        "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\files.html";
    }

    //change the url when deploying
    a.id = i;
    divElement.appendChild(checkbox);
    divElement.appendChild(span);
    divElement.appendChild(a);
    divElement.appendChild(br);
  }
}

//Below functions creates the elements in the dom.
function writeMnames(res) {
  //debugger;
  if (res.length == 0) {
    document.getElementById("folderContent").innerHTML += "No files found!";
  } else {
    sessionStorage.setItem("source", res); //create local storage here
    writeElements(res);
  }
}

//Removing line for the
function removeLine() {
  document.getElementById(i).style = "text-decoration:none";
}

//This function is used to create the video player
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
