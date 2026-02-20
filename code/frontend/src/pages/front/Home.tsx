import React, { useEffect, useState, useCallback } from 'react';
import { Card, Tag, Empty, Skeleton, Pagination, Spin } from 'antd';
import { EyeOutlined, ClockCircleOutlined, DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getArticleList } from '@/api/article';
import { getCategoryList } from '@/api/category';
import { getTagList } from '@/api/tag';
import { settingApi } from '@/api/setting';
import TimelineSection from '@/components/front/TimelineSection';
import type { Article, Category, Tag as ITag } from '@/types';

interface SiteConfig {
  coverImage: string;
  siteTitle: string;
  siteSubtitle: string;
  siteDescription: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedTag, setSelectedTag] = useState<number | undefined>();
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    coverImage: '',
    siteTitle: '星落林间',
    siteSubtitle: '',
    siteDescription: '',
  });
  const [configLoading, setConfigLoading] = useState(true);

  const fetchSiteConfig = async () => {
    try {
      const settings = await settingApi.getAll();
      const config: SiteConfig = {
        coverImage: '',
        siteTitle: '星落林间',
        siteSubtitle: '',
        siteDescription: '',
      };
      if (settings) {
        settings.forEach((s) => {
          if (s.key === 'coverImage') config.coverImage = s.value;
          if (s.key === 'siteTitle') config.siteTitle = s.value;
          if (s.key === 'siteSubtitle') config.siteSubtitle = s.value;
          if (s.key === 'siteDescription') config.siteDescription = s.value;
        });
      }
      setSiteConfig(config);
    } catch (error) {
      console.error('Failed to fetch site config:', error);
    } finally {
      setConfigLoading(false);
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getArticleList({
        page,
        size: pageSize,
        categoryId: selectedCategory,
        tagId: selectedTag,
      });
      setArticles(res.list || []);
      setTotal(res.total || 0);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      setArticles([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, selectedCategory, selectedTag]);

  useEffect(() => {
    const loadSideData = async () => {
      try {
        const [cats, tagList] = await Promise.all([
          getCategoryList(),
          getTagList(),
        ]);
        setCategories(cats || []);
        setTags(tagList || []);
      } catch (error) {
        console.error('Failed to load side data:', error);
        setCategories([]);
        setTags([]);
      }
    };
    loadSideData();
    fetchSiteConfig();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCategoryClick = (id?: number) => {
    setSelectedCategory(id === selectedCategory ? undefined : id);
    setPage(1);
  };

  const handleTagClick = (id?: number) => {
    setSelectedTag(id === selectedTag ? undefined : id);
    setPage(1);
  };

  const scrollToContent = () => {
    const contentEl = document.getElementById('main-content');
    if (contentEl) {
      contentEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {configLoading ? (
        <div className="h-96 flex items-center justify-center">
          <Spin size="large" />
        </div>
      ) : siteConfig.coverImage ? (
        <div
          className="relative h-[60vh] min-h-[400px] bg-cover bg-center bg-no-repeat cursor-pointer"
          style={{ backgroundImage: `url(${siteConfig.coverImage})` }}
          onClick={scrollToContent}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              {siteConfig.siteTitle}
            </h1>
            {siteConfig.siteSubtitle && (
              <p className="text-xl md:text-2xl mb-4 text-center opacity-90">
                {siteConfig.siteSubtitle}
              </p>
            )}
            {siteConfig.siteDescription && (
              <p className="text-base md:text-lg max-w-2xl text-center opacity-80">
                {siteConfig.siteDescription}
              </p>
            )}
            <div className="mt-8 animate-bounce">
              <DownOutlined className="text-2xl opacity-70" />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-[40vh] min-h-[300px] flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {siteConfig.siteTitle}
          </h1>
          {siteConfig.siteSubtitle && (
            <p className="text-xl md:text-2xl mb-4 text-center opacity-90">
              {siteConfig.siteSubtitle}
            </p>
          )}
          {siteConfig.siteDescription && (
            <p className="text-base md:text-lg max-w-2xl text-center opacity-80">
              {siteConfig.siteDescription}
            </p>
          )}
        </div>
      )}

      <div id="main-content" className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">最新文章</h1>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <Skeleton active />
                  </Card>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <Empty description="暂无文章" />
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <Card
                    key={article.id}
                    hoverable
                    className={`overflow-hidden ${!article.coverImage ? 'border-l-4 border-l-blue-400' : ''}`}
                  >
                    {article.coverImage ? (
                      <div className="flex flex-col md:flex-row -m-6">
                        <div className="md:w-1/3 shrink-0">
                          <Link to={`/article/${article.id}`}>
                            <img
                              src={article.coverImage}
                              alt={article.title}
                              className="h-full min-h-48 w-full object-cover"
                            />
                          </Link>
                        </div>
                        <div className="md:w-2/3 p-6">
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
                        </div>
                      </div>
                    ) : (
                      <div className="py-2">
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
                      </div>
                    )}
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
          <div className="space-y-6">
            <Card title="分类">
              <div className="flex flex-wrap gap-2">
                <Tag
                  color={!selectedCategory ? 'blue' : 'default'}
                  className="cursor-pointer"
                  onClick={() => handleCategoryClick(undefined)}
                >
                  全部
                </Tag>
                {categories.map((cat) => (
                  <Tag
                    key={cat.id}
                    color={selectedCategory === cat.id ? 'blue' : 'default'}
                    className="cursor-pointer"
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    {cat.name}
                  </Tag>
                ))}
              </div>
            </Card>
            <Card title="标签">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    color={selectedTag === tag.id ? 'blue' : 'default'}
                    className="cursor-pointer"
                    onClick={() => handleTagClick(tag.id)}
                  >
                    {tag.name}
                  </Tag>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <TimelineSection />
    </div>
  );
};

export default Home;
