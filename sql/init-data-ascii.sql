-- 个人技术博客初始数据
-- 版本: v1.0.0
-- 创建日期: 2026-02-15

-- 设置字符集
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- 插入默认分类
INSERT INTO `category` (`name`, `slug`, `description`, `sort_order`) VALUES
('tech', 'tech', 'tech articles', 1),
('portfolio', 'portfolio', 'portfolio showcase', 2),
('notes', 'notes', 'life notes', 3);

-- 插入默认标签
INSERT INTO `tag` (`name`, `slug`) VALUES
('React', 'react'),
('TypeScript', 'typescript'),
('Spring Boot', 'spring-boot'),
('MySQL', 'mysql'),
('Docker', 'docker'),
('Frontend', 'frontend'),
('Backend', 'backend'),
('Life', 'life');

-- 插入默认管理员
-- 密码: admin123 (BCrypt加密后的值)
INSERT INTO `admin` (`username`, `password`, `nickname`) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'Administrator');

-- 插入示例城市数据
INSERT INTO `city` (`name`, `latitude`, `longitude`, `visit_count`, `first_visit`, `notes`) VALUES
('Beijing', 39.9042, 116.4074, 10, '2018-05-01', 'Capital city'),
('Shanghai', 31.2304, 121.4737, 8, '2019-03-15', 'Beautiful night view'),
('Hangzhou', 30.2741, 120.1551, 5, '2020-04-20', 'West Lake'),
('Chengdu', 30.5728, 104.0668, 3, '2021-07-10', 'Food capital'),
('Shenzhen', 22.5431, 114.0579, 6, '2019-11-05', 'Tech city');

-- 插入示例系统设置
INSERT INTO `system_setting` (`key`, `value`, `description`) VALUES
('site_name', 'Personal Blog', 'Site name'),
('site_description', 'Tech and Life', 'Site description'),
('background_color', '#f5f5f5', 'Background color'),
('primary_color', '#1890ff', 'Primary color'),
('footer_text', '2026 Personal Blog', 'Footer text');

-- 插入示例音乐数据
INSERT INTO `music` (`title`, `artist`, `album`, `duration`, `url`, `cover_url`, `sort_order`) VALUES
('Night Song', 'Artist', 'Album 1', 240, '/music/song1.mp3', '/images/music/song1.jpg', 1),
('Sunny Day', 'Artist', 'Album 2', 270, '/music/song2.mp3', '/images/music/song2.jpg', 2),
('Rice Field', 'Artist', 'Album 3', 223, '/music/song3.mp3', '/images/music/song3.jpg', 3);
