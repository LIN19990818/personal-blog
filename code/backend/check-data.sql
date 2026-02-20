SELECT '文章数量' as type, COUNT(*) as count FROM article
UNION ALL
SELECT '分类数量', COUNT(*) FROM category
UNION ALL
SELECT '标签数量', COUNT(*) FROM tag
UNION ALL
SELECT '图片数量', COUNT(*) FROM image
UNION ALL
SELECT '城市数量', COUNT(*) FROM city
UNION ALL
SELECT '音乐数量', COUNT(*) FROM music;
