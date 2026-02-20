SET NAMES utf8mb4;

INSERT INTO article (title, slug, content, summary, cover_image, category_id, status, view_count, created_at, updated_at, published_at) VALUES
('React 18 新特性详解', 'react-18-new-features', '# React 18 新特性详解\n\nReact 18 带来了许多令人兴奋的新特性，包括并发渲染、自动批处理、Suspense 改进等。\n\n## 并发渲染\n\n并发渲染是 React 18 最核心的特性，它允许 React 准备多个版本的 UI 同时存在。\n\n```jsx\nconst root = ReactDOM.createRoot(document.getElementById(\'root\'));\nroot.render(<App />);\n```\n\n## 自动批处理\n\nReact 18 自动批处理所有状态更新，即使在 Promise、setTimeout 或原生事件处理程序中也是如此。\n\n## 总结\n\nReact 18 的这些新特性将大大提升应用性能和用户体验。', 'React 18 带来了并发渲染、自动批处理等新特性，本文详细介绍这些特性的使用方法。', NULL, 1, 1, 156, NOW(), NOW(), NOW()),

('TypeScript 高级类型技巧', 'typescript-advanced-types', '# TypeScript 高级类型技巧\n\nTypeScript 提供了强大的类型系统，本文介绍一些高级类型技巧。\n\n## 泛型约束\n\n```typescript\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n```\n\n## 条件类型\n\n条件类型允许根据类型关系进行条件判断。\n\n```typescript\ntype NonNullable<T> = T extends null | undefined ? never : T;\n```\n\n## 映射类型\n\n映射类型可以基于现有类型创建新类型。\n\n## 总结\n\n掌握这些高级类型技巧，可以写出更安全、更优雅的 TypeScript 代码。', '本文介绍 TypeScript 的高级类型技巧，包括泛型约束、条件类型、映射类型等。', NULL, 1, 1, 89, NOW(), NOW(), NOW()),

('Spring Boot 3.0 实践指南', 'spring-boot-3-guide', '# Spring Boot 3.0 实践指南\n\nSpring Boot 3.0 是一个重大更新，基于 Spring Framework 6.0 和 Java 17。\n\n## 主要变化\n\n- 最低要求 Java 17\n- 支持 Jakarta EE 9+\n- 原生编译支持\n\n## 快速开始\n\n```java\n@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}\n```\n\n## 总结\n\nSpring Boot 3.0 带来了许多改进，值得升级。', 'Spring Boot 3.0 实践指南，介绍主要变化和快速入门方法。', NULL, 1, 1, 234, NOW(), NOW(), NOW()),

('MySQL 性能优化实战', 'mysql-performance-optimization', '# MySQL 性能优化实战\n\n数据库性能优化是后端开发的重要技能。\n\n## 索引优化\n\n合理的索引可以大幅提升查询性能。\n\n```sql\nCREATE INDEX idx_user_email ON users(email);\n```\n\n## 查询优化\n\n避免 SELECT *，使用 EXPLAIN 分析查询计划。\n\n## 配置优化\n\n调整 buffer pool、连接数等参数。\n\n## 总结\n\nMySQL 优化需要从多个维度考虑，包括索引、查询、配置等。', 'MySQL 性能优化实战，涵盖索引优化、查询优化、配置优化等方面。', NULL, 1, 1, 178, NOW(), NOW(), NOW()),

('Docker 容器化部署最佳实践', 'docker-deployment-best-practices', '# Docker 容器化部署最佳实践\n\nDocker 改变了软件交付的方式，本文介绍容器化部署的最佳实践。\n\n## 编写 Dockerfile\n\n```dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "src/index.js"]\n```\n\n## 多阶段构建\n\n使用多阶段构建减小镜像体积。\n\n## Docker Compose\n\n使用 Docker Compose 管理多容器应用。\n\n## 总结\n\n遵循最佳实践可以构建更安全、更高效的容器。', 'Docker 容器化部署最佳实践，包括 Dockerfile 编写、多阶段构建、Docker Compose 使用。', NULL, 1, 1, 145, NOW(), NOW(), NOW()),

