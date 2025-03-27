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
    <div className="navigation flex justify-center gap-4 p-4">
      <button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="nav-button bg-gray-800 hover:bg-gray-700 text-cyan-400 font-bold py-2 px-4 rounded border border-cyan-700 disabled:bg-gray-900 disabled:text-gray-600 disabled:border-gray-700 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={isLastQuestion}
        className="nav-button bg-gray-800 hover:bg-gray-700 text-cyan-400 font-bold py-2 px-4 rounded border border-cyan-700 disabled:bg-gray-900 disabled:text-gray-600 disabled:border-gray-700 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};
