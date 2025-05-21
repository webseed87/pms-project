import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import Button, { BUTTON_TYPES, BUTTON_SIZES } from '../components/ui/Button/Button';
import Input, { INPUT_TYPES, INPUT_SIZES } from '../components/ui/Input/Input';
import Label from '../components/ui/Label/Label';

/**
 * 비밀번호 찾기 페이지 컴포넌트
 * 사용자가 비밀번호를 분실했을 때 복구 기능을 제공하는 페이지
 */
const FindPasswordPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [step, setStep] = useState(1); // 1: 정보 입력, 2: 인증 코드 입력, 3: 비밀번호 재설정

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      // TODO: 사용자 정보 확인 및 인증 코드 발송 처리
      console.log('비밀번호 찾기 시도:', formData);
      setStep(2); // 다음 단계로 진행
    } else if (step === 2) {
      // TODO: 인증 코드 확인 처리
      setStep(3); // 다음 단계로 진행
    } else if (step === 3) {
      // TODO: 새 비밀번호 저장 처리
      alert('비밀번호가 성공적으로 변경되었습니다.');
      // 로그인 페이지로 리다이렉트
    }
  };

  return (
    <AuthLayout title="비밀번호 찾기">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            {/* 아이디 입력 필드 */}
            <div className="mb-4 flex flex-col gap-2">
              <Label required>아이디</Label>
              <Input
                id="username"
                name="username"
                type={INPUT_TYPES.TEXT}
                value={formData.username}
                onChange={handleChange}
                placeholder="아이디를 입력해주세요."
                size={INPUT_SIZES.LARGE}
                required
              />
            </div>

            {/* 이메일 입력 필드 */}
            <div className="mb-6 flex flex-col gap-2">
              <Label required>이메일</Label>
              <Input
                id="email"
                name="email"
                type={INPUT_TYPES.TEXT}
                value={formData.email}
                onChange={handleChange}
                placeholder="가입 시 등록한 이메일을 입력해주세요."
                size={INPUT_SIZES.LARGE}
                required
              />
            </div>

            <p className="mb-4 text-sm text-gray-600">
              가입 시 등록한 이메일로 인증 코드가 발송됩니다.
            </p>
          </>
        )}

        {step === 2 && (
          <>
            {/* 인증 코드 입력 필드 */}
            <div className="mb-6 flex flex-col gap-2">
              <Label required>인증 코드</Label>
              <div className="flex space-x-2">
                <Input
                  id="verificationCode"
                  name="verificationCode"
                  type={INPUT_TYPES.TEXT}
                  value={formData.verificationCode}
                  onChange={handleChange}
                  placeholder="이메일로 받은 인증 코드를 입력해주세요."
                  size={INPUT_SIZES.MEDIUM}
                  required
                />
                <Button
                  type="button"
                  buttonType={BUTTON_TYPES.LINE}
                  size={BUTTON_SIZES.MEDIUM}
                >
                  재발송
                </Button>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                인증 코드는 10분간 유효합니다.
              </p>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {/* 새 비밀번호 입력 필드 */}
            <div className="mb-4 flex flex-col gap-2">
              <Label required>새 비밀번호</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type={INPUT_TYPES.PASSWORD}
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="새 비밀번호를 입력해주세요."
                size={INPUT_SIZES.MEDIUM}
                required
              />
              <p className="mt-1 text-xs text-gray-500">영문, 숫자, 특수문자 조합 8-20자</p>
            </div>

            {/* 새 비밀번호 확인 필드 */}
            <div className="mb-6 flex flex-col gap-2">
              <Label required>새 비밀번호 확인</Label>
              <Input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type={INPUT_TYPES.PASSWORD}
                value={formData.confirmNewPassword}
                onChange={handleChange}
                placeholder="새 비밀번호를 다시 입력해주세요."
                size={INPUT_SIZES.MEDIUM}
                required
              />
            </div>
          </>
        )}

        {/* 버튼 영역 */}
        <Button
          type="submit"
          buttonType={BUTTON_TYPES.PRIMARY}
          size={BUTTON_SIZES.XLARGE}
          fullWidth
        >
          {step === 1 ? '인증 코드 요청' : step === 2 ? '인증 확인' : '비밀번호 변경'}
        </Button>

        {/* 로그인 페이지 링크 */}
        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="text-gray-600 hover:text-gray-900">
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default FindPasswordPage; 