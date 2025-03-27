import { AIResponse } from '../types';

interface FeedbackProps {
  feedback: AIResponse;
  totalMarks: number;
}

export const Feedback: React.FC<FeedbackProps> = ({ feedback, totalMarks }) => {
  return (
    <div className="feedback">
      <div className="feedback-score">
        <span className="score-label">Score: </span>
        <span className="score-value">
          {feedback.score}/{totalMarks}
        </span>
      </div>
      <div className="feedback-text">
        {feedback.feedback}
      </div>
    </div>
  );
};
