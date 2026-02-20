-- 创建测试数据
-- 版本: v1.0.0
-- 创建日期: 2026-02-19

SET NAMES utf8mb4;

-- ============================================
-- 1. 管理员数据 (密码: 123456)
-- ============================================
-- 已存在，密码已更新为123456

-- ============================================
-- 2. 分类数据
-- ============================================
INSERT INTO category (name, slug, description, sort_order) VALUES
('技术分享', 'tech', '编程技术、开发经验分享', 1),
('生活随笔', 'life', '日常生活、感悟记录', 2),
('旅行足迹', 'travel', '旅行见闻、风景分享', 3),
('读书笔记', 'reading', '阅读心得、书籍推荐', 4),
('摄影作品', 'photography', '摄影技巧、作品展示', 5);

-- ============================================
-- 3. 标签数据
-- ============================================
INSERT INTO tag (name, slug) VALUES
('Java', 'java'),
('Spring Boot', 'spring-boot'),
('React', 'react'),
('TypeScript', 'typescript'),
('MySQL', 'mysql'),
('Docker', 'docker'),
('前端开发', 'frontend'),
('后端开发', 'backend'),
('微服务', 'microservices'),
('算法', 'algorithm'),
('设计模式', 'design-pattern'),
('性能优化', 'performance');

