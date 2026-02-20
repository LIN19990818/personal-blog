-- Reset and Create Test Data
-- Version: v1.0.0
-- Date: 2026-02-19

SET NAMES utf8mb4;

-- Clear existing data
DELETE FROM article_tag;
DELETE FROM article;
DELETE FROM image;
DELETE FROM city;
DELETE FROM music;
DELETE FROM system_setting;
DELETE FROM tag;
DELETE FROM category;

-- Reset auto increment
ALTER TABLE article AUTO_INCREMENT = 1;
ALTER TABLE category AUTO_INCREMENT = 1;
ALTER TABLE tag AUTO_INCREMENT = 1;
ALTER TABLE image AUTO_INCREMENT = 1;
ALTER TABLE city AUTO_INCREMENT = 1;
ALTER TABLE music AUTO_INCREMENT = 1;
ALTER TABLE system_setting AUTO_INCREMENT = 1;

-- ============================================
-- 1. Category Data
-- ============================================
INSERT INTO category (name, slug, description, sort_order) VALUES
('Tech', 'tech', 'Programming and development', 1),
('Life', 'life', 'Daily life and thoughts', 2),
('Travel', 'travel', 'Travel experiences', 3),
('Reading', 'reading', 'Book reviews', 4),
('Photography', 'photography', 'Photo gallery', 5);

-- ============================================
-- 2. Tag Data
-- ============================================
INSERT INTO tag (name, slug) VALUES
('Java', 'java'),
('Spring Boot', 'spring-boot'),
('React', 'react'),
('TypeScript', 'typescript'),
('MySQL', 'mysql'),
('Docker', 'docker'),
('Frontend', 'frontend'),
('Backend', 'backend'),
('Microservices', 'microservices'),
('Algorithm', 'algorithm'),
('Design Pattern', 'design-pattern'),
('Performance', 'performance');

