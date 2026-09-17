-- CreateTable
CREATE TABLE "ProjectInquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "projectType" TEXT,
    "budget" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProjectInquiry_email_idx" ON "ProjectInquiry"("email");

-- CreateIndex
CREATE INDEX "ProjectInquiry_createdAt_idx" ON "ProjectInquiry"("createdAt");
