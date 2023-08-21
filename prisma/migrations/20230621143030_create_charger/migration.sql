-- CreateEnum
CREATE TYPE "ChargerStatus" AS ENUM ('AVAILABLE', 'BUSY', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "ChargerPlugs" AS ENUM ('CHAdeMO', 'CCS_1', 'CCS_2', 'GB_T_DC');

-- CreateTable
CREATE TABLE "chargers" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL DEFAULT 'name',
    "station_id" TEXT NOT NULL,
    "voltage" TEXT NOT NULL DEFAULT '100',
    "qr_code" TEXT NOT NULL,
    "status" "ChargerStatus" NOT NULL DEFAULT 'AVAILABLE',
    "plugs" "ChargerPlugs" NOT NULL DEFAULT 'CCS_1',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "chargers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chargers" ADD CONSTRAINT "chargers_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
