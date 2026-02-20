import React from 'react';
import { Pagination as AntPagination } from 'antd';

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  pageSize,
  total,
  onChange,
  showSizeChanger = true,
  showQuickJumper = true,
}) => {
  return (
    <div className="flex justify-center py-4">
      <AntPagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        showTotal={(total) => `共 ${total} 条`}
      />
    </div>
  );
};

export default Pagination;
