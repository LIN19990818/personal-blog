-- Database Schema Fix Script
-- Version: v1.0.0
-- Date: 2026-02-19
-- Purpose: Fix database schema to match entity classes

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Fix system_setting table: change key_name to key
DROP TABLE IF EXISTS `system_setting`;
CREATE TABLE `system_setting` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `key` VARCHAR(50) NOT NULL COMMENT 'Setting Key (Unique)',
  `value` TEXT NOT NULL COMMENT 'Setting Value',
  `description` VARCHAR(255) DEFAULT NULL COMMENT 'Description',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated At',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='System Settings';

SET FOREIGN_KEY_CHECKS = 1;

-- Done
SELECT 'Schema fix completed!' AS Status;
