-- Fix image data to match actual files
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE image;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert images with actual file names
INSERT INTO image (id, filename, url, location, taken_at, description, sort_order, created_at, updated_at) VALUES
(1, '9541acda-cf99-4a9c-9a02-2aaface82518.jpg', '/uploads/covers/9541acda-cf99-4a9c-9a02-2aaface82518.jpg', 'Hangzhou', '2024-06-15', 'West Lake scenery', 1, NOW(), NOW()),
(2, '979f1864-d38b-4204-8327-5424d92bf4f3.png', '/uploads/covers/979f1864-d38b-4204-8327-5424d92bf4f3.png', 'Shanghai', '2024-07-20', 'The Bund night view', 2, NOW(), NOW()),
(3, 'c031d54a-d2d3-471a-8cce-7c948243c9e1.png', '/uploads/covers/c031d54a-d2d3-471a-8cce-7c948243c9e1.png', 'Beijing', '2024-08-10', 'Forbidden City', 3, NOW(), NOW()),
(4, 'f094d759-df01-47d1-9a09-73da0e5408ef.gif', '/uploads/covers/f094d759-df01-47d1-9a09-73da0e5408ef.gif', 'Chengdu', '2024-09-05', 'Kuanzhai Alley', 4, NOW(), NOW()),
(5, '84f40c6f-44b9-4397-8793-9a5b3d2abca0.png', '/uploads/covers/84f40c6f-44b9-4397-8793-9a5b3d2abca0.png', 'Shenzhen', '2024-10-01', 'Tech Park', 5, NOW(), NOW()),
(6, '5e215024-0d0e-49dd-a6db-5db05017b905.png', '/uploads/covers/5e215024-0d0e-49dd-a6db-5db05017b905.png', 'Xiamen', '2024-11-12', 'Gulangyu Island', 6, NOW(), NOW()),
(7, '4d07f0d3-d706-4696-bb22-fcec34ceeaa6.png', '/uploads/covers/4d07f0d3-d706-4696-bb22-fcec34ceeaa6.png', 'Xian', '2024-12-25', 'Ancient City Wall', 7, NOW(), NOW());
