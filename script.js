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
    
    const data = {
        submitterName: userName,
        submitterEmail: 'Not provided',
        answers: allAnswers,
        timestamp: new Date().toISOString()
    };
    
    try {
        const apiUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:3000/submit-survey'
            : '/.netlify/functions/submit-survey';
            
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            submitted = true;
            setTimeout(() => {
                hideLoading();
                showThankYou();
            }, 800);
        } else {
            hideLoading();
            console.error('Failed to send survey');
            alert('Failed to submit survey. Please try again.');
        }
    } catch (error) {
        hideLoading();
        console.error('Error sending survey:', error);
        alert('Error submitting survey. Please try again.');
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
