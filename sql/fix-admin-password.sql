-- Fix admin password
-- Password: 123456
-- BCrypt Hash for '123456'

UPDATE admin SET password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH' WHERE username = 'admin';
