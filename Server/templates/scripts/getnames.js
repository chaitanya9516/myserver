var data;

function getnames(yes) {
  $.ajax({
    url: "http://127.0.0.1:5000/mnamesloc", //change cheyali
    type: "GET",
    dataType: "json",
    success: function (res) {
      data = res;
      localStorage.setItem("source", data);
      for (let i = 0; i < data.length; i++) {
        // debugger;
        document.write("<br>");
        var a = document.createElement("a");
        a.setAttribute("onclick", "getId(this)");
        var linkText = document.createTextNode(data[i]);
        a.appendChild(linkText);
        a.title = data[i];
        a.href =
          "C:\\Users\\sushm\\OneDrive\\Desktop\\Documents\\mypractice\\myserver\\Server\\templates\\videoplayer.html";
        a.id = i;
        document.body.appendChild(a);
      }
    },
    error: function (err) {
      alert("unable to load please try again" + err);
      console.log(err);
    },
  });
}

function getId(btn) {
  debugger;
  let id = btn.id;
  localStorage.setItem("id", id);
}

function showDiv() {
  // debugger;
  const btn = document.getElementById("upload");
  let div = window.getComputedStyle(btn).display;
  if (div == "none") {
    div = document.getElementById("upload").style.display = "block"; //'block'
  } else {
    div = document.getElementById("upload").style.display = "none";
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
