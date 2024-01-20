// @ts-nocheck
$(document).ready(function () {
  var path = sessionStorage.getItem("source");
  var id = sessionStorage.getItem("id");
  if (path === null || id === null) return;
  let result = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\";
  result += path.split(",")[id].trim();

  let videoExt = result.includes(
    ".mp4",
    ".mkv",
    ".flv",
    ".avi",
    ".mov",
    ".mpeg",
    ".mpg"
  );

  //Identifying video files
  if (videoExt) {
    //debugger;
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

    if (sessionStorage.length === 2) {
      sessionStorage.setItem("history", result);
      video.player(path.split(",")[id].trim());
    } else {
      let url = "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\";
      let presentUrl = sessionStorage.getItem("history") + "\\";
      presentUrl += path.split(",")[id].trim();
      sessionStorage.setItem("history", presentUrl);
      //Below code will compare the url variable with presenturl variable
      //then store the difference in ressuffix variable
      //after that replace forwardslash with backslash
      let commonPrefix = url;
      let resSuffix = presentUrl.replace(commonPrefix, "");
      resSuffix = resSuffix.replace(/\\/g, "/");

      video.player(resSuffix);
    }
  }
  //Identifying directory
  else if (!result.includes(".")) {
    // debugger;
    if (sessionStorage.length == 2) {
      sessionStorage.setItem("history", result);
      getNames(result);
    } else {
      //debugger;
      let latestUrl = sessionStorage.getItem("history"); // Fetching past url from session storage.
      let newLink = latestUrl + "\\" + path.split(",")[id].trim(); // Adding slashes with present url and past url.
      sessionStorage.setItem("history", newLink); //Storing present url in session to fetch as past url if necessary.
      getNames(newLink);
    }
  }
  //opening files
  else {
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
