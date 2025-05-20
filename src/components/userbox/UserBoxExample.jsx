import React from 'react';
import UserBox from './UserBox';

const UserBoxExample = () => {
  // 예시 옵션
  const userOptions = [
    { label: '내 프로필', onClick: () => console.log('내 프로필 클릭') },
    { label: '설정', onClick: () => console.log('설정 클릭') },
    { label: '로그아웃', onClick: () => console.log('로그아웃 클릭') },
  ];

  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">UserBox 컴포넌트</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">기본 UserBox</h3>
            <div className="p-4 bg-gray-50 rounded-lg inline-block">
              <UserBox 
                userName="김경태" 
                teamName="프로젝트 1팀" 
                options={userOptions}
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">옵션 없는 UserBox</h3>
            <div className="p-4 bg-gray-50 rounded-lg inline-block">
              <UserBox 
                userName="홍길동" 
                teamName="개발팀" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserBoxExample; 