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
    <div className="question-info p-4 border border-gray-700 rounded-md bg-gray-800 text-center mb-4">
      <span className="question-counter font-bold mb-2 block text-cyan-400">
        Question {currentIndex + 1} of {totalQuestions}
      </span>
      <h2 className="text-xl font-semibold mb-3">{question.question_number}</h2>
      <p className="question-text p-3 bg-gray-900 rounded-md border border-gray-700 mb-3">{question.question}</p>
      <p className="font-bold text-cyan-400">Total Marks: {question.total_marks}</p>
      {question.question_context && (
        <p className="question-context p-3 bg-gray-900 rounded-md border border-gray-700 mt-3">
          <span className="text-cyan-400">Context:</span> {question.question_context}
        </p>
      )}
    </div>
  );
};
