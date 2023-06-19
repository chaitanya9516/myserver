// @ts-nocheck

// this functions enables to identify which file is clicked/pressed and redirects to its necessary pages like a sniffer.
$(document).ready(function () {
  // debugger;
  //identifying what item is clicked and grabbing the url of that item from session storage.
  var path = sessionStorage.getItem("source");
  var id = sessionStorage.getItem("id");
  // var result = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\";
  var result = defUrl + "\\";
  result += path.split(",")[id].trim();

  // identifying what type of file is clicked and according to that creating or opening or playing the file.
  //Identifying media file
  let vid = result.includes(
    ".mp4",
    ".mkv",
    ".flv",
    ".avi",
    ".mov",
    ".mpeg",
    ".mpg"
  );
  //identifying if it is video file or not
  if (vid) {
    if (sessionStorage.length == 2) {
      sessionStorage.setItem("history", result);
      video(path.split(",")[id].trim());
    } else {
      // Fetching past url from session storage.
      let latestUrl = sessionStorage.getItem("history");
      let path =
        latestUrl.split("\\")[-1].trim() + "\\" + path.split(",")[id].trim();
      video(path);
    }
  }
  //Identifying directory/folder from result
  else if (!result.includes(".")) {
    // debugger;
    //Below if statement will verify that opening of the folder for the first time(for the first time session length will be 3 only) or not..?
    if (sessionStorage.length == 2) {
      //getting last word to past url
      sessionStorage.setItem("history", result);
      getNames(result);
    }
    //opening the dir if it encounters
    else {
      let latestUrl = sessionStorage.getItem("history"); // Fetching past url from session storage.
      let newLink = latestUrl + "\\" + path.split(",")[id].trim(); // Adding slashes with present url and past url.
      sessionStorage.setItem("history", newLink); //Storing present url in session to fetch as past url if necessary.

      getNames(newLink);
    }
  }
  //Opening the pdf or notepad or image files and other files will be download.
  else {
    // have to set history overhere
    window.open(result, "_self", "toolbar=yes,scrollbars=yes").focus();
  }
});
