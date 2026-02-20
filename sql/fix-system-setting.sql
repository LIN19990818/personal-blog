-- Fix system_setting table column name
ALTER TABLE system_setting CHANGE COLUMN key_name `key` VARCHAR(50) NOT NULL;
