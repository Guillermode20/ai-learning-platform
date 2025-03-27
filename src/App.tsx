import { useState } from 'react';
import { AIService } from './services/aiService';
import { validateAnswer } from './utils/validation';
import { QuestionInfo } from './components/QuestionInfo';
import { Navigation } from './components/Navigation';
import { Feedback } from './components/Feedback';
import { useQuestions } from './hooks/useQuestions';
import { AIResponse } from './types';
import './index.css';

function App() {
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
      <div className="container">
        <h1>{loadError}</h1>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="container">
        <h1>Loading questions...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <QuestionInfo
        question={currentQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />

      <textarea
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer here..."
        className="answer-input"
      />

      {error && <div className="error-message">{error}</div>}

      <button
        onClick={handleMarkAnswer}
        disabled={isMarking}
        className="mark-button"
      >
        {isMarking ? 'Marking...' : 'Mark Answer'}
      </button>

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

export default App;
