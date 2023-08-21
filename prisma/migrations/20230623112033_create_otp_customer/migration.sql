-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(100) NOT NULL DEFAULT 'name',
    "last_name" VARCHAR(100) NOT NULL DEFAULT 'surname',
    "phone" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otps" (
    "id" TEXT NOT NULL,
    "otp" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(100) NOT NULL DEFAULT 'phone',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_phone_key" ON "customers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "otps_otp_key" ON "otps"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "otps_phone_key" ON "otps"("phone");
