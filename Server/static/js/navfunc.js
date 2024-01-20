// @ts-nocheck

var defUrl = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate";

function back() {
  // debugger; //created a array to split the url and join it
  let newArray = [];
  let history = sessionStorage.getItem("history");
  let myArray = history.split("\\");
  myArray.pop();
  newArray = myArray.join("\\");

  sessionStorage.setItem("history", newArray); //if i want to go back again then this history would be needed.
  sessionStorage.setItem("forwardBtn", history); //latest change
  sessionStorage.removeItem("id"); //latest change
  sessionStorage.removeItem("delId"); //latest change

  // ajxFunc(newArray, clear);

  // fetch(
  //   "http://127.0.0.1:5000/navfunc?processed_data=${encodeURIComponent(newArray)}`",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // )
  //   .then((response) => {
  //     debugger;
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     // Handle the data returned from the server
  //     writeMnames(data);
  //     const navElement = document.getElementById("nav");
  //     const childElements = navElement.children.length;
  //     if (childElements == 3) {
  //       let span = document.createElement("span");
  //       span.setAttribute("class", "material-icons");
  //       span.setAttribute("onclick", "forward()");
  //       span.innerText = "arrow_forward";
  //       navElement.appendChild(span);
  //     }
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     // console.log(error("Fetch error:", error));
  //     error("Fetch error:", error);
  //   });

  $.ajax({
    url: "http://127.0.0.1:5000/navfunc",
    type: "POST",
    dataType: "json",
    data: {
      url: newArray,
    },
    success: function (res) {
      // debugger;
      // if (typeof callback === "function") callback();
      // writeMnames(res);

      writeMnames(res);
      const navElement = document.getElementById("nav");
      const childElements = navElement.children.length;
      //Forward arrow
      if (childElements == 3) {
        let span = document.createElement("span");
        span.setAttribute("class", "material-icons");
        span.setAttribute("onclick", "forward()");
        span.innerText = "arrow_forward";
        navElement.appendChild(span);
      }
    },
    error: function (err) {
      alert("Unable to fetch the directory files, please try again :" + err);
      console.log(err);
    },
  });

  //creating forward arrow in nav
  // const navElement = document.getElementById("nav");
  // const childElements = navElement.children.length;
  // if (childElements == 3) {
  //   let span = document.createElement("span");
  //   span.setAttribute("class", "material-icons");
  //   span.setAttribute("onclick", "forward()");
  //   span.innerText = "arrow_forward";
  //   navElement.appendChild(span);
  // }
}

function forward() {
  let forwardBtn = sessionStorage.getItem("forwardBtn");
  if (forwardBtn != null) {
    sessionStorage.setItem("history", forwardBtn);
    clear();
    ajxFunc(forwardBtn);
    sessionStorage.removeItem("forwardBtn");

    //newly added code on saturday to remove arrow forward icon
    const navElement = document.getElementById("nav");
    const childElements = navElement.childNodes;
    childElements.forEach((childElement) => {
      if (childElement.innerText === "arrow_forward") {
        childElement.remove();
      }
    });
  }
}

function refresh() {
  var history = sessionStorage.getItem("history");
  if (history != null) {
    if (!history.includes(".")) {
      // The above if statement verify's whether it is a directory or not & try to handle this situtation in a different way
      sessionStorage.removeItem("delId");
      sessionStorage.removeItem("id");
      clear();
      ajxFunc(history);
    } else {
      alert("Can't reload files");
    }
  } else {
    clear();
    ajxFunc(defUrl);
  }
}

function home() {
  clear();
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("delId");
  // let history = sessionStorage.getItem("history");
  // sessionStorage.setItem("forwardBtn", history);
  sessionStorage.setItem("history", defUrl);
  ajxFunc(defUrl);
}

