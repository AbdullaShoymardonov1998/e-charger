-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'OWNER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL DEFAULT 'firstname',
    "last_name" VARCHAR(100) NOT NULL DEFAULT 'lastname',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "role" "UserRole" NOT NULL DEFAULT 'OWNER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
