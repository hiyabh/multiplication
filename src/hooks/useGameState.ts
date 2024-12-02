import { useState, useEffect } from 'react';
import { GameState, GameStats } from '@/types/game';

const INITIAL_STATE: GameState = {
  score: 0,
  streak: 0,
  highestStreak: 0,
  selectedNumber: null,
  currentProblem: null,
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedStats = localStorage.getItem('multiplicationGameStats');
    if (savedStats) {
      const { score, streak, highestStreak } = JSON.parse(savedStats) as GameStats;
      return { ...INITIAL_STATE, score, streak, highestStreak };
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    const stats: GameStats = {
      score: gameState.score,
      streak: gameState.streak,
      highestStreak: gameState.highestStreak,
    };
    localStorage.setItem('multiplicationGameStats', JSON.stringify(stats));
  }, [gameState.score, gameState.streak, gameState.highestStreak]);

  const generateProblem = (selectedNumber: number) => {
    const multiplier = Math.floor(Math.random() * 10) + 1;
    return {
      multiplicand: selectedNumber,
      multiplier,
      answer: selectedNumber * multiplier,
    };
  };

  const selectNumber = (number: number) => {
    setGameState((prev) => ({
      ...prev,
      selectedNumber: number,
      currentProblem: generateProblem(number),
    }));
  };

  const checkAnswer = (userAnswer: number) => {
    if (!gameState.currentProblem) return false;

    const isCorrect = userAnswer === gameState.currentProblem.answer;
    const streakBonus = Math.floor(gameState.streak / 5) * 10;

    setGameState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 10 + streakBonus : prev.score,
      streak: isCorrect ? prev.streak + 1 : 0,
      highestStreak: isCorrect
        ? Math.max(prev.highestStreak, prev.streak + 1)
        : prev.highestStreak,
      currentProblem: isCorrect ? generateProblem(prev.selectedNumber!) : prev.currentProblem,
    }));

    return isCorrect;
  };

  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      selectedNumber: null,
      currentProblem: null,
    }));
  };

  return {
    gameState,
    selectNumber,
    checkAnswer,
    resetGame,
  };
}