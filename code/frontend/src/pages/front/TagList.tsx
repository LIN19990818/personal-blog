import React, { useEffect, useState } from 'react';
import { Card, Tag, Empty, Skeleton, Pagination } from 'antd';
import { EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { getArticleList } from '@/api/article';
import { getTagList } from '@/api/tag';
import type { Article, Tag as ITag } from '@/types';

const TagList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const currentTag = tags.find((t) => t.id === Number(id));

  useEffect(() => {
    getTagList().then(setTags);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: { page: number; size: number; tagId?: number } = { page, size: pageSize };
    if (id) {
      params.tagId = Number(id);
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
            {currentTag ? `标签：${currentTag.name}` : '全部标签文章'}
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
            <Empty description={currentTag ? '该标签下暂无文章' : '暂无文章'} />
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
                    {article.category && (
                      <Tag color="blue">{article.category.name}</Tag>
                    )}
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
          <Card title="所有标签">
            <div className="flex flex-wrap gap-2">
              <Link to="/tag">
                <Tag
                  color={!id ? 'blue' : 'default'}
                  className="cursor-pointer"
                >
                  全部
                </Tag>
              </Link>
              {tags.map((tag) => (
                <Link key={tag.id} to={`/tag/${tag.id}`}>
                  <Tag
                    color={tag.id === Number(id) ? 'blue' : 'default'}
                    className="cursor-pointer"
                  >
                    {tag.name}
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

export default TagList;
