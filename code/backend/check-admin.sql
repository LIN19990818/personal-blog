SELECT 'admin' as table_name, COUNT(*) as count FROM admin
UNION ALL
SELECT 'category', COUNT(*) FROM category
UNION ALL
SELECT 'tag', COUNT(*) FROM tag
UNION ALL
SELECT 'article', COUNT(*) FROM article;
