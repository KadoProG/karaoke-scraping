/*
  Warnings:

  - A unique constraint covering the columns `[scoringAiId]` on the table `DamAiScores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DamAiScores_scoringAiId_key" ON "DamAiScores"("scoringAiId");
