import React, { useEffect, useState } from 'react';
import { Card, Tag, Empty, Skeleton, Pagination } from 'antd';
import { EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { getArticleList } from '@/api/article';
import { getCategoryList } from '@/api/category';
import type { Article, Category } from '@/types';

const CategoryList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const currentCategory = categories.find((c) => c.id === Number(id));

  useEffect(() => {
    getCategoryList().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: { page: number; size: number; categoryId?: number } = { page, size: pageSize };
    if (id) {
      params.categoryId = Number(id);
    }
    getArticleList(params)
      .then((res) => {
        setArticles(res.list || []);
        setTotal(res.total || 0);
      })
      .finally(() => setLoading(false));
  }, [id, page, pageSize]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">
            {currentCategory ? `分类：${currentCategory.name}` : '全部分类文章'}
          </h1>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <Skeleton active />
                </Card>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <Empty description={currentCategory ? '该分类下暂无文章' : '暂无文章'} />
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <Card key={article.id} hoverable>
                  <Link to={`/article/${article.id}`}>
                    <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
                      {article.title}
                    </h2>
                  </Link>
                  {article.summary && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.summary}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <ClockCircleOutlined />
                      {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : '-'}
                    </span>
                    <span className="flex items-center gap-1">
                      <EyeOutlined />
                      {article.viewCount || 0}
                    </span>
                  </div>
                </Card>
              ))}
              <div className="flex justify-center mt-6">
                <Pagination
                  current={page}
                  pageSize={pageSize}
                  total={total}
                  onChange={(p) => setPage(p)}
                  showTotal={(total) => `共 ${total} 篇`}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <Card title="所有分类">
            <div className="flex flex-wrap gap-2">
              <Link to="/category">
                <Tag
                  color={!id ? 'blue' : 'default'}
                  className="cursor-pointer"
                >
                  全部
                </Tag>
              </Link>
              {categories.map((cat) => (
                <Link key={cat.id} to={`/category/${cat.id}`}>
                  <Tag
                    color={cat.id === Number(id) ? 'blue' : 'default'}
                    className="cursor-pointer"
                  >
                    {cat.name}
                  </Tag>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
