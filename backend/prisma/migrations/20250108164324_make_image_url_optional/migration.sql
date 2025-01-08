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
    "imageUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Game" ("createdAt", "description", "genre", "id", "imageUrl", "platform", "price", "publisher", "status", "title", "updatedAt") SELECT "createdAt", "description", "genre", "id", "imageUrl", "platform", "price", "publisher", "status", "title", "updatedAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
