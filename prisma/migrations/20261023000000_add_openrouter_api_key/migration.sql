ALTER TABLE `users`
  ADD COLUMN `openrouterApiKeyEncrypted` TEXT NULL,
  ADD COLUMN `openrouterApiKeyLast4` VARCHAR(4) NULL;
