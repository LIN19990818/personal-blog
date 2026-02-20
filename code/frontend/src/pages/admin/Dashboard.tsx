import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, List, Tag, DatePicker, Segmented } from 'antd';
import { FileTextOutlined, FolderOutlined, TagsOutlined, EyeOutlined, UserOutlined, RiseOutlined } from '@ant-design/icons';
import { getAdminArticleList } from '@/api/article';
import { getCategoryList } from '@/api/category';
import { getTagList } from '@/api/tag';
import request from '@/utils/request';
import dayjs from 'dayjs';
import type { Article, Category, Tag as ITag } from '@/types';

interface VisitStat {
  visitDate: string;
  pageViews: number;
  uniqueVisitors: number;
}

interface VisitSummary {
  totalPageViews: number;
  totalUniqueVisitors: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    articleCount: 0,
    categoryCount: 0,
    tagCount: 0,
    totalViews: 0,
  });
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [visitStats, setVisitStats] = useState<VisitStat[]>([]);
  const [visitSummary, setVisitSummary] = useState<VisitSummary>({ totalPageViews: 0, totalUniqueVisitors: 0 });
  const [dateRange, setDateRange] = useState<'7' | '30'>('7');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, categoriesRes, tagsRes] = await Promise.all([
          getAdminArticleList({ page: 1, size: 5 }),
          getCategoryList(),
          getTagList(),
        ]);
        
        setStats({
          articleCount: articlesRes.total || 0,
          categoryCount: (categoriesRes || []).length,
          tagCount: (tagsRes || []).length,
          totalViews: (articlesRes.list || []).reduce((sum, a) => sum + (a.viewCount || 0), 0),
        });
        setRecentArticles(articlesRes.list || []);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchVisitStats = async () => {
      try {
        const days = dateRange === '7' ? 7 : 30;
        const endDate = dayjs().format('YYYY-MM-DD');
        const startDate = dayjs().subtract(days - 1, 'day').format('YYYY-MM-DD');
        
        const [statsRes, summaryRes] = await Promise.all([
          request.get<VisitStat[]>('/api/stats', { params: { startDate, endDate } }),
          request.get<VisitSummary>('/api/stats/summary', { params: { startDate, endDate } }),
        ]);
        
        setVisitStats(statsRes || []);
        setVisitSummary(summaryRes || { totalPageViews: 0, totalUniqueVisitors: 0 });
      } catch (error) {
        console.error('Failed to fetch visit stats:', error);
      }
    };
    fetchVisitStats();
  }, [dateRange]);

  const maxPageViews = Math.max(...visitStats.map(s => s.pageViews), 1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">仪表盘</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="文章总数"
              value={stats.articleCount}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="分类数量"
              value={stats.categoryCount}
              prefix={<FolderOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="标签数量"
              value={stats.tagCount}
              prefix={<TagsOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="总浏览量"
              value={stats.totalViews}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title="访问统计" 
        className="mt-6"
        extra={
          <Segmented
            value={dateRange}
            onChange={(v) => setDateRange(v as '7' | '30')}
            options={[
              { label: '近7天', value: '7' },
              { label: '近30天', value: '30' },
            ]}
          />
        }
      >
        <Row gutter={16} className="mb-6">
          <Col span={12}>
            <Statistic
              title="页面浏览量"
              value={visitSummary.totalPageViews}
              prefix={<EyeOutlined />}
              suffix={<RiseOutlined className="text-green-500 ml-2" />}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="独立访客"
              value={visitSummary.totalUniqueVisitors}
              prefix={<UserOutlined />}
            />
          </Col>
        </Row>
        
        <div className="h-48 flex items-end gap-1">
          {visitStats.slice(-14).map((stat) => (
            <div key={stat.visitDate} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                style={{ 
                  height: `${(stat.pageViews / maxPageViews) * 150}px`,
                  minHeight: stat.pageViews > 0 ? '4px' : '0'
                }}
                title={`${stat.visitDate}: ${stat.pageViews} 次浏览`}
              />
              <span className="text-xs text-gray-400 mt-1 transform -rotate-45 origin-left">
                {dayjs(stat.visitDate).format('MM/DD')}
              </span>
            </div>
          ))}
        </div>
        {visitStats.length === 0 && (
          <div className="text-center text-gray-400 py-8">暂无访问数据</div>
        )}
      </Card>

      <Card title="最近文章" className="mt-6" loading={loading}>
        <List
          dataSource={recentArticles}
          renderItem={(article) => (
            <List.Item>
              <List.Item.Meta
                title={article.title}
                description={
                  <div className="flex items-center gap-2">
                    {article.category && (
                      <Tag color="blue">{article.category.name}</Tag>
                    )}
                    <span className="text-gray-500">
                      {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : '-'}
                    </span>
                    <span className="text-gray-500">
                      阅读 {article.viewCount || 0}
                    </span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
