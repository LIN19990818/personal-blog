import React, { useEffect, useState } from 'react';
import { Card, Tag, Skeleton, Empty, Button, Dropdown, message } from 'antd';
import { EyeOutlined, ClockCircleOutlined, ArrowLeftOutlined, ShareAltOutlined, LinkOutlined, WechatOutlined, QqOutlined, WeiboOutlined } from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import 'bytemd/dist/index.css';
import 'highlight.js/styles/github.css';
import { getArticleDetail } from '@/api/article';
import type { Article } from '@/types';
import type { MenuProps } from 'antd';

const plugins = [gfm(), highlight()];

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getArticleDetail(Number(id))
        .then(setArticle)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      message.success('链接已复制到剪贴板');
    }).catch(() => {
      message.error('复制失败');
    });
  };

  const handleShare = (platform: 'wechat' | 'weibo' | 'qq') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article?.title || '');
    let shareUrl = '';
    
    switch (platform) {
      case 'weibo':
        shareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${title}`;
        break;
      case 'qq':
        shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}`;
        break;
      case 'wechat':
        message.info('请使用微信扫描页面二维码分享');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const shareMenuItems: MenuProps['items'] = [
    {
      key: 'copy',
      icon: <LinkOutlined />,
      label: '复制链接',
      onClick: handleCopyLink,
    },
    {
      key: 'wechat',
      icon: <WechatOutlined style={{ color: '#07c160' }} />,
      label: '分享到微信',
      onClick: () => handleShare('wechat'),
    },
    {
      key: 'weibo',
      icon: <WeiboOutlined style={{ color: '#e6162d' }} />,
      label: '分享到微博',
      onClick: () => handleShare('weibo'),
    },
    {
      key: 'qq',
      icon: <QqOutlined style={{ color: '#12b7f5' }} />,
      label: '分享到QQ',
      onClick: () => handleShare('qq'),
    },
  ];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton active />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Empty description="文章不存在" />
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeftOutlined /> 返回首页
      </Link>
      <Card>
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
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
              {article.viewCount || 0} 阅读
            </span>
          </div>
          <Dropdown menu={{ items: shareMenuItems }} placement="bottomRight">
            <Button icon={<ShareAltOutlined />}>分享</Button>
          </Dropdown>
        </div>
        {article.tags && article.tags.length > 0 && (
          <div className="mb-6">
            {article.tags.map((tag) => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
          </div>
        )}
        <div className="prose max-w-none">
          <Viewer value={article.content || ''} plugins={plugins} />
        </div>
      </Card>
    </div>
  );
};

export default ArticleDetail;
