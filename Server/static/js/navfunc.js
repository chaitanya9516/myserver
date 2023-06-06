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
// var id = [];
// function delId(btn) {
//   // setting the first id
//   if (btn.checked) {
//     let historyId = JSON.parse(sessionStorage.getItem("delId"));
//     var presentId = btn.id;
//     if (historyId == null) {
//       sessionStorage.setItem("delId", presentId);
//     } else {
//       var pastId = JSON.parse(sessionStorage.getItem("delId"));
//       // below if is checking there is one item in array or not
//       if (Object.keys(pastId).length == 0) {
//         sessionStorage.removeItem("delId");
//         id.push(pastId, presentId);
//         console.log("pushing data into id array:" + id);
//         sessionStorage.setItem("delId", JSON.stringify(id));
//       } else {
//         sessionStorage.removeItem("delId");
//         id = [];
//         id.push(...pastId);
//         id.push(presentId);
//         sessionStorage.setItem("delId", JSON.stringify(id));
//       }
//     }
//   } else {
//     sessionStorage.removeItem("delId");
//   }
// } recent change

var defUrl = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate";
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

function refresh() {
  var history = sessionStorage.getItem("history");
  if (history != null) {
    ajax(history);
  } else {
    ajax(defUrl);
  }
  // 1)get the histurl and fetch all the files from server and use write func
  // 2)if histurl doesnt have anything then use defurl to fetch the data and write
}

function forward() {
  // 1) use histurl to fetch data from server and write
  // let history = sessionStorage.getItem("history");

  if (history != null) {
    ajax(history);
  }
}
