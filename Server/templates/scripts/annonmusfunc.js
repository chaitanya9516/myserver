(() => {
  // debugger;
  const path = localStorage.getItem("source");
  const id = localStorage.getItem("id");
  var result = path.split(",")[id].trim();
  // console.log(result);
  var video = document.getElementById("video");
  var source = document.createElement("source");

  source.setAttribute(
    "src",
    "C:\\Users\\sushm\\OneDrive\\Desktop\\Pasupulate\\" + result
  );
  source.setAttribute("type", "video/mp4");
  video.appendChild(source);
  video.play();
})();
