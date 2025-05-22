import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import Button, { BUTTON_TYPES, BUTTON_SIZES } from '../components/ui/Button/Button';
import Input, { INPUT_TYPES, INPUT_SIZES } from '../components/ui/Input/Input';
import Label from '../components/ui/Label/Label';

/**
 * 아이디 찾기 페이지 컴포넌트
 * 사용자가 아이디를 잊어버렸을 때 찾기 기능을 제공하는 페이지
 */
const FindUsernamePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 아이디 찾기 처리 로직 구현
    console.log('아이디 찾기 시도:', formData);
    
    // 임시로 결과 표시 (실제로는 API 호출 후 응답으로 처리)
    setResult({
      found: true,
      username: 'example_user',
      maskedUsername: 'examp***_***r',
      date: '2023년 5월 15일',
    });
  };

  return (
    <AuthLayout title="아이디 찾기">
      {!result ? (
        <form onSubmit={handleSubmit}>
          {/* 이름 입력 필드 */}
          <div className="mb-4 flex flex-col gap-2">
            <Label required>이름</Label>
            <Input
              id="name"
              name="name"
              type={INPUT_TYPES.TEXT}
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력해주세요."
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
              size={INPUT_SIZES.LARGEs}
              required
            />
          </div>

          <p className="mb-4 text-sm text-gray-600">
            가입 시 등록한 이름과 이메일로 아이디를 찾을 수 있습니다.
          </p>

          {/* 버튼 영역 */}
          <Button
            type="submit"
            buttonType={BUTTON_TYPES.PRIMARY}
            size={BUTTON_SIZES.XLARGE}
            fullWidth
          >
            아이디 찾기
          </Button>
        </form>
      ) : (
        <div>
          {result.found ? (
            <div className="text-center">
              <div className="mb-6">
                <h3 className="font-medium text-lg text-gray-800 mb-2">아이디 찾기 결과</h3>
                <p className="text-gray-600 mb-4">
                  회원님의 정보와 일치하는 아이디입니다.
                </p>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                  <p className="font-medium text-gray-800">{result.maskedUsername}</p>
                  <p className="text-sm text-gray-500 mt-1">가입일: {result.date}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="col-span-1">
                    <Link to="/login" className="block w-full">
                      <Button
                        type="button"
                        buttonType={BUTTON_TYPES.PRIMARY}
                        size={BUTTON_SIZES.MEDIUM}
                        fullWidth
                      >
                        로그인
                      </Button>
                    </Link>
                  </div>
                  <div className="col-span-1">
                    <Link to="/find-password" className="block w-full">
                      <Button
                        type="button"
                        buttonType={BUTTON_TYPES.LINE}
                        size={BUTTON_SIZES.MEDIUM}
                        fullWidth
                      >
                        비밀번호 찾기
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <h3 className="font-medium text-lg text-gray-800 mb-2">아이디를 찾을 수 없습니다</h3>
                <p className="text-gray-600 mb-4">
                  입력하신 정보와 일치하는 계정이 없습니다.<br />
                  입력한 정보를 다시 확인해주세요.
                </p>
                <Button
                  type="button"
                  buttonType={BUTTON_TYPES.PRIMARY}
                  size={BUTTON_SIZES.MEDIUM}
                  onClick={() => setResult(null)}
                >
                  다시 시도
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 로그인 페이지 링크 */}
      <div className="mt-6 text-center text-sm">
        <Link to="/login" className="text-gray-600 hover:text-gray-900">
          로그인 페이지로 돌아가기
        </Link>
      </div>
    </AuthLayout>
  );
};

export default FindUsernamePage; 