import { GameHeader } from '@/components/GameHeader';
import { NumberGrid } from '@/components/NumberGrid';
import { ProblemDisplay } from '@/components/ProblemDisplay';
import { useGameState } from '@/hooks/useGameState';

function App() {
  const { gameState, selectNumber, checkAnswer, resetGame } = useGameState();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <GameHeader gameState={gameState} />

        {!gameState.selectedNumber ? (
          <div className="space-y-6">
            <h2 className="text-2xl text-center font-semibold text-gray-800">בחרי מספר לתרגול:</h2>
            <NumberGrid
              onNumberSelect={selectNumber}
              selectedNumber={gameState.selectedNumber}
            />
          </div>
        ) : gameState.currentProblem ? (
          <ProblemDisplay
            multiplicand={gameState.currentProblem.multiplicand}
            multiplier={gameState.currentProblem.multiplier}
            onSubmit={checkAnswer}
            onReset={resetGame}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;