import React, { useEffect, useState, useCallback } from 'react';
import { Table, Card, Button, Space, Tag, Input, Select, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, DeleteRowOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getAdminArticleList, updateArticleStatus, articleApi } from '@/api/article';
import { getCategoryList } from '@/api/category';
import { getTagList } from '@/api/tag';
import { useDebounce } from '@/hooks/useDebounce';
import type { Article, Category, Tag as ITag } from '@/types';

const ArticleList: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [status, setStatus] = useState<number | undefined>();
  
  const debouncedKeyword = useDebounce(keyword, 300);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminArticleList({
        page,
        size: pageSize,
        keyword: debouncedKeyword || undefined,
        categoryId,
        status,
      });
      setArticles(res.list || []);
      setTotal(res.total || 0);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, debouncedKeyword, categoryId, status]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [cats, tagList] = await Promise.all([
          getCategoryList(),
          getTagList(),
        ]);
        setCategories(cats || []);
        setTags(tagList || []);
      } catch (error) {
        console.error('Failed to load filters:', error);
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: number) => {
    try {
      await articleApi.moveToTrash(id);
      message.success('已移入回收站');
      fetchData();
    } catch {
      message.error('操作失败');
    }
  };

  const handleStatusChange = async (id: number, newStatus: number) => {
    try {
      await updateArticleStatus(id, newStatus);
      message.success('状态更新成功');
      fetchData();
    } catch {
      message.error('状态更新失败');
    }
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Article) => (
        <a onClick={() => navigate(`/admin/articles/edit/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: Category | undefined) => category ? <Tag color="blue">{category.name}</Tag> : '-',
    },
    {
      title: '浏览量',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 100,
      render: (count: number) => count || 0,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'default'}>
          {status === 1 ? '已发布' : '草稿'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: string) => date ? new Date(date).toLocaleString() : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: unknown, record: Article) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/articles/edit/${record.id}`)}
          >
            编辑
          </Button>
          {record.status === 0 && (
            <Button
              type="link"
              size="small"
              onClick={() => handleStatusChange(record.id, 1)}
            >
              发布
            </Button>
          )}
          {record.status === 1 && (
            <Button
              type="link"
              size="small"
              danger
              onClick={() => handleStatusChange(record.id, 0)}
            >
              撤销发布
            </Button>
          )}
          <Popconfirm
            title="确定要将这篇文章移入回收站吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" size="small" danger icon={<DeleteRowOutlined />}>
              移入回收站
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title="文章管理"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/admin/articles/create')}
          >
            新建文章
          </Button>
        }
      >
        <div className="mb-4 flex flex-wrap gap-4">
          <Input.Search
            placeholder="搜索文章标题"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
          <Select
            placeholder="选择分类"
            value={categoryId}
            onChange={setCategoryId}
            style={{ width: 150 }}
            allowClear
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
          />
          <Select
            placeholder="选择状态"
            value={status}
            onChange={setStatus}
            style={{ width: 120 }}
            allowClear
            options={[
              { value: 0, label: '草稿' },
              { value: 1, label: '已发布' },
            ]}
          />
        </div>
        <Table
          columns={columns}
          dataSource={articles}
          rowKey="id"
          loading={loading}
          pagination={{
            current: page,
            pageSize,
            total,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 篇文章`,
            onChange: (p, ps) => {
              setPage(p);
              setPageSize(ps);
            },
          }}
        />
      </Card>
    </div>
  );
};

export default ArticleList;
