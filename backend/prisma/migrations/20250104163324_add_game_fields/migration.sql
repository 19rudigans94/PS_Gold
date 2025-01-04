/*
  Warnings:

  - Added the required column `ageRating` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseYear` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "imageUrl" TEXT,
    "genre" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "ageRating" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "isDigital" BOOLEAN NOT NULL DEFAULT false,
    "totalCopies" INTEGER NOT NULL DEFAULT 0,
    "availableCopies" INTEGER NOT NULL DEFAULT 0,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Game" ("availableCopies", "createdAt", "description", "id", "imageUrl", "isDigital", "price", "title", "totalCopies", "updatedAt") SELECT "availableCopies", "createdAt", "description", "id", "imageUrl", "isDigital", "price", "title", "totalCopies", "updatedAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