function createFolder() {
  // debugger;
  let folName = prompt("Enter Folder Name");
  if (folName != null) {
    //If session history has any data, then we clicked on folder or directory. if not we are on first folder or at defURl.
    let folLoc = sessionStorage.getItem("history");
    if (folLoc != null) {
      let folPath = folLoc + "\\" + folName;
      $.ajax({
        url: "http://127.0.0.1:5000/createFolder",
        type: "POST",
        dataType: "json",
        data: folPath,
        success: function (res) {
          if (res.msg == "success") {
            // debugger;
            // clear();
            // writeMnames(res);
            refresh();
            alert("Folder created");
          }
        },
        error: function (err) {
          alert("Unable to create the folder:" + err);
        },
      });
    } else {
      let folPath = defUrl + "\\" + folName;
      $.ajax({
        url: "http://127.0.0.1:5000/createFolder",
        type: "POST",
        dataType: "json",
        data: folPath,
        success: function (res) {
          if (res.msg == "success") {
            // debugger;
            // clear();
            // writeMnames(res);
            refresh();
            alert("Folder created");
          }
        },
        error: function (err) {
          alert("Unable to create the folder:" + err);
        },
      });
    }
  } else {
    alert("Please enter folder name");
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

function del() {
  // debugger;
  //get the delete id from seesions which stored is using delid func
  let id = JSON.parse(sessionStorage.getItem("delId"));
  let path = sessionStorage.getItem("source");
  let histUrl = sessionStorage.getItem("history");
  let delList = [];

  // checking the id variable is a string or array
  if (typeof id === "object") {
    //if histUrl variable is null then it is first folder or directory opened. so, nothing is stored in then histUrl variable.
    if (histUrl === null) {
      for (let i = 0; i < id.length; i++) {
        // let path = sessionStorage.getItem("source");
        let filepath = path.split(",")[id[i]].trim();
        let delUrl = defUrl + "\\" + filepath;
        delList.push(delUrl);
      }
      fetch("http://127.0.0.1:5000/delete", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(delList),
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            console.log("SUCCESSFUL FETCH FUNC");
            return res;
          } else {
            console.log("UNSUCCESSFUL FETCH FUNC");
          }
        })
        .then((data) => {
          if (data.status == 200) {
            refresh();
            sessionStorage.removeItem("delId");
            alert("Deleted");
          }
        })
        .catch((error) => console.log("ERROR:" + error));
    } else {
      for (let i = 0; i < id.length; i++) {
        let filepath = path.split(",")[id[i]].trim();
        let delUrl = histUrl + "\\" + filepath;
        delList.push(delUrl);
      }
      fetch("http://127.0.0.1:5000/delete", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(delList),
      })
        .then((res) => {
          if (res.ok) {
            console.log("SUCCESSFUL FETCH");
            return res;
          } else {
            console.log("UNSUCCESSFUL FETCH");
          }
        })
        .then((res) => {
          if (res.status === 200) {
            refresh();
            sessionStorage.removeItem("delId");
            alert("Item Deleted");
          }
        })
        .catch((error) => console.log("ERROR:" + error));
    }
  } else {
    // This else statement is used "for single item deletion"
    let delFile = path.split(",")[id].trim();
    let delUrl = (histUrl += "\\" + delFile);
    fetch("http://127.0.0.1:5000/delete", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(delUrl),
    })
      .then((res) => {
        if (res.ok) {
          console.log("SUCCESSFUL FETCH FUNC");
          return res;
        } else {
          console.log("UNSUCCESSFUL FETCH FUNC");
        }
      })
      .then((data) => {
        if (data.status == 200) {
          refresh();
          sessionStorage.removeItem("delId");
          alert("Item Deleted");
        }
      })
      .catch((error) => console.log("ERROR:" + error));
  }
}

function clear() {
  let divElement = document.getElementById("folderContent");
  divElement.innerHTML = "";
  let headerDiv = document.createElement("div");
  headerDiv.setAttribute("id", "header");
  headerDiv.setAttribute("class", "header");
  divElement.appendChild(headerDiv);
}
