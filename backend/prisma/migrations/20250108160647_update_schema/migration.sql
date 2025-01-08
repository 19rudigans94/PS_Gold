/*
  Warnings:

  - You are about to drop the column `ageRating` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `availableCopies` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `inStock` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `isDigital` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `releaseYear` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `totalCopies` on the `Game` table. All the data in the column will be lost.
  - Made the column `description` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "genre" TEXT NOT NULL,
    "platform" TEXT NOT NULL DEFAULT 'unknown',
    "publisher" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Game" ("createdAt", "description", "genre", "id", "imageUrl", "price", "publisher", "title", "updatedAt") SELECT "createdAt", "description", "genre", "id", "imageUrl", "price", "publisher", "title", "updatedAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
