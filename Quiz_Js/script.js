let currentQuestion = 0;
let correctAnswers= 0;

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resertEvent);


function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];
        // console.log(q.question);
        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml  += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item =>{
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz();
    }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++;
        // console.log("CERTOU!");
    // }else{
    //     console.log("ERROU!");
    }

    currentQuestion++;
    showQuestion();

}


function finishQuiz(){
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points<30){
        document.querySelector('.scoreText1').innerHTML = 'Ta ruim em?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    }else if(points >= 30 || points <= 70){
        document.querySelector('.scoreText1').innerHTML = 'Muito bom?!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    }else if(points > 70){
        document.querySelector('.scoreText1').innerHTML = 'Perfeito?!';
        document.querySelector('.scorePct').style.color = '#61BF80';
    }

    document.querySelector('.scorePct').innerHTML = `acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
}

function resertEvent(){
     currentQuestion = 0;
     correctAnswers= 0;
    showQuestion();
}



