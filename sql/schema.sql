-- 个人技术博客数据库表结构
-- 版本: v1.0.0
-- 创建日期: 2026-02-15

-- 设置字符集
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- 创建分类表
CREATE TABLE IF NOT EXISTS `category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` VARCHAR(50) NOT NULL COMMENT '分类名称',
  `slug` VARCHAR(50) NOT NULL COMMENT 'URL别名（唯一）',
  `description` VARCHAR(200) DEFAULT NULL COMMENT '分类描述',
  `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序值（升序）',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_slug` (`slug`),
  UNIQUE KEY `uk_name` (`name`),
  KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='分类表';

-- 创建标签表
CREATE TABLE IF NOT EXISTS `tag` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` VARCHAR(30) NOT NULL COMMENT '标签名称',
  `slug` VARCHAR(30) NOT NULL COMMENT 'URL别名（唯一）',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_slug` (`slug`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='标签表';

-- 创建文章表
CREATE TABLE IF NOT EXISTS `article` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` VARCHAR(200) NOT NULL COMMENT '文章标题',
  `slug` VARCHAR(200) NOT NULL COMMENT 'URL别名（唯一）',
  `content` LONGTEXT NOT NULL COMMENT '文章内容（Markdown格式）',
  `summary` VARCHAR(500) DEFAULT NULL COMMENT '文章摘要',
  `cover_image` VARCHAR(500) DEFAULT NULL COMMENT '封面图URL',
  `category_id` BIGINT NOT NULL COMMENT '分类ID',
  `status` TINYINT NOT NULL DEFAULT 0 COMMENT '状态：0-草稿 1-已发布 2-已下架',
  `view_count` INT NOT NULL DEFAULT 0 COMMENT '浏览次数',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `published_at` DATETIME DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_slug` (`slug`),
  KEY `idx_category_id` (`category_id`),
  KEY `idx_status_published_at` (`status`, `published_at`),
  KEY `idx_created_at` (`created_at`),
  FULLTEXT KEY `ft_title_content` (`title`, `content`) WITH PARSER ngram,
  CONSTRAINT `fk_article_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章表';

-- 创建文章-标签关联表
CREATE TABLE IF NOT EXISTS `article_tag` (
  `article_id` BIGINT NOT NULL COMMENT '文章ID',
  `tag_id` BIGINT NOT NULL COMMENT '标签ID',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`article_id`, `tag_id`),
  KEY `idx_tag_id` (`tag_id`),
  CONSTRAINT `fk_article_tag_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_article_tag_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章-标签关联表';

-- 创建管理员表
CREATE TABLE IF NOT EXISTS `admin` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` VARCHAR(50) NOT NULL COMMENT '用户名（唯一）',
  `password` VARCHAR(100) NOT NULL COMMENT '密码（BCrypt加密）',
  `nickname` VARCHAR(50) DEFAULT NULL COMMENT '昵称',
  `avatar` VARCHAR(500) DEFAULT NULL COMMENT '头像URL',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员表';

-- 创建图片表
CREATE TABLE IF NOT EXISTS `image` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `filename` VARCHAR(255) NOT NULL COMMENT '文件名',
  `url` VARCHAR(500) NOT NULL COMMENT '图片URL',
  `location` VARCHAR(100) DEFAULT NULL COMMENT '拍摄地点',
  `taken_at` DATE DEFAULT NULL COMMENT '拍摄日期',
  `description` TEXT DEFAULT NULL COMMENT '图片描述',
  `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序值（升序）',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_sort_order` (`sort_order`),
  KEY `idx_taken_at` (`taken_at`),
  FULLTEXT KEY `ft_description` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='图片表';

-- 创建城市表
CREATE TABLE IF NOT EXISTS `city` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` VARCHAR(50) NOT NULL COMMENT '城市名称',
  `latitude` DECIMAL(10,8) NOT NULL COMMENT '纬度',
  `longitude` DECIMAL(11,8) NOT NULL COMMENT '经度',
  `visit_count` INT NOT NULL DEFAULT 1 COMMENT '访问次数',
  `first_visit` DATE NOT NULL COMMENT '首次访问日期',
  `notes` TEXT DEFAULT NULL COMMENT '备注',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`),
  KEY `idx_location` (`latitude`, `longitude`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='城市表';

-- 创建音乐表
CREATE TABLE IF NOT EXISTS `music` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` VARCHAR(200) NOT NULL COMMENT '歌曲标题',
  `artist` VARCHAR(100) NOT NULL COMMENT '歌手',
  `album` VARCHAR(200) DEFAULT NULL COMMENT '专辑',
  `duration` INT NOT NULL COMMENT '时长（秒）',
  `url` VARCHAR(500) NOT NULL COMMENT '音频URL',
  `cover_url` VARCHAR(500) DEFAULT NULL COMMENT '封面图URL',
  `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序值（升序）',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='音乐表';

-- 创建系统设置表
CREATE TABLE IF NOT EXISTS `system_setting` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `key` VARCHAR(50) NOT NULL COMMENT '设置键（唯一）',
  `value` TEXT NOT NULL COMMENT '设置值',
  `description` VARCHAR(255) DEFAULT NULL COMMENT '设置描述',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统设置表';

-- 创建访问统计表
CREATE TABLE IF NOT EXISTS `visit_stat` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `visit_date` DATE NOT NULL COMMENT '访问日期（唯一）',
  `page_views` INT NOT NULL DEFAULT 0 COMMENT '页面浏览量',
  `unique_visitors` INT NOT NULL DEFAULT 0 COMMENT '独立访客数',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_visit_date` (`visit_date`),
  KEY `idx_visit_date` (`visit_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='访问统计表';

-- 创建灵感表
CREATE TABLE IF NOT EXISTS `inspiration` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `content` TEXT NOT NULL COMMENT '灵感内容',
  `article_id` BIGINT DEFAULT NULL COMMENT '关联文章ID',
  `category` VARCHAR(50) DEFAULT NULL COMMENT '分类',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_article_id` (`article_id`),
  KEY `idx_category` (`category`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `fk_inspiration_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='灵感表';
