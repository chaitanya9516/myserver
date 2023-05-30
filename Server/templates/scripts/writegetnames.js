var data;

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

//Below functions creates the elements in the dom.
function writeMnames(res) {
  data = res;
  //Below if condition is to check the folder has some files or not
  //debugger;
  if (data.length == 0) {
    // document.body.innerHTML = "No files found!";
    document.getElementById("folderContent").innerHTML += "No files found!";
  } else {
    sessionStorage.setItem("source", data);
    var divElement = document.getElementById("folderContent");
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
        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("onclick", "delId(this)");
        checkbox.id = i;

        let img = document.createElement("img");
        img.src =
          "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\icons\\folder.jpg";
        var br = document.createElement("br");
        var a = document.createElement("a");
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
        divElement.appendChild(checkbox);
        divElement.appendChild(img);
        divElement.appendChild(a);
        divElement.appendChild(br);
      } else if (movies) {
        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("onclick", "delId(this)");
        checkbox.id = i;

        let img = document.createElement("img");
        img.src =
          "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\icons\\movies.jpg";
        var br = document.createElement("br");
        document.body.appendChild(br);
        var a = document.createElement("a");
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
        divElement.appendChild(checkbox);
        divElement.appendChild(img);
        divElement.appendChild(a);
        divElement.appendChild(br);
      } else {
        //icon
        var checkbox = document.createElement("INPUT");
        checkbox.id = i;
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("onclick", "delId(this)");

        let img = document.createElement("img");
        img.src =
          "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\icons\\file.jpg";
        var br = document.createElement("br");
        var a = document.createElement("a");
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
        divElement.appendChild(checkbox);
        divElement.appendChild(img);
        divElement.appendChild(a);
        divElement.appendChild(br);
      }
    }
  }
}

//Removing line for the
function removeLine() {
  document.getElementById(i).style = "text-decoration:none";
}

// storing id to help the annomusfunc file function to open the files
//This function is used to identify, which element is clicked and get the extact element id then it is store in sessionstorage
function getId(btn) {
  let id = btn.id;
  sessionStorage.setItem("id", id);
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
