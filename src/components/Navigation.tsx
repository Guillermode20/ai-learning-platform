interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion,
}) => {
  return (
    <div className="navigation">
      <button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="nav-button"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={isLastQuestion}
        className="nav-button"
      >
        Next
      </button>
    </div>
  );
};
