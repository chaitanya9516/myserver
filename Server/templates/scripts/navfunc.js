function back() {
  //debugger; //created a array to split the url and join it
  let newArray = [];
  let history = sessionStorage.getItem("history");
  let myArray = history.split("\\");
  myArray.pop();
  newArray = myArray.join("\\");
  sessionStorage.setItem("history", newArray); //creating the history again to use it again in any oyher case.
  console.log(newArray);

  $.ajax({
    url: "http://127.0.0.1:5000/mnamesloc", //change cheyali
    type: "POST",
    data: {
      url: newArray,
    },
    dataType: "json",
    success: function (res) {
      // debugger;
      // let len = history.split("\\");
      var divElement = document.getElementById("folderContent");
      let divnodelen = divElement.childNodes.length;
      let i = 0;
      while (i < divnodelen) {
        divElement.removeChild(divElement.firstChild);
        i++;
      }
      //getting data from server and creating elements for the data
      writeMnames(res);
    },
    error: function (err) {
      alert("unable to load please try again");
      console.log(err);
    },
  });
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

// storing id to help the del function to delete the files
var id = [];
function delId(btn) {
  // debugger;
  let historyId = JSON.parse(sessionStorage.getItem("delId"));
  var presentId = btn.id;
  if (historyId == null) {
    sessionStorage.setItem("delId", presentId);
  } else {
    var pastId = JSON.parse(sessionStorage.getItem("delId"));
    if (Object.keys(pastId).length == 0) {
      sessionStorage.removeItem("delId");
      id.push(pastId, presentId);
      console.log("pushing data into id array:" + id);
      sessionStorage.setItem("delId", JSON.stringify(id));
    } else {
      sessionStorage.removeItem("delId");
      id = [];
      const pastValues = Object.values(pastId);
      const presentValues = Object.values(presentId);
      console.log("Type of pastValues:" + typeof pastValues);
      console.log("check this:" + pastValues);
      console.log("presentValues:" + presentValues);
      console.log("Type of presentValues:" + typeof presentValues);
      id.push(pastId, presentId);
      console.log("pushing data into id array:" + id);
      sessionStorage.setItem("delId", JSON.stringify(id));
    }
  }
}

function delSupport(int) {
  let path = sessionStorage.getItem("source");
  let delItem = path.split(",")[int].trim();
  return delItem;
}

function del() {
  debugger;
  //get the delete id from seesions which stored ussing delid func
  var id = sessionStorage.getItem("delId");

  if (Array.isArray(id)) {
    let histUrl = sessionStorage.getItem("history"); //if it is the first directory then it will be null.
    if (histUrl == null) {
      let defUrl = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate";
      let delList = [];
      for (let i = 0; i < id.length; i++) {
        //check for loop working properly or not,..?
        let path = sessionStorage.getItem("source");
        path.split(",")[id[i]].trim(); //check
        defUrl += "\\" + path;
        delList.push(defUrl);
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
        .then((data) => alert(data))
        .catch((error) => console.log("ERROR:" + error));
    } else {
      let path = sessionStorage.getItem("source");
      // let delitem = path.split(",")[id].trim(); //didnot removed for reference.
      // histUrl += "//" + delitem;
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
  }
}
// else{

// } copy paste below code

// delete func the above one is new to delete multiple file delete
// let histUrl = sessionStorage.getItem("history"); //if it is the first directory then it will be null.
//   if (histUrl == null) {
//     // write a if else statement to find if its array or not. if its array i have to delete multiple files.
//       let defUrl = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate";
//       let path = sessionStorage.getItem("source");
//       path.split(",")[id[i]].trim(); //check
//       defUrl += "\\" + path;
//       fetch("http://127.0.0.1:5000/delete", {
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify(defUrl),
//       })
//         .then((res) => {
//           if (res.ok) {
//             console.log("SUCCESSFUL FETCH");
//             return res;
//           } else {
//             console.log("UNSUCCESSFUL FETCH");
//           }
//         })
//         .then((data) => alert(data))
//         .catch((error) => console.log("ERROR:" + error));

//   } else {
//     let path = sessionStorage.getItem("source");
//     // let delitem = path.split(",")[id].trim(); //didnot removed for reference.
//     // histUrl += "//" + delitem;
//     path.split(",")[id].trim();
//     histUrl += "//" + path;
//     // console.log(histUrl);
//     fetch("http://127.0.0.1:5000/delete", {
//       method: "POST",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify(histUrl),
//     })
//       .then((res) => {
//         if (res.ok) {
//           console.log("SUCCESSFUL FETCH");
//           // res.json();
//           return res;
//         } else {
//           console.log("UNSUCCESSFUL FETCH");
//         }
//       })
//       .then((data) => alert(data))
//       .catch((error) => console.log("ERROR:" + error));
//   }
