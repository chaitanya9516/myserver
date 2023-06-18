// storing id to help the annomusfunc file function to open the files
//This function is used to identify, which element is clicked and get the extact element id then it is store in sessionstorage
function getId(btn) {
  let id = btn.id;
  sessionStorage.setItem("id", id);
}

// storing id to help the del function to delete the files
var id = [];
function delId(btn) {
  // setting the first id
  if (btn.checked) {
    let historyId = JSON.parse(sessionStorage.getItem("delId"));
    var presentId = btn.id;
    if (historyId == null) {
      sessionStorage.setItem("delId", presentId);
    } else {
      var pastId = JSON.parse(sessionStorage.getItem("delId"));
      // below if is checking there is one item in array or not
      if (Object.keys(pastId).length == 0) {
        sessionStorage.removeItem("delId");
        id.push(pastId, presentId);
        console.log("pushing data into id array:" + id);
        sessionStorage.setItem("delId", JSON.stringify(id));
      } else {
        sessionStorage.removeItem("delId");
        id = [];
        id.push(...pastId);
        id.push(presentId);
        sessionStorage.setItem("delId", JSON.stringify(id));
      }
    }
  } else {
    sessionStorage.removeItem("delId");
  }
}

function title() {
  debugger;
  let headTag = document.getElementById("headTag").innerText;
  let path = sessionStorage.getItem("history");
  if (path === null) {
    headTag = defUrl;
  } else {
    headTag = path;
  }
}
