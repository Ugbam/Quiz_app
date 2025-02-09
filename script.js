const questions = [
    {
        question:"What company was originally called Cadabra?",
        answers: [
            { text: "Microsoft", correct: false},
            { text: " Volkswagen", correct: false},
            { text: "Amazon", correct: true},
            { text: "Target", correct: false},
        ]
    },
    {
        question:"What is the capital city of Australia?",
        answers: [
            { text: "Sydney", correct: false},
            { text: "Canberra", correct: true},
            { text: "Melbourne", correct: false},
            { text: "Brisbane", correct: false},
        ]
    },
    {
        question:"Who discovered electricity?",
        answers: [
            { text: "Issac Newton", correct: false},
            { text: "Nikola Tesla", correct: false},
            { text: "Michael Faraday", correct: false},
            { text: "Benjamin Franklin", correct: true},
        ]  
    },
    {
        question:"What is the largest ocean?",
        answers: [
            { text: "Atlantic Ocean", correct: false},
            { text: "Indian Ocean", correct: false},
            { text: "Pacific Ocean", correct: true},
            { text: "Southern ocean", correct: false},
        ]
    },
    {
        question:"What language is mostly spoken in Brazil?",
        answers: [
            { text: "Spanish", correct: false},
            { text: "Portuguese", correct: true},
            { text: "English", correct: false},
            { text: "French", correct: false},
        ]
    },
    {
        question:"What is the main ingredient in hummus?",
        answers: [
            { text: "Potatoes", correct: false},
            { text: "Lentils", correct: false},
            { text: "Chickpeas", correct: true},
            { text: "White Beans", correct: false},
        ]
    },
    {
        question:"What is the highest-grossing film of all time?",
        answers: [
            { text: "Titanic", correct: false},
            { text: "Avatar", correct: true},
            { text: "Avengers: Endgame", correct: false},
            { text: "Star Wars: The Force Awakens", correct: false},
        ]
    },
    {
        question:"In what decade was the internet created?",
        answers: [
            { text: "1960s", correct: true},
            { text: "1970s", correct: false},
            { text: "1950s", correct: false},
            { text: "1990s", correct: false},
        ]
    },
    {
        question:"Who composed the music for THE NUTCRACKER?",
        answers: [
            { text: "Mozart", correct: false},
            { text: "Beethoven", correct: false},
            { text: "Tchaikovsky", correct: true},
            { text: "Bach", correct: false},
        ]
    },
    {
        question:"What is the strongest muscle in the human body?",
        answers: [
            { text: "Biceps", correct: false},
            { text: "Trapezius", correct: false},
            { text: "Quadriceps", correct: false},
            { text: "Masseter", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressIndicator = document.getElementById("progress-indicator");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    progressIndicator.innerHTML = `Question ${questionNo} of ${questions.length}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    progressIndicator.innerHTML = "";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();