
var buttonColours = ["red", "blue", "green", "yellow"];
var gamepattern = [];
userClickedPattern = [];

var started = false;
var level =0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
  nextsequence();
   started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour =$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {
  if(gamepattern[currentLevel] === userClickedPattern[currentLevel]){
  if(userClickedPattern.length === gamepattern.length){
    setTimeout(function(){
        nextsequence();
    },1000);
  }
  } else {
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");

     $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    startover();
  
  }
}


function nextsequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomnumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomnumber];
    gamepattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColour);
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
  
  },100);
  }
  
function playSound(name){
    var audio = new Audio ("sounds/"+name+".mp3");
    audio.play();

}



function startover(){
  level=0;
  gamepattern = [];
  started = false;
}