-- CreateTable
CREATE TABLE "FirstName" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "FirstName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastName" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "LastName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hometown" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Hometown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occupation" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Occupation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Religion" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Religion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocioeconomicBackground" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "SocioeconomicBackground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyHobby" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "FamilyHobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrewMember" (
    "id" SERIAL NOT NULL,
    "firstNameId" INTEGER NOT NULL,
    "lastNameId" INTEGER NOT NULL,
    "hometownId" INTEGER NOT NULL,
    "occupationId" INTEGER NOT NULL,
    "religionId" INTEGER NOT NULL,
    "socioeconomicBackgroundId" INTEGER NOT NULL,
    "familyHobbyId" INTEGER NOT NULL,

    CONSTRAINT "CrewMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "effects" JSONB NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FirstName_value_key" ON "FirstName"("value");

-- CreateIndex
CREATE UNIQUE INDEX "LastName_value_key" ON "LastName"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Hometown_value_key" ON "Hometown"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Occupation_value_key" ON "Occupation"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Religion_value_key" ON "Religion"("value");

-- CreateIndex
CREATE UNIQUE INDEX "SocioeconomicBackground_value_key" ON "SocioeconomicBackground"("value");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyHobby_value_key" ON "FamilyHobby"("value");

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_firstNameId_fkey" FOREIGN KEY ("firstNameId") REFERENCES "FirstName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_lastNameId_fkey" FOREIGN KEY ("lastNameId") REFERENCES "LastName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_hometownId_fkey" FOREIGN KEY ("hometownId") REFERENCES "Hometown"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_religionId_fkey" FOREIGN KEY ("religionId") REFERENCES "Religion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_socioeconomicBackgroundId_fkey" FOREIGN KEY ("socioeconomicBackgroundId") REFERENCES "SocioeconomicBackground"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewMember" ADD CONSTRAINT "CrewMember_familyHobbyId_fkey" FOREIGN KEY ("familyHobbyId") REFERENCES "FamilyHobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
