import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Result
        status="500"
        title="页面出错了"
        subTitle={error?.message || '抱歉，页面遇到了一些问题'}
        extra={[
          <Button key="home" onClick={() => navigate('/')}>
            返回首页
          </Button>,
          <Button key="retry" type="primary" onClick={() => window.location.reload()}>
            刷新页面
          </Button>,
        ]}
      />
    </div>
  );
};

export default ErrorBoundary;
