const questions = [
    {
        question: "Para uma empresa ser considerada sustentável, ela precisa cuidar de qual área além do lucro?",
        answers: [
            { id: 1, text: "Apenas do preço dos concorrentes.", correct: false},
            { id: 2, text: "Do meio ambiente e do bem-estar da sociedade e dos funcionários.", correct: true},
            { id: 3, text: "Somente da decoração bonita do escritório.", correct: false},
            { id: 4, text: "Do aumento de impostos a pagar.", correct: false},
        ]
    },
    {
        question: "O que é o Índice de Sustentabilidade das Empresas?",
        answers: [
            { id: 1, text: "Mede o compromisso com a sustentabilidade ambiental e social.", correct: true},
            { id: 2, text: "Mede apenas o desempenho financeiro das empresas.", correct: false},
            { id: 3, text: "Avalia somente os impactos ambientais das empresas.", correct: false},
            { id: 4, text: "Mede a produtividade e os custos das empresas.", correct: false},
        ]
    },
    {
        question: "Uma empresa quer reduzir seus impactos ambientais sem diminuir sua produção. Qual medida seria mais adequada?",
        answers: [
            { id: 1, text: "Produzir mais produtos para compensar possíveis desperdícios.", correct: false},
            { id: 2, text: "Substituir equipamentos antigos por modelos mais eficientes e reduzir o desperdício de recursos.", correct: true},
            { id: 3, text: "Utilizar mais matéria-prima para garantir maior qualidade dos produtos.", correct: false},
            { id: 4, text: "Aumentar o uso de embalagens para proteger melhor os produtos.", correct: false},
        ]
    },
    {
        question: "Quais são as principais energias sustentáveis que a empresa utiliza?",
        answers: [
            { id: 1, text: "Energia Eólica e Solar.", correct: true},
            { id: 2, text: "Energia Solar e Hidrelétrica.", correct: false},
            { id: 3, text: "Energia Solar e Carvão Mineral.", correct: false},
            { id: 4, text: "Petróleo e Biomassa.", correct: false},
        ]
    },
    {
        question: "Como uma empresa fictícia pode valorizar o pilar social da sustentabilidade na prática?",
        answers: [
            { id: 1, text: "Tratando bem seus funcionários, respeitando os direitos e ajudando a comunidade ao redor.", correct: true},
            { id: 2, text: "Pagando salários abaixo do mínimo e exigindo horas extras sem aviso.", correct: false},
            { id: 3, text: "Impedindo que clientes façam perguntas ou reclamações.", correct: false},
            { id: 4, text: "Demitindo os trabalhadores mais antigos sem justificativa.", correct: false},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function atualizarBarraProgresso(){
    const barra = document.getElementById(`prgsBar`);

    if(barra){
        const porcentagem = ((currentQuestionIndex + 1) / questions.length) * 100;
        barra.style.width = `${porcentagem}%`;
    }
}

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";

    const containerBarra = document.querySelector('.prgsContainer');
    if (containerBarra) containerBarra.style.display = 'block';

    showQuestion();
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    atualizarBarraProgresso();

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer)
        answerButtons.appendChild(button);
    });
}

function selectAnswer(event){
    answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.filter((answer) => answer.correct == true)[0];

    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
    if (isCorrect){
        selectedBtn.classList.add("certinho");
        score++;
    } else{
        selectedBtn.classList.add("erradao");
    }

    Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function end(){
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}! Obrigado por apoiar a turma da 
    1ª série B. Se quiser, você pode ter a chance de refazer o nosso quiz clicando no botão abaixo!`;
    nextButton.innerHTML = "Tente novamente";

    const containerBarra = document.querySelector('.prgsContainer');
    if (containerBarra) containerBarra.style.display = 'none';
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        end();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();