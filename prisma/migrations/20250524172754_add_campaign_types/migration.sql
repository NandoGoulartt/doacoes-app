/*
  Warnings:

  - Added the required column `tipo` to the `Campanha` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoCampanha" AS ENUM ('VAQUINHA', 'ALIMENTE', 'ROUPA');

-- AlterTable
ALTER TABLE "Campanha" ADD COLUMN "busca_doacoes" BOOLEAN NOT NULL DEFAULT false;

-- Atualizar campanhas existentes para o tipo VAQUINHA (mantendo a lógica atual)
ALTER TABLE "Campanha" ADD COLUMN "tipo" "TipoCampanha";
UPDATE "Campanha" SET "tipo" = 'VAQUINHA' WHERE "tipo" IS NULL;
ALTER TABLE "Campanha" ALTER COLUMN "tipo" SET NOT NULL;

-- CreateTable
CREATE TABLE "ItemNecessario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "campanha_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemNecessario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PontoColeta" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "campanha_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PontoColeta_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Doacao" ADD COLUMN "valor" DOUBLE PRECISION;
ALTER TABLE "Doacao" ALTER COLUMN "quantidade" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ItemNecessario" ADD CONSTRAINT "ItemNecessario_campanha_id_fkey" FOREIGN KEY ("campanha_id") REFERENCES "Campanha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PontoColeta" ADD CONSTRAINT "PontoColeta_campanha_id_fkey" FOREIGN KEY ("campanha_id") REFERENCES "Campanha"("id") ON DELETE CASCADE ON UPDATE CASCADE;
