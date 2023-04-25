-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "gender" TEXT NOT NULL,
    "dateOfBirth" DATETIME,
    "primaryAddress" TEXT NOT NULL,
    "fathersName" TEXT NOT NULL,
    "mothersName" TEXT NOT NULL,
    "guardianName" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL
);
INSERT INTO "new_Student" ("address", "city", "country", "dateOfBirth", "fathersName", "firstName", "gender", "guardianName", "id", "lastName", "middleName", "mothersName", "primaryAddress", "state") SELECT "address", "city", "country", "dateOfBirth", "fathersName", "firstName", "gender", "guardianName", "id", "lastName", "middleName", "mothersName", "primaryAddress", "state" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
