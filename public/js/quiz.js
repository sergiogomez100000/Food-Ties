let score = 0;
let questionIndex = 0;
const numOfQuestions = $("#card-container").children().length;

$(".card-body").on("click", function (event) {
  event.preventDefault();

  score += parseInt($(event.target)[0].attributes[1].nodeValue);

  let curIdString = "#" + questionIndex;
  let nextIdString = "#" + (questionIndex + 1);
  $(nextIdString).removeClass("d-none");
  $(curIdString).addClass("d-none");
  questionIndex++;
  //if ++ is 10 then do route call to backend to figure out which was best match
  //if points are from 10-17, personality is ADVENTURER
  //else if points are from 18-25, HOMEBODY
  //else if points are from 26-33, SPICY
  //else if points are from 34-40, SWEET
  //if questionIndex === numOfQuestions, call function (determine when we're on last question)
  if (questionIndex === numOfQuestions) {
    // send the data to the server
    // store the result for the user
    // redirect the user to the personality page
    fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    })
      .then((res) => res.json())
      .then(function (data) {
        console.log(data);
      });
  }
});

//create new function with score. will determine what their personality is
//generates personality for user
function genPers() {
  switch (score) {
    case score >= 10 && score <= 17:
      personality = "Adventurer";
      break;
    case score >= 18 && score <= 25:
      personality = "Homebody";
      break;
    case score >= 26 && score <= 33:
      personality = "Sweet";
      break;
    case score >= 34 && score <= 40:
      personality = "Spicy";
      break;
    default:
  }
}
//return info that will render new handlebars page. personality?

//click start button, it will remove d-none from first div for question
//d-none is hide
$("#startBtn").on("click", function (event) {
  event.preventDefault();
  let idString = "#" + questionIndex;
  $(idString).removeClass("d-none");
  $("#startBtn").addClass("d-none");
});
