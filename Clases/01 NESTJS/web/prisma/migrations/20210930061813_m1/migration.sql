-- CreateTable
CREATE TABLE `Computadoras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marca` VARCHAR(191),
    `tipo` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `fechaSubida` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `disponible` BOOLEAN NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EPN_USUARIO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `apellido` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mascota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mascota` ADD CONSTRAINT `Mascota_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `EPN_USUARIO`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
