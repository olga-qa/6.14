const numDivs = 36;
const maxHits = 3;

let hits = 0;
let firstHitTime = 0;

function round() {
  let divSelector = randomDivId();
  $(divSelector).removeClass("miss");
  $(divSelector).addClass("target");
  $(divSelector).text(hits);

  if(hits === 1) {
    firstHitTime = getTimestamp()
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".row").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $(event.target).removeClass("target");
    $(event.target).text('')
    hits = hits + 1;
    round();
  } else {
    $(event.target).addClass("miss");
  }
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    $(".row").show();
    location.reload();
  });
}

$(document).ready(init);
