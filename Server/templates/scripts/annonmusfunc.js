// this functions enables to identify which file is clicked/pressed and redirects to its necessary pages like a sniffer.
$(document).ready(function () {
  // debugger;
  //identifying what item is clicked and grabbing the url of that item from session storage.
  var path = sessionStorage.getItem("source");
  var id = sessionStorage.getItem("id");
  var result = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\";
  result += path.split(",")[id].trim();

  // identifying what type of file is clicked and according to that creating or opening or playing the file.

  //Identifying media file
  let url = result.includes(
    ".mp4",
    ".mkv",
    ".flv",
    ".avi",
    ".mov",
    ".mpeg",
    ".mpg"
  );
  //identifying if it is video file or not
  if (url) {
    if (sessionStorage.length == 2) {
      video(result);
    } else {
      // Fetching past url from session storage.
      let latestUrl = sessionStorage.getItem("history");
      latestUrl += "\\" + path.split(",")[id].trim();
      video(latestUrl);
    }
  }
  //Identifying directory/folder from result
  else if (!result.includes(".")) {
    // debugger;
    //Below if statement will verify that opening of the folder for the first time(for the first time session length will be 2 only) or not..?
    if (sessionStorage.length == 2) {
      //getting last word to past url
      sessionStorage.setItem("history", result);
      getnames(result);
      // $.ajax({
      //   url: "http://127.0.0.1:5000/mnamesloc", //change cheyali
      //   type: "POST",
      //   data: {
      //     url: result,
      //   },
      //   dataType: "json",
      //   success: function (res) {
      //     // debugger;
      //     //getting data from server and creating elements for the data
      //     writeMnames(res);
      //   },
      //   error: function (err) {
      //     alert("unable to load please try again");
      //     console.log(err);
      //   },
      // });
    }
    //opening the dir if it encounters
    else {
      let latestUrl = sessionStorage.getItem("history"); // Fetching past url from session storage.
      let newLink = latestUrl + "\\" + path.split(",")[id].trim(); // Adding slashes with present url and past url.
      sessionStorage.setItem("history", newLink); //Storing present url in session to fetch as past url if necessary.

      getnames(newLink);
      // $.ajax({
      //   url: "http://127.0.0.1:5000/mnamesloc",
      //   type: "POST",
      //   data: {
      //     url: newLink,
      //   },
      //   dataType: "json",
      //   success: function (res) {
      //     // debugger;
      //     //getting data from server and creating elements for the data
      //     writeMnames(res);
      //   },
      //   error: function (err) {
      //     alert("unable to load please try again");
      //     console.log(err);
      //   },
      // });
    }
  }
  //Opening the pdf or notepad or image files and other files will be download.
  else {
    window.open(result, "_self", "toolbar=yes,scrollbars=yes").focus();
  }
});
