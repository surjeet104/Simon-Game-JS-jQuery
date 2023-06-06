var userClickedPattern=[];
var gamePattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var started=false;
var level=0;

$("document").on("keydown",function(){
    if(!started){
        nextSequence();
        $("level-title").text(`level ${level}`);
        started=true;
    }
});

function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");

    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed");
    },100)
}

function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function nextSequence() {
    level++;
    $("level-title").text(`level ${level}`);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
});
