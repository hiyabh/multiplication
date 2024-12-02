import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ENCOURAGEMENT_MESSAGES, STREAK_MESSAGES } from '@/constants/messages';

interface ProblemDisplayProps {
  multiplicand: number;
  multiplier: number;
  onSubmit: (answer: number) => boolean;
  onReset: () => void;
}

export function ProblemDisplay({
  multiplicand,
  multiplier,
  onSubmit,
  onReset,
}: ProblemDisplayProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    if (isNaN(answer)) return;

    const correct = onSubmit(answer);
    setIsCorrect(correct);
    setShowFeedback(true);
    setUserAnswer('');

    if (correct) {
      const randomMessage = ENCOURAGEMENT_MESSAGES[
        Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)
      ];
      setMessage(randomMessage);
      playSound('correct');
    } else {
      setMessage('נסי שוב...');
      playSound('wrong');
    }

    setTimeout(() => {
      setShowFeedback(false);
      setMessage('');
    }, 1500);
  };

  const playSound = (type: 'correct' | 'wrong') => {
    const audio = new Audio(
      type === 'correct'
        ? 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'
        : 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3'
    );
    audio.play().catch(() => {});
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        onClick={onReset}
      >
        <ArrowLeft className="h-4 w-4" />
        חזרה לבחירת מספר
      </Button>

      <div className="text-center space-y-6 bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-4xl font-bold text-gray-800 animate-fade-in">
          {multiplicand} × {multiplier} = ?
        </div>

        <div className="flex justify-center gap-4">
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-32 text-center text-2xl font-bold text-gray-800 border-2 border-gray-200"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
          <Button
            onClick={handleSubmit}
            size="lg"
            className="bg-primary text-white text-xl font-bold px-8 animate-pulse hover:animate-none"
          >
            בדיקה
          </Button>
        </div>

        {showFeedback && (
          <div
            className={cn(
              'text-2xl font-bold transition-all animate-bounce',
              isCorrect ? 'text-green-500' : 'text-red-500'
            )}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}