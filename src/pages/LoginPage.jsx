import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import Button, { BUTTON_TYPES, BUTTON_SIZES } from '../components/ui/Button/Button';
import Input, { INPUT_TYPES, INPUT_SIZES } from '../components/ui/Input/Input';
import Label from '../components/ui/Label/Label';

/**
 * 로그인 페이지 컴포넌트
 * 사용자 로그인 기능을 제공하는 페이지
 */
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 로그인 처리 로직 구현
    console.log('로그인 시도:', formData);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        {/* 아이디 입력 필드 */}
        <div className="mb-4 flex flex-col gap-2">
          <Label required>아이디</Label>
          <Input
            id="username"
            required
            name="username"
            type={INPUT_TYPES.TEXT}
            value={formData.username}
            onChange={handleChange}
            placeholder="아이디를 입력해주세요."
            size={INPUT_SIZES.LARGE}
          />
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="mb-6 flex flex-col gap-2">
          <Label required>비밀번호</Label>
          <Input
            required
            id="password"
            name="password"
            type={INPUT_TYPES.PASSWORD}
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요."
            size={INPUT_SIZES.LARGE}
          />
        </div>

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          buttonType={BUTTON_TYPES.PRIMARY}
          size={BUTTON_SIZES.XLARGE}
          fullWidth
        >
          로그인
        </Button>

        {/* 추가 링크 영역 */}
        <div className="mt-6 flex justify-center space-x-6 text-sm">
          <Link to="/find-password" className="text-gray-600 hover:text-gray-900">
            비밀번호 찾기
          </Link>
          <Link to="/find-username" className="text-gray-600 hover:text-gray-900">
            아이디 찾기
          </Link>
          <Link to="/register" className="text-gray-600 hover:text-gray-900">
            회원가입
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage; 