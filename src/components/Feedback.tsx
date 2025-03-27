import { AIResponse } from '../types';

interface FeedbackProps {
  feedback: AIResponse;
  totalMarks: number;
}

export const Feedback: React.FC<FeedbackProps> = ({ feedback, totalMarks }) => {
  return (
    <div className="feedback p-4 border border-gray-700 rounded-md bg-gray-800 my-4 text-center">
      <div className="feedback-score font-bold mb-2">
        <span className="score-label text-cyan-400">Score: </span>
        <span className="score-value">
          {feedback.score}/{totalMarks}
        </span>
      </div>
      <div className="feedback-text p-4 bg-gray-800 rounded-md border border-gray-700">
        {feedback.feedback}
      </div>
    </div>
  );
};
