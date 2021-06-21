// PLAYER SECTION //
function getVideo(index) {
  var http1 = new XMLHttpRequest();
  http1.open(
    "GET",
    "https://5d76bf96515d1a0014085cf9.mockapi.io/video/" + index,
    true
  );
  http1.onreadystatechange = function () {
    if (this.readyState === 4) {
      var responceVideo = JSON.parse(this.responseText);
      videoFrame.src =
        "https://player.vimeo.com/video/" + responceVideo.vimeoId;
      vidView.innerHTML = responceVideo.views + " views";
      vidName.innerHTML = responceVideo.title;
      vidDetails.innerHTML = responceVideo.description;
      document.body.scrollTop = 80;
      document.documentElement.scrollTop = 80;
    }
  };
  http1.send();
}

var playerSection = document.getElementById("player-section");

var mainPlayerDiv = document.createElement("div");
mainPlayerDiv.id = "player-div";

var videoFrame = document.createElement("iframe");
videoFrame.id = "video-player";
videoFrame.frameBorder = 0;
videoFrame.webkitallowfullscreen;
videoFrame.mozallowfullscreen;
videoFrame.allowfullscreen;

var vidDe = document.createElement("div");
vidDe.id = "vid-details";

var vidView = document.createElement("p");

var iconDiv = document.createElement("div");
iconDiv.id = "ico";

var icoHeart = document.createElement("i");
icoHeart.className = "far fa-heart";
var icoComment = document.createElement("i");
icoComment.className = "far fa-comment-alt";
var icoBookmark = document.createElement("i");
icoBookmark.className = "far fa-bookmark";

iconDiv.append(icoHeart);
iconDiv.append(icoComment);
iconDiv.append(icoBookmark);

vidDe.append(vidView);
vidDe.append(iconDiv);

var divVid = document.createElement("div");
divVid.id = "vid-d";

var vidName = document.createElement("h1");

var vidDetails = document.createElement("p");
vidDetails.id = "vid-des";

divVid.append(vidName);
divVid.append(vidDetails);

mainPlayerDiv.append(videoFrame);
mainPlayerDiv.append(vidDe);
mainPlayerDiv.append(divVid);

playerSection.append(mainPlayerDiv);
getVideo(1);

// PLAYLIST SECTION //
function createPlaylistCard(imgSrc, vidNme, idC) {
  var card = document.createElement("div");
  card.id = "card " + idC;
  if (card.id == "card 1") {
    card.className = "playlist-card active-card";
  } else {
    card.className = "playlist-card";
  }

  var imageTag = document.createElement("img");
  imageTag.className = "thumbnail";
  imageTag.src = imgSrc;

  var headingVid = document.createElement("h3");
  headingVid.innerHTML = vidNme;

  card.append(imageTag);
  card.append(headingVid);

  playlistDiv.append(card);

  card.addEventListener("click", function () {
    idCard = card.id;
    idCard = idCard.split(" ");
    getVideo(idCard[1]);
    var lastActive = document.getElementsByClassName("active-card");
    lastActive[0].className = "playlist-card";
    card.className = "playlist-card active-card";
  });
}

var playlistDiv = document.createElement("div");
playlistDiv.id = "playlist-wrapper";
playerSection.append(playlistDiv);

var http = new XMLHttpRequest();
http.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/playlist", true);
http.onreadystatechange = function () {
  if (this.readyState === 4) {
    var responcePlaylist = JSON.parse(this.responseText);

    for (var i = 0; i < responcePlaylist.length; i++) {
      createPlaylistCard(
        responcePlaylist[i].thumbnail,
        responcePlaylist[i].title,
        i + 1
      );
    }
  }
};
http.send();