-- ============================================
-- 3. Article Data
-- ============================================
INSERT INTO article (title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('Spring Boot Guide', 'spring-boot-guide', 
'# Spring Boot Guide\n\nSpring Boot simplifies Spring application development...\n\n## Quick Start\n\n```java\n@SpringBootApplication\npublic class DemoApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(DemoApplication.class, args);\n    }\n}\n```\n\n## Auto Configuration\n\nSpring Boot auto configuration mechanism...', 
'Spring Boot quick start tutorial', 
'/uploads/covers/9541acda-cf99-4a9c-9a02-2aaface82518.jpg', 
1, 1, 128, NOW(), NOW(), NOW());

INSERT INTO article (title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('React Hooks Best Practices', 'react-hooks-best-practices', 
'# React Hooks Best Practices\n\nHooks are new in React 16.8...\n\n## useState Tips\n\n```javascript\nconst [count, setCount] = useState(0);\n```\n\n## useEffect Guide\n\nDependency array usage...', 
'Deep dive into React Hooks', 
'/uploads/covers/979f1864-d38b-4204-8327-5424d92bf4f3.png', 
1, 1, 256, NOW(), NOW(), NOW());

INSERT INTO article (title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('MySQL Performance Tips', 'mysql-performance', 
'# MySQL Performance Tips\n\nDatabase optimization is important...\n\n## Index Optimization\n\nProper index design improves performance...\n\n## Query Optimization\n\nUse EXPLAIN to analyze queries...', 
'MySQL performance optimization guide', 
'/uploads/covers/c031d54a-d2d3-471a-8cce-7c948243c9e1.png', 
1, 1, 89, NOW(), NOW(), NOW());

INSERT INTO article (title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('Docker Deployment Guide', 'docker-deployment', 
'# Docker Deployment Guide\n\nDocker is the most popular container technology...\n\n## Dockerfile\n\n```dockerfile\nFROM openjdk:17\nCOPY target/*.jar app.jar\nENTRYPOINT ["java", "-jar", "/app.jar"]\n```\n\n## Docker Compose\n\nMulti-container orchestration...', 
'Complete Docker deployment tutorial', 
'/uploads/covers/f094d759-df01-47d1-9a09-73da0e5408ef.gif', 
1, 1, 167, NOW(), NOW(), NOW());

INSERT INTO article (title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('Hangzhou West Lake', 'west-lake', 
'# Hangzhou West Lake\n\nWest Lake is a famous scenic spot...\n\n## Broken Bridge\n\nThe Broken Bridge is one of the top ten scenes...\n\n## Leifeng Pagoda\n\nLeifeng Pagoda is a famous tower...', 
'Travel notes of West Lake', 
'/uploads/covers/84f40c6f-44b9-4397-8793-9a5b3d2abca0.png', 
3, 1, 45, NOW(), NOW(), NOW());

INSERT INTO article (title, slug, content, summary, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('Design Patterns Explained', 'design-patterns', 
'# Design Patterns Explained\n\nDesign patterns are proven solutions...\n\n## Singleton\n\nEnsure only one instance exists...\n\n## Factory\n\nDefine interface for creating objects...', 
'Common design patterns explained', 
1, 1, 234, NOW(), NOW(), NOW());

-- ============================================
-- 4. Article Tag Relations
-- ============================================
INSERT INTO article_tag (article_id, tag_id) VALUES
(1, 2), (1, 6),
(2, 3), (2, 4), (2, 7),
(3, 5), (3, 8), (3, 11),
(4, 2), (4, 6), (4, 9),
(5, 12),
(6, 1), (6, 10), (6, 11);

-- ============================================
-- 5. Image Data
-- ============================================
INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('9541acda-cf99-4a9c-9a02-2aaface82518.jpg', '/uploads/covers/9541acda-cf99-4a9c-9a02-2aaface82518.jpg', 'Hangzhou', '2024-06-15', 'West Lake', 1);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('979f1864-d38b-4204-8327-5424d92bf4f3.png', '/uploads/covers/979f1864-d38b-4204-8327-5424d92bf4f3.png', 'Shanghai', '2024-07-20', 'The Bund', 2);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('c031d54a-d2d3-471a-8cce-7c948243c9e1.png', '/uploads/covers/c031d54a-d2d3-471a-8cce-7c948243c9e1.png', 'Beijing', '2024-08-10', 'Forbidden City', 3);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('f094d759-df01-47d1-9a09-73da0e5408ef.gif', '/uploads/covers/f094d759-df01-47d1-9a09-73da0e5408ef.gif', 'Chengdu', '2024-09-05', 'Kuanzhai Alley', 4);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('84f40c6f-44b9-4397-8793-9a5b3d2abca0.png', '/uploads/covers/84f40c6f-44b9-4397-8793-9a5b3d2abca0.png', 'Shenzhen', '2024-10-01', 'Tech Park', 5);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('5e215024-0d0e-49dd-a6db-5db05017b905.png', '/uploads/covers/5e215024-0d0e-49dd-a6db-5db05017b905.png', 'Xiamen', '2024-11-12', 'Gulangyu', 6);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('4d07f0d3-d706-4696-bb22-fcec34ceeaa6.png', '/uploads/covers/4d07f0d3-d706-4696-bb22-fcec34ceeaa6.png', 'Xian', '2024-12-25', 'City Wall', 7);

-- ============================================
-- 6. City Data
-- ============================================
INSERT INTO city (name, latitude, longitude, visit_count, first_visit, notes) VALUES
('Beijing', 39.9042, 116.4074, 15, '2018-03-10', 'Capital city, Great Wall, Forbidden City'),
('Shanghai', 31.2304, 121.4737, 12, '2018-07-15', 'The Bund, Oriental Pearl, Disneyland'),
('Hangzhou', 30.2741, 120.1551, 8, '2019-04-20', 'West Lake, Lingyin Temple, Longjing Tea'),
('Chengdu', 30.5728, 104.0668, 6, '2019-10-01', 'Panda Base, Hot Pot, Kuanzhai Alley'),
('Shenzhen', 22.5431, 114.0579, 10, '2020-01-15', 'Tech City, Window of the World'),
('Xiamen', 24.4798, 118.0894, 5, '2020-06-18', 'Gulangyu, Nanputuo Temple'),
('Xian', 34.3416, 108.9398, 7, '2021-04-05', 'Terracotta Warriors, Big Wild Goose Pagoda'),
('Chongqing', 29.5630, 106.5516, 4, '2021-09-20', 'Mountain City, Hongyadong, Hot Pot'),
('Nanjing', 32.0603, 118.7969, 6, '2022-03-12', 'Sun Yat-sen Mausoleum, Confucius Temple'),
('Suzhou', 31.2989, 120.5853, 5, '2022-08-25', 'Classical Gardens, Tiger Hill');

-- ============================================
-- 7. Music Data (English only to avoid encoding issues)
-- ============================================
INSERT INTO music (title, artist, album, duration, url, cover_url, sort_order) VALUES
('K Song King', 'Eason Chan', 'Anyway Its Me', 224, '/music/k-song-king.mp3', '/images/music/k-song-king.jpg', 1);

INSERT INTO music (title, artist, album, duration, url, cover_url, sort_order) VALUES
('Sunny Day', 'Jay Chou', 'Ye Huimei', 269, '/music/sunny-day.mp3', '/images/music/sunny-day.jpg', 2);

INSERT INTO music (title, artist, album, duration, url, cover_url, sort_order) VALUES
('Nocturne', 'Jay Chou', 'November Chopin', 226, '/music/nocturne.mp3', '/images/music/nocturne.jpg', 3);

INSERT INTO music (title, artist, album, duration, url, cover_url, sort_order) VALUES
('Rice Field', 'Jay Chou', 'Capricorn', 223, '/music/rice-field.mp3', '/images/music/rice-field.jpg', 4);

INSERT INTO music (title, artist, album, duration, url, cover_url, sort_order) VALUES
('Ten Years', 'Eason Chan', 'Black. White. Gray', 206, '/music/ten-years.mp3', '/images/music/ten-years.jpg', 5);

-- ============================================
-- 8. System Settings
-- ============================================
INSERT INTO system_setting (key_name, value, description) VALUES
('site_name', 'My Personal Blog', 'Site Name'),
('site_description', 'Recording tech growth and life', 'Site Description'),
('site_logo', '/images/logo.png', 'Site Logo'),
('site_favicon', '/images/favicon.ico', 'Site Favicon'),
('background_color', '#f5f5f5', 'Background Color'),
('primary_color', '#1890ff', 'Primary Color'),
('footer_text', 'Copyright 2026 My Personal Blog. All rights reserved.', 'Footer Text'),
('icp_record', '', 'ICP Record'),
('seo_keywords', 'tech blog, programming, frontend, backend', 'SEO Keywords'),
('seo_description', 'A personal blog focused on tech sharing', 'SEO Description');
