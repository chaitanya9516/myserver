// @ts-nocheck

function ajxFunc(urlData, callback) {
  $.ajax({
    url: "http://127.0.0.1:5000/mnamesloc",
    type: "POST",
    dataType: "json",
    data: {
      url: urlData,
    },
    success: function (res) {
      // debugger;
      if (typeof callback === "function") {
        callback();
      }

      writeMnames(res);
    },
    error: function (err) {
      alert("unable to load please try again" + err);
      console.log(err);
    },
  });
}

//communicate with the server and fetching list of dir or files in the path and store them in the session storage.
function getNames(url) {
  // debugger;
  if (url != null) {
    ajxFunc(url);
  } else {
    // ajxFunc("C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\");
    ajxFunc(defUrl);
  }
}

function writeElements(data) {
  // debugger;
  var divElement = document.getElementById("folderContent");

  //Adding path as heading in folder content
  let path = sessionStorage.getItem("history");
  if (path === null) {
    let headTag = document.createElement("h2");
    headTag.innerText = defUrl;
    headTag.style.color = "#ffffff";
    divElement.appendChild(headTag);
  } else {
    let headTag = document.createElement("h2");
    headTag.innerText = path;
    headTag.style.color = "#ffffff";
    divElement.appendChild(headTag);
  }

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
    // a.style.color = "rgb(23 23 23)";
    a.style.color = "#ffffff";
    var linkText = document.createTextNode(data[i]);
    a.appendChild(linkText);
    a.title = data[i];
    if (fol) {
      a.href = "/dir2";
    } else if (movies) {
      a.href = "/vide0";
    } else {
      a.href = "/files";
    }
    a.id = i;

    // Apply the necessary CSS styles to display a horizontal line
    // let line = document.createElement("div");
    // line.style.width = "100%";
    // line.style.height = "1px";
    // line.style.backgroundColor = "black";
    // divElement.appendChild(line);

    // Append the line to the container element
    // let container = document.getElementById("container"); // Replace 'container' with the ID of your desired container
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

//This function is used to create the video player
function video(path) {
  let video = document.createElement("VIDEO");
  if (video.canPlayType("video/mp4")) {
    video.setAttribute("src", "/play_video/" + path);
  } else {
    video.setAttribute("src", "/play_video/" + path);
  }
  video.setAttribute("width", "620");
  video.setAttribute("height", "640");
  video.setAttribute("controls", "controls");
  document.body.appendChild(video);
}
