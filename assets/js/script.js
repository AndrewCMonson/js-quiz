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
},
{
    q: 'Which method is used to retrieve data from local storage?',
    a: [{ text: 'localStorage.setItem()', isCorrect: false },
        { text: 'localStorage.pushItem()', isCorrect: false },
        { text: 'localStorage.getItem()', isCorrect: true },
        { text: 'localStorage.pullItem()', isCorrect: false}]
},
{
    q: 'Which method selects all elements with the same class type?',
    a: [{ text: 'document.getElementById()', isCorrect: false },
        { text: 'document.getElementByClassName', isCorrect: true },
        { text: 'document.getClasses', isCorrect: false },
        { text: 'document.getElementClasses', isCorrect: false }]
},
{
    q: 'What does JSON.stringify do?',
    a: [{ text: 'Turns non-string data into a string', isCorrect: true },
        { text: 'Gives you spaghetti', isCorrect: false },
        { text: 'Nothing', isCorrect: false },
        { text: 'Calls a guy named Jason', isCorrect: false}]
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
            // console.log(e.target.value); // using to view answers
            answers.push(e.target.value); // pushes answers to global array. will use to decrement timer later and judge score
            // console.log(answers); //using to view answers
        }
    })

    // countdown function that takes seconds as an argument and increments down. It prints the timer to the page, checks the value of the answers array for the correct answer and removes 5 seconds per wrong answer. 
    const countdown = (seconds) => {
        

        const interval = setInterval(() => {
            // prints timer value to timer span
            timer.textContent = seconds;
            console.log(seconds);
            seconds--;

             
            // reduces time displayed if answers are false
            if(answers[0] === 'false'){
                timer.textContent = seconds - 5; 
            }if(answers[1] === 'false'){
                timer.textContent = seconds- 10; 
            }if(answers[2] === 'false'){
                timer.textContent = seconds- 15; 
            }if(answers[3] === 'false'){
                timer.textContent = seconds- 20; 
            }if(answers[4] === 'false'){
                timer.textContent = seconds- 25; 
            }if(answers[5] === 'false'){
                timer.textContent = seconds- 30; 
            }
            
            // once the counter reaches 0, the timer clears and prints "Time's Up" to the document
            if (timer.textContent <= 0){
                clearInterval(interval);
                timer.style.display = 'none';
                option.style.display = 'none';
                question.style.display = 'none';
                submitScore.style.display = 'block';
                quizDiv.style.display = 'flex';
                quizHeader.textContent = 'Time\'s Up!';
                startButton.style.display = 'none';
                setScore();
            }

            // once all answers are submitted, interval is cleared and display changes
            if (answers[0, 1, 2, 3, 4, 5]){
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
                // console.log(score); // used to test score function
            } else {
                score -= 5;
                // console.log(score); // used to test score function
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

    // Event listener that grabs any stored leaderboard info and parses it. creates a "leader" object, pushes that object to the retrieved leaderboard localstorage and then pushes it back to local storage
    leaderboardButton.addEventListener('click', e => {
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
        const leader = {
            name: playerInput.value,
            playerScore: score
        }
        // checks if leaderboard has values. if none, turns it into an empty array. If more than 10, resets the leaderboard.
        if(leaderboard == null){
            leaderboard = [];
        }if(leaderboard.length > 10){
            leaderboard = [];
        }

        localStorage.setItem('leader', JSON.stringify(leader));
        leaderboard.push(leader);
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        // console.log(leaderboard);

        // renders an unordered list of leaders from the leaderboard array
        quizHeader.textContent = 'Scores This Session';
        const leaderList = document.createElement('ul')
        quizDiv.appendChild(leaderList);
        playerInput.style.display = 'none';
        leaderboardButton.style.display = 'none';

        // sorts the leaderboard by highest score
        const sortedLeaderboard = leaderboard.sort((a, b) => {
            return b.playerScore - a.playerScore;
        })
        
        for(let i = 0; i < sortedLeaderboard.length; i++){
            
            const leaderListItem = document.createElement('li');

            leaderListItem.style.listStyleType = 'none';

            leaderListItem.textContent = `Player: ${sortedLeaderboard[i].name} Score: ${sortedLeaderboard[i].playerScore}`

            leaderList.appendChild(leaderListItem);
        } 
        playAgain.style.display = 'inline-block';    
    })
}

playGame();

playAgain.addEventListener('click', e => {
    location.reload();
})


