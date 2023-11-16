import { useState, useCallback} from "react";
import questions from '../Questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from "./Question.jsx";

export default function Quiz() {
    
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);     

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === questions.length;

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

        setTimeout(() => {
            if (selectedAnswer === questions[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy Icon" />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }


    return (
        <div id="quiz">
                <Question
                key={activeQuestionIndex}
                questionText={questions[activeQuestionIndex].text} 
                answers={questions[activeQuestionIndex].answers}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length-1]}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
                />
        </div>
    );
}
