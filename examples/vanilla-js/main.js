var loader = document.querySelector(".loader");
var questionBox = document.querySelector(".question-box");
var startButton = document.querySelector(".question-start");
var nextButton = document.querySelector(".question-next");
var finishButton = document.querySelector(".question-finish");
var startScreen = document.querySelector(".start-screen");

var options = {
  accountID: "",
  audioRecord: true,
  videoRecord: true,
  interviewID: '',
  candidate: {
    email: ''
  }
}

var cog = new CogniCue(options);
cog.ready();

cog.onReady = function() {
  loader.classList.add("hide");
  startScreen.classList.remove("hide");
}

cog.onStart(function() {
  console.log("start........");
})

cog.onUpdate(function(event) {
  console.log("updates", event.data);
})

cog.onStatusUpdate(function(event){
  console.log(event);
  if (event.status === "COMPLETED") {
    nextButton.classList.add("hide");
    finishButton.classList.remove("hide");
  }
});

function questionShow() {
  var data = JSON.parse(localStorage.getItem("activity_data"));
  document.querySelector(".question").innerHTML = data.question.question_text;
}

startButton.addEventListener("click", function() {
  cog.start()
    .then(function() {
      questionShow();
      startScreen.classList.add("hide");
      questionBox.classList.remove("hide");
    })
});

nextButton.addEventListener("click", function() {
  nextButton.setAttribute("disabled", true);
  loader.classList.add("hide");
  cog.stop().then(function() {
    cog.start().then(function() {
      loader.classList.remove("hide");
      nextButton.setAttribute("disabled", false);
      questionShow();
    });
  });
});

finishButton.addEventListener("click", function() {
  cog.stop().then(function() {
    cog.destroy();
    document.querySelector(".finish-screen").classList.remove("hide");
    questionBox.classList.add("hide");
  });
});

