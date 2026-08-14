-- CreateTable
CREATE TABLE "Brew" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "grindSize" TEXT NOT NULL,
    "waterAmount" REAL NOT NULL,
    "coffeeAmount" REAL NOT NULL,
    "brewTime" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
