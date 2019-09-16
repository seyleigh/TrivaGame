$(document).ready(function(){

var quiztions = [
{
    question: "Which of Angela's cats did Dwight freeze?",
     choices: ["Bandit", "Sprinkles", "Sparkles", "Princess Lady"],
     answer: "Sprinkles"
},
{
    question: "How long was Pam and Roy's engagement?",
     choices: ["3-4yrs", "6 yrs", "3 mo", "2 yrs"],
     answer: "3-4yrs"
},
{
    question: "What was Michaels username for the online dating site?",
    choices: ["Ready for marriage", "Little kid lover", "Kid crazy", "Looking for women"],
    answer: "Little kid lover"
},
{
    question: "Who doesn't appear in the pilot episdoe",
    choices: ["Creed", "Kelly", "Ryan", "Jan"],
    answer: "Kelly"
},
{
    question: "Who was actually a casting director but played a roll in the show?",
    choices: ["Ryan", "Kelly", "Phyllis", "Oscar"],
    answer: "Phyllis"
},
{
    question: "Name of the stripper that was hried for Bob Vance's bachelor party?",
    choices: ["Catherine", "Elizabeth", "Michelle", "Ashley"],
    answer: "Elizabeth"
},
{
    question: "What flavour Girl Scout cookies did Darryl put Andy down for?",
    choices: ["Tagalongs", "Samoas", "Shortbread", "Thin Mints"],
    answer: "Shortbread"
},
{
    question: "Which of these is not one of Phyllis' 12 cliches?",
    choices: ["No one knows how to drive in the rain", "The plants are going to love this", "It's really coming down out there", "I actually sleeop better when its raining"],
    answer: "It's really coming down out there"
}
];

var yaygif = [
    './assets/images/fuckutoby.gif',
    './assets/images/dwightwig.gif',
    './assets/images/PDA.gif',
    './assets/images/danceoff.gif',
    './assets/images/fingerguns.gif',
    './assets/images/danceboat.gif',
    './assets/images/hugjim.gif',
    './assets/images/kgb.gif'
];

var boogif = [
    './assets/images/nothing.gif',
    './assets/images/honomo.gif',
    './assets/images/displeased.gif',
    './assets/images/moron.gif',
    './assets/images/shush.gif',
    './assets/images/killmyself.gif',
    './assets/images/nope.gif',
    './assets/images/damnit.gif'
];

var timer = 30;
var activeQuestion = 0;
var score = 0;
var wrong = 0;
var clock;

$('#time').hide();

function nextQ() {
    var noMoQuestions = (quiztions.length - 1) === activeQuestion;
    if (noMoQuestions) {
        // console.log('Game over');
        finalTally();
    } else{
    activeQuestion++;
    showQuestion();
    }
}

function outOfTime(){
    clearInterval(clock);
    wrong++;
    runGif('wrong');
    setTimeout(nextQ, 5 * 1000);
}

function countDown () {
    timer--;
    $("#time").html('Time left: ' + timer);

    if (timer === 0) {
        outOfTime();
    }
}

function showQuestion() {
    timer = 30;
    clock = setInterval(countDown, 1000)

    var question = quiztions[activeQuestion].question;
    var choices = quiztions[activeQuestion].choices;
    
    $("#time").html('Time left: ' + timer);
    $("#trivia").html(`
    <h4>${question}</h4>
    ${showChoices(choices)}
    `);
}

function showChoices (choices) {
    var result = '';

    for (var i = 0; i < choices.length; i++) {
        result += `<p class="btn btn-light m-3 choice" data-answer="${choices[i]}">${choices[i]}</p>`
    }
    return result;
}

$(document).on('click', '.choice', function(){
    clearInterval(clock)
    var userChoice = $(this).attr('data-answer');
    var answer = quiztions[activeQuestion].answer;

    if (answer === userChoice) {
        score++;
        runGif('right')
        setTimeout(nextQ, 5 * 1000);
        // console.log('right')
    } else {
        wrong++;
        runGif('wrong')
        setTimeout(nextQ, 5 * 1000);
        // console.log('wrong')
    }
    // console.log('working', userChoice);
});

function finalTally() {
    var total = `
        <h3>You got ${score} right.</h3>
        <h3>You missed ${wrong}.</h3>
        <button class="btn btn-dark btn-lg mb-3" id="restart">Try again?</button>
    `;
    $("#trivia").html(total);
}

$(document).on('click', '#restart', function() {
     timer = 30;
     activeQuestion = 0;
     score = 0;
     wrong = 0;
     clock = null;
     
     showQuestion();
});

function shuffleGif(gif) {
    var shuffle = Math.floor(Math.random() * gif.length);
    var shuffleGif = gif[shuffle];
    return shuffleGif;
}

function runGif(status) {
    var answer = quiztions[activeQuestion].answer;

    if (status === 'right') {
        $('#trivia').html(`
        <h3 class="load-gif">Yay, you're right</h3>
        <img src="${shuffleGif(yaygif)}"/>

        `)
    } else {
        $('#trivia').html(`
        <h4 class="load-gif">NOOOOOOOOO!!!</h4>
        <h4 class="load-gif">The correct choice was: <strong>${answer}</strong></h4>
        <img src="${shuffleGif(boogif)}"/>
        `)
    }
}

$('#doIt').click(function() {
    $('#time').show();
    $('#doIt').remove();
    $('#instructions').remove();
    $('#time').html(timer);
    showQuestion();
});

});

