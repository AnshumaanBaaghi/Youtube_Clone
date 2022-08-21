let videoDetails = JSON.parse(localStorage.getItem("ClickedVideoInformation"));
let title2 = videoDetails.snippet.title
console.log('videoDetails:', title2)
let title = document.querySelector("#title");
title.innerText = title2
if (videoDetails.id.videoId != undefined) {
  var id = videoDetails.id.videoId;
}
else {
  var id = videoDetails.id;
}
let videoConatiner = document.querySelector("#videoConatiner");
const AppendVideos = () => {
  videoConatiner.innerHTML = null;
  let div = document.createElement("div");
  let p = document.createElement("p");
  p.innerText = videoDetails.snippet.title;
  let iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
  iframe.allow = "fullscreen";
  div.append(iframe);
  videoConatiner.append(iframe);
};
AppendVideos()