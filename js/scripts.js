// declaração de variáveis
const question = document.querySelector('#question')
const answersBox = document.querySelector('#answers-box')
const quizzContainer = document.querySelector('#quizz-container')
const scoreContainer = document.querySelector('#score-container')
const letters = ['a', 'b', 'c', 'd']
let points = 0
let actualQuestion = 0

// Perguntas
const questions = [
  {
    question: 'PHP foi desenvolvido para qual fim?',
    answers: [
      {
        answer: 'back-end',
        correct: true
      },
      {
        answer: 'front-end',
        correct: false
      },
      {
        answer: 'Sistema operacional',
        correct: false
      },
      {
        answer: 'Banco de dados',
        correct: false
      }
    ]
  },
  {
    question: 'O HTML é uma linguagem de:',
    answers: [
      {
        answer: 'Programação',
        correct: false
      },
      {
        answer: 'Estilo',
        correct: false
      },
      {
        answer: 'Marcação',
        correct: true
      },
      {
        answer: 'Dados',
        correct: false
      }
    ]
  },
  {
    question: 'Quem foi o inventor do JavaScript?',
    answers: [
      {
        answer: 'Magaiver',
        correct: false
      },
      {
        answer: 'Linus Trovald',
        correct: false
      },
      {
        answer: 'Steve Jobs',
        correct: false
      },
      {
        answer: 'Brendan Eich',
        correct: true
      }
    ]
  },
  {
    question: 'Qual a linguagem de programação mais popular do mundo?',
    answers: [
      {
        answer: 'JavaScript',
        correct: true
      },
      {
        answer: 'HTML/CSS',
        correct: false
      },
      {
        answer: 'Python',
        correct: false
      },
      {
        answer: 'SQL',
        correct: false
      }
    ]
  }
]

// Substituiçao do quizz para a primeira pergunta
function init() {
  // cria a primeira pergunta
  createQuestion(0)
}

// cria uma pergunta
function createQuestion(i) {
  // limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll('button')
  oldButtons.forEach(btn => btn.remove())

  //   alterar o texto da pergunta
  const questionText = question.querySelector('#question-text')
  const questionNumber = question.querySelector('#question-number')

  questionText.textContent = questions[i].question
  questionNumber.textContent = i + 1

  // insere alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria o template do botão da quizz
    const answerTemplate = document
      .querySelector('.answer-template')
      .cloneNode(true)

    const letterBtn = answerTemplate.querySelector('.btn-letter')
    const answerText = answerTemplate.querySelector('.question-answer')

    letterBtn.textContent = letters[i]
    answerText.textContent = answer['answer']

    answerTemplate.setAttribute('correct-answer', answer['correct'])

    // Remover hide e template class
    answerTemplate.classList.remove('hide')
    answerTemplate.classList.remove('answer-template')

    // Inserir a alternativa na tela
    answersBox.appendChild(answerTemplate)

    // inserir um evento de click no botao
    answerTemplate.addEventListener('click', () => {
      checkAnswer(answerTemplate)
    })
  })

  //   incrementar o número da questão
  actualQuestion++
}

// verificando resposta do usuario
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answersBox.querySelectorAll('button')
  //   verifica se a resposta está correta e adiciona classe nos botoes
  buttons.forEach(button => {
    if (button.getAttribute('correct-answer') === 'true') {
      button.classList.add('correct-answer')
      //   checa se o usuario acertou a pergunta
      if (btn === button) {
        points++
      }
    } else {
      button.classList.add('wrong-answer')
    }
  })

  //  exibir proxima pergunta
  nextQuestion()
}

// Exibe a proxima pergunta do quizz
function nextQuestion() {
  // timer para o usuario ver as respostas
  setTimeout(() => {
    // verifica se inda há pergunta
    if (actualQuestion >= questions.length) {
      // apresenta a msg de sucesso
      showSuccessMessage()
      return
    }

    createQuestion(actualQuestion)
  }, 1000)
}
// Exiibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz()

  //   trocar dados da tela de sucesso
  // Calcular o score
  const score = ((points / questions.length) * 100).toFixed(2)
  const displayScore = document.querySelector('#display-score span')
  displayScore.textContent = score.toString()

  // alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers')
  correctAnswers.textContent = points

  //   altera o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty')
  totalQuestions.textContent = questions.length

  // verifica se o total de perguntas acertadas é menor que 0
  if (points <= 0) {
    const h2 = document.querySelector('#score-container h2')
    h2.textContent = 'Não foi dessa vez! =/'
  }
}

// mostra ou esconde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide')
  scoreContainer.classList.toggle('hide')
}

// Reiniciar Quizz
const restartBtn = document.querySelector('#restart')
restartBtn.addEventListener('click', () => {
  // zerar o jogo
  actualQuestion = 0
  points = 0
  hideOrShowQuizz()
  init()
})

// inicialização do quizz
init()
