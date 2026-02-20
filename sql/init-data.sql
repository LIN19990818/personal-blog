-- 个人技术博客初始数据
-- 版本: v1.0.0
-- 创建日期: 2026-02-15

-- 设置字符集
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- 插入默认分类
INSERT INTO `category` (`name`, `slug`, `description`, `sort_order`) VALUES
('技术', 'tech', '技术相关文章', 1),
('作品集', 'portfolio', '个人作品展示', 2),
('随笔', 'notes', '生活随笔', 3);

-- 插入默认标签
INSERT INTO `tag` (`name`, `slug`) VALUES
('React', 'react'),
('TypeScript', 'typescript'),
('Spring Boot', 'spring-boot'),
('MySQL', 'mysql'),
('Docker', 'docker'),
('前端', 'frontend'),
('后端', 'backend'),
('生活', 'life');

-- 插入默认管理员
-- 密码: admin123 (BCrypt加密后的值)
INSERT INTO `admin` (`username`, `password`, `nickname`) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '管理员');

-- 插入示例城市数据
INSERT INTO `city` (`name`, `latitude`, `longitude`, `visit_count`, `first_visit`, `notes`) VALUES
('北京', 39.9042, 116.4074, 10, '2018-05-01', '首都，故宫、长城必去'),
('上海', 31.2304, 121.4737, 8, '2019-03-15', '外滩夜景很美'),
('杭州', 30.2741, 120.1551, 5, '2020-04-20', '西湖十景'),
('成都', 30.5728, 104.0668, 3, '2021-07-10', '美食之都'),
('深圳', 22.5431, 114.0579, 6, '2019-11-05', '科技之城');

-- 插入示例系统设置
INSERT INTO `system_setting` (`key`, `value`, `description`) VALUES
('site_name', '个人技术博客', '网站名称'),
('site_description', '记录技术成长与生活感悟', '网站描述'),
('background_color', '#f5f5f5', '背景颜色'),
('primary_color', '#1890ff', '主题颜色'),
('footer_text', '© 2026 个人博客. All rights reserved.', '页脚文字');

-- 插入示例音乐数据
INSERT INTO `music` (`title`, `artist`, `album`, `duration`, `url`, `cover_url`, `sort_order`) VALUES
('夜曲', '周杰伦', '十一月的萧邦', 240, '/music/yqu.mp3', '/images/music/yqu.jpg', 1),
('晴天', '周杰伦', '叶惠美', 270, '/music/qt.mp3', '/images/music/qt.jpg', 2),
('稻香', '周杰伦', '魔杰座', 223, '/music/dx.mp3', '/images/music/dx.jpg', 3);
