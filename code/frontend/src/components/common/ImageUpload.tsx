import React, { useState, useRef } from 'react';
import { Input, Button, Space, message, Spin } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { uploadFile } from '@/api/upload';

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, placeholder }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      message.error('请选择图片文件');
      return;
    }

    setLoading(true);
    try {
      const res = await uploadFile(file);
      onChange?.(res.url);
      message.success('上传成功');
    } catch {
      message.error('上传失败');
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = () => {
    onChange?.('');
  };

  return (
    <Space.Compact style={{ width: '100%' }}>
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder || '请输入图片URL或上传图片'}
        style={{ flex: 1 }}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <Button
        icon={loading ? <Spin size="small" /> : <UploadOutlined />}
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
      >
        上传
      </Button>
      {value && (
        <Button
          icon={<DeleteOutlined />}
          onClick={handleClear}
          danger
        />
      )}
    </Space.Compact>
  );
};

export default ImageUpload;
