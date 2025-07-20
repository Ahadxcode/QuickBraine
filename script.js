const quizData = [
    // 20 questions
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "Which tag is used for a hyperlink?",
        a: "<link>",
        b: "<href>",
        c: "<a>",
        d: "<h>",
        correct: "c",
    },
    {
        question: "Which company developed JavaScript?",
        a: "Mozilla",
        b: "Netscape",
        c: "Google",
        d: "Microsoft",
        correct: "b",
    },
    {
        question: "Which CSS property controls text size?",
        a: "font-weight",
        b: "text-style",
        c: "font-size",
        d: "text-size",
        correct: "c",
    },
    {
        question: "How do you write comments in JavaScript?",
        a: "// comment",
        b: "# comment",
        c: "<!-- comment -->",
        d: "** comment **",
        correct: "a",
    },
    {
        question: "What does DOM stand for?",
        a: "Document Object Model",
        b: "Data Object Management",
        c: "Digital Ordinance Model",
        d: "Desktop Object Model",
        correct: "a",
    },
    {
        question: "Which HTML tag is used for images?",
        a: "<pic>",
        b: "<image>",
        c: "<img>",
        d: "<src>",
        correct: "c",
    },
    {
        question: "What is the default display value of a <div>?",
        a: "inline",
        b: "block",
        c: "inline-block",
        d: "none",
        correct: "b",
    },
    {
        question: "How can you include JavaScript in HTML?",
        a: "<script>",
        b: "<js>",
        c: "<javascript>",
        d: "<code>",
        correct: "a",
    },
    {
        question: "Which method is used to add an element in JS?",
        a: "appendElement()",
        b: "add()",
        c: "appendChild()",
        d: "addNode()",
        correct: "c",
    },
    {
        question: "How do you call a function named `myFunction`?",
        a: "call myFunction()",
        b: "myFunction()",
        c: "myFunction;",
        d: "function.myFunction()",
        correct: "b",
    },
    {
        question: "Which CSS unit is relative to font-size?",
        a: "px",
        b: "em",
        c: "cm",
        d: "%",
        correct: "b",
    },
    {
        question: "Which input type is used for passwords?",
        a: "text",
        b: "input",
        c: "password",
        d: "secure",
        correct: "c",
    },
    {
        question: "Which attribute is used in HTML to name an element?",
        a: "class",
        b: "name",
        c: "id",
        d: "element",
        correct: "c",
    },
    {
        question: "How to create an unordered list?",
        a: "<ul>",
        b: "<ol>",
        c: "<li>",
        d: "<list>",
        correct: "a",
    },
    {
        question: "How to make a comment in CSS?",
        a: "// comment",
        b: "/* comment */",
        c: "# comment",
        d: "<!-- comment -->",
        correct: "b",
    },
    {
        question: "Which symbol is used for ID in CSS?",
        a: ".",
        b: "#",
        c: "*",
        d: "$",
        correct: "b",
    }
];

quizData.sort(() => Math.random() - 0.5); // shuffle

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
const timerDisplay = document.createElement("div")
timerDisplay.style.textAlign = "center"
timerDisplay.style.fontWeight = "bold"
timerDisplay.style.fontSize = "1.2rem"
quiz.prepend(timerDisplay)

let currentQuiz = 0
let score = 0
let timeLeft = 15
let timer

loadQuiz()

function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

    resetTimer()
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

function resetTimer() {
    clearInterval(timer)
    timeLeft = 15
    timerDisplay.innerText = `⏱️ Time left: ${timeLeft}s`
    timer = setInterval(() => {
        timeLeft--
        timerDisplay.innerText = `⏱️ Time left: ${timeLeft}s`
        if (timeLeft <= 0) {
            clearInterval(timer)
            submitBtn.click()
        }
    }, 1000)
}

submitBtn.addEventListener('click', () => {
    clearInterval(timer)
    const answer = getSelected()
    if(answer && answer === quizData[currentQuiz].correct) score++
    currentQuiz++
    if(currentQuiz < quizData.length) {
        loadQuiz()
    } else {
        const highScore = Math.max(score, localStorage.getItem('highScore') || 0)
        localStorage.setItem('highScore', highScore)
        quiz.innerHTML = `
            <h2>You scored ${score}/${quizData.length}</h2>
            <h3>🏆 High Score: ${highScore}</h3>
            <button onclick="location.reload()">Play Again</button>
        `
    }
})
