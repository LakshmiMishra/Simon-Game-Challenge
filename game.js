var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var levelCount = 0;
var againKeyPressAfterGameOver = true;
//Start the game by pressing any key
//The key should be pressed only once else the game gets manipulated if user press again any key


$(document).keypress(function() {
  if (againKeyPressAfterGameOver) {
    newSequence();
    againKeyPressAfterGameOver = false;
  }
});


//This method is to capture the color button clicks by the computer

function newSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playButtonSounds(randomChosenColour);
  $("#level-title").text("Level " + levelCount);
  levelCount = levelCount + 1;
}
// This method captures the user button clicks in the form of color array User click event
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playButtonSounds(userChosenColour);

  gameResult(userClickedPattern.length - 1);

});



//Compare bith the arrays and find out whether the user memmory is correct
function gameResult(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        //  $("#level-title").text("Level " + levelCount);
        //  levelCount = levelCount + 1;
        newSequence();
      }, 1000);
    }

  } else {
    console.log(userClickedPattern);
    console.log(gamePattern);

    playButtonSounds("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}

//2. Create a new function called playSound() that takes a single input parameter called name.
function playButtonSounds(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  animateButton(name);
}

function animateButton(randomChosenColour) {

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $(".btn " + randomChosenColour).addClass(".pressed");
  setTimeout(function() {}, 100);
  $(".btn " + randomChosenColour).removeClass(".pressed");
}

function startOver() {
  levelCount = 0;
  gamePattern = [];
  userClickedPattern = [];
  againKeyPressAfterGameOver = true;

}
