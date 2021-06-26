$(document).ready(function () {
  // PLAYER SECTION //
  var playerSection = $("#player-section");
  var mainPlayerDiv = $("<div>").attr("id", "player-div");
  var videoFrame = $("<iframe>")
    .attr("id", "video-player")
    .attr("frameBorder", 0);
  videoFrame.attr("webkitallowfullscreen");
  videoFrame.attr("mozallowfullscreen");
  videoFrame.attr("allowfullscreen");
  var vidDe = $("<div>").attr("id", "vid-details");
  var vidView = $("<p>");
  var iconDiv = $("<div>").attr("id", "ico");

  var icoHeart = $("<i>").attr("class", "far fa-heart");
  icoHeart.click(function () {
    var fileId = this.id;
    if (this.className.indexOf("liked") != -1) {
//       updateLike(fileId, false);
      icoHeart.attr("class", "far fa-heart notLiked");
    } else {
//       updateLike(fileId, true);
      icoHeart.attr("class", "far fa-heart liked");
    }
  });

  // Function to update likes
  function updateLike(fileId, value) {
    $.ajax({
      type: "PUT",
      url: "https://5d76bf96515d1a0014085cf9.mockapi.io/video/" + fileId,
      dataType: "json",
      data: { isLiked: value },
      success: function (response) {
        console.log(response);
      },
      error: function (request, status, errorThrown) {
        console.log(request);
        console.log(status);
        console.log(errorThrown);
      },
    });
  }

  var icoComment = $("<i>").attr("class", "far fa-comment-alt");

  var icoBookmark = $("<i>").attr("class", "far fa-bookmark");
  icoBookmark.click(function () {
    var fileId = this.id;
    if (this.className.indexOf("saved") != -1) {
//       updateSave(fileId, false);
      icoBookmark.attr("class", "far fa-bookmark notSaved");
    } else {
//       updateSave(fileId, true);
      icoBookmark.attr("class", "far fa-bookmark saved");
    }
  });

  // Function to update saves
  function updateSave(fileId, value) {
    $.ajax({
      type: "PUT",
      url: "https://5d76bf96515d1a0014085cf9.mockapi.io/video/" + fileId,
      dataType: "json",
      data: { isSaved: value },
      success: function (response) {
        console.log(response);
      },
      error: function (request, status, errorThrown) {
        console.log(request);
        console.log(status);
        console.log(errorThrown);
      },
    });
  }

  iconDiv.append(icoHeart, icoComment, icoBookmark);
  vidDe.append(vidView, iconDiv);

  var divVid = $("<div>").attr("id", "vid-d");
  var vidName = $("<h1>");
  var vidDetails = $("<p>").attr("id", "vid-des");

  divVid.append(vidName, vidDetails);
  mainPlayerDiv.append(videoFrame, vidDe, divVid);
  playerSection.append(mainPlayerDiv);
  getVideo(1);

  function getVideo(index) {
    $.get(
      "https://5d76bf96515d1a0014085cf9.mockapi.io/video/" + index,
      function (response) {
        videoFrame.attr(
          "src",
          "https://player.vimeo.com/video/" + response.vimeoId
        );
        var views = parseInt(response.views);
        views = views / 1000 + "k";
        vidView.html(views + " views");
        vidName.html(response.title);
        vidDetails.html(response.description);
        icoHeart.attr("id", response.id);
        if (response.isLiked === "true") {
          icoHeart.attr("class", "far fa-heart liked");
        } else {
          icoHeart.attr("class", "far fa-heart notLiked");
        }

        if (response.isSaved === "true") {
          icoBookmark.attr("class", "far fa-bookmark saved");
        } else {
          icoBookmark.attr("class", "far fa-bookmark notSaved");
        }
        document.body.scrollTop = 80;
        document.documentElement.scrollTop = 80;
      }
    );
  }

  // PLAYLIST SECTION //
  function createPlaylistCard(imgSrc, vidNme, idC) {
    var card = $("<div>").attr("id", "card " + idC);
    if (card.attr("id") == "card 1") {
      card.attr("class", "playlist-card active-card");
    } else {
      card.attr("class", "playlist-card");
    }

    var imageTag = $("<img>").attr("class", "thumbnail").attr("src", imgSrc);
    var headingVid = $("<h3>").attr("class", "playlistHeading").html(vidNme);

    card.append(imageTag, headingVid);
    playlistDiv.append(card);

    card.click(function () {
      var idCard = card.attr("id");
      idCard = idCard.split(" ");
      getVideo(idCard[1]);
      $(".active-card").attr("class", "playlist-card");
      card.attr("class", "playlist-card active-card");
    });
  }

  var playlistDiv = $("<div>").attr("id", "playlist-wrapper");
  playerSection.append(playlistDiv);

  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/playlist",
    function (response) {
      for (var i = 0; i < response.length; i++) {
        createPlaylistCard(response[i].thumbnail, response[i].title, i + 1);
      }
    }
  );
});