-- ============================================
-- 4. 文章数据
-- ============================================
INSERT INTO article (title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('Spring Boot 入门指南', 'spring-boot-guide', 
'# Spring Boot 入门指南\n\nSpring Boot 是一个简化 Spring 应用开发的框架...\n\n## 快速开始\n\n```java\n@SpringBootApplication\npublic class DemoApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(DemoApplication.class, args);\n    }\n}\n```\n\n## 自动配置原理\n\nSpring Boot 的自动配置机制...', 
'Spring Boot 快速入门教程，包含自动配置原理和实战示例', 
'/uploads/covers/9541acda-cf99-4a9c-9a02-2aaface82518.jpg', 
1, 1, 128, NOW(), NOW(), NOW());

INSERT INTO article (title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('React Hooks 最佳实践', 'react-hooks-best-practices', 
'# React Hooks 最佳实践\n\nHooks 是 React 16.8 引入的新特性...\n\n## useState 使用技巧\n\n```javascript\nconst [count, setCount] = useState(0);\n```\n\n## useEffect 注意事项\n\n依赖数组的正确使用方式...', 
'深入讲解 React Hooks 的使用技巧和注意事项', 
'/uploads/covers/979f1864-d38b-4204-8327-5424d92bf4f3.png', 
1, 1, 256, NOW(), NOW(), NOW());

INSERT INTO article (title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('MySQL 性能优化总结', 'mysql-performance-optimization', 
'# MySQL 性能优化总结\n\n数据库性能优化是后端开发的重要技能...\n\n## 索引优化\n\n合理的索引设计可以大幅提升查询性能...\n\n## 查询优化\n\n避免全表扫描，使用 EXPLAIN 分析查询计划...', 
'MySQL 数据库性能优化技巧总结，包含索引和查询优化', 
'/uploads/covers/c031d54a-d2d3-471a-8cce-7c948243c9e1.png', 
1, 1, 89, NOW(), NOW(), NOW());

INSERT INTO article (title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('Docker 容器化部署实战', 'docker-deployment-guide', 
'# Docker 容器化部署实战\n\nDocker 是目前最流行的容器化技术...\n\n## Dockerfile 编写\n\n```dockerfile\nFROM openjdk:17\nCOPY target/*.jar app.jar\nENTRYPOINT ["java", "-jar", "/app.jar"]\n```\n\n## Docker Compose 编排\n\n多容器应用的编排配置...', 
'Docker 容器化部署完整教程，从 Dockerfile 到 Compose 编排', 
'/uploads/covers/f094d759-df01-47d1-9a09-73da0e5408ef.gif', 
1, 1, 167, NOW(), NOW(), NOW());

INSERT INTO article (title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('杭州西湖游记', 'hangzhou-west-lake', 
'# 杭州西湖游记\n\n西湖，位于浙江省杭州市西湖区，是中国大陆首批国家重点风景名胜区...\n\n## 断桥残雪\n\n断桥位于白堤东端，是西湖十景之一...\n\n## 雷峰塔\n\n雷峰塔又名皇妃塔、西关砖塔...', 
'杭州西湖一日游，记录美丽的风景和难忘的回忆', 
'/uploads/covers/84f40c6f-44b9-4397-8793-9a5b3d2abca0.png', 
3, 1, 45, NOW(), NOW(), NOW());

INSERT INTO article (title, slug, content, summary, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('深入理解设计模式', 'design-patterns-explained', 
'# 深入理解设计模式\n\n设计模式是软件工程中经过验证的解决方案...\n\n## 单例模式\n\n确保一个类只有一个实例...\n\n## 工厂模式\n\n定义创建对象的接口...', 
'详解常用设计模式，包含单例、工厂、观察者等模式', 
1, 1, 234, NOW(), NOW(), NOW());

-- ============================================
-- 5. 文章标签关联数据
-- ============================================
INSERT INTO article_tag (article_id, tag_id) VALUES
(1, 2), (1, 6), -- Spring Boot + Docker
(2, 3), (2, 4), (2, 7), -- React + TypeScript + 前端
(3, 5), (3, 8), (3, 11), -- MySQL + 后端 + 性能优化
(4, 2), (4, 6), (4, 9), -- Spring Boot + Docker + 微服务
(5, 12), -- 摄影作品
(6, 1), (6, 10), (6, 11); -- Java + 算法 + 设计模式

-- ============================================
-- 6. 图片数据
-- ============================================
INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('9541acda-cf99-4a9c-9a02-2aaface82518.jpg', '/uploads/covers/9541acda-cf99-4a9c-9a02-2aaface82518.jpg', '杭州', '2024-06-15', '西湖美景', 1);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('979f1864-d38b-4204-8327-5424d92bf4f3.png', '/uploads/covers/979f1864-d38b-4204-8327-5424d92bf4f3.png', '上海', '2024-07-20', '外滩夜景', 2);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('c031d54a-d2d3-471a-8cce-7c948243c9e1.png', '/uploads/covers/c031d54a-d2d3-471a-8cce-7c948243c9e1.png', '北京', '2024-08-10', '故宫一角', 3);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('f094d759-df01-47d1-9a09-73da0e5408ef.gif', '/uploads/covers/f094d759-df01-47d1-9a09-73da0e5408ef.gif', '成都', '2024-09-05', '宽窄巷子', 4);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('84f40c6f-44b9-4397-8793-9a5b3d2abca0.png', '/uploads/covers/84f40c6f-44b9-4397-8793-9a5b3d2abca0.png', '深圳', '2024-10-01', '科技园区', 5);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('5e215024-0d0e-49dd-a6db-5db05017b905.png', '/uploads/covers/5e215024-0d0e-49dd-a6db-5db05017b905.png', '厦门', '2024-11-12', '鼓浪屿', 6);

INSERT INTO image (filename, url, location, taken_at, description, sort_order) VALUES
('4d07f0d3-d706-4696-bb22-fcec34ceeaa6.png', '/uploads/covers/4d07f0d3-d706-4696-bb22-fcec34ceeaa6.png', '西安', '2024-12-25', '古城墙', 7);

-- ============================================
-- 7. 城市数据
-- ============================================
DELETE FROM city;
INSERT INTO city (name, latitude, longitude, visit_count, first_visit, notes) VALUES
('北京', 39.9042, 116.4074, 15, '2018-03-10', '首都，故宫、长城、天安门必去，美食有烤鸭、炸酱面'),
('上海', 31.2304, 121.4737, 12, '2018-07-15', '魔都，外滩夜景、东方明珠、迪士尼乐园'),
('杭州', 30.2741, 120.1551, 8, '2019-04-20', '人间天堂，西湖十景、灵隐寺、龙井茶'),
('成都', 30.5728, 104.0668, 6, '2019-10-01', '天府之国，大熊猫基地、宽窄巷子、火锅'),
('深圳', 22.5431, 114.0579, 10, '2020-01-15', '科技之城，华强北、世界之窗、大梅沙'),
('厦门', 24.4798, 118.0894, 5, '2020-06-18', '海上花园，鼓浪屿、南普陀寺、沙茶面'),
('西安', 34.3416, 108.9398, 7, '2021-04-05', '古都，兵马俑、大雁塔、回民街、肉夹馍'),
('重庆', 29.5630, 106.5516, 4, '2021-09-20', '山城，洪崖洞、解放碑、火锅、小面'),
('南京', 32.0603, 118.7969, 6, '2022-03-12', '六朝古都，中山陵、夫子庙、秦淮河'),
('苏州', 31.2989, 120.5853, 5, '2022-08-25', '园林之城，拙政园、虎丘、平江路');

-- ============================================
-- 8. 音乐数据
-- ============================================
DELETE FROM music;
INSERT INTO music (title, artist, album, duration, url, cover_url, sort_order) VALUES
('K歌之王 (国语)', '陈奕迅', '反正是我', 224, '/music/1.华语精选500首(5GB)/K歌之王 (国语) - 陈奕迅.mp3', '/images/music/k歌之王.jpg', 1);

INSERT INTO music (title, artist, album, duration, url, cover_url, sort_order) VALUES
('晴天', '周杰伦', '叶惠美', 269, '/music/晴天.mp3', '/images/music/晴天.jpg', 2);

INSERT INTO music (title, artist, album, duration, url, cover_url, sort_order) VALUES
('夜曲', '周杰伦', '十一月的萧邦', 226, '/music/夜曲.mp3', '/images/music/夜曲.jpg', 3);

INSERT INTO music (title, artist, album, duration, url, cover_url, sort_order) VALUES
('稻香', '周杰伦', '魔杰座', 223, '/music/稻香.mp3', '/images/music/稻香.jpg', 4);

INSERT INTO music (title, artist, album, duration, url, cover_url, sort_order) VALUES
('十年', '陈奕迅', '黑白灰', 206, '/music/十年.mp3', '/images/music/十年.jpg', 5);

-- ============================================
-- 9. 系统设置数据
-- ============================================
DELETE FROM system_setting;
INSERT INTO system_setting (key_name, value, description) VALUES
('site_name', '我的个人博客', '网站名称'),
('site_description', '记录技术成长与生活感悟', '网站描述'),
('site_logo', '/images/logo.png', '网站Logo'),
('site_favicon', '/images/favicon.ico', '网站Favicon'),
('background_color', '#f5f5f5', '背景颜色'),
('primary_color', '#1890ff', '主题颜色'),
('footer_text', '© 2026 我的个人博客. All rights reserved.', '页脚文字'),
('icp_record', '', 'ICP备案号'),
('seo_keywords', '技术博客,个人博客,编程,前端,后端', 'SEO关键词'),
('seo_description', '一个专注于技术分享和生活记录的个人博客', 'SEO描述');
