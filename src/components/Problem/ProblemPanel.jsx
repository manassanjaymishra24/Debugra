import { BookOpen, Tag } from 'lucide-react';

const PROBLEMS = [
  {
    id: 1, title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'],
    description: `Given an array of integers 'nums' and an integer 'target', return indices of the two numbers such that they add up to 'target'.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' },
    ],
    constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹', 'Only one valid answer exists.'],
  },
];

export default function ProblemPanel() {
  const problem = PROBLEMS[0];

  return (
    <div className="h-100 d-flex flex-column overflow-hidden bg-dark">
      {/* Header */}
      <div className="d-flex align-items-center gap-2 px-3 py-2 flex-shrink-0 border-bottom border-secondary bg-dark bg-opacity-50">
        <BookOpen size={14} className="text-secondary" />
        <span className="small fw-bold text-secondary">Problem</span>
      </div>

      {/* Content */}
      <div className="flex-grow-1 overflow-auto p-3 custom-scrollbar">
        {/* Title */}
        <h5 className="fw-bold mb-2 text-light">
          {problem.id}. {problem.title}
        </h5>

        {/* Tags */}
        <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
          <span className={`badge problem-tag problem-tag-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
          {problem.tags.map((tag) => (
            <span key={tag} className="badge bg-secondary bg-opacity-25 text-info border border-info border-opacity-10 d-flex align-items-center gap-1">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="small text-secondary mb-4 lh-lg">
          {problem.description}
        </p>

        {/* Examples */}
        {problem.examples.map((ex, i) => (
          <div key={i} className="mb-3 p-3 rounded bg-secondary bg-opacity-10 border border-secondary">
            <div className="small fw-bold mb-2 text-light">Example {i + 1}</div>
            <div className="font-monospace small mb-2">
              <div className="mb-1"><span className="text-primary-emphasis fw-bold">Input:</span> <span className="text-secondary">{ex.input}</span></div>
              <div><span className="text-success fw-bold">Output:</span> <span className="text-secondary">{ex.output}</span></div>
            </div>
            {ex.explanation && (
              <div className="small text-muted mt-2 border-top border-secondary pt-2">✦ {ex.explanation}</div>
            )}
          </div>
        ))}

        {/* Constraints */}
        <div className="mt-4">
          <div className="small fw-bold mb-2 d-flex align-items-center gap-2 text-light">
            ✦ Constraints
          </div>
          <ul className="list-unstyled ps-2">
            {problem.constraints.map((c, i) => (
              <li key={i} className="small font-monospace text-secondary mb-1">• {c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
