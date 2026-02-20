-- ============================================
-- 个人博客测试数据
-- 版本: v1.0.0
-- 生成日期: 2026-02-17
-- ============================================

-- 清空现有数据（注意顺序，先删除有外键关联的表）
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE article_tag;
TRUNCATE TABLE article;
TRUNCATE TABLE tag;
TRUNCATE TABLE category;
TRUNCATE TABLE image;
TRUNCATE TABLE city;
TRUNCATE TABLE music;
TRUNCATE TABLE inspiration;
TRUNCATE TABLE visit_stat;
TRUNCATE TABLE system_setting;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- 1. 分类数据
-- ============================================
INSERT INTO category (id, name, slug, description, sort_order, created_at) VALUES
(1, '技术笔记', 'tech', '编程技术、开发工具、最佳实践', 1, NOW()),
(2, '生活随笔', 'life', '日常生活、心情感悟、旅行见闻', 2, NOW()),
(3, '读书笔记', 'reading', '书籍推荐、阅读心得、知识总结', 3, NOW()),
(4, '项目实战', 'project', '项目开发经验、架构设计、问题解决', 4, NOW()),
(5, '学习笔记', 'learning', '新技术学习、课程笔记、知识整理', 5, NOW());

-- ============================================
-- 2. 标签数据
-- ============================================
INSERT INTO tag (id, name, slug, created_at) VALUES
(1, 'Java', 'java', NOW()),
(2, 'Spring Boot', 'spring-boot', NOW()),
(3, 'React', 'react', NOW()),
(4, 'TypeScript', 'typescript', NOW()),
(5, 'MySQL', 'mysql', NOW()),
(6, 'Redis', 'redis', NOW()),
(7, 'Docker', 'docker', NOW()),
(8, '旅行', 'travel', NOW()),
(9, '摄影', 'photography', NOW()),
(10, '阅读', 'reading', NOW()),
(11, '前端开发', 'frontend', NOW()),
(12, '后端开发', 'backend', NOW()),
(13, '架构设计', 'architecture', NOW()),
(14, '生活感悟', 'life-thoughts', NOW()),
(15, 'Vue', 'vue', NOW());

