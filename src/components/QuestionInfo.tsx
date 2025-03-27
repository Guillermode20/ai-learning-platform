import { Question } from '../types';

interface QuestionInfoProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
}

export const QuestionInfo: React.FC<QuestionInfoProps> = ({
  question,
  currentIndex,
  totalQuestions,
}) => {
  return (
    <div className="question-info">
      <span className="question-counter">
        Question {currentIndex + 1} of {totalQuestions}
      </span>
      <h2>{question.question_number}</h2>
      <p className="question-text">{question.question}</p>
      <p>Total Marks: {question.total_marks}</p>
      {question.question_context && (
        <p className="question-context">
          Context: {question.question_context}
        </p>
      )}
    </div>
  );
};
