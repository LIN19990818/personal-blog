import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <div className="text-center mb-8">
          <Avatar size={120} icon={<UserOutlined />} className="mb-4" />
          <h1 className="text-3xl font-bold mb-2">关于我</h1>
          <p className="text-gray-600">全栈开发者 | 技术博主</p>
        </div>
        <div className="prose max-w-none">
          <h2>个人简介</h2>
          <p>
            你好！我是一名热爱技术的全栈开发者，专注于 Web 开发领域。
            这个博客是我记录技术成长、分享开发经验的地方。
          </p>
          <h2>技术栈</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 not-prose">
            {[
              { name: 'React', color: 'bg-blue-100 text-blue-700' },
              { name: 'TypeScript', color: 'bg-blue-100 text-blue-700' },
              { name: 'Node.js', color: 'bg-green-100 text-green-700' },
              { name: 'Spring Boot', color: 'bg-green-100 text-green-700' },
              { name: 'MySQL', color: 'bg-orange-100 text-orange-700' },
              { name: 'Docker', color: 'bg-blue-100 text-blue-700' },
            ].map((tech) => (
              <div
                key={tech.name}
                className={`px-4 py-2 rounded-lg text-center ${tech.color}`}
              >
                {tech.name}
              </div>
            ))}
          </div>
          <h2>联系方式</h2>
          <div className="flex gap-4 not-prose">
            <a
              href="mailto:example@email.com"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <MailOutlined /> example@email.com
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <GithubOutlined /> GitHub
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;
