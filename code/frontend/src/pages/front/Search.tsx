import React, { useEffect, useState, useCallback } from 'react';
import { Card, Tag, Empty, Skeleton, Pagination, Input } from 'antd';
import { EyeOutlined, ClockCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import { searchArticles } from '@/api/search';
import { useDebounce } from '@/hooks/useDebounce';
import type { Article } from '@/types';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(keyword);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const debouncedKeyword = useDebounce(inputValue, 300);

  const fetchData = useCallback(async () => {
    if (!debouncedKeyword) {
      setArticles([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const res = await searchArticles({
        keyword: debouncedKeyword,
        page,
        size: pageSize,
      });
      setArticles(res.list || []);
      setTotal(res.total || 0);
    } catch (error) {
      console.error('Search failed:', error);
      setArticles([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [debouncedKeyword, page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (debouncedKeyword) {
      setSearchParams({ q: debouncedKeyword });
    } else {
      setSearchParams({});
    }
  }, [debouncedKeyword, setSearchParams]);

  const handleSearch = (value: string) => {
    setInputValue(value);
    setPage(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Input.Search
          placeholder="搜索文章..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSearch={handleSearch}
          enterButton={<SearchOutlined />}
          size="large"
          allowClear
        />
      </div>
      {keyword && (
        <h1 className="text-2xl font-bold mb-6">
          搜索 "{keyword}" 的结果（共 {total} 篇）
        </h1>
      )}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Skeleton active />
            </Card>
          ))}
        </div>
      ) : !keyword ? (
        <Empty description="请输入搜索关键词" />
      ) : articles.length === 0 ? (
        <Empty description="未找到相关文章" />
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
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : '未发布'}
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
  );
};

export default Search;
