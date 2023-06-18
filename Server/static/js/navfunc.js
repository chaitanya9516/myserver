// @ts-nocheck

// $(document).ready(function () {
//   let frwdId = sessionStorage.getItem("frwdId");
//   let forwardBtn = sessionStorage.getItem("forwardBtn");

//   if (forwardBtn == frwdId) {
//     sessionStorage.removeItem("frwdId");
//     sessionStorage.removeItem("forwardBtn");
//     // document.getElementById("arrow_forward").remove();
//     const spanElement = document.getElementById("arrow_forward");
//     spanElement.remove();
//   }
// });

var defUrl = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate";

function back() {
  debugger; //created a array to split the url and join it
  let newArray = [];
  let history = sessionStorage.getItem("history");
  let myArray = history.split("\\");
  myArray.pop();
  newArray = myArray.join("\\");
  sessionStorage.setItem("history", newArray); //if i want to go back again then this history would be needed.
  sessionStorage.setItem("forwardBtn", history); //latest change
  sessionStorage.removeItem("id"); //latest change
  sessionStorage.removeItem("delId"); //latest change

  ajxFunc(newArray, clear);

  // $.ajax({
  //   url: "http://127.0.0.1:5000/mnamesloc", //change cheyali
  //   type: "POST",
  //   data: {
  //     url: newArray,
  //   },
  //   dataType: "json",
  //   success: function (res) {
  //     debugger;
  //     clear();
  //     // removing content from folder content div
  //     // var divElement = document.getElementById("folderContent");
  //     // let divnodelen = divElement.childNodes.length;
  //     // let i = 0;
  //     // while (i < divnodelen) {
  //     //   divElement.removeChild(divElement.firstChild);
  //     //   i++;
  //     // }
  //     //getting data from server and creating elements for the data
  //     writeMnames(res);
  //   },
  //   error: function (err) {
  //     alert("unable to load please try again");
  //     console.log(err);
  //   },
  // });
}

function forward() {
  let forwardBtn = sessionStorage.getItem("forwardBtn");
  sessionStorage.setItem("history", forwardBtn);
  if (forwardBtn != null) {
    clear();
    ajxFunc(forwardBtn);
    sessionStorage.removeItem("forwardBtn");
    // const spanElement = document.getElementsBy("nav-item");
    // spanElement.remove();
  }
}

function refresh() {
  var history = sessionStorage.getItem("history");
  if (history != null) {
    sessionStorage.removeItem("delId");
    sessionStorage.removeItem("id");
    clear();
    ajxFunc(history);
  }
}

function home() {
  clear();
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("delId");
  let history = sessionStorage.getItem("history");
  sessionStorage.setItem("forwardBtn", history);
  sessionStorage.setItem("history", defUrl);
  ajxFunc(defUrl);
}

function createFolder() {
  let foo = prompt("Enter Folder Name");

  if (foo != null) {
    $.ajax({
      url: "http://127.0.0.1:5000/createFolder",
      type: "POST",
      dataType: "json",
      data: foo,
      success: function (res) {
        if (res.msg == "success") {
          writeMnames(res);
          // debugger;
          alert("Folder created");
        }
      },
      error: function (err) {
        alert("Unable to create the folder:" + err);
      },
    });
  } else {
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
  //get the delete id from seesions which stored ussing delid func
  var id = JSON.parse(sessionStorage.getItem("delId"));
  if (Array.isArray(id)) {
    let histUrl = sessionStorage.getItem("history"); //if it is the first directory then it will be null.
    if (histUrl == null) {
      let delList = [];
      for (let i = 0; i < id.length; i++) {
        let path = sessionStorage.getItem("source");
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
        .then(
          (data) =>
            data.status == 200 ? alert("Deleted") : alert("Not Deleted")
          //have run reload function after deleting the file to refresh the page
        )
        .catch((error) => console.log("ERROR:" + error));
    } else {
      let path = sessionStorage.getItem("source");
      path.split(",")[id].trim();
      histUrl += "//" + path;
      // console.log(histUrl);
      fetch("http://127.0.0.1:5000/delete", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(histUrl),
      })
        .then((res) => {
          if (res.ok) {
            console.log("SUCCESSFUL FETCH");
            // res.json();
            return res;
          } else {
            console.log("UNSUCCESSFUL FETCH");
          }
        })
        .then((data) => alert(data))
        .catch((error) => console.log("ERROR:" + error));
    }
  } else {
    let path = sessionStorage.getItem("source");
    let delFile = path.split(",")[id].trim();
    let delUrl = (defUrl += "\\" + delFile);
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
      .then(
        (data) => (data.status == 200 ? alert("Deleted") : alert("Not Deleted"))
        //have run reload function after deleting the file to refresh the page
      )
      .catch((error) => console.log("ERROR:" + error));
  }
}

function clear() {
  var divElement = document.getElementById("folderContent");
  divElement.innerHTML = "";
}
