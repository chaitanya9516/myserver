//@ts-nocheck

// function ajxFunc(serverUrl, urlData, callback) {
//   $.ajax({
//     url: `http://127.0.0.1:5000/${serverUrl}`,
//     type: "POST",
//     dataType: "json",
//     data: {
//       url: urlData,
//     },
//     success: function (res) {
//       // debugger;
//       if (typeof callback === "function") {
//         callback();
//       }
//       writeMnames(res);
//     },
//     error: function (err) {
//       alert("unable to load please try again" + err);
//       console.log(err);
//     },
//   });
// }

function ajxFunc(urlData, callback) {
  // url: "http://127.0.0.1:5000/mnamesloc",
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

//communicates with the server and fetch the data which is in the directory.
function getNames(url) {
  // debugger;
  try {
    if (url != null) {
      ajxFunc(url);
      // ajxFunc(url, "func1");
    } else {
      // ajxFunc("C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\");
      ajxFunc(defUrl);
      // ajxFunc(defUrl, "func1");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function writeElements(data) {
  var headerElement = document.getElementById("header");
  var divElement = document.getElementById("folderContent");
  //Adding path as heading in folder content
  let path = sessionStorage.getItem("history");
  if (path === null) {
    //newly added: Writing Folder URL as Heading
    let defUrl = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\";
    let splitPath = defUrl.split("\\");
    for (let i = 0; i < splitPath.length; i++) {
      let span = document.createElement("span");
      span.setAttribute("id", "pathSpan");
      span.setAttribute("class", "material-icons");
      span.innerText = "folder";
      headerElement.appendChild(span);

      let pTag = document.createElement("p");
      pTag.setAttribute("id", "pTag" + splitPath[i]);
      pTag.innerText = splitPath[i] + " " + ">";
      pTag.style.color = "black";
      headerElement.appendChild(pTag);
    }
    //#############################################
  } else {
    //newly added: Writing Folder URL as Heading
    let splitPath = path.split("\\");
    for (let i = 0; i < splitPath.length; i++) {
      let span = document.createElement("span");
      span.setAttribute("id", "pathSpan" + splitPath[i]);
      span.setAttribute("class", "material-icons");
      span.innerText = "folder";
      headerElement.appendChild(span);

      let pTag = document.createElement("p");
      pTag.setAttribute("id", "pTag");
      pTag.innerText = splitPath[i] + " " + ">";
      // headTag.style.color = "#ffffff";
      pTag.style.color = "black";
      headerElement.appendChild(pTag);
    }
    //#############################################
  }

  for (let i = 0; i < data.length; i++) {
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onclick", "delId(this)");
    checkbox.setAttribute("margin", "3px");
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
    a.style.font = '"Roboto", sans-serif';
    a.setAttribute("margin", "3px");
    // a.style.color = "#ffffff";
    a.style.color = "black";
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
