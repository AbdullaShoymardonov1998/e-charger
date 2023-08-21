-- CreateTable
CREATE TABLE "stations" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL DEFAULT 'name',
    "address" VARCHAR(250) NOT NULL DEFAULT 'address',
    "longtitude" VARCHAR(100) NOT NULL DEFAULT '41.311225758289005',
    "latitude" VARCHAR(100) NOT NULL DEFAULT '69.27955278476713',
    "open_time" TEXT NOT NULL DEFAULT '09:00',
    "close_time" TEXT NOT NULL DEFAULT '18:00',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stations" ADD CONSTRAINT "stations_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
