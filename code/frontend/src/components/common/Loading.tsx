import React from 'react';
import { Spin } from 'antd';

interface LoadingProps {
  tip?: string;
  fullscreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ tip = '加载中...', fullscreen = false }) => {
  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <Spin size="large" tip={tip} />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-12">
      <Spin size="large" tip={tip} />
    </div>
  );
};

export default Loading;
