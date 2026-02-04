// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_30bsiaa',
    templateId: 'template_1zhuayo',
    publicKey: 'h-INOgtIAD9T-cFDh'
};

const questions = [
    "Will you be my Valentine?"
];

const responses = {};

function initializeQuestions() {
    const container = document.getElementById('questionsContainer');
    
    questions.forEach((question, index) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.innerHTML = `
            <div class="question-text">${index + 1}. ${question}</div>
            <div class="button-group">
                <button class="answer-btn yes-btn" onclick="handleAnswer(${index}, 'yes', this)">
                    Yes
                </button>
                <button class="answer-btn no-btn" onclick="handleAnswer(${index}, 'no', this)">
                    No
                </button>
            </div>
        `;
        container.appendChild(questionCard);
    });
}

function handleAnswer(questionIndex, answer, button) {
    const questionCard = button.closest('.question-card');
    const buttons = questionCard.querySelectorAll('.answer-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('selected');
        btn.disabled = true;
    });
    
    button.classList.add('selected');
    
    responses[questionIndex] = {
        question: questions[questionIndex],
        answer: answer
    };
    
    if (Object.keys(responses).length === questions.length) {
        setTimeout(submitAllAnswers, 500);
    }
}

async function submitAllAnswers() {
    const userName = 'Anonymous';
    
    showLoading();
    
    const allAnswers = Object.keys(responses).map(index => ({
        questionNumber: parseInt(index) + 1,
        question: responses[index].question,
        answer: responses[index].answer
    }));
    
    // Format answers for email
    const answersText = allAnswers.map(item => 
        `Question ${item.questionNumber}: ${item.question}\nAnswer: ${item.answer.toUpperCase()}`
    ).join('\n\n');
    
    const templateParams = {
        submitter_name: userName,
        timestamp: new Date().toLocaleString(),
        answers: answersText,
        answer_1: allAnswers[0]?.answer || 'N/A',
        question_1: allAnswers[0]?.question || 'N/A'
    };
    
    try {
        // Initialize EmailJS (only needed once)
        if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            submitted = true;
            setTimeout(() => {
                hideLoading();
                showThankYou();
            }, 800);
        } else {
            // If EmailJS not configured, just show the thank you message
            console.warn('EmailJS not configured. Skipping email notification.');
            submitted = true;
            setTimeout(() => {
                hideLoading();
                showThankYou();
            }, 800);
        }
    } catch (error) {
        hideLoading();
        console.error('Error sending email:', error);
        // Still show thank you message even if email fails
        submitted = true;
        showThankYou();
    }
}

function showLoading() {
    document.getElementById('surveyHeader').style.display = 'none';
    document.getElementById('questionsContainer').style.display = 'none';
    document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingSpinner').classList.add('hidden');
}

function showThankYou() {
    document.getElementById('questionsContainer').style.display = 'none';
    const answer = responses[0].answer;
    
    if (answer === 'yes') {
        document.getElementById('yesMessage').classList.remove('hidden');
    } else {
        document.getElementById('noMessage').classList.remove('hidden');
    }
}

let submitted = false;

window.addEventListener('beforeunload', function (e) {
    if (!submitted) {
        e.preventDefault();
        e.returnValue = '';
    }
});

if (window.history && window.history.pushState) {
    window.history.pushState('forward', null, window.location.href);
    window.addEventListener('popstate', function() {
        window.history.pushState('forward', null, window.location.href);
    });
}

document.addEventListener('DOMContentLoaded', initializeQuestions);
