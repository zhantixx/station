/*
  Warnings:

  - The `excerpt` column on the `articles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "excerpt",
ADD COLUMN     "excerpt" TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "favorites" JSONB,
ALTER COLUMN "role" SET DEFAULT 'reader';

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
