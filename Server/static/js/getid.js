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
    if (historyId === null) {
      //If debuggers is in this, if scope then historyId varible should be "null".If null then it is first id to be set in sessionStorage.
      sessionStorage.setItem("delId", JSON.stringify(presentId));
    } else if (typeof historyId === "string") {
      //If debuggers is in this, else if scope then type of the historyId varible should be "string".
      sessionStorage.removeItem("delId");
      id.push(historyId, presentId);
      sessionStorage.setItem("delId", JSON.stringify(id));
    } else {
      //If debuggers is in this, else scope then type of the historyId varible should be "object".
      sessionStorage.removeItem("delId");
      id = [];
      id.push(...historyId);
      id.push(presentId);
      sessionStorage.setItem("delId", JSON.stringify(id));
    }
  } else {
    //if the debugger is in this "else scope" then user is unchecking the checkbox.
    var uncheckId = btn.id;
    if (historyId.length > 1 || typeof historyId === "object") {
      //If the debugger is in the "if scope" it is a object then it has multiple id in the sessionStorage.
      const filtereddelID = historyId.filter((item) => item !== uncheckId);
      sessionStorage.removeItem("delId");
      //Below stringify is converting the string into json.
      sessionStorage.setItem("delId", JSON.stringify(filtereddelID));
    } else {
      sessionStorage.removeItem("delId");
    }
  }
}