('个人作品集网站设计', 'portfolio-website-design', '# 个人作品集网站设计\n\n一个优秀的作品集网站可以展示你的专业技能和项目经验。\n\n## 设计原则\n\n- 简洁明了\n- 突出重点\n- 响应式设计\n\n## 技术选型\n\n- React + TypeScript\n- Tailwind CSS\n- Framer Motion\n\n## 关键页面\n\n1. 首页 - 个人简介\n2. 作品展示\n3. 技能介绍\n4. 联系方式\n\n## 总结\n\n好的作品集网站是求职的利器。', '个人作品集网站设计指南，包括设计原则、技术选型和关键页面设计。', NULL, 2, 1, 67, NOW(), NOW(), NOW()),

('前端工程化实践', 'frontend-engineering', '# 前端工程化实践\n\n前端工程化是提升开发效率和代码质量的重要手段。\n\n## 构建工具\n\n- Vite - 快速的开发服务器\n- Webpack - 强大的打包工具\n\n## 代码规范\n\n- ESLint - 代码检查\n- Prettier - 代码格式化\n\n## 自动化测试\n\n- Jest - 单元测试\n- Cypress - E2E 测试\n\n## CI/CD\n\n使用 GitHub Actions 实现自动化部署。\n\n## 总结\n\n工程化让前端开发更加规范和高效。', '前端工程化实践，涵盖构建工具、代码规范、自动化测试和 CI/CD。', NULL, 1, 1, 112, NOW(), NOW(), NOW()),

('后端架构设计模式', 'backend-architecture-patterns', '# 后端架构设计模式\n\n良好的架构设计是系统可维护性的基础。\n\n## 分层架构\n\n- Controller 层\n- Service 层\n- Repository 层\n\n## 微服务架构\n\n将单体应用拆分为多个独立服务。\n\n## CQRS\n\n命令查询职责分离，优化读写性能。\n\n## 事件驱动\n\n使用消息队列实现异步处理。\n\n## 总结\n\n选择合适的架构模式对项目成功至关重要。', '后端架构设计模式介绍，包括分层架构、微服务、CQRS、事件驱动等。', NULL, 1, 1, 198, NOW(), NOW(), NOW()),

('程序员的成长之路', 'developer-growth-path', '# 程序员的成长之路\n\n技术成长是一条漫长的道路，需要持续学习和实践。\n\n## 技术深度\n\n选择一个方向深入研究，成为专家。\n\n## 技术广度\n\n了解相关领域知识，拓展视野。\n\n## 软技能\n\n- 沟通能力\n- 团队协作\n- 问题解决\n\n## 学习方法\n\n- 阅读源码\n- 写技术博客\n- 参与开源\n\n## 总结\n\n保持好奇心和学习热情，持续成长。', '程序员成长之路，分享技术深度、广度、软技能和学习方法。', NULL, 3, 1, 89, NOW(), NOW(), NOW()),

('远程工作心得分享', 'remote-work-tips', '# 远程工作心得分享\n\n远程工作已成为新常态，分享一些实用心得。\n\n## 工作环境\n\n打造一个专注的工作空间，减少干扰。\n\n## 时间管理\n\n- 制定工作计划\n- 使用番茄工作法\n- 设定工作边界\n\n## 沟通协作\n\n- 定期同步会议\n- 使用协作工具\n- 保持透明沟通\n\n## 自我调节\n\n- 保持运动\n- 社交互动\n- 工作生活平衡\n\n## 总结\n\n远程工作需要自律和良好的习惯。', '远程工作心得分享，包括工作环境、时间管理、沟通协作和自我调节。', NULL, 3, 1, 56, NOW(), NOW(), NOW());

INSERT INTO article_tag (article_id, tag_id, created_at) VALUES
(1, 1, NOW()),
(1, 2, NOW()),
(1, 6, NOW()),
(2, 2, NOW()),
(2, 6, NOW()),
(3, 3, NOW()),
(3, 4, NOW()),
(3, 7, NOW()),
(4, 4, NOW()),
(4, 7, NOW()),
(5, 5, NOW()),
(5, 7, NOW()),
(6, 1, NOW()),
(6, 6, NOW()),
(7, 1, NOW()),
(7, 2, NOW()),
(7, 6, NOW()),
(8, 3, NOW()),
(8, 4, NOW()),
(8, 5, NOW()),
(8, 7, NOW()),
(9, 8, NOW()),
(10, 8, NOW());
