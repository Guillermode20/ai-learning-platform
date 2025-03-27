import { Routes, Route, useNavigate } from 'react-router-dom';
import QuestionMarking from './components/QuestionMarking';
import './index.css';

interface Paper {
  id: string;
  name: string;
  year: number;
}

interface Subject {
  id: string;
  name: string;
  papers: Paper[];
}

function HomePage() {
  const navigate = useNavigate();
  
  const subjects: Subject[] = [
    {
      id: 'biology',
      name: 'Biology',
      papers: [
        {
          id: 'aqabio23p1',
          name: 'AQA Paper 1',
          year: 2023
        }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      papers: []
    }
  ];

  return (
    <div className="container p-4 mx-auto">
      <h1 className="title text-2xl font-bold text-center text-cyan-400 mb-6">Subject Papers</h1>
      <div className="subject-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {subjects.map((subject) => (
          <div key={subject.id} className="subject-card p-4 border border-gray-700 rounded-md bg-gray-800 text-center">
            <h2 className="text-xl font-semibold text-cyan-400 mb-3">{subject.name}</h2>
            <div className="papers-list flex flex-col items-center gap-2">
              {subject.papers.length > 0 ? (
                subject.papers.map((paper) => (
                  <button
                    key={paper.id}
                    className="paper-button bg-gray-800 hover:bg-gray-700 text-cyan-400 font-bold py-2 px-4 rounded border border-cyan-700 w-full"
                    onClick={() => navigate(`/paper/${paper.id}`)}
                  >
                    {paper.name} ({paper.year})
                  </button>
                ))
              ) : (
                <p className="text-gray-400">No papers available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container min-h-screen bg-gray-900 text-gray-200 font-mono pb-8">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paper/:paperId" element={<QuestionMarking />} />
      </Routes>
    </div>
  );
}

export default App;
