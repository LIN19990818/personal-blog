import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Avatar, Upload, Tabs, Divider, Segmented, Radio, Space, Alert } from 'antd';
import { UserOutlined, UploadOutlined, SaveOutlined, SunOutlined, MoonOutlined, BulbOutlined, DownloadOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import { updateProfile, updatePassword } from '@/api/auth';
import { uploadApi } from '@/api/upload';
import { settingApi } from '@/api/setting';
import { useTheme, colorMap } from '@/contexts/ThemeContext';
import request from '@/utils/request';
import type { UploadProps } from 'antd';
import type { ThemeMode, ThemeColor } from '@/contexts/ThemeContext';

const Settings: React.FC = () => {
  const { admin, setAdmin } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [siteForm] = Form.useForm();
  const [coverUploading, setCoverUploading] = useState(false);
  const [siteLoading, setSiteLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (admin) {
      profileForm.setFieldsValue({
        nickname: admin.nickname,
        avatar: admin.avatar,
      });
    }
  }, [admin, profileForm]);

  useEffect(() => {
    const loadSiteSettings = async () => {
      try {
        const settings = await settingApi.getAll();
        if (settings) {
          const config: Record<string, string> = {};
          settings.forEach((s) => {
            config[s.key] = s.value;
          });
          siteForm.setFieldsValue({
            siteTitle: config.siteTitle || '星落林间',
            siteSubtitle: config.siteSubtitle || '',
            siteDescription: config.siteDescription || '',
            coverImage: config.coverImage || '',
          });
        }
      } catch (error) {
        console.error('Failed to load site settings:', error);
      }
    };
    loadSiteSettings();
  }, [siteForm]);

  const handleProfileSubmit = async (values: { nickname: string }) => {
    try {
      const res = await updateProfile(values);
      setAdmin(res);
      message.success('个人信息更新成功');
    } catch {
      message.error('更新失败');
    }
  };

  const handlePasswordSubmit = async (values: { oldPassword: string; newPassword: string }) => {
    try {
      await updatePassword(values);
      message.success('密码修改成功');
      passwordForm.resetFields();
    } catch {
      message.error('密码修改失败');
    }
  };

  const handleSiteSubmit = async (values: { siteTitle: string; siteSubtitle: string; siteDescription: string; coverImage: string }) => {
    setSiteLoading(true);
    try {
      await Promise.all([
        settingApi.save({ key: 'siteTitle', value: values.siteTitle || '星落林间' }),
        settingApi.save({ key: 'siteSubtitle', value: values.siteSubtitle || '' }),
        settingApi.save({ key: 'siteDescription', value: values.siteDescription || '' }),
        settingApi.save({ key: 'coverImage', value: values.coverImage || '' }),
      ]);
      message.success('网站配置保存成功');
    } catch (error) {
      message.error('保存失败');
    } finally {
      setSiteLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    showUploadList: false,
    beforeUpload: async (file) => {
      try {
        const res = await uploadApi.uploadImage(file);
        await updateProfile({ avatar: res.url });
        if (admin) {
          setAdmin({ ...admin, avatar: res.url });
        }
        message.success('头像更新成功');
      } catch {
        message.error('头像上传失败');
      }
      return false;
    },
  };

  const handleCoverUpload = async (file: File) => {
    setCoverUploading(true);
    try {
      const res = await uploadApi.uploadImage(file);
      siteForm.setFieldsValue({ coverImage: res.url });
      message.success('封面图上传成功');
    } catch (error) {
      message.error('封面上传失败');
    } finally {
      setCoverUploading(false);
    }
    return false;
  };

  const tabItems = [
    {
      key: 'profile',
      label: '个人信息',
      children: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="个人资料">
            <div className="flex items-center gap-4 mb-6">
              <Upload {...uploadProps}>
                <Avatar
                  size={80}
                  src={admin?.avatar}
                  icon={<UserOutlined />}
                  className="cursor-pointer"
                />
              </Upload>
              <div className="text-gray-500 text-sm">
                点击头像更换
                <br />
                支持 JPG、PNG 格式
              </div>
            </div>
            <Form
              form={profileForm}
              layout="vertical"
              onFinish={handleProfileSubmit}
            >
              <Form.Item label="用户名">
                <Input value={admin?.username} disabled />
              </Form.Item>
              <Form.Item
                name="nickname"
                label="昵称"
                rules={[{ required: true, message: '请输入昵称' }]}
              >
                <Input placeholder="请输入昵称" maxLength={50} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存修改
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card title="修改密码">
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handlePasswordSubmit}
            >
              <Form.Item
                name="oldPassword"
                label="原密码"
                rules={[{ required: true, message: '请输入原密码' }]}
              >
                <Input.Password placeholder="请输入原密码" autoComplete="current-password" />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="新密码"
                rules={[
                  { required: true, message: '请输入新密码' },
                  { min: 6, message: '密码长度不能少于6位' },
                ]}
              >
                <Input.Password placeholder="请输入新密码" autoComplete="new-password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="确认密码"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: '请确认新密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="请确认新密码" autoComplete="new-password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  修改密码
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      ),
    },
    {
      key: 'site',
      label: '网站配置',
      children: (
        <Card title="网站设置">
          <Form
            form={siteForm}
            layout="vertical"
            onFinish={handleSiteSubmit}
          >
            <Form.Item
              name="siteTitle"
              label="网站标题"
              rules={[{ required: true, message: '请输入网站标题' }]}
            >
              <Input placeholder="请输入网站标题" maxLength={50} />
            </Form.Item>
            <Form.Item
              name="siteSubtitle"
              label="网站副标题"
            >
              <Input placeholder="请输入网站副标题" maxLength={100} />
            </Form.Item>
            <Form.Item
              name="siteDescription"
              label="网站描述"
            >
              <Input.TextArea 
                placeholder="请输入网站描述" 
                maxLength={500} 
                rows={4}
                showCount
              />
            </Form.Item>
            <Divider />
            <Form.Item
              name="coverImage"
              label="主页封面图"
            >
              <div className="flex gap-4 items-start">
                <Input placeholder="输入图片URL或上传图片" />
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={handleCoverUpload}
                >
                  <Button icon={<UploadOutlined />} loading={coverUploading}>
                    上传封面
                  </Button>
                </Upload>
              </div>
            </Form.Item>
            <Form.Item shouldUpdate={(prev, cur) => prev.coverImage !== cur.coverImage}>
              {({ getFieldValue }) => {
                const coverImage = getFieldValue('coverImage');
                return coverImage ? (
                  <div className="mb-4">
                    <p className="text-gray-500 mb-2">封面预览：</p>
                    <img 
                      src={coverImage} 
                      alt="封面预览" 
                      className="max-w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                ) : null;
              }}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={siteLoading} icon={<SaveOutlined />}>
                保存配置
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'theme',
      label: '主题设置',
      children: (
        <Card title="外观设置">
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium mb-3">显示模式</h3>
              <Segmented
                value={theme.mode}
                onChange={(v) => setTheme({ mode: v as ThemeMode })}
                options={[
                  { label: '浅色', value: 'light', icon: <SunOutlined /> },
                  { label: '深色', value: 'dark', icon: <MoonOutlined /> },
                  { label: '跟随系统', value: 'auto', icon: <BulbOutlined /> },
                ]}
              />
            </div>
            <Divider />
            <div>
              <h3 className="text-base font-medium mb-3">主题色</h3>
              <Radio.Group
                value={theme.primaryColor}
                onChange={(e) => setTheme({ primaryColor: e.target.value })}
              >
                <Space direction="vertical">
                  {(Object.keys(colorMap) as ThemeColor[]).map((color) => (
                    <Radio key={color} value={color}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: colorMap[color] }}
                        />
                        <span className="capitalize">{color === 'blue' ? '默认蓝' : color === 'green' ? '自然绿' : color === 'purple' ? '优雅紫' : color === 'orange' ? '活力橙' : '热情红'}</span>
                      </div>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
          </div>
        </Card>
      ),
    },
    {
      key: 'backup',
      label: '数据备份',
      children: (
        <Card title="数据备份与导出">
          <Alert
            message="数据备份说明"
            description="您可以导出博客的所有数据（文章、分类、标签、图片等）为JSON格式文件，保存在本地作为备份。建议定期备份以防数据丢失。"
            type="info"
            showIcon
            className="mb-6"
          />
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">导出全部数据</h3>
                <p className="text-gray-500 text-sm">导出所有文章、分类、标签、图片、音乐等数据</p>
              </div>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                loading={exporting}
                onClick={async () => {
                  setExporting(true);
                  try {
                    const [articles, categories, tags, images, music, cities, timeline, inspirations, settings] = await Promise.all([
                      request.get('/api/admin/articles', { params: { page: 1, size: 1000 } }),
                      request.get('/api/categories'),
                      request.get('/api/tags'),
                      request.get('/api/images'),
                      request.get('/api/music'),
                      request.get('/api/cities'),
                      request.get('/api/timeline'),
                      request.get('/api/inspirations'),
                      request.get('/api/settings'),
                    ]);
                    
                    const backupData = {
                      exportDate: new Date().toISOString(),
                      version: '1.0.0',
                      data: {
                        articles: articles?.list || [],
                        categories: categories || [],
                        tags: tags || [],
                        images: images || [],
                        music: music || [],
                        cities: cities || [],
                        timeline: timeline || [],
                        inspirations: inspirations || [],
                        settings: settings || [],
                      },
                    };
                    
                    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `blog-backup-${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    message.success('数据导出成功');
                  } catch (error) {
                    message.error('数据导出失败');
                  } finally {
                    setExporting(false);
                  }
                }}
              >
                导出数据
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div>
                <h3 className="font-medium text-gray-400">导入数据</h3>
                <p className="text-gray-400 text-sm">从备份文件恢复数据（开发中）</p>
              </div>
              <Button disabled icon={<CloudDownloadOutlined />}>
                导入数据
              </Button>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">系统设置</h1>
      <Tabs items={tabItems} />
    </div>
  );
};

export default Settings;
