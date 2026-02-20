import React, { useEffect, useState, useCallback } from 'react';
import { Card, Form, Input, Select, Button, Space, message, Spin, Modal, Tooltip } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, QuestionCircleOutlined, FullscreenOutlined, FullscreenExitOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import frontmatter from '@bytemd/plugin-frontmatter';
import 'bytemd/dist/index.css';
import 'highlight.js/styles/github.css';
import { createArticle, getArticleDetail, updateArticle } from '@/api/article';
import { getCategoryList } from '@/api/category';
import { getTagList } from '@/api/tag';
import { uploadFile } from '@/api/upload';
import ImageUpload from '@/components/common/ImageUpload';
import type { Category, Tag } from '@/types';

const plugins = [gfm(), highlight(), frontmatter()];

interface ArticleForm {
  title: string;
  summary: string;
  content: string;
  categoryId: number | null;
  tagIds: number[];
  coverImage: string;
}

const ArticleEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const [form] = Form.useForm<ArticleForm>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const text = content.replace(/<[^>]*>/g, '').replace(/[#*`\[\]()>-]/g, '');
    setWordCount(text.length);
  }, [content]);

  const handleSave = useCallback(async (status: number = 0) => {
    try {
      const values = await form.getFieldsValue();
      
      if (status === 1) {
        const errors: string[] = [];
        if (!values.title || !values.title.trim()) {
          errors.push('标题');
        }
        if (!content || !content.trim()) {
          errors.push('正文');
        }
        if (errors.length > 0) {
          message.error(`发布失败，请填写：${errors.join('、')}`);
          return;
        }
      }
      
      setSaving(true);
      
      const data = {
        title: values.title || undefined,
        summary: values.summary || undefined,
        content: content || undefined,
        categoryId: values.categoryId || undefined,
        tagIds: values.tagIds || undefined,
        coverImage: values.coverImage || undefined,
        status,
      };

      if (isEdit && id) {
        await updateArticle(Number(id), data);
        message.success(status === 1 ? '文章发布成功' : '草稿保存成功');
      } else {
        await createArticle(data);
        message.success(status === 1 ? '文章发布成功' : '草稿保存成功');
      }
      navigate('/admin/articles');
    } catch {
      message.error('保存失败，请稍后重试');
    } finally {
      setSaving(false);
    }
  }, [form, content, isEdit, id, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave(0);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSave(1);
      }
      if (e.key === 'F1') {
        e.preventDefault();
        Modal.info({
          title: '快捷键帮助',
          content: (
            <div className="space-y-2">
              <p><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl + S</kbd> 保存草稿</p>
              <p><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl + Enter</kbd> 发布文章</p>
              <p><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl + \\</kbd> 切换写作模式</p>
              <p><kbd className="px-2 py-1 bg-gray-100 rounded">F1</kbd> 显示帮助</p>
            </div>
          ),
        });
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
        e.preventDefault();
        setZenMode(prev => !prev);
      }
      if (e.key === 'Escape' && zenMode) {
        setZenMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, zenMode]);

  useEffect(() => {
    const loadOptions = async () => {
      const [cats, tagList] = await Promise.all([
        getCategoryList(),
        getTagList(),
      ]);
      setCategories(cats || []);
      setTags(tagList || []);
    };
    loadOptions();
  }, []);

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      getArticleDetail(Number(id))
        .then((article) => {
          form.setFieldsValue({
            title: article.title,
            summary: article.summary,
            categoryId: article.categoryId,
            tagIds: article.tags?.map((t) => t.id) || [],
            coverImage: article.coverImage,
          });
          setContent(article.content || '');
        })
        .catch(() => {
          message.error('加载文章失败');
          navigate('/admin/articles');
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, form, navigate]);

  const handleUploadImages = async (files: File[]) => {
    const urls: { url: string }[] = [];
    for (const file of files) {
      try {
        const res = await uploadFile(file);
        urls.push({ url: res.url });
      } catch {
        message.error(`上传图片 ${file.name} 失败`);
      }
    }
    return urls;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (zenMode) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <Input
            value={form.getFieldValue('title')}
            onChange={(e) => form.setFieldsValue({ title: e.target.value })}
            placeholder="请输入文章标题"
            className="text-2xl font-bold border-none shadow-none"
            style={{ width: '50%' }}
          />
          <Space>
            <span className="text-gray-400 text-sm">字数：{wordCount}</span>
            <Tooltip title="退出写作模式 (Esc)">
              <Button icon={<FullscreenExitOutlined />} onClick={() => setZenMode(false)}>
                退出
              </Button>
            </Tooltip>
            <Button onClick={() => handleSave(0)} loading={saving}>
              保存草稿
            </Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={() => handleSave(1)} loading={saving}>
              发布
            </Button>
          </Space>
        </div>
        <div className="flex-1 overflow-auto">
          <Editor
            value={content}
            onChange={setContent}
            plugins={plugins}
            uploadImages={handleUploadImages}
            placeholder="开始写作..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card
        title={isEdit ? '编辑文章' : '新建文章'}
        extra={
          <Space>
            <span className="text-gray-400 text-sm">字数：{wordCount}</span>
            <Button icon={<QuestionCircleOutlined />} onClick={() => {
              Modal.info({
                title: '快捷键帮助',
                content: (
                  <div className="space-y-2">
                    <p><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl + S</kbd> 保存草稿</p>
                    <p><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl + Enter</kbd> 发布文章</p>
                    <p><kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl + \\</kbd> 切换写作模式</p>
                    <p><kbd className="px-2 py-1 bg-gray-100 rounded">F1</kbd> 显示帮助</p>
                  </div>
                ),
              });
            }}>
              快捷键
            </Button>
            <Tooltip title="写作模式 (Ctrl + \\)">
              <Button icon={<FullscreenOutlined />} onClick={() => setZenMode(true)}>
                写作模式
              </Button>
            </Tooltip>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/admin/articles')}>
              返回
            </Button>
            <Button onClick={() => handleSave(0)} loading={saving}>
              保存草稿
            </Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={() => handleSave(1)} loading={saving}>
              发布
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label={<span>标题 <span className="text-red-500">*</span></span>}
          >
            <Input placeholder="请输入文章标题" maxLength={200} />
          </Form.Item>
          <Form.Item name="summary" label={<span>摘要 <span className="text-gray-400 text-xs">(选填)</span></span>}>
            <Input.TextArea rows={3} placeholder="请输入文章摘要" maxLength={500} />
          </Form.Item>
          <div className="mb-6">
            <label className="block mb-2 font-medium">正文 <span className="text-red-500">*</span></label>
            <Editor
              value={content}
              onChange={setContent}
              plugins={plugins}
              uploadImages={handleUploadImages}
              placeholder="请输入文章正文..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="categoryId" label={<span>分类 <span className="text-gray-400 text-xs">(选填)</span></span>}>
              <Select
                placeholder="选择分类"
                allowClear
                options={categories.map((c) => ({ value: c.id, label: c.name }))}
              />
            </Form.Item>
            <Form.Item name="tagIds" label={<span>标签 <span className="text-gray-400 text-xs">(选填)</span></span>}>
              <Select
                mode="multiple"
                placeholder="选择标签"
                options={tags.map((t) => ({ value: t.id, label: t.name }))}
              />
            </Form.Item>
          </div>
          <Form.Item name="coverImage" label={<span>封面图片 <span className="text-gray-400 text-xs">(选填)</span></span>}>
            <ImageUpload placeholder="封面图片URL或上传图片" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ArticleEditor;
