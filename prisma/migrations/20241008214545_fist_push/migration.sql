-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Streaks" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "streak" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Streaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuanityStreaks" (
    "id" TEXT NOT NULL,
    "streakId" TEXT NOT NULL,
    "quanityId" TEXT NOT NULL,

    CONSTRAINT "QuanityStreaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quanity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quanity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeStreaks" (
    "id" TEXT NOT NULL,
    "streakId" TEXT NOT NULL,
    "timeId" TEXT NOT NULL,

    CONSTRAINT "TimeStreaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Time" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountStreaks" (
    "id" TEXT NOT NULL,
    "streakId" TEXT NOT NULL,
    "countId" TEXT NOT NULL,
    "checkId" TEXT,

    CONSTRAINT "CountStreaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Count" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Count_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkStreaks" (
    "id" TEXT NOT NULL,
    "streakId" TEXT NOT NULL,
    "checkId" TEXT NOT NULL,

    CONSTRAINT "checkStreaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Check" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Check_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Streaks" ADD CONSTRAINT "Streaks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuanityStreaks" ADD CONSTRAINT "QuanityStreaks_streakId_fkey" FOREIGN KEY ("streakId") REFERENCES "Streaks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuanityStreaks" ADD CONSTRAINT "QuanityStreaks_quanityId_fkey" FOREIGN KEY ("quanityId") REFERENCES "Quanity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeStreaks" ADD CONSTRAINT "TimeStreaks_streakId_fkey" FOREIGN KEY ("streakId") REFERENCES "Streaks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeStreaks" ADD CONSTRAINT "TimeStreaks_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountStreaks" ADD CONSTRAINT "CountStreaks_streakId_fkey" FOREIGN KEY ("streakId") REFERENCES "Streaks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountStreaks" ADD CONSTRAINT "CountStreaks_countId_fkey" FOREIGN KEY ("countId") REFERENCES "Count"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountStreaks" ADD CONSTRAINT "CountStreaks_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Check"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkStreaks" ADD CONSTRAINT "checkStreaks_streakId_fkey" FOREIGN KEY ("streakId") REFERENCES "Streaks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkStreaks" ADD CONSTRAINT "checkStreaks_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Check"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
