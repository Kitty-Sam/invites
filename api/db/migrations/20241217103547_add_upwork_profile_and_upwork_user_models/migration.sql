/*
  Warnings:

  - Made the column `lastName` on table `Invite` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "UpworkUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "userName" TEXT,
    "upworkUserId" TEXT,
    "goLoginId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UpworkProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "valueProposition" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    CONSTRAINT "Interview_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UpworkProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserProfiles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserProfiles_A_fkey" FOREIGN KEY ("A") REFERENCES "UpworkProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserProfiles_B_fkey" FOREIGN KEY ("B") REFERENCES "UpworkUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "inviteDuration" INTEGER NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL,
    "expiresIn" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Invite" ("companyName", "createdAt", "email", "expiresIn", "firstName", "id", "inviteDuration", "jobTitle", "lastName", "message", "status", "updatedAt") SELECT "companyName", "createdAt", "email", "expiresIn", "firstName", "id", "inviteDuration", "jobTitle", "lastName", "message", "status", "updatedAt" FROM "Invite";
DROP TABLE "Invite";
ALTER TABLE "new_Invite" RENAME TO "Invite";
CREATE UNIQUE INDEX "Invite_email_key" ON "Invite"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_UserProfiles_AB_unique" ON "_UserProfiles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserProfiles_B_index" ON "_UserProfiles"("B");
