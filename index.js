var userClickedPattern=[];
var gamePattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var started=false;
var level=0;
$(document).keydown(function(){
    if(!started){
        nextSequence();
        $("#level-title").text(`level ${level}`);
        started=true;
    }
});

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text(`Game Over, Press Any Key to Restart`);

        startOver();
    }
}

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
    userClickedPattern=[];

    level++;
    $("#level-title").text(`level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}

