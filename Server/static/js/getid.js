// storing id to help the annomusfunc file function to open the files
//This function is used to identify, which element is clicked and get the extact element id then it is store in sessionstorage
function getId(btn) {
  let id = btn.id;
  sessionStorage.setItem("id", id);
}

// storing id to help the del function to delete the files
function delId(btn) {
  let id = [];
  let historyId = JSON.parse(sessionStorage.getItem("delId"));
  if (btn.checked) {
    let presentId = btn.id;
    if (historyId == null) {
      sessionStorage.setItem("delId", JSON.stringify(presentId));
    } else {
      // below if statement is checking there is one or more ID's in the array or not?
      if (Object.keys(historyId).length == 0) {
        sessionStorage.removeItem("delId");
        id.push(historyId, presentId);
        sessionStorage.setItem("delId", JSON.stringify(id));
      } else {
        sessionStorage.removeItem("delId");
        id = [];
        id.push(...historyId);
        id.push(presentId);
        sessionStorage.setItem("delId", JSON.stringify(id));
      }
    }
  } else {
    var uncheckId = btn.id;
    //checking one or more id's in the delId session
    if (historyId.length > 1) {
      const filtereddelID = historyId.filter((item) => item !== uncheckId);
      sessionStorage.removeItem("delId");
      //Below stringify is converting the string into json.
      sessionStorage.setItem("delId", JSON.stringify(filtereddelID));
    } else {
      sessionStorage.removeItem("delId");
    }
  }
}
