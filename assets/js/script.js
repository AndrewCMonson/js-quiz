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
        { text: 'Document Open Model', isCorrect: false}]
}
]


// Global variables
const gameContainer = document.getElementById('container');
const quizDiv = document.getElementById('quiz-title');
const quizHeader= document.getElementById('qh');
const startButton = document.getElementById('start');
const question = document.getElementById('q');
const option = document.getElementById('o');
const scoreSpan = document.getElementById('score');
const timer = document.getElementById('timer');
const submitScore = document.getElementById('score-submit');
const leaderboardButton = document.getElementById('ldr-brd-add');
const playerInput = document.getElementById('player-input');
const playAgain = document.getElementById('play-again');
const builtBy = document.getElementById('built-by');


let currentQuestion = 0;
let score = 0;
let answers = [];
let leaderboard = [];


const playGame = () => {
// Function that loads questions onto the page based on questions object
    const loadQuestion = () => {
        question.innerHTML = questions[currentQuestion].q; //grabs question from questions object
        option.innerHTML = '';

        // for loop that loops through questions', pulls the answers out and appends a button with attributes to the options div
        for (let i = 0; i < questions[currentQuestion].a.length; i++){
            const choice = document.createElement('button');

            choice.type = 'button';
            choice.name = 'answer';
            choice.id = 'btn' + i;
            choice.style.cursor = 'pointer';
            choice.className = 'btn';
            choice.value = questions[currentQuestion].a[i].isCorrect;
            choice.innerHTML = questions[currentQuestion].a[i].text;

            option.appendChild(choice);
        }
    }

    // Event listener that starts the quiz on click of the start button
    startButton.addEventListener('click', e => {
        quizDiv.style.display = 'none';
        builtBy.style.display = 'none';
        loadQuestion();
        countdown(60);
    })

    // Function responsible for incrementing questions
    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1){
            currentQuestion++;
            loadQuestion();      
        } else {
        question.style.display = 'none';
        option.style.display = 'none';
        }
    }

    // Event listener assigned to each button within the card container div. Once the button is clicked, it moves to the next question by calling the nextQuestion function
    gameContainer.addEventListener('click', e => {
        if (e.target.classList.contains('btn')){
            nextQuestion();
            console.log(e.target.value); // using to view answers
            answers.push(e.target.value); // pushes answers to global array. will use to decrement timer later and judge score
            console.log(answers); //using to view answers
        }
    })

    // countdown function that takes seconds as an argument and increments down. It prints the timer to the page, checks the value of the answers array for the correct answer and removes 5 seconds per wrong answer. 
    const countdown = (seconds) => {
        let counter = seconds;

        const interval = setInterval(() => {
            // prints timer value to timer span
            timer.textContent = counter;
            console.log(counter);
            counter--;

             
            // reduces time displayed if answers are false
            if(answers[0] === 'false'){
                timer.textContent = counter - 5; 
            }if(answers[1] === 'false'){
                timer.textContent = counter - 10; 
            }if(answers[2] === 'false'){
                timer.textContent = counter - 15; 
            }
            
            // once the counter reaches 0, the timer clears and prints "Time's Up" to the document
            if (timer.textContent <= 0){
                clearInterval(interval);
                timer.textContent = 'Time\'s Up';
                console.log('Time\'s Up');
                option.remove();
                question.remove();
            }

            // once all answers are submitted, interval is cleared and display changes
            if (answers[0, 1, 2]){
                clearInterval(interval);
                timer.style.display = 'none';
                quizDiv.style.display = 'flex';
                quizHeader.textContent = 'Quiz Complete';
                startButton.style.display = 'none';
                submitScore.style.display = 'block';
                setScore();
            }
        }, 1000);
    }

    // function to set score and render to DOM
    const setScore = () => {
        for(let i = 0; i < answers.length; i++){
            if(answers[i] === 'true'){
                score += 5;
                console.log(score); // used to test score function
            } else {
                score -= 5;
                console.log(score); // used to test score function
            }
        }

        if(score === 15){
            scoreSpan.textContent = `Your score is ${score}! Great Job!`;
        } else if (score === 10){
            scoreSpan.textContent = `Your score is ${score}. Great try!`
        } else {
            scoreSpan.textContent = `Your score is ${score}. Better luck next time!`
        }
    }

    // Event listener that renders new screen for users to enter their initials to be added to the leaderboard
    submitScore.addEventListener('click', e => {
        playerInput.style.display = 'inline-block';
        quizHeader.textContent = 'Enter Your Initials To Save Your Score!';
        quizDiv.appendChild(playerInput);
        submitScore.style.display = 'none';
        leaderboardButton.style.display = 'inline-block';
        scoreSpan.style.display = 'none';
    })

    // Event listener that pushes scores and names into an array of objects, iterates through the array of objects to gather names and scores, then renders it to the page to display the leaders
    leaderboardButton.addEventListener('click', e => {
        
        leaderboard.push({
            name: playerInput.value,
            playerScore: score
        })

        quizHeader.textContent = 'Scores This Session';
        

        const leaderList = document.createElement('ul')
        quizDiv.appendChild(leaderList);
        playerInput.style.display = 'none';
        leaderboardButton.style.display = 'none';
        // localStorage.setItem('leaders', JSON.stringify(leaderboard));
        console.log(leaderboard);

            
        for(let i = 0; i < leaderboard.length; i++){
            
            const leaderListItem = document.createElement('li');

            leaderListItem.style.listStyleType = 'none';

            leaderListItem.textContent = `Player: ${leaderboard[i].name} Score: ${leaderboard[i].playerScore}`

            leaderList.appendChild(leaderListItem);

            
        } 
        // playAgain.style.display = 'inline-block';    
    })
    
    

}

// const reset = () => {
//     currentQuestion = 0;
//     score = 0;
// }



playGame();



// playAgain.addEventListener('click', e => {
//     reset();
//     playGame();
// })

// TODO local storage for leaderboards

// localStorage.setItem('leaders', leaderboard);