-- ============================================
-- 3. 文章数据
-- ============================================
INSERT INTO article (id, title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
(1, 
 'Spring Boot 3.0 新特性详解', 
 'spring-boot-3-features',
 '# Spring Boot 3.0 新特性详解\n\n## 概述\n\nSpring Boot 3.0 是一个重要的里程碑版本，带来了许多激动人心的新特性。\n\n## 主要更新\n\n### 1. 最低要求 Java 17\n\nSpring Boot 3.0 要求最低使用 Java 17，这意味着你可以使用最新的 Java 特性，如：\n\n- Record 类\n- Pattern Matching\n- Sealed Classes\n- Text Blocks\n\n### 2. Jakarta EE 10\n\n从 Java EE 迁移到 Jakarta EE，包名从 `javax.*` 变为 `jakarta.*`。\n\n### 3. 原生编译支持\n\n通过 GraalVM 支持原生编译，启动时间大幅缩短，内存占用显著降低。\n\n## 总结\n\nSpring Boot 3.0 是一次重大升级，建议新项目直接采用。',
 'Spring Boot 3.0 带来了 Java 17 最低要求、Jakarta EE 10 支持和原生编译等重大更新。',
 '/uploads/covers/spring-boot-3.png',
 1, 1, 1256, 
 DATE_SUB(NOW(), INTERVAL 30 DAY), 
 DATE_SUB(NOW(), INTERVAL 30 DAY), 
 DATE_SUB(NOW(), INTERVAL 30 DAY)),

(2, 
 'React 18 并发特性实践', 
 'react-18-concurrent-features',
 '# React 18 并发特性实践\n\n## 什么是并发渲染\n\nReact 18 引入了并发渲染机制，允许 React 在渲染过程中中断、暂停、恢复或放弃渲染。\n\n## 核心特性\n\n### 1. useTransition\n\n```jsx\nconst [isPending, startTransition] = useTransition();\n\nstartTransition(() => {\n  setSearchQuery(input);\n});\n```\n\n### 2. useDeferredValue\n\n```jsx\nconst deferredQuery = useDeferredValue(searchQuery);\n```\n\n### 3. Suspense 增强\n\n支持服务端渲染中的 Suspense，实现流式 SSR。\n\n## 实践建议\n\n并发特性不是银弹，需要根据实际场景选择使用。',
 '深入探讨 React 18 的并发渲染特性，包括 useTransition、useDeferredValue 等新 Hook 的使用场景。',
 '/uploads/covers/react-18.png',
 1, 1, 892, 
 DATE_SUB(NOW(), INTERVAL 25 DAY), 
 DATE_SUB(NOW(), INTERVAL 25 DAY), 
 DATE_SUB(NOW(), INTERVAL 25 DAY)),

(3, 
 '一个人的云南之旅', 
 'yunnan-solo-trip',
 '# 一个人的云南之旅\n\n## 前言\n\n一直向往云南的蓝天白云，终于在这个夏天踏上了独自旅行的征程。\n\n## 昆明\n\n第一站是春城昆明，气候宜人，鲜花盛开。\n\n### 滇池\n\n漫步在滇池边，看着成群的海鸥，心情格外舒畅。\n\n## 大理\n\n大理古城的夜晚格外迷人，洋人街的酒吧传来阵阵民谣。\n\n### 洱海骑行\n\n租了一辆电动车，沿着洱海骑行，风吹过脸颊，所有的烦恼都随风而去。\n\n## 丽江\n\n古城的夜晚，灯火通明，纳西古乐悠扬。\n\n## 感悟\n\n一个人的旅行，让我学会了与自己相处，也让我更加热爱这个世界。',
 '记录一个人在云南的旅行经历，从昆明到大理再到丽江，感受彩云之南的魅力。',
 '/uploads/covers/yunnan.jpg',
 2, 1, 2341, 
 DATE_SUB(NOW(), INTERVAL 20 DAY), 
 DATE_SUB(NOW(), INTERVAL 20 DAY), 
 DATE_SUB(NOW(), INTERVAL 20 DAY)),

(4, 
 '《人类简史》读书笔记', 
 'sapiens-reading-notes',
 '# 《人类简史》读书笔记\n\n## 关于作者\n\n尤瓦尔·赫拉利，以色列历史学家，牛津大学历史学博士。\n\n## 核心观点\n\n### 认知革命\n\n约 7 万年前，智人突然具备了讲述虚构故事的能力，这让我们能够大规模合作。\n\n### 农业革命\n\n农业革命是历史上最大的骗局，小麦驯化了人类，而不是人类驯化了小麦。\n\n### 科学革命\n\n过去 500 年，人类的力量有了前所未有的增长。\n\n## 精彩摘录\n\n> 金钱是有史以来最普遍也最有效的互信系统。\n\n> 快乐并不在于任何客观条件，而在于客观条件与主观期望的匹配。\n\n## 推荐理由\n\n这本书会让你重新审视人类的历史和未来。',
 '《人类简史》读书笔记，探讨认知革命、农业革命和科学革命对人类社会的深远影响。',
 '/uploads/covers/sapiens.jpg',
 3, 1, 1567, 
 DATE_SUB(NOW(), INTERVAL 15 DAY), 
 DATE_SUB(NOW(), INTERVAL 15 DAY), 
 DATE_SUB(NOW(), INTERVAL 15 DAY)),

(5, 
 '从零搭建微服务架构', 
 'microservice-architecture',
 '# 从零搭建微服务架构\n\n## 架构概述\n\n本文将介绍如何从零开始搭建一套完整的微服务架构。\n\n## 技术选型\n\n| 组件 | 技术方案 |\n|------|----------|\n| 注册中心 | Nacos |\n| 配置中心 | Nacos |\n| 网关 | Spring Cloud Gateway |\n| 熔断限流 | Sentinel |\n| 链路追踪 | SkyWalking |\n| 消息队列 | RocketMQ |\n\n## 核心模块\n\n### 1. 服务注册与发现\n\n使用 Nacos 作为注册中心，实现服务的自动注册与发现。\n\n### 2. 统一网关\n\n通过 Spring Cloud Gateway 实现统一的入口管理、鉴权、限流。\n\n### 3. 分布式事务\n\n使用 Seata 解决分布式事务问题。\n\n## 部署架构\n\n采用 Kubernetes 进行容器编排，实现弹性伸缩。',
 '详细介绍如何从零搭建一套完整的微服务架构，包括技术选型、核心模块设计和部署方案。',
 '/uploads/covers/microservice.png',
 4, 1, 2103, 
 DATE_SUB(NOW(), INTERVAL 10 DAY), 
 DATE_SUB(NOW(), INTERVAL 10 DAY), 
 DATE_SUB(NOW(), INTERVAL 10 DAY)),

(6, 
 'TypeScript 高级类型技巧', 
 'typescript-advanced-types',
 '# TypeScript 高级类型技巧\n\n## 泛型约束\n\n```typescript\ninterface Lengthwise {\n  length: number;\n}\n\nfunction loggingIdentity<T extends Lengthwise>(arg: T): T {\n  console.log(arg.length);\n  return arg;\n}\n```\n\n## 条件类型\n\n```typescript\ntype TypeName<T> =\n  T extends string ? "string" :\n  T extends number ? "number" :\n  T extends boolean ? "boolean" :\n  T extends undefined ? "undefined" :\n  T extends Function ? "function" :\n  "object";\n```\n\n## 映射类型\n\n```typescript\ntype Readonly<T> = {\n  readonly [P in keyof T]: T[P];\n};\n\ntype Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n```\n\n## 模板字面量类型\n\n```typescript\ntype EventName<T extends string> = `on${Capitalize<T>}`;\ntype ClickEvent = EventName<"click">; // "onClick"\n```',
 '深入讲解 TypeScript 的高级类型特性，包括泛型约束、条件类型、映射类型和模板字面量类型。',
 '/uploads/covers/typescript.png',
 5, 1, 756, 
 DATE_SUB(NOW(), INTERVAL 5 DAY), 
 DATE_SUB(NOW(), INTERVAL 5 DAY), 
 DATE_SUB(NOW(), INTERVAL 5 DAY)),

(7, 
 '周末的咖啡馆时光', 
 'weekend-cafe-time',
 '# 周末的咖啡馆时光\n\n## 寻找城市角落\n\n每个周末，我都会找一家安静的咖啡馆，带上一本书，度过一个悠闲的下午。\n\n## 今日推荐\n\n### 咖啡馆：时光印记\n\n地址：老城区文化街 128 号\n\n特色：手冲单品咖啡、复古装修\n\n## 感受\n\n在这个快节奏的城市里，能够慢下来喝一杯咖啡，读几页书，是一种难得的奢侈。\n\n咖啡的香气、书页的沙沙声、窗外斑驳的阳光，构成了一个完美的下午。',
 '记录周末在咖啡馆的悠闲时光，分享城市中那些值得驻足的角落。',
 '/uploads/covers/cafe.jpg',
 2, 1, 432, 
 DATE_SUB(NOW(), INTERVAL 3 DAY), 
 DATE_SUB(NOW(), INTERVAL 3 DAY), 
 DATE_SUB(NOW(), INTERVAL 3 DAY)),

(8, 
 'Docker 容器化最佳实践', 
 'docker-best-practices',
 '# Docker 容器化最佳实践\n\n## 镜像优化\n\n### 1. 使用多阶段构建\n\n```dockerfile\n# 构建阶段\nFROM node:18 AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# 运行阶段\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\n```\n\n### 2. 使用 .dockerignore\n\n```\nnode_modules\ndist\n.git\n*.log\n```\n\n## 安全实践\n\n### 1. 非 root 用户运行\n\n```dockerfile\nRUN addgroup -g 1000 appgroup && \\\n    adduser -u 1000 -G appgroup -D appuser\nUSER appuser\n```\n\n### 2. 扫描镜像漏洞\n\n```bash\ndocker scout cves myimage:latest\n```\n\n## 编排实践\n\n使用 Docker Compose 进行本地开发，使用 Kubernetes 进行生产部署。',
 '分享 Docker 容器化的最佳实践，包括镜像优化、安全配置和编排策略。',
 '/uploads/covers/docker.png',
 1, 1, 1089, 
 DATE_SUB(NOW(), INTERVAL 2 DAY), 
 DATE_SUB(NOW(), INTERVAL 2 DAY), 
 DATE_SUB(NOW(), INTERVAL 2 DAY)),

(9, 
 'Redis 缓存策略详解', 
 'redis-cache-strategies',
 '# Redis 缓存策略详解\n\n## 缓存模式\n\n### 1. Cache Aside\n\n最常用的缓存模式：\n\n```java\npublic Data getData(String key) {\n    Data data = redis.get(key);\n    if (data == null) {\n        data = db.query(key);\n        redis.set(key, data, TTL);\n    }\n    return data;\n}\n```\n\n### 2. Read Through\n\n缓存层负责读取数据。\n\n### 3. Write Through\n\n写入时同时更新缓存和数据库。\n\n### 4. Write Behind\n\n先写缓存，异步写数据库。\n\n## 缓存问题\n\n### 缓存穿透\n\n解决方案：布隆过滤器、空值缓存\n\n### 缓存击穿\n\n解决方案：互斥锁、热点数据永不过期\n\n### 缓存雪崩\n\n解决方案：随机过期时间、多级缓存',
 '深入分析 Redis 的各种缓存策略，以及缓存穿透、击穿、雪崩等问题的解决方案。',
 '/uploads/covers/redis.png',
 1, 0, 0, 
 DATE_SUB(NOW(), INTERVAL 1 DAY), 
 DATE_SUB(NOW(), INTERVAL 1 DAY), 
 NULL),

(10, 
 'Vue 3 Composition API 实战', 
 'vue3-composition-api',
 '# Vue 3 Composition API 实战\n\n## 为什么选择 Composition API\n\n- 更好的逻辑复用\n- 更灵活的代码组织\n- 更好的 TypeScript 支持\n\n## 核心概念\n\n### reactive vs ref\n\n```typescript\n// reactive 用于对象\nconst state = reactive({\n  count: 0,\n  name: "Vue"\n});\n\n// ref 用于基本类型\nconst count = ref(0);\n```\n\n### computed 和 watch\n\n```typescript\nconst doubled = computed(() => count.value * 2);\n\nwatch(count, (newVal, oldVal) => {\n  console.log(`count changed: ${oldVal} -> ${newVal}`);\n});\n```\n\n## 自定义 Hook\n\n```typescript\nfunction useMouse() {\n  const x = ref(0);\n  const y = ref(0);\n  \n  const update = (e: MouseEvent) => {\n    x.value = e.pageX;\n    y.value = e.pageY;\n  };\n  \n  onMounted(() => window.addEventListener("mousemove", update));\n  onUnmounted(() => window.removeEventListener("mousemove", update));\n  \n  return { x, y };\n}\n```',
 'Vue 3 Composition API 实战指南，涵盖核心概念、最佳实践和自定义 Hook 开发。',
 '/uploads/covers/vue3.png',
 5, 1, 678, 
 NOW(), 
 NOW(), 
 NOW());

-- ============================================
-- 4. 文章标签关联
-- ============================================
INSERT INTO article_tag (article_id, tag_id) VALUES
-- Spring Boot 3.0 新特性详解
(1, 1), (1, 2), (1, 5), (1, 12),
-- React 18 并发特性实践
(2, 3), (2, 4), (2, 11),
-- 一个人的云南之旅
(3, 8), (3, 9), (3, 14),
-- 《人类简史》读书笔记
(4, 10),
-- 从零搭建微服务架构
(5, 1), (5, 2), (5, 7), (5, 13),
-- TypeScript 高级类型技巧
(6, 4), (6, 11),
-- 周末的咖啡馆时光
(7, 14),
-- Docker 容器化最佳实践
(8, 7), (8, 12),
-- Redis 缓存策略详解
(9, 5), (9, 6), (9, 12),
-- Vue 3 Composition API 实战
(10, 4), (10, 15), (10, 11);

-- ============================================
-- 5. 图片数据（人间足迹）
-- ============================================
INSERT INTO image (id, filename, url, location, taken_at, description, sort_order, created_at, updated_at) VALUES
(1, 'dali-erhai.jpg', '/uploads/images/dali-erhai.jpg', '云南大理洱海', '2025-08-15', '洱海日出，金色的阳光洒在湖面上', 1, NOW(), NOW()),
(2, 'lijiang-old-town.jpg', '/uploads/images/lijiang-old-town.jpg', '云南丽江古城', '2025-08-16', '古城夜景，灯火阑珊', 2, NOW(), NOW()),
(3, 'kunming-dianchi.jpg', '/uploads/images/kunming-dianchi.jpg', '云南昆明滇池', '2025-08-14', '滇池边的海鸥', 3, NOW(), NOW()),
(4, 'hangzhou-west-lake.jpg', '/uploads/images/hangzhou-west-lake.jpg', '浙江杭州西湖', '2025-06-20', '西湖断桥残雪', 4, NOW(), NOW()),
(5, 'beijing-forbidden-city.jpg', '/uploads/images/beijing-forbidden-city.jpg', '北京故宫', '2025-05-01', '故宫角楼夕阳', 5, NOW(), NOW()),
(6, 'shanghai-bund.jpg', '/uploads/images/shanghai-bund.jpg', '上海外滩', '2025-04-15', '外滩夜景，东方明珠', 6, NOW(), NOW()),
(7, 'chengdu-panda.jpg', '/uploads/images/chengdu-panda.jpg', '四川成都', '2025-03-08', '大熊猫基地的可爱熊猫', 7, NOW(), NOW()),
(8, 'xian-terracotta.jpg', '/uploads/images/xian-terracotta.jpg', '陕西西安', '2025-02-20', '兵马俑的壮观景象', 8, NOW(), NOW()),
(9, 'suzhou-garden.jpg', '/uploads/images/suzhou-garden.jpg', '江苏苏州', '2025-07-10', '苏州园林的精致之美', 9, NOW(), NOW()),
(10, 'guilin-landscape.jpg', '/uploads/images/guilin-landscape.jpg', '广西桂林', '2025-09-05', '桂林山水甲天下', 10, NOW(), NOW()),
(11, 'qingdao-beach.jpg', '/uploads/images/qingdao-beach.jpg', '山东青岛', '2025-08-01', '青岛海边的日落', 11, NOW(), NOW()),
(12, 'xiamen-gulangyu.jpg', '/uploads/images/xiamen-gulangyu.jpg', '福建厦门鼓浪屿', '2025-10-01', '鼓浪屿的小巷风情', 12, NOW(), NOW());

-- ============================================
-- 6. 城市数据（人生地图）
-- ============================================
INSERT INTO city (id, name, latitude, longitude, visit_count, first_visit, notes, created_at, updated_at) VALUES
(1, '北京', 39.9042, 116.4074, 5, '2018-09-01', '首都，故宫、长城、颐和园', NOW(), NOW()),
(2, '上海', 31.2304, 121.4737, 8, '2017-03-15', '魔都，外滩、陆家嘴、迪士尼', NOW(), NOW()),
(3, '杭州', 30.2741, 120.1551, 6, '2019-04-20', '西湖美景，龙井茶园', NOW(), NOW()),
(4, '成都', 30.5728, 104.0668, 3, '2020-08-10', '美食之都，大熊猫，宽窄巷子', NOW(), NOW()),
(5, '西安', 34.3416, 108.9398, 2, '2021-05-01', '古都，兵马俑、大雁塔、城墙', NOW(), NOW()),
(6, '昆明', 25.0389, 102.7183, 1, '2025-08-14', '春城，滇池、石林', NOW(), NOW()),
(7, '大理', 25.6065, 100.2679, 1, '2025-08-15', '风花雪月，洱海、古城', NOW(), NOW()),
(8, '丽江', 26.8721, 100.2297, 1, '2025-08-16', '古城、玉龙雪山、泸沽湖', NOW(), NOW()),
(9, '苏州', 31.2989, 120.5853, 4, '2019-07-10', '园林之城，周庄、同里', NOW(), NOW()),
(10, '青岛', 36.0671, 120.3826, 2, '2022-07-20', '海滨城市，啤酒节、栈桥', NOW(), NOW()),
(11, '厦门', 24.4798, 118.0894, 2, '2023-10-01', '鼓浪屿、南普陀、环岛路', NOW(), NOW()),
(12, '桂林', 25.2744, 110.2900, 1, '2024-09-15', '山水甲天下，漓江、阳朔', NOW(), NOW());

-- ============================================
-- 7. 音乐数据
-- ============================================
INSERT INTO music (id, title, artist, album, duration, url, cover_url, sort_order, created_at, updated_at) VALUES
(1, '晴天', '周杰伦', '叶惠美', 269, '/uploads/music/qingtian.mp3', '/uploads/music/covers/qingtian.jpg', 1, NOW(), NOW()),
(2, '七里香', '周杰伦', '七里香', 299, '/uploads/music/qilixiang.mp3', '/uploads/music/covers/qilixiang.jpg', 2, NOW(), NOW()),
(3, '稻香', '周杰伦', '魔杰座', 223, '/uploads/music/daoxiang.mp3', '/uploads/music/covers/daoxiang.jpg', 3, NOW(), NOW()),
(4, '起风了', '买辣椒也用券', '起风了', 325, '/uploads/music/qifengle.mp3', '/uploads/music/covers/qifengle.jpg', 4, NOW(), NOW()),
(5, '平凡之路', '朴树', '猎户星座', 298, '/uploads/music/pingfanzhilu.mp3', '/uploads/music/covers/pingfanzhilu.jpg', 5, NOW(), NOW()),
(6, '成都', '赵雷', '无法长大', 325, '/uploads/music/chengdu.mp3', '/uploads/music/covers/chengdu.jpg', 6, NOW(), NOW()),
(7, '理想三旬', '陈鸿宇', '浓烟下的诗歌电台', 296, '/uploads/music/lixiangsansun.mp3', '/uploads/music/covers/lixiangsansun.jpg', 7, NOW(), NOW()),
(8, '南山南', '马頔', '孤岛', 312, '/uploads/music/nanshannan.mp3', '/uploads/music/covers/nanshannan.jpg', 8, NOW(), NOW()),
(9, '岁月神偷', '金玟岐', '岁月神偷', 276, '/uploads/music/suiyueshentou.mp3', '/uploads/music/covers/suiyueshentou.jpg', 9, NOW(), NOW()),
(10, '夜空中最亮的星', '逃跑计划', '世界', 262, '/uploads/music/yekongzhongzuiliangdexing.mp3', '/uploads/music/covers/yekongzhongzuiliangdexing.jpg', 10, NOW(), NOW());

-- ============================================
-- 8. 灵感数据
-- ============================================
INSERT INTO inspiration (id, content, article_id, category, created_at, updated_at) VALUES
(1, '代码是写给人看的，顺便能在机器上运行。', NULL, '编程', NOW(), NOW()),
(2, '简单是可靠的先决条件。', NULL, '编程', NOW(), NOW()),
(3, '旅行不是为了逃避生活，而是为了让生活不再逃避我们。', 3, '生活', NOW(), NOW()),
(4, '读书不是为了雄辩和驳斥，也不是为了轻信和盲从，而是为了思考和权衡。', 4, '阅读', NOW(), NOW()),
(5, '最好的代码是没有代码。', NULL, '编程', NOW(), NOW()),
(6, '生活不止眼前的代码，还有诗和远方。', NULL, '生活', NOW(), NOW()),
(7, '每一次重构都是一次成长。', NULL, '编程', NOW(), NOW()),
(8, '咖啡和代码，是程序员最好的朋友。', NULL, '生活', NOW(), NOW()),
(9, '微服务不是目的，而是手段。', 5, '架构', NOW(), NOW()),
(10, '学习新技术最好的方式是动手实践。', NULL, '学习', NOW(), NOW());

-- ============================================
-- 9. 访问统计数据
-- ============================================
INSERT INTO visit_stat (id, visit_date, page_views, unique_visitors, created_at, updated_at) VALUES
(1, DATE_SUB(CURDATE(), INTERVAL 7 DAY), 156, 89, NOW(), NOW()),
(2, DATE_SUB(CURDATE(), INTERVAL 6 DAY), 189, 102, NOW(), NOW()),
(3, DATE_SUB(CURDATE(), INTERVAL 5 DAY), 234, 128, NOW(), NOW()),
(4, DATE_SUB(CURDATE(), INTERVAL 4 DAY), 198, 115, NOW(), NOW()),
(5, DATE_SUB(CURDATE(), INTERVAL 3 DAY), 267, 145, NOW(), NOW()),
(6, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 312, 178, NOW(), NOW()),
(7, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 289, 156, NOW(), NOW()),
(8, CURDATE(), 345, 198, NOW(), NOW());

-- ============================================
-- 10. 系统设置
-- ============================================
INSERT INTO system_setting (id, setting_key, setting_value, created_at, updated_at) VALUES
(1, 'site_title', '星落林间', NOW(), NOW()),
(2, 'site_subtitle', '记录生活，分享技术', NOW(), NOW()),
(3, 'site_description', '一个关于技术、生活、旅行的个人博客', NOW(), NOW()),
(4, 'site_keywords', '博客,技术,旅行,生活,编程', NOW(), NOW()),
(5, 'author_name', '林间', NOW(), NOW()),
(6, 'author_avatar', '/uploads/avatar.jpg', NOW(), NOW()),
(7, 'author_bio', '一个热爱编程和旅行的开发者', NOW(), NOW()),
(8, 'social_github', 'https://github.com/example', NOW(), NOW()),
(9, 'social_email', 'contact@example.com', NOW(), NOW()),
(10, 'footer_text', '© 2026 星落林间 - Powered by React & Spring Boot', NOW(), NOW());

-- ============================================
-- 数据统计
-- ============================================
SELECT '数据导入完成' AS status;
SELECT 
  (SELECT COUNT(*) FROM category) AS categories,
  (SELECT COUNT(*) FROM tag) AS tags,
  (SELECT COUNT(*) FROM article) AS articles,
  (SELECT COUNT(*) FROM image) AS images,
  (SELECT COUNT(*) FROM city) AS cities,
  (SELECT COUNT(*) FROM music) AS music,
  (SELECT COUNT(*) FROM inspiration) AS inspirations;
