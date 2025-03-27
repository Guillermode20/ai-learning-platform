export interface Question {
  question_number: string;
  question: string;
  answer: string;
  question_context?: string;
  total_marks: number;
  AO1?: number;
  AO2?: number;
  AO3?: number;
}

export interface AIResponse {
  score: number;
  feedback: string;
}

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}
