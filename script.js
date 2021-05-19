class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
}

class Quiz {
    index = 0;
    score = 0;

    constructor(questions) {
        this.questions = questions;
    }

    isLast() {
        return this.questions.length === this.index;
    }

    next(answer) {
        if (!this.isLast()) {
            if (this.checkAnswer(answer)) {
                this.score += (100 / (this.questionsNumber()));
            }
            this.index++;
        }
    }

    getCurrentQuestion() {
        return this.questions[this.index];
    }

    number() { // number of current question
        return this.index + 1;
    }

    questionsNumber() { // number of total questions in quiz
        return this.questions.length;
    }

    checkAnswer(index) {
        return this.getCurrentQuestion().answer === this.getCurrentQuestion().choices[index];
    }

    showScore() {
        return this.score.toFixed(2);
    }
}


const questions = [
    new Question("Can I park here?", ["Sorry, I did that.", "It's the same place.", "Only for half an hour."], "Only for half an hour."),
    new Question("What colour will you paint the children's bedroom?", ["I hope it was right.","We can't decide.","It wasn't very difficult."], "We can't decide."),
    new Question("I can't understand this email.", ["Would you like some help?","It's very good.","Don't you know?"], "Would you like some help?"),
    new Question("I'd like two tickets for tomorrow night.", ["How much did you pay?","Afternoon and evening.","I'll just check for you."], "I'll just check for you."),
    new Question("Shall we go to the gym now?", ["I'm too tired.","It's very good.","Not at all."], "I'm too tired."),

];

const quiz = new Quiz(questions);

const btnNext = document.querySelector(".btn-next");
btnNext.addEventListener("click", () => {

    const selectedAnswer = document.querySelector('input[name="choice"]:checked');
    if (selectedAnswer) {
        quiz.next(selectedAnswer.value);
        loadQuestion();
        loadProgressBar();
    }

});

loadQuestion();
function loadQuestion() {
    const questionText = document.querySelector('.question-text');
    const questionNumber = document.querySelector('.question-number');

    if (!quiz.isLast()) {
        loadChoices(shuffleArray(quiz.getCurrentQuestion().choices)); //load shuffled choices
        questionNumber.innerHTML = quiz.number() + "/" + quiz.questionsNumber();
        questionText.innerHTML = quiz.number() + ". " + quiz.getCurrentQuestion().text;

    } else {
        questionText.innerHTML='';
        document.querySelector('#quizForm').innerHTML = 'Your Score : ' + quiz.showScore();
        questionNumber.innerHTML = 'Results';
        btnNext.disabled = true;
    }
}


loadProgressBar();
function loadProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if(!quiz.isLast()){
    progressBar.style.width = `${quiz.number() / quiz.questionsNumber() * 100}%`;

    }else{
        document.querySelector('.progress').remove();
    }
}

function loadChoices(choices) {
    const quizForm = document.querySelector('#quizForm');
    quizForm.innerHTML = '';

    choices.forEach((e, i) => {
        const radiobox = `
        </label>
        <input class="form-check-input" id=${i} type="radio" name="choice" value=${i}> 
            ${e} 
        </label>`

        const formCheck = document.createElement('div')
        formCheck.className = 'form-check';
        formCheck.innerHTML = radiobox;

        quizForm.appendChild(formCheck);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}