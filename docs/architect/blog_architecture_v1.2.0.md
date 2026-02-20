# 个人博客系统 - 全局编码统一规范

**版本**: v1.2.0  
**创建日期**: 2026-02-17  
**架构师**: Architect  
**状态**: 强制执行

---

## 一、编码规范总则

### 1.1 核心原则

- **所有文件编码统一为 UTF-8（无BOM）**
- **禁止使用 GBK、GB2312、GB18030 等其他编码**
- **所有代码文件头部必须添加编码声明**

### 1.2 适用范围

| 文件类型 | 编码要求 |
|----------|----------|
| Java 源文件 (.java) | UTF-8 无BOM |
| TypeScript/JavaScript (.ts/.tsx/.js/.jsx) | UTF-8 无BOM |
| 配置文件 (.yml/.yaml/.json/.xml) | UTF-8 无BOM |
| HTML 文件 (.html) | UTF-8 无BOM |
| CSS 文件 (.css/.scss/.less) | UTF-8 无BOM |
| SQL 脚本 (.sql) | UTF-8 无BOM |
| Markdown 文档 (.md) | UTF-8 无BOM |
| Shell 脚本 (.sh/.ps1/.bat) | UTF-8 无BOM |

---

## 二、前端编码配置

### 2.1 HTML 文件

所有 HTML 文件必须在 `<head>` 中添加：

```html
<meta charset="UTF-8">
```

### 2.2 Vite 配置

在 `vite.config.ts` 中添加：

```typescript
export default defineConfig({
  // ... 其他配置
  server: {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    }
  }
})
```

### 2.3 package.json 配置

确保 package.json 中无编码相关问题的脚本。

### 2.4 index.html 模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>星落林间</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 三、后端编码配置

### 3.1 application.yml 配置

```yaml
spring:
  http:
    encoding:
      charset: UTF-8
      enabled: true
      force: true
  datasource:
    url: jdbc:mysql://localhost:13306/blog?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
```

### 3.2 application-dev.yml 配置

```yaml
spring:
  http:
    encoding:
      charset: UTF-8
      enabled: true
      force: true
```

### 3.3 Maven 配置 (pom.xml)

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
</properties>
```

---

## 四、数据库编码配置

### 4.1 MySQL 配置文件 (my.cnf / my.ini)

```ini
[mysqld]
character_set_server=utf8mb4
collation_server=utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'

[client]
default_character_set=utf8mb4

[mysql]
default_character_set=utf8mb4
```

### 4.2 SQL 脚本规范

所有 SQL 脚本文件开头必须添加：

```sql
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
```

### 4.3 数据库连接 URL

```
jdbc:mysql://localhost:13306/blog?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
```

---

## 五、.editorconfig 文件

项目根目录必须包含 `.editorconfig` 文件：

```editorconfig
# EditorConfig - 全局编码统一配置
# https://editorconfig.org

root = true

# 所有文件的默认设置
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

# Java 文件
[*.java]
indent_style = space
indent_size = 4

# TypeScript/JavaScript 文件
[*.{ts,tsx,js,jsx}]
indent_style = space
indent_size = 2

# JSON 文件
[*.json]
indent_style = space
indent_size = 2

# YAML 文件
[*.{yml,yaml}]
indent_style = space
indent_size = 2

# XML 文件
[*.xml]
indent_style = space
indent_size = 4

# SQL 文件
[*.sql]
indent_style = space
indent_size = 4

# HTML 文件
[*.html]
indent_style = space
indent_size = 2

# CSS 文件
[*.{css,scss,less}]
indent_style = space
indent_size = 2

# Markdown 文件
[*.md]
trim_trailing_whitespace = false

# Shell 脚本
[*.{sh,bat,ps1}]
indent_style = space
indent_size = 2
```

---

## 六、编码校验规则

### 6.1 校验项清单

| 校验项 | 校验内容 | 通过标准 |
|--------|----------|----------|
| 文件编码 | 所有源文件编码 | UTF-8 无BOM |
| HTML 声明 | HTML 文件 charset | 存在且为 UTF-8 |
| 后端配置 | application.yml 编码配置 | 存在且正确 |
| 数据库连接 | JDBC URL 编码参数 | 包含 characterEncoding |
| SQL 脚本 | SET NAMES 声明 | 存在且为 utf8mb4 |
| .editorconfig | 文件存在且配置正确 | 存在且 charset=utf-8 |

### 6.2 校验命令

```powershell
# 检查文件编码（PowerShell）
Get-ChildItem -Recurse -Include *.java,*.ts,*.tsx,*.js,*.jsx,*.html,*.css,*.sql,*.yml,*.yaml,*.json,*.md | ForEach-Object {
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        Write-Host "BOM detected: $($_.FullName)"
    }
}
```

---

## 七、违规处理

### 7.1 编码不统一的后果

- 代码无法正常运行
- 中文显示乱码
- 数据库数据损坏
- 跨平台兼容性问题

### 7.2 修复流程

1. 使用编辑器将文件另存为 UTF-8 无BOM
2. 或使用命令行工具批量转换
3. 重新验证编码正确性

---

## 八、版本历史

| 版本 | 日期 | 变更内容 | 变更人 |
|------|------|----------|--------|
| v1.2.0 | 2026-02-17 | 新增全局编码统一规范 | Architect |

---

**本规范为强制执行，所有代码文件必须严格遵守。**
