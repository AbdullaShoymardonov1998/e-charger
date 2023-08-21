/*
  Warnings:

  - You are about to drop the column `plugs` on the `chargers` table. All the data in the column will be lost.
  - You are about to drop the column `qr_code` on the `chargers` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `chargers` table. All the data in the column will be lost.
  - You are about to drop the column `voltage` on the `chargers` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PlugStatus" AS ENUM ('AVAILABLE', 'BUSY', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "PlugTypes" AS ENUM ('CHAdeMO', 'CCS_1', 'CCS_2', 'GB_T_DC');

-- AlterTable
ALTER TABLE "chargers" DROP COLUMN "plugs",
DROP COLUMN "qr_code",
DROP COLUMN "status",
DROP COLUMN "voltage";

-- DropEnum
DROP TYPE "ChargerPlugs";

-- DropEnum
DROP TYPE "ChargerStatus";

-- CreateTable
CREATE TABLE "plugs" (
    "id" TEXT NOT NULL,
    "type" "PlugTypes" NOT NULL DEFAULT 'CCS_1',
    "status" "PlugStatus" NOT NULL DEFAULT 'AVAILABLE',
    "qr_code" TEXT NOT NULL,
    "voltage" TEXT NOT NULL DEFAULT '100',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "charger_id" TEXT NOT NULL,

    CONSTRAINT "plugs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plugs" ADD CONSTRAINT "plugs_charger_id_fkey" FOREIGN KEY ("charger_id") REFERENCES "chargers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
