// Object that contains an array of objects for questions to load onto the page

const Questions = [{
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

// Function that loads questions onto the page based on Questions object
const loadQuestion = () => {
    const question = document.getElementById('q');
    const option = document.getElementById('o');
    

    question.innerHTML = Questions[currentQuestion].q;
    option.innerHTML = '';

    for (let i = 0; i < Questions[currentQuestion].a.length; i++){
        const choice = document.createElement('button');

        choice.type = 'button';
        choice.name = 'answer';
        // choice.value = i;
        choice.id = 'btn' + i;
        choice.style.cursor = 'pointer';
        choice.className = 'btn'

        choice.innerHTML = Questions[currentQuestion].a[i].text;

        
        option.appendChild(choice);

        
    }
}

loadQuestion();

const nextQuestion = () => {
    if (currentQuestion < Questions.length - 1){
        currentQuestion++;
        loadQuestion();
    }
}

document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', e => nextQuestion()));

