import { useState, useEffect } from 'react';
import { Question } from '../types';

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/aqabio23.json')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => {
        console.error('Error loading questions:', error);
        setError('Error loading questions');
      });
  }, []);

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return {
    questions,
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    isFirstQuestion: currentQuestionIndex === 0,
    isLastQuestion: currentQuestionIndex === questions.length - 1,
    totalQuestions: questions.length,
    nextQuestion,
    previousQuestion,
    error,
  };
};
