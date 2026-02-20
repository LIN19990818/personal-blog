import React from 'react';
import { Empty as AntEmpty, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface EmptyProps {
  description?: string;
  showBack?: boolean;
}

const Empty: React.FC<EmptyProps> = ({ description = '暂无数据', showBack = false }) => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <AntEmpty description={description}>
        {showBack && (
          <Button type="primary" onClick={() => navigate(-1)}>
            返回上一页
          </Button>
        )}
      </AntEmpty>
    </div>
  );
};

export default Empty;
