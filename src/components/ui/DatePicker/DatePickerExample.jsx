import React, { useState } from 'react';
import DatePicker, { DATEPICKER_SIZES } from './DatePicker';

const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateWithTime, setSelectedDateWithTime] = useState(null);
  
  // 테스트용 추가 상태들
  const [dateSmall, setDateSmall] = useState(null);
  const [dateMedium, setDateMedium] = useState(null);
  const [dateLarge, setDateLarge] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [dateKorean, setDateKorean] = useState(null);
  const [dateSlash, setDateSlash] = useState(null);

  // 날짜 선택 핸들러
  const handleDateChange = (date) => {
    console.log('Selected date:', date);
    setSelectedDate(date);
  };

  // 시간 포함 날짜 선택 핸들러
  const handleDateTimeChange = (date) => {
    console.log('Selected date with time:', date);
    setSelectedDateWithTime(date);
  };

  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">기본 날짜 선택기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">기본 날짜 선택</h3>
            <DatePicker 
              selected={selectedDate}
              onChange={handleDateChange}
              placeholder="날짜를 선택해주세요."
            />
            {selectedDate && (
              <p className="text-sm text-gray-600 mt-2">
                선택된 날짜: {selectedDate.toLocaleDateString()}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">시간 포함 날짜 선택</h3>
            <DatePicker 
              selected={selectedDateWithTime}
              onChange={handleDateTimeChange}
              showTimeSelect={true}
              dateFormat="yyyy-MM-dd HH:mm"
              placeholder="날짜와 시간을 선택해주세요."
            />
            {selectedDateWithTime && (
              <p className="text-sm text-gray-600 mt-2">
                선택된 날짜와 시간: {selectedDateWithTime.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">크기 변형</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">SMALL</h3>
            <DatePicker 
              selected={dateSmall}
              onChange={setDateSmall}
              size={DATEPICKER_SIZES.SMALL}
              placeholder="날짜를 선택해주세요."
            />
            {dateSmall && (
              <p className="text-sm text-gray-600 mt-2">
                선택됨: {dateSmall.toLocaleDateString()}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">MEDIUM (기본)</h3>
            <DatePicker 
              selected={dateMedium}
              onChange={setDateMedium}
              size={DATEPICKER_SIZES.MEDIUM}
              placeholder="날짜를 선택해주세요."
            />
            {dateMedium && (
              <p className="text-sm text-gray-600 mt-2">
                선택됨: {dateMedium.toLocaleDateString()}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">LARGE</h3>
            <DatePicker 
              selected={dateLarge}
              onChange={setDateLarge}
              size={DATEPICKER_SIZES.LARGE}
              placeholder="날짜를 선택해주세요."
            />
            {dateLarge && (
              <p className="text-sm text-gray-600 mt-2">
                선택됨: {dateLarge.toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">상태 변형</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">에러 상태</h3>
            <DatePicker 
              selected={dateError}
              onChange={setDateError}
              placeholder="날짜를 선택해주세요."
              error={true}
            />
            {dateError && (
              <p className="text-sm text-gray-600 mt-2">
                선택됨: {dateError.toLocaleDateString()}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">비활성화 상태</h3>
            <DatePicker 
              placeholder="날짜를 선택해주세요."
              disabled={true}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">날짜 형식 변경</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">년월일 형식</h3>
            <DatePicker 
              selected={dateKorean}
              onChange={setDateKorean}
              dateFormat="yyyy년 MM월 dd일"
              placeholder="날짜를 선택해주세요."
            />
            {dateKorean && (
              <p className="text-sm text-gray-600 mt-2">
                선택됨: {dateKorean.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">슬래시 형식</h3>
            <DatePicker 
              selected={dateSlash}
              onChange={setDateSlash}
              dateFormat="MM/dd/yyyy"
              placeholder="날짜를 선택해주세요."
            />
            {dateSlash && (
              <p className="text-sm text-gray-600 mt-2">
                선택됨: {dateSlash.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DatePickerExample; 