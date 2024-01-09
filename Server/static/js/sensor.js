// @ts-nocheck

// this functions enables to identify which file is clicked/pressed and redirects to its necessary pages like a sniffer.
$(document).ready(function () {
  // const video = {
  //   player: function (path) {
  //     let folderContent = document.getElementById("folderContent");
  //     let video = document.createElement("VIDEO");
  //     if (video.canPlayType("video/mp4")) {
  //       video.setAttribute("src", "/play_video/" + path);
  //     } else {
  //       video.setAttribute("src", "/play_video/" + path);
  //     }
  //     video.setAttribute("width", "620");
  //     video.setAttribute("height", "640");
  //     video.setAttribute("controls", "controls");
  //     folderContent.appendChild(video);
  //   },
  // };
  let video = {
    player: function (path) {
      let folderContent = document.getElementById("folderContent");
      let video = document.createElement("VIDEO");
      video.setAttribute(
        "src",
        "/play_video?file_name=" + encodeURIComponent(path)
      );
      video.setAttribute("width", "620");
      video.setAttribute("height", "640");
      video.setAttribute("controls", "controls");
      folderContent.appendChild(video);
    },
  };
  var path = sessionStorage.getItem("source");
  if (path === null) return;
  var id = sessionStorage.getItem("id");
  //   let defUrl = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\";
  let result = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\";
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
  //debugger;
  //Verifying if it is a video file or not
  if (vid) {
    // if (sessionStorage.length == 3) {
    debugger;
    if (sessionStorage.length === 2) {
      sessionStorage.setItem("history", result);
      video.player(path.split(",")[id].trim());
    } else {
      // Fetching past url from session storage.

      let url = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\";
      let latestUrl = sessionStorage.getItem("history") + "\\";
      console.log((latestUrl += path.split(",")[id].trim()));
      let commonPrefix = url;
      let resSuffix = latestUrl.replace(commonPrefix, "");
      resSuffix = resSuffix.replace(/\\/g, "/");
      console.log(resSuffix);

      // let video = {
      //   player: function (path) {
      //     let folderContent = document.getElementById("folderContent");
      //     let video = document.createElement("VIDEO");
      //     video.setAttribute(
      //       "src",
      //       "/play_video2?file_name=" + encodeURIComponent(resSuffix)
      //     );
      //     video.setAttribute("width", "620");
      //     video.setAttribute("height", "640");
      //     video.setAttribute("controls", "controls");
      //     folderContent.appendChild(video);
      //   },
      // };

      video.player(resSuffix);
    }
  }
  //Identifying directory
  else if (!result.includes(".")) {
    // debugger;
    if (sessionStorage.length == 2) {
      //if statement will verify that opening of the folder for the first time(for the first time session length will be 2 only) or not..?
      //getting last word to past url
      sessionStorage.setItem("history", result);
      getNames(result);
    } else {
      //opening the dir if it encounters
      debugger;
      let latestUrl = sessionStorage.getItem("history"); // Fetching past url from session storage.
      let newLink = latestUrl + "\\" + path.split(",")[id].trim(); // Adding slashes with present url and past url.
      sessionStorage.setItem("history", newLink); //Storing present url in session to fetch as past url if necessary.
      getNames(newLink);
    }
  } else {
    // $.ajax({
    //   url: "http://127.0.0.1:5000/files",
    //   type: "POST",
    //   dataType: "json",
    //   data: {
    //     url: urlData,
    //   },
    //   success: function (res) {
    //     // debugger;
    //     // if (typeof callback === "function") callback();
    //     // writeMnames(res);
    //     console.log(res);
    //   },
    //   error: function (err) {
    //     alert("unable to load please try again" + err);
    //     console.log(err);
    //   },
    // });

    // let updatedResult = result.replace(/\\/g, "/");
    // let filePath = "file:///" + updatedResult;
    //Opening the pdf or notepad or image files and other files will be download.
    window.open(result, "_self", "toolbar=yes,scrollbars=yes").focus();
    // have to set history overhere
  }
});
