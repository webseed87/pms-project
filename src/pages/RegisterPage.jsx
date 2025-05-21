import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import Button, { BUTTON_TYPES, BUTTON_SIZES } from '../components/ui/Button/Button';
import Input, { INPUT_TYPES, INPUT_SIZES } from '../components/ui/Input/Input';
import Label from '../components/ui/Label/Label';

/**
 * 회원가입 페이지 컴포넌트
 * 신규 사용자 등록 기능을 제공하는 페이지
 */
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    department: '',
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
    // 비밀번호 확인 검증
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // TODO: 회원가입 처리 로직 구현
    console.log('회원가입 시도:', formData);
  };

  // 부서 선택 옵션
  const departmentOptions = [
    { value: '', label: '소속 선택' },
    { value: 'dev', label: '개발팀' },
    { value: 'design', label: '디자인팀' },
    { value: 'marketing', label: '마케팅팀' },
    { value: 'hr', label: '인사팀' }
  ];

  const accountOptions = [
    { value: '', label: '거래처 선택' },
    { value: '1', label: '거래처1' },
    { value: '2', label: '거래처2' },
    { value: '3', label: '거래처3' },
  ];
  return (
    <AuthLayout title="회원가입">
      <form onSubmit={handleSubmit}>
        {/* 아이디 입력 필드 */}
        <div className="mb-4 flex flex-col gap-2">
          <Label required>이메일</Label>
          <div className="flex space-x-2">
            <Input
              id="username"
              name="username"
              type={INPUT_TYPES.TEXT}
              value={formData.useremail}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
              required
            />
            <Button
              type="button"
              buttonType={BUTTON_TYPES.SECONDARY}
              size={BUTTON_SIZES.LARGE}
              className='w-28 h-10'
            >
              중복확인
            </Button>
          </div>
        </div>
    {/* 이름 입력 필드 */}
      <div className="mb-4 flex flex-col gap-2">
          <Label required>이름</Label>
          <Input
            id="name"
            name="name"
            type={INPUT_TYPES.TEXT}
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력해주세요"
            required
          />
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="mb-4 flex flex-col gap-2">
          <Label required>비밀번호</Label>
          <Input
            id="password"
            name="password"
            type={INPUT_TYPES.PASSWORD}
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <p className="mt-1 text-xs text-gray-500">영문, 숫자, 특수문자 조합 8-20자</p>
        </div>

        {/* 비밀번호 확인 필드 */}
        <div className="mb-4 flex flex-col gap-2">
          <Label required>비밀번호 확인</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={INPUT_TYPES.PASSWORD}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력해주세요"
            required
          />
        </div>

        {/* 부서 선택 필드 */}
        <div className="mb-6 flex flex-col gap-2">
          <Label>소속</Label>
          <Input
            id="department"
            name="department"
            type={INPUT_TYPES.SELECT}
            value={formData.department}
            onChange={handleChange}
            options={departmentOptions}
          />
        </div>
      {/* 거래처 선택 필드 */}
        <div className="mb-6 flex flex-col gap-2">
          <Label>거래처</Label>
          <Input
            id="department"
            name="department"
            type={INPUT_TYPES.SELECT}
            value={formData.department}
            onChange={handleChange}
            options={accountOptions}
          />
        </div>
        {/* 버튼 영역 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <Button
              type="submit"
              buttonType={BUTTON_TYPES.PRIMARY}
              size={BUTTON_SIZES.XLARGE}
              fullWidth
            >
              회원가입
            </Button>
          </div>
          <div className="col-span-1">
            <Link to="/login" className="block w-full">
              <Button
                type="button"
                buttonType={BUTTON_TYPES.LINE}
                size={BUTTON_SIZES.XLARGE}
                fullWidth
              >
                취소
              </Button>
            </Link>
          </div>
        </div>

        {/* 로그인 페이지 링크 */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">이미 계정이 있으신가요?</span>{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            로그인
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage; 