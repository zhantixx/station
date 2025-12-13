-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "isStream" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "youtubeId" TEXT;
