package com.blog.config;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.blog.entity.*;
import com.blog.repository.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final AdminRepository adminRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final ArticleRepository articleRepository;
    private final ArticleTagRepository articleTagRepository;
    private final ImageRepository imageRepository;
    private final CityRepository cityRepository;
    private final MusicRepository musicRepository;
    private final InspirationRepository inspirationRepository;
    private final VisitStatRepository visitStatRepository;
    private final SystemSettingRepository systemSettingRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (adminRepository.count() == 0) {
            initAdmin();
            initCategories();
            initTags();
            initArticles();
            initImages();
            initCities();
            initMusic();
            initInspirations();
            initVisitStats();
            initSystemSettings();
            log.info("Test data initialization completed!");
        }
    }
    
    private void initAdmin() {
        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("123456"));
        admin.setNickname("林间");
        admin.setAvatar("/uploads/avatar.jpg");
        adminRepository.save(admin);
        log.info("Default admin account created: admin / 123");
    }
    
    private void initCategories() {
        List<Category> categories = Arrays.asList(
            createCategory(1L, "技术笔记", "tech", "编程技术、开发工具、最佳实践", 1),
            createCategory(2L, "生活随笔", "life", "日常生活、心情感悟、旅行见闻", 2),
            createCategory(3L, "读书笔记", "reading", "书籍推荐、阅读心得、知识总结", 3),
            createCategory(4L, "项目实战", "project", "项目开发经验、架构设计、问题解决", 4),
            createCategory(5L, "学习笔记", "learning", "新技术学习、课程笔记、知识整理", 5)
        );
        categoryRepository.saveAll(categories);
        log.info("Categories initialized: {}", categories.size());
    }
    
    private Category createCategory(Long id, String name, String slug, String description, int sortOrder) {
        Category category = new Category();
        category.setId(id);
        category.setName(name);
        category.setSlug(slug);
        category.setDescription(description);
        category.setSortOrder(sortOrder);
        return category;
    }
    
    private void initTags() {
        List<Tag> tags = Arrays.asList(
            createTag(1L, "Java", "java"),
            createTag(2L, "Spring Boot", "spring-boot"),
            createTag(3L, "React", "react"),
            createTag(4L, "TypeScript", "typescript"),
            createTag(5L, "MySQL", "mysql"),
            createTag(6L, "Redis", "redis"),
            createTag(7L, "Docker", "docker"),
            createTag(8L, "旅行", "travel"),
            createTag(9L, "摄影", "photography"),
            createTag(10L, "阅读", "reading"),
            createTag(11L, "前端开发", "frontend"),
            createTag(12L, "后端开发", "backend"),
            createTag(13L, "架构设计", "architecture"),
            createTag(14L, "生活感悟", "life-thoughts"),
            createTag(15L, "Vue", "vue")
        );
        tagRepository.saveAll(tags);
        log.info("Tags initialized: {}", tags.size());
    }
    
    private Tag createTag(Long id, String name, String slug) {
        Tag tag = new Tag();
        tag.setId(id);
        tag.setName(name);
        tag.setSlug(slug);
        return tag;
    }
    
    private void initArticles() {
        LocalDateTime now = LocalDateTime.now();
        
        List<Article> articles = Arrays.asList(
            createArticle(1L, "Spring Boot 3.0 新特性详解", "spring-boot-3-features",
                "# Spring Boot 3.0 新特性详解\n\n## 概述\n\nSpring Boot 3.0 是一个重要的里程碑版本，带来了许多激动人心的新特性。\n\n## 主要更新\n\n### 1. 最低要求 Java 17\n\nSpring Boot 3.0 要求最低使用 Java 17，这意味着你可以使用最新的 Java 特性。\n\n### 2. Jakarta EE 10\n\n从 Java EE 迁移到 Jakarta EE。\n\n### 3. 原生编译支持\n\n通过 GraalVM 支持原生编译，启动时间大幅缩短。",
                "Spring Boot 3.0 带来了 Java 17 最低要求、Jakarta EE 10 支持和原生编译等重大更新。",
                "/uploads/covers/spring-boot-3.png", 1L, 1, 1256, now.minusDays(30)),
            createArticle(2L, "React 18 并发特性实践", "react-18-concurrent-features",
                "# React 18 并发特性实践\n\n## 什么是并发渲染\n\nReact 18 引入了并发渲染机制。\n\n## 核心特性\n\n### useTransition\n\n```jsx\nconst [isPending, startTransition] = useTransition();\n```",
                "深入探讨 React 18 的并发渲染特性，包括 useTransition、useDeferredValue 等新 Hook 的使用场景。",
                "/uploads/covers/react-18.png", 1L, 1, 892, now.minusDays(25)),
            createArticle(3L, "一个人的云南之旅", "yunnan-solo-trip",
                "# 一个人的云南之旅\n\n## 前言\n\n一直向往云南的蓝天白云，终于在这个夏天踏上了独自旅行的征程。\n\n## 昆明\n\n第一站是春城昆明，气候宜人，鲜花盛开。\n\n## 大理\n\n大理古城的夜晚格外迷人。\n\n## 丽江\n\n古城的夜晚，灯火通明，纳西古乐悠扬。",
                "记录一个人在云南的旅行经历，从昆明到大理再到丽江，感受彩云之南的魅力。",
                "/uploads/covers/yunnan.jpg", 2L, 1, 2341, now.minusDays(20)),
            createArticle(4L, "《人类简史》读书笔记", "sapiens-reading-notes",
                "# 《人类简史》读书笔记\n\n## 关于作者\n\n尤瓦尔·赫拉利，以色列历史学家。\n\n## 核心观点\n\n### 认知革命\n\n约 7 万年前，智人突然具备了讲述虚构故事的能力。\n\n### 农业革命\n\n农业革命是历史上最大的骗局。",
                "《人类简史》读书笔记，探讨认知革命、农业革命和科学革命对人类社会的深远影响。",
                "/uploads/covers/sapiens.jpg", 3L, 1, 1567, now.minusDays(15)),
            createArticle(5L, "从零搭建微服务架构", "microservice-architecture",
                "# 从零搭建微服务架构\n\n## 架构概述\n\n本文将介绍如何从零开始搭建一套完整的微服务架构。\n\n## 技术选型\n\n| 组件 | 技术方案 |\n|------|----------|\n| 注册中心 | Nacos |\n| 配置中心 | Nacos |\n| 网关 | Spring Cloud Gateway |",
                "详细介绍如何从零搭建一套完整的微服务架构，包括技术选型、核心模块设计和部署方案。",
                "/uploads/covers/microservice.png", 4L, 1, 2103, now.minusDays(10)),
            createArticle(6L, "TypeScript 高级类型技巧", "typescript-advanced-types",
                "# TypeScript 高级类型技巧\n\n## 泛型约束\n\n```typescript\ninterface Lengthwise {\n  length: number;\n}\n```",
                "深入讲解 TypeScript 的高级类型特性，包括泛型约束、条件类型、映射类型和模板字面量类型。",
                "/uploads/covers/typescript.png", 5L, 1, 756, now.minusDays(5)),
            createArticle(7L, "周末的咖啡馆时光", "weekend-cafe-time",
                "# 周末的咖啡馆时光\n\n## 寻找城市角落\n\n每个周末，我都会找一家安静的咖啡馆，带上一本书，度过一个悠闲的下午。",
                "记录周末在咖啡馆的悠闲时光，分享城市中那些值得驻足的角落。",
                "/uploads/covers/cafe.jpg", 2L, 1, 432, now.minusDays(3)),
            createArticle(8L, "Docker 容器化最佳实践", "docker-best-practices",
                "# Docker 容器化最佳实践\n\n## 镜像优化\n\n### 使用多阶段构建\n\n```dockerfile\nFROM node:18 AS builder\n```",
                "分享 Docker 容器化的最佳实践，包括镜像优化、安全配置和编排策略。",
                "/uploads/covers/docker.png", 1L, 1, 1089, now.minusDays(2)),
            createArticle(9L, "Redis 缓存策略详解", "redis-cache-strategies",
                "# Redis 缓存策略详解\n\n## 缓存模式\n\n### Cache Aside\n\n最常用的缓存模式。",
                "深入分析 Redis 的各种缓存策略，以及缓存穿透、击穿、雪崩等问题的解决方案。",
                "/uploads/covers/redis.png", 1L, 0, 0, now.minusDays(1)),
            createArticle(10L, "Vue 3 Composition API 实战", "vue3-composition-api",
                "# Vue 3 Composition API 实战\n\n## 为什么选择 Composition API\n\n- 更好的逻辑复用\n- 更灵活的代码组织\n- 更好的 TypeScript 支持",
                "Vue 3 Composition API 实战指南，涵盖核心概念、最佳实践和自定义 Hook 开发。",
                "/uploads/covers/vue3.png", 5L, 1, 678, now)
        );
        articleRepository.saveAll(articles);
        
        initArticleTags();
        log.info("Articles initialized: {}", articles.size());
    }
    
    private Article createArticle(Long id, String title, String slug, String content, String summary,
                                  String coverImage, Long categoryId, int status, int viewCount, LocalDateTime createdAt) {
        Article article = new Article();
        article.setId(id);
        article.setTitle(title);
        article.setSlug(slug);
        article.setContent(content);
        article.setSummary(summary);
        article.setCoverImage(coverImage);
        article.setCategoryId(categoryId);
        article.setStatus(status);
        article.setViewCount(viewCount);
        article.setCreatedAt(createdAt);
        article.setUpdatedAt(createdAt);
        article.setPublishedAt(status == 1 ? createdAt : null);
        return article;
    }
    
    private void initArticleTags() {
        List<ArticleTag> articleTags = Arrays.asList(
            createArticleTag(1L, 1L), createArticleTag(1L, 2L), createArticleTag(1L, 5L), createArticleTag(1L, 12L),
            createArticleTag(2L, 3L), createArticleTag(2L, 4L), createArticleTag(2L, 11L),
            createArticleTag(3L, 8L), createArticleTag(3L, 9L), createArticleTag(3L, 14L),
            createArticleTag(4L, 10L),
            createArticleTag(5L, 1L), createArticleTag(5L, 2L), createArticleTag(5L, 7L), createArticleTag(5L, 13L),
            createArticleTag(6L, 4L), createArticleTag(6L, 11L),
            createArticleTag(7L, 14L),
            createArticleTag(8L, 7L), createArticleTag(8L, 12L),
            createArticleTag(9L, 5L), createArticleTag(9L, 6L), createArticleTag(9L, 12L),
            createArticleTag(10L, 4L), createArticleTag(10L, 15L), createArticleTag(10L, 11L)
        );
        articleTagRepository.saveAll(articleTags);
    }
    
    private ArticleTag createArticleTag(Long articleId, Long tagId) {
        ArticleTag articleTag = new ArticleTag();
        articleTag.setArticleId(articleId);
        articleTag.setTagId(tagId);
        articleTag.setCreatedAt(LocalDateTime.now());
        return articleTag;
    }
    
    private void initImages() {
        List<Image> images = Arrays.asList(
            createImage(1L, "9541acda-cf99-4a9c-9a02-2aaface82518.jpg", "/uploads/covers/9541acda-cf99-4a9c-9a02-2aaface82518.jpg", "Hangzhou", 
                LocalDate.of(2024, 6, 15), "West Lake scenery", 1),
            createImage(2L, "979f1864-d38b-4204-8327-5424d92bf4f3.png", "/uploads/covers/979f1864-d38b-4204-8327-5424d92bf4f3.png", "Shanghai",
                LocalDate.of(2024, 7, 20), "The Bund night view", 2),
            createImage(3L, "c031d54a-d2d3-471a-8cce-7c948243c9e1.png", "/uploads/covers/c031d54a-d2d3-471a-8cce-7c948243c9e1.png", "Beijing",
                LocalDate.of(2024, 8, 10), "Forbidden City", 3),
            createImage(4L, "f094d759-df01-47d1-9a09-73da0e5408ef.gif", "/uploads/covers/f094d759-df01-47d1-9a09-73da0e5408ef.gif", "Chengdu",
                LocalDate.of(2024, 9, 5), "Kuanzhai Alley", 4),
            createImage(5L, "84f40c6f-44b9-4397-8793-9a5b3d2abca0.png", "/uploads/covers/84f40c6f-44b9-4397-8793-9a5b3d2abca0.png", "Shenzhen",
                LocalDate.of(2024, 10, 1), "Tech Park", 5),
            createImage(6L, "5e215024-0d0e-49dd-a6db-5db05017b905.png", "/uploads/covers/5e215024-0d0e-49dd-a6db-5db05017b905.png", "Xiamen",
                LocalDate.of(2024, 11, 12), "Gulangyu Island", 6),
            createImage(7L, "4d07f0d3-d706-4696-bb22-fcec34ceeaa6.png", "/uploads/covers/4d07f0d3-d706-4696-bb22-fcec34ceeaa6.png", "Xian",
                LocalDate.of(2024, 12, 25), "Ancient City Wall", 7)
        );
        imageRepository.saveAll(images);
        log.info("Images initialized: {}", images.size());
    }
    
    private Image createImage(Long id, String filename, String url, String location, LocalDate takenAt, String description, int displayOrder) {
        Image image = new Image();
        image.setId(id);
        image.setFilename(filename);
        image.setUrl(url);
        image.setLocation(location);
        image.setTakenAt(takenAt);
        image.setDescription(description);
        image.setDisplayOrder(displayOrder);
        return image;
    }
    
    private void initCities() {
        List<City> cities = Arrays.asList(
            createCity(1L, "北京", new BigDecimal("39.9042"), new BigDecimal("116.4074"), 5, LocalDate.of(2018, 9, 1), "首都，故宫、长城、颐和园"),
            createCity(2L, "上海", new BigDecimal("31.2304"), new BigDecimal("121.4737"), 8, LocalDate.of(2017, 3, 15), "魔都，外滩、陆家嘴、迪士尼"),
            createCity(3L, "杭州", new BigDecimal("30.2741"), new BigDecimal("120.1551"), 6, LocalDate.of(2019, 4, 20), "西湖美景，龙井茶园"),
            createCity(4L, "成都", new BigDecimal("30.5728"), new BigDecimal("104.0668"), 3, LocalDate.of(2020, 8, 10), "美食之都，大熊猫，宽窄巷子"),
            createCity(5L, "西安", new BigDecimal("34.3416"), new BigDecimal("108.9398"), 2, LocalDate.of(2021, 5, 1), "古都，兵马俑、大雁塔、城墙"),
            createCity(6L, "昆明", new BigDecimal("25.0389"), new BigDecimal("102.7183"), 1, LocalDate.of(2025, 8, 14), "春城，滇池、石林"),
            createCity(7L, "大理", new BigDecimal("25.6065"), new BigDecimal("100.2679"), 1, LocalDate.of(2025, 8, 15), "风花雪月，洱海、古城"),
            createCity(8L, "丽江", new BigDecimal("26.8721"), new BigDecimal("100.2297"), 1, LocalDate.of(2025, 8, 16), "古城、玉龙雪山、泸沽湖"),
            createCity(9L, "苏州", new BigDecimal("31.2989"), new BigDecimal("120.5853"), 4, LocalDate.of(2019, 7, 10), "园林之城，周庄、同里"),
            createCity(10L, "青岛", new BigDecimal("36.0671"), new BigDecimal("120.3826"), 2, LocalDate.of(2022, 7, 20), "海滨城市，啤酒节、栈桥"),
            createCity(11L, "厦门", new BigDecimal("24.4798"), new BigDecimal("118.0894"), 2, LocalDate.of(2023, 10, 1), "鼓浪屿、南普陀、环岛路"),
            createCity(12L, "桂林", new BigDecimal("25.2744"), new BigDecimal("110.2900"), 1, LocalDate.of(2024, 9, 15), "山水甲天下，漓江、阳朔")
        );
        cityRepository.saveAll(cities);
        log.info("Cities initialized: {}", cities.size());
    }
    
    private City createCity(Long id, String name, BigDecimal latitude, BigDecimal longitude, int visitCount, LocalDate firstVisit, String notes) {
        City city = new City();
        city.setId(id);
        city.setName(name);
        city.setLatitude(latitude);
        city.setLongitude(longitude);
        city.setVisitCount(visitCount);
        city.setFirstVisit(firstVisit);
        city.setNotes(notes);
        return city;
    }
    
    private void initMusic() {
        List<Music> musicList = Arrays.asList(
            createMusic(1L, "晴天", "周杰伦", "叶惠美", 269, "/uploads/music/qingtian.mp3", "/uploads/music/covers/qingtian.jpg", 1),
            createMusic(2L, "七里香", "周杰伦", "七里香", 299, "/uploads/music/qilixiang.mp3", "/uploads/music/covers/qilixiang.jpg", 2),
            createMusic(3L, "稻香", "周杰伦", "魔杰座", 223, "/uploads/music/daoxiang.mp3", "/uploads/music/covers/daoxiang.jpg", 3),
            createMusic(4L, "起风了", "买辣椒也用券", "起风了", 325, "/uploads/music/qifengle.mp3", "/uploads/music/covers/qifengle.jpg", 4),
            createMusic(5L, "平凡之路", "朴树", "猎户星座", 298, "/uploads/music/pingfanzhilu.mp3", "/uploads/music/covers/pingfanzhilu.jpg", 5),
            createMusic(6L, "成都", "赵雷", "无法长大", 325, "/uploads/music/chengdu.mp3", "/uploads/music/covers/chengdu.jpg", 6),
            createMusic(7L, "理想三旬", "陈鸿宇", "浓烟下的诗歌电台", 296, "/uploads/music/lixiangsansun.mp3", "/uploads/music/covers/lixiangsansun.jpg", 7),
            createMusic(8L, "南山南", "马頔", "孤岛", 312, "/uploads/music/nanshannan.mp3", "/uploads/music/covers/nanshannan.jpg", 8),
            createMusic(9L, "岁月神偷", "金玟岐", "岁月神偷", 276, "/uploads/music/suiyueshentou.mp3", "/uploads/music/covers/suiyueshentou.jpg", 9),
            createMusic(10L, "夜空中最亮的星", "逃跑计划", "世界", 262, "/uploads/music/yekongzhongzuiliangdexing.mp3", "/uploads/music/covers/yekongzhongzuiliangdexing.jpg", 10)
        );
        musicRepository.saveAll(musicList);
        log.info("Music initialized: {}", musicList.size());
    }
    
    private Music createMusic(Long id, String title, String artist, String album, int duration, String url, String coverUrl, int displayOrder) {
        Music music = new Music();
        music.setId(id);
        music.setTitle(title);
        music.setArtist(artist);
        music.setAlbum(album);
        music.setDuration(duration);
        music.setUrl(url);
        music.setCoverUrl(coverUrl);
        music.setDisplayOrder(displayOrder);
        music.setUploadedAt(LocalDateTime.now());
        return music;
    }
    
    private void initInspirations() {
        List<Inspiration> inspirations = Arrays.asList(
            createInspiration(1L, "代码是写给人看的，顺便能在机器上运行。", null, "编程"),
            createInspiration(2L, "简单是可靠的先决条件。", null, "编程"),
            createInspiration(3L, "旅行不是为了逃避生活，而是为了让生活不再逃避我们。", 3L, "生活"),
            createInspiration(4L, "读书不是为了雄辩和驳斥，也不是为了轻信和盲从，而是为了思考和权衡。", 4L, "阅读"),
            createInspiration(5L, "最好的代码是没有代码。", null, "编程"),
            createInspiration(6L, "生活不止眼前的代码，还有诗和远方。", null, "生活"),
            createInspiration(7L, "每一次重构都是一次成长。", null, "编程"),
            createInspiration(8L, "咖啡和代码，是程序员最好的朋友。", null, "生活"),
            createInspiration(9L, "微服务不是目的，而是手段。", 5L, "架构"),
            createInspiration(10L, "学习新技术最好的方式是动手实践。", null, "学习")
        );
        inspirationRepository.saveAll(inspirations);
        log.info("Inspirations initialized: {}", inspirations.size());
    }
    
    private Inspiration createInspiration(Long id, String content, Long articleId, String category) {
        Inspiration inspiration = new Inspiration();
        inspiration.setId(id);
        inspiration.setContent(content);
        inspiration.setArticleId(articleId);
        inspiration.setCategory(category);
        return inspiration;
    }
    
    private void initVisitStats() {
        LocalDate today = LocalDate.now();
        List<VisitStat> stats = Arrays.asList(
            createVisitStat(1L, today.minusDays(7), 156, 89),
            createVisitStat(2L, today.minusDays(6), 189, 102),
            createVisitStat(3L, today.minusDays(5), 234, 128),
            createVisitStat(4L, today.minusDays(4), 198, 115),
            createVisitStat(5L, today.minusDays(3), 267, 145),
            createVisitStat(6L, today.minusDays(2), 312, 178),
            createVisitStat(7L, today.minusDays(1), 289, 156),
            createVisitStat(8L, today, 345, 198)
        );
        visitStatRepository.saveAll(stats);
        log.info("Visit stats initialized: {}", stats.size());
    }
    
    private VisitStat createVisitStat(Long id, LocalDate visitDate, int pageViews, int uniqueVisitors) {
        VisitStat stat = new VisitStat();
        stat.setId(id);
        stat.setVisitDate(visitDate);
        stat.setPageViews(pageViews);
        stat.setUniqueVisitors(uniqueVisitors);
        return stat;
    }
    
    private void initSystemSettings() {
        List<SystemSetting> settings = Arrays.asList(
            createSetting(1L, "site_title", "星落林间"),
            createSetting(2L, "site_subtitle", "记录生活，分享技术"),
            createSetting(3L, "site_description", "一个关于技术、生活、旅行的个人博客"),
            createSetting(4L, "site_keywords", "博客,技术,旅行,生活,编程"),
            createSetting(5L, "author_name", "林间"),
            createSetting(6L, "author_avatar", "/uploads/avatar.jpg"),
            createSetting(7L, "author_bio", "一个热爱编程和旅行的开发者"),
            createSetting(8L, "social_github", "https://github.com/example"),
            createSetting(9L, "social_email", "contact@example.com"),
            createSetting(10L, "footer_text", "© 2026 星落林间 - Powered by React & Spring Boot")
        );
        systemSettingRepository.saveAll(settings);
        log.info("System settings initialized: {}", settings.size());
    }
    
    private SystemSetting createSetting(Long id, String key, String value) {
        SystemSetting setting = new SystemSetting();
        setting.setId(id);
        setting.setKey(key);
        setting.setValue(value);
        return setting;
    }
}
