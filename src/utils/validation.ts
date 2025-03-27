import { ValidationResult } from '../types';

export const calculateMinWordCount = (question: string): number => {
  const questionMarkCount = (question.match(/\?/g) || []).length;
  return Math.max(10, questionMarkCount * 15);
};

export const validateAnswer = (answer: string, question: string): ValidationResult => {
  if (!answer.trim()) {
    return { isValid: false, error: 'Please enter an answer' };
  }

  const minWordCount = calculateMinWordCount(question);
  const wordCount = answer.trim().split(/\s+/).length;

  if (wordCount < minWordCount) {
    return {
      isValid: false,
      error: `Your answer is too short. Please write at least ${minWordCount} words.`
    };
  }

  // Check for excessive repetition of characters
  const repeatedChars = /(.)\1{4,}/;
  if (repeatedChars.test(answer)) {
    return {
      isValid: false,
      error: 'Your answer contains excessive repetition. Please revise to provide a more detailed response.'
    };
  }

  // Check for repeated words
  const words = answer.toLowerCase().split(/\s+/);
  const wordFreq: { [key: string]: number } = {};
  words.forEach(word => {
    if (word.length > 2) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  const maxAllowedFreq = Math.max(3, words.length * 0.3);
  if (Object.values(wordFreq).some(freq => freq > maxAllowedFreq)) {
    return {
      isValid: false,
      error: 'Your answer contains excessive repetition. Please revise to provide a more detailed response.'
    };
  }

  // Check for meaningful content
  if (!answer.includes('.') || !answer.match(/[A-Z].*[.!?]$/)) {
    return {
      isValid: false,
      error: 'Please write complete sentences with proper punctuation.'
    };
  }

  return { isValid: true, error: null };
};
