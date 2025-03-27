import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question, AIResponse } from '../types';

export class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  }

  private createPrompt(question: Question, userAnswer: string): string {
    return `
      You are a Biology A-Level examiner. Mark this student answer against the mark scheme.

      AO1: Know & Understand - Recall facts and basic concepts.
      AO2: Apply - Use knowledge to solve problems and interpret information in various contexts (theoretical, practical, qualitative, quantitative).
      AO3: Analyse & Evaluate - Interpret and evaluate information to draw conclusions and improve scientific processes.
      
      Question: ${question.question}
      ${question.question_context ? `Context: ${question.question_context}` : ''}
      Total Marks: ${question.total_marks}
      Assessment Objectives: ${
        Object.entries(question)
          .filter(([key, value]) => key.startsWith('AO') && value > 0)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')
      }
      
      Mark Scheme: ${question.answer}
      
      Student Answer: ${userAnswer}
      
      Respond ONLY with a JSON object in the following format, with no additional text or explanation:
      {
        "score": <number representing marks awarded>,
        "feedback": "<string explaining what was correct and what was missing>"
      }
    `;
  }

  private parseResponse(text: string): AIResponse {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in response");
    }

    const jsonResponse = JSON.parse(jsonMatch[0]);
    if (typeof jsonResponse.score === 'undefined' || typeof jsonResponse.feedback === 'undefined') {
      throw new Error("Invalid JSON structure");
    }

    return jsonResponse as AIResponse;
  }

  async markAnswer(question: Question, userAnswer: string): Promise<AIResponse> {
    try {
      const prompt = this.createPrompt(question, userAnswer);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseResponse(text);
    } catch (error) {
      console.error('Error in AI marking:', error);
      throw new Error('Failed to mark answer. Please try again.');
    }
  }
}
