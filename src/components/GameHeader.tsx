import { Trophy, Star, Crown } from 'lucide-react';
import { GameState } from '@/types/game';
import { Progress } from '@/components/ui/progress';

interface GameHeaderProps {
  gameState: GameState;
}

export function GameHeader({ gameState }: GameHeaderProps) {
  const nextStreakMilestone = Math.ceil(gameState.streak / 5) * 5;
  const progress = (gameState.streak % 5) * 20;

  return (
    <header className="text-center space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 animate-fade-in">
        יעל בן חמו
      </h1>
      <div className="flex justify-center items-center gap-6 bg-white p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500 animate-bounce" />
          <span className="text-2xl font-bold text-gray-800">{gameState.score}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-purple-500" />
            <span className="text-2xl font-bold text-gray-800">{gameState.streak}</span>
          </div>
          <Progress value={progress} className="w-24 h-2" />
        </div>
        <div className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-blue-500" />
          <span className="text-2xl font-bold text-gray-800">{gameState.highestStreak}</span>
        </div>
      </div>
    </header>
  );
}