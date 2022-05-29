const SearchFunction = () => {
    const VideoData = async () => {
        try {
            let input = document.querySelector("#searchBox").value;
            let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBa8435yoIOpGjys_Pzu3yH0t52Fn3nQl8&q=${input}&maxResults=20`;
            let promise = await fetch(url);
            let data = await promise.json()
            AppendVideo(data.items)

        } catch (error) {
            console.log('error:', error)

        }
    }
    VideoData()
}
const ChannelData = async (channelId) => {
    try {
        let url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=AIzaSyBa8435yoIOpGjys_Pzu3yH0t52Fn3nQl8`;
        let promise = await fetch(url);
        let data = await promise.json()
        let channelImage = data.items[0].snippet.thumbnails.high.url
        return channelImage;
        // AIzaSyBmr-2p7T11RUWSAzhm5pd7ixZVdxsp1tA

    } catch (error) {
        console.log('error:', error)

    }
}
const videoData2 = async (VideoId) => {
    try {
        let url = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyBa8435yoIOpGjys_Pzu3yH0t52Fn3nQl8&id=${VideoId}`;
        let promise = await fetch(url);
        let data = await promise.json()
        return (data.items[0].statistics.viewCount)
    } catch (error) {

    }
}
const duration2 = async (VideoId) => {
    try {
        let url = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&key=AIzaSyBa8435yoIOpGjys_Pzu3yH0t52Fn3nQl8&id=${VideoId}`;
        let promise = await fetch(url);
        let data = await promise.json()
        console.log('duration:', data.items[0].contentDetails.duration)
        return data.items[0].contentDetails.duration
    } catch (error) {

    }
}
// ------------------------Default Page Start-----------------------------------
const DefaultVideoData = async () => {
    try {
        let promise = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyBa8435yoIOpGjys_Pzu3yH0t52Fn3nQl8&part=snippet&maxResults=20&regionCode=IN`
        );
        let data = await promise.json();
        AppendVideo(data.items)

    } catch (error) {
        console.log('error:', error)

    }
}
DefaultVideoData()
// ------------------------Default Page End-----------------------------------
const AppendVideo = (data) => {
    let container = document.querySelector("#videos");
    container.innerHTML = null;
    data.map(async (element) => {
        let channelImageURL = await ChannelData(element.snippet.channelId)
        if (element.id.videoId != undefined) {
            var videoViews = await videoData2(element.id.videoId)
            var duration = await duration2(element.id.videoId)
        }
        else {
            var videoViews = await videoData2(element.id)
            var duration = await duration2(element.id)
        }
        let durationDiv = document.createElement("div");
        let div = document.createElement("div");
        div.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.setItem("ClickedVideoInformation", JSON.stringify(element))
            window.location.href = "./videoPage.html"
        })
        let div2 = document.createElement("div");
        let div2_1 = document.createElement("div");
        let div2_2 = document.createElement("div");
        let div2_3 = document.createElement("div");
        let p = document.createElement("p");
        let channelName = document.createElement("p");
        channelName.innerText = element.snippet.channelTitle;
        if (element.snippet.title.length <= 70) {
            p.innerText = element.snippet.title;
        }
        else {
            let str = "";
            for (let i = 0; i < 60; i++) {
                str += element.snippet.title[i]
            }
            str += "..."
            p.innerText = str;
        }
        let imageDiv = document.createElement("div");
        imageDiv.setAttribute("id", "imageDiv")
        let image = document.createElement("img");
        image.src = element.snippet.thumbnails.high.url;
        if (element.id.channelId != undefined) {
            image.style.borderRadius = "50%";
            image.style.width = "70%"
            image.style.margin = "auto"
        }
        imageDiv.append(image)
        let channelImage = document.createElement("img")
        channelImage.src = channelImageURL;
        let videoViewsDiv = document.createElement("div");
        let str = "";
        if (videoViews.length > 6) {
            for (let i = 0; i < videoViews.length - 6; i++) {
                str += videoViews[i];
            }
            if (str.length == 1 && videoViews[videoViews.length - 6 != 0]) {
                str = `${str}.${videoViews[videoViews.length - 6]}M views`
            }
            else {
                str = `${str}M views`
            }
        }
        else if (videoViews.length > 3) {
            for (let i = 0; i < videoViews.length - 3; i++) {
                str += videoViews[i];
            }
            str = `${str}K views`
        }
        else {
            str = `${videoViews} views`
        }
        videoViewsDiv.innerText = str;
        let totalDuration = ""
        let flag = false;
        for (let i = 2; i < duration.length - 1; i++) {
            if (duration[i] === "M") {
                flag = true;
                break;
            }
        }
        if (flag) {

            for (let i = 2; i < duration.length - 1; i++) {
                if (duration[i] === "H" || duration[i] === "M") {
                    totalDuration += ":"
                    if (duration[i] === "M" && duration[i + 1] === undefined) {
                        totalDuration += "00"
                        break;
                    }
                    if (duration[i] === "M" && duration[i + 3] === undefined) {
                        totalDuration += "0" + duration[i + 1]
                        break;
                    }
                }
                else {
                    totalDuration += duration[i]
                }
            }
        }
        else{
            if(duration[3]==="S")
            {
                totalDuration+= "0:0"+duration[2];
            }
            else if(duration[4]==="S")
            {
                totalDuration+= "0:"+duration[2]+duration[3];
            }
        }
        if(duration===undefined){
            totalDuration="12:08"
        }
        let durationContainer = document.createElement("div")
        durationDiv.innerText = totalDuration;
        durationContainer.append(durationDiv)
        div2_1.append(channelImage)
        div2_2.append(p, channelName, videoViewsDiv)
        div2.append(div2_1, div2_2, div2_3)
        div.append(imageDiv, div2, durationContainer);
        container.append(div);
    })
}

let menu = document.querySelector("#menu");
let menu2 = document.querySelector("#menu2");
const menuContainer = document.querySelector("#MenuContainer");
const menuContainer2 = document.querySelector("#MenuContainer2");
const videoContainer = document.querySelector("#VideoContainer");
menu.addEventListener("click", (event) => {
    event.preventDefault();
    menu.style.display = "none";
    menu2.style.display = "block";
    menu2.style.opacity = "1";
    menu.style.opacity = "0";
    menuContainer.style.display = "block"
    menuContainer2.style.display = "none"
    videoContainer.style.width = "84.2vw";
    videoContainer.style.marginLeft = "15.8vw"
})
menu2.addEventListener("click", (event) => {
    event.preventDefault();
    menuContainer.style.display = "none";
    menuContainer2.style.display = "block";

    menu2.style.display = "none";
    menu.style.display = "block";
    menu.style.opacity = "1";
    menu2.style.opacity = "0";
    videoContainer.style.width = "95%";
    videoContainer.style.marginLeft = "5%"
})
// let x =new Date();
// let month = x.getMonth()
// console.log('month:', month)
// let day = x.getDate()
// console.log('day:', day)
// let year = x.getFullYear()
// console.log('year:', year)

