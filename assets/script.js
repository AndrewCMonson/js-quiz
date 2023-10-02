// Object that contains an array of objects for questions to load onto the page

const questions = [{
    q: 'Which data type must always be enclosed in quotations?',
    a: [{ text: 'String', isCorrect: true },
        { text: 'Number', isCorrect: false},
        { text: 'Boolean', isCorrect: false },
        { text: 'Undefined', isCorrect: false}]
},
{
    q: 'Which method is used to round a number down in Javascript?',
    a: [{ text: 'Math.random', isCorrect: false},
        { text: 'Math.roundDown', isCorrect: false},
        { text: 'Math.down', isCorrect: false},
        { text: 'Math.floor', isCorrect: true}]
},
{
    q: 'What does DOM stand for?',
    a: [{ text: 'Dominant Object Method', isCorrect: false},
        { text: 'Document Object Model', isCorrect: true},
        { text: 'Distributed Object Model', isCorrect: false},
        { text: 'Document Open Model', isCorrect: true}]
}
]

let currentQuestion = 0;

// Function that loads questions onto the page based on questions object
const loadQuestion = () => {
    const question = document.getElementById('q');
    const option = document.getElementById('o');
    

    question.innerHTML = questions[currentQuestion].q;
    option.innerHTML = '';

    for (let i = 0; i < questions[currentQuestion].a.length; i++){
        const choice = document.createElement('button');

        choice.type = 'button';
        choice.name = 'answer';
        // choice.value = i;
        choice.id = 'btn' + i;
        choice.style.cursor = 'pointer';
        choice.className = 'btn';
        choice.value = questions[currentQuestion].a[i].isCorrect;

        choice.innerHTML = questions[currentQuestion].a[i].text;

        option.appendChild(choice);
    
    }


}

loadQuestion();

// Function responsible for incrementing questions
const nextQuestion = () => {
    if (currentQuestion < questions.length - 1){
        currentQuestion++;
        loadQuestion();      
    } else {
       document.getElementById('o').remove();
       document.getElementById('q').remove();
    }
}

// Event listener assigned to each button within the card container div. Once the button is clicked, it moves to the next question.
const container = document.querySelector('.card-container');

let answers = [];

container.addEventListener('click', e => {
    
    
    if (e.target.classList.contains('btn')){
        nextQuestion();
        console.log(e.target.value); // using to view answers
        answers.push(e.target.value); // pushes answers to global array. will use to decrement timer later and judge score
        console.log(answers); //using to view answers
    }
})


