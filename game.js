let buttonColours =["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let level=0;
let started=false;

$(document).keydown(function(e){
  let aKey=e.key;
  if(aKey=="a" || aKey=="A"){
    if(!started){
      $("#level-title").text("level "+level);
      nextSequence();
       started=true;
    }
  }
});

function nextSequence(){
   userClickedPattern=[];
   $("#level-title").text("level "+level++);

  let randomNubmer=Math.floor(Math.random() *4);

  let randomChosenColour =buttonColours[randomNubmer];
  // console.log(randomChosenColour);
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);

}

$(".btn").click(function(){
  let userChosenColour = $(this).attr("id");
  // alert(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function playSound(name){
  let colorAudio= new Audio("sounds/"+name+".mp3");
  colorAudio.play();
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
  document.querySelector("#"+currentColour).classList.remove("pressed");
  },100);
//   setTimeout(function () {
// $(YourTarget). removeClass(“classToRemove”);
// }, 100);
}
 // function colorSound(name){
 //    let colorAudio= new Audio("sounds/${name}.mp3");
 //    colorAudio.play();
 // }


 function checkAnswer(currentLevel){
   if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
     if(userClickedPattern.length==gamePattern.length){
       setTimeout(function(){
         nextSequence();
       }, 1000);
     }
   }else{
      playSound("wrong");
      $("#level-title").text("Game over Press A key to start");
        $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      });
      startOver();
   }

 }

 function startOver(){
   level=0;
   gamePattern=[];
   started=false;
 }
