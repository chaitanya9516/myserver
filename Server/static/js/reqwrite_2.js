//@ts-nocheck

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
      if (typeof callback === "function") callback();
      writeMnames(res);
    },
    error: function (err) {
      alert("Unable to fetch the directory files, please try again :" + err);
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
    } else {
      ajxFunc(defUrl);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function writeElements(data) {
  var headerElement = document.getElementById("header");
  var divElement = document.getElementById("folderContent");
  let path = sessionStorage.getItem("history"); //Adding path as url heading to folder content

  function headerHelper(data, Num) {
    let idNum = Num;
    if (data.length <= 0) return; //Base statement for recursion
    if (data.values === null) return;
    if (data[0] === "") return; //have to check why i am getting this value in the splitPath variable array

    // the below function writes the header url on the top
    writeHeaderElements(data, Num);
    splitPath = data.slice(1);
    idNum++;
    return headerHelper(splitPath, idNum);
  }

  function writeHeaderElements(dt2, idNum) {
    let span = document.createElement("span");
    span.setAttribute("id", "pathSpan" + idNum);
    span.setAttribute("class", "material-icons");
    span.innerText = "folder";
    headerElement.appendChild(span);

    let pTag = document.createElement("p");
    pTag.setAttribute("id", "pTag" + idNum);
    pTag.innerText = dt2[0] + " " + ">";
    pTag.style.color = "black";
    headerElement.appendChild(pTag);
    // idNumber++;
    // let splitPath = dt2.slice(1);
  }

  function writeElementsHelper(data, Num2) {
    let idNum = Num2;
    // console.log("helper function data variable type:" + typeof data);
    if (data.length <= 0) return;
    // let id = 0;
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onclick", "delId(this)");
    checkbox.setAttribute("margin", "3px");
    checkbox.id = idNum;
    let span = document.createElement("span");
    span.setAttribute("class", "material-icons");
    let fol = !data[0].includes(".");
    let movies = data[0].includes(
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
    a.style.color = "black";
    var linkText = document.createTextNode(data[0]);
    a.appendChild(linkText);
    a.title = data[0];
    if (fol) {
      a.href = "/dir2";
    } else if (movies) {
      a.href = "/vide0";
    } else {
      a.href = "/files";
    }
    a.id = idNum;

    // Append the line to the container element
    // let container = document.getElementById("container");
    // Replace 'container' with the ID of your desired container
    divElement.appendChild(checkbox);
    divElement.appendChild(span);
    divElement.appendChild(a);
    divElement.appendChild(br);
    idNum++;
    return writeElementsHelper(data.slice(1), idNum);
  }

  //newly added: Writing Folder URL as Heading and checking if path variable is null then use defurl or fetch from session
  if (path === null) {
    let defUrl = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\";
    let splitPath = defUrl.split("\\");

    headerHelper(splitPath, (Num = 0));
  } else {
    let splitPath = path.split("\\");

    headerHelper(splitPath, (Num = 0));
  }

  writeElementsHelper(data, (Num = 0));
}

//Below functions creates the elements in the dom.
function writeMnames(res) {
  //debugger;
  if (res.length === 0) {
    document.getElementById("folderContent").innerHTML += "No files found!";
  } else {
    sessionStorage.setItem("source", res); //create local storage here
    writeElements(res);
  }
}
