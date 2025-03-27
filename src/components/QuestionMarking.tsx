import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AIService } from '../services/aiService';
import { validateAnswer } from '../utils/validation';
import { QuestionInfo } from './QuestionInfo';
import { Navigation } from './Navigation';
import { Feedback } from './Feedback';
import { useQuestions } from '../hooks/useQuestions';
import { AIResponse } from '../types';

function QuestionMarking() {
  const navigate = useNavigate();
  const { paperId: _paperId } = useParams();
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isFirstQuestion,
    isLastQuestion,
    nextQuestion,
    previousQuestion,
    error: loadError
  } = useQuestions();

  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<AIResponse | null>(null);
  const [isMarking, setIsMarking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aiService = new AIService(import.meta.env.VITE_GEMINI_API_KEY);

  const handleMarkAnswer = async () => {
    if (!currentQuestion) return;

    const validation = validateAnswer(userAnswer, currentQuestion.question);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setIsMarking(true);
    setError(null);

    try {
      const result = await aiService.markAnswer(currentQuestion, userAnswer);
      setFeedback(result);
    } catch (error) {
      console.error('Error marking answer:', error);
      setError(error instanceof Error ? error.message : 'Error marking answer');
    } finally {
      setIsMarking(false);
    }
  };

  const handleNextQuestion = () => {
    nextQuestion();
    setUserAnswer('');
    setFeedback(null);
    setError(null);
  };

  const handlePreviousQuestion = () => {
    previousQuestion();
    setUserAnswer('');
    setFeedback(null);
    setError(null);
  };

  if (loadError) {
    return (
      <div className="container p-6 text-center">
        <button
          onClick={() => navigate('/')}
          className="back-button bg-gray-800 hover:bg-gray-700 text-cyan-400 font-bold py-2 px-4 rounded border border-cyan-700 mb-4"
        >
          ← Back to Subjects
        </button>
        <h1 className="text-2xl text-red-400">{loadError}</h1>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="container p-6 text-center">
        <button
          onClick={() => navigate('/')}
          className="back-button bg-gray-800 hover:bg-gray-700 text-cyan-400 font-bold py-2 px-4 rounded border border-cyan-700 mb-4"
        >
          ← Back to Subjects
        </button>
        <h1 className="text-2xl">Loading questions...</h1>
      </div>
    );
  }

  return (
    <div className="container p-6 text-center">
      <button
        onClick={() => navigate('/')}
        className="back-button bg-gray-800 hover:bg-gray-700 text-cyan-400 font-bold py-2 px-4 rounded border border-cyan-700 mb-4"
      >
        ← Back to Subjects
      </button>
      <QuestionInfo
        question={currentQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />

      <textarea
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer here..."
        className="answer-input shadow appearance-none border border-gray-700 rounded w-full p-4 bg-gray-800 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-600"
        rows={6}
      />

      {error && <div className="error-message text-red-400 font-bold my-2">{error}</div>}

      <div className="text-center my-4">
        <button
          onClick={handleMarkAnswer}
          disabled={isMarking}
          className="mark-button bg-cyan-800 hover:bg-cyan-700 text-white font-bold py-2 px-8 rounded border border-cyan-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:border-gray-700 disabled:cursor-not-allowed"
        >
          {isMarking ? 'Marking...' : 'Mark Answer'}
        </button>
      </div>

      {feedback && (
        <Feedback
          feedback={feedback}
          totalMarks={currentQuestion.total_marks}
        />
      )}

      <Navigation
        onPrevious={handlePreviousQuestion}
        onNext={handleNextQuestion}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
      />
    </div>
  );
}

export default QuestionMarking;
