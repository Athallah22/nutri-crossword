import React from "react";
import type { CrosswordCellData, Question } from "../../types/puzzle";
import { CrosswordCell } from "./CrosswordCell";

interface CrosswordBoardProps {
  matrix: CrosswordCellData[][];
  selectedQuestion: Question | null;
  answeredQuestionIds: string[];
  revealedLetterCoords: Record<string, string>;
  onSelectQuestion: (questionId: string) => void;
  isRoundActive: boolean;
}

export const CrosswordBoard: React.FC<CrosswordBoardProps> = ({
  matrix,
  selectedQuestion,
  answeredQuestionIds,
  revealedLetterCoords,
  onSelectQuestion,
  isRoundActive,
}) => {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;

  const selectedCoords = React.useMemo(() => {
    const set = new Set<string>();
    if (!selectedQuestion) return set;

    for (let i = 0; i < selectedQuestion.answer.length; i++) {
      const r =
        selectedQuestion.direction === "across"
          ? selectedQuestion.row
          : selectedQuestion.row + i;
      const c =
        selectedQuestion.direction === "across"
          ? selectedQuestion.col + i
          : selectedQuestion.col;
      set.add(`${r},${c}`);
    }
    return set;
  }, [selectedQuestion]);

  const handleCellClick = (cell: CrosswordCellData) => {
    if (cell.isBlocked || isRoundActive) return;

    const validQIds = cell.questionIds.filter(
      (id) => !answeredQuestionIds.includes(id)
    );

    if (validQIds.length === 0) {
      return;
    }

    if (validQIds.length === 1) {
      onSelectQuestion(validQIds[0]);
    } else {
      if (selectedQuestion && validQIds.includes(selectedQuestion.id)) {
        const nextQId =
          validQIds.find((id) => id !== selectedQuestion.id) || validQIds[0];
        onSelectQuestion(nextQId);
      } else {
        onSelectQuestion(validQIds[0]);
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-2.5 sm:p-3.5 bg-white dark:bg-[#1E1E20] border-[4px] border-[#171717] dark:border-[#3F3F46] rounded-xl shadow-[6px_6px_0px_#171717] dark:shadow-[6px_6px_0px_#000000] transition-colors duration-200 min-h-0">
      <div
        className="grid gap-1 sm:gap-1.5 w-full max-w-[480px] max-h-[48vh] aspect-[12/11]"
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {matrix.map((rowCells, rIdx) =>
          rowCells.map((cell, cIdx) => {
            const coordKey = `${rIdx},${cIdx}`;
            const isSelected = selectedCoords.has(coordKey);
            const isFilled = cell.questionIds.some((qid) =>
              answeredQuestionIds.includes(qid)
            );
            const hintLetter = revealedLetterCoords[coordKey];

            return (
              <CrosswordCell
                key={coordKey}
                cell={cell}
                isSelected={isSelected}
                isFilled={isFilled}
                hintLetter={hintLetter}
                onClick={() => handleCellClick(cell)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
