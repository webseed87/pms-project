import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import DatePicker, { DATEPICKER_MODES } from '../ui/DatePicker/DatePicker';
import Label from '../ui/Label';

/**
 * 입력 필드 타입 상수 정의 - 다양한 종류의 입력 필드를 지원합니다.
 * @type {Object}
 */
export const FIELD_TYPES = {
  INPUT: 'input',           // 일반 텍스트 입력
  SELECT: 'select',         // 선택 상자
  DATE: 'date',             // 단일 날짜 선택
  DATE_RANGE: 'dateRange',  // 날짜 범위 선택 (두 개의 DatePicker 사용)
  RANGE_PICKER: 'rangePicker', // 날짜 범위 선택 (단일 DatePicker 사용)
  TEXTAREA: 'textarea'      // 여러 줄 텍스트 입력
};

/**
 * FormField 컴포넌트 - 라벨과 다양한 입력 필드를 결합한 재사용 가능한 폼 요소입니다.
 * 입력, 선택, 날짜, 날짜 범위 등 다양한 타입을 지원합니다.
 * 
 * @component
 * @example
 * // 텍스트 입력 필드
 * <FormField 
 *   type="input"
 *   label="과제명"
 *   value={projectName}
 *   onChange={(e) => setProjectName(e.target.value)}
 *   placeholder="과제명을 입력하세요"
 * />
 * 
 * @example
 * // 선택 상자
 * <FormField 
 *   type="select"
 *   label="과제상태"
 *   value={status}
 *   onChange={(e) => setStatus(e.target.value)}
 *   options={[
 *     { label: '진행중', value: 'in_progress' },
 *     { label: '완료', value: 'completed' }
 *   ]}
 * />
 * 
 * @example
 * // 날짜 범위 선택 (두 개의 DatePicker 사용)
 * <FormField 
 *   type="dateRange"
 *   label="등록일자"
 *   value={{ startDate, endDate }}
 *   onChange={({ startDate, endDate }) => {
 *     setStartDate(startDate);
 *     setEndDate(endDate);
 *   }}
 * />
 * 
 * @example
 * // 날짜 범위 선택 (단일 DatePicker 사용)
 * <FormField 
 *   type="rangePicker"
 *   label="기간 선택"
 *   value={{ startDate, endDate }}
 *   onChange={({ startDate, endDate }) => {
 *     setStartDate(startDate);
 *     setEndDate(endDate);
 *   }}
 *   placeholder="기간을 선택하세요"
 * />
 * 
 * @example
 * // 전체 너비 텍스트 입력 필드
 * <FormField 
 *   type="input"
 *   label="상세 설명"
 *   value={description}
 *   onChange={(e) => setDescription(e.target.value)}
 *   placeholder="상세 설명을 입력하세요"
 *   fullWidth
 * />
 * 
 * @example
 * // 텍스트 영역 필드
 * <FormField 
 *   type="textarea"
 *   label="내용"
 *   value={content}
 *   onChange={(e) => setContent(e.target.value)}
 *   placeholder="내용을 입력하세요"
 *   rows={4}
 *   fullWidth
 * />
 */
const FormField = ({ 
  type = FIELD_TYPES.INPUT,
  label,
  value,
  onChange,
  options,
  placeholder = '',
  className = '',
  wrapperClassName = '',
  labelClassName = '',
  datePickerProps,
  fullWidth = false,
  medium = false,
  rows = 3,
  ...props 
}) => {
  // 날짜 범위 시작일 변경 핸들러 - 메모이제이션된 콜백 사용
  // 수정됨: 이 핸들러는 더 이상 직접 사용되지 않음 (handleRangePickerChange로 통합)
  const handleStartDateChange = useCallback((date) => {
    if (onChange) {
      onChange({ 
        ...value, 
        startDate: date 
      });
    }
  }, [onChange, value]);

  // 날짜 범위 종료일 변경 핸들러 - 메모이제이션된 콜백 사용
  // 수정됨: 이 핸들러는 더 이상 직접 사용되지 않음 (handleRangePickerChange로 통합)
  const handleEndDateChange = useCallback((date) => {
    if (onChange) {
      onChange({ 
        ...value, 
        endDate: date 
      });
    }
  }, [onChange, value]);

  // 범위 선택기 변경 핸들러
  const handleRangePickerChange = useCallback((dateRange) => {
    if (onChange) {
      // dateRange는 {startDate, endDate} 형태로 넘어옴
      onChange(dateRange);
    }
  }, [onChange]);

  // 기본 onChange 핸들러 - 값이 없을 경우 빈 함수 제공
  const handleChange = useCallback((e) => {
    if (onChange) {
      onChange(e);
    }
  }, [onChange]);

  /**
   * 타입에 따른 입력 필드 렌더링 함수
   * 다양한 필드 타입(input, select, date, dateRange)에 맞게 적절한 컴포넌트 렌더링
   * @returns {React.ReactElement} 렌더링할 필드 컴포넌트
   */
  const renderField = () => {
    const fieldWrapperClass = `flex-1 flex items-center h-14 p-2.5 inline-flex justify-start items-center ${wrapperClassName}`;
    const textareaWrapperClass = `flex-1 flex items-start p-2.5 inline-flex justify-start ${wrapperClassName}`;
    
    switch (type) {
      case FIELD_TYPES.INPUT:
        return (
          <div className={fieldWrapperClass}>
            <Input 
              className="h-full w-full border-0 outline-none shadow-none" 
              placeholder={placeholder}
              value={value || ''}
              onChange={handleChange}
              {...props}
            />
          </div>
        );
      
      case FIELD_TYPES.SELECT:
        return (
          <div className={fieldWrapperClass}>
            <Select 
              className="w-full" 
              options={options || []} 
              value={value || ''}
              onChange={handleChange}
              placeholder={placeholder}
              {...props}
            />
          </div>
        );
      
      case FIELD_TYPES.DATE:
        return (
          <div className={fieldWrapperClass}>
            <DatePicker 
              className="w-full" 
              placeholderText={placeholder}
              selected={value || null}
              onChange={handleChange}
              popperProps={{
                positionFixed: true,
                modifiers: [
                  { 
                    name: 'preventOverflow',
                    options: { 
                      enabled: true,
                      boundary: 'viewport',
                      altAxis: true
                    }
                  },
                  {
                    name: 'flip',
                    options: {
                      fallbackPlacements: ['top', 'bottom']
                    }
                  }
                ]
              }}
              portalClassName="z-[9999]"
              {...datePickerProps}
              {...props}
            />
          </div>
        );
      
      case FIELD_TYPES.DATE_RANGE:
        return (
          <div className={fieldWrapperClass}>
            <DatePicker 
              className="w-full" 
              placeholder="날짜 범위를 선택해주세요."
              startDate={value?.startDate || null}
              endDate={value?.endDate || null}
              onChange={handleRangePickerChange}
              popperProps={{
                positionFixed: true,
                modifiers: [
                  { 
                    name: 'preventOverflow',
                    options: { 
                      enabled: true,
                      boundary: 'viewport',
                      altAxis: true
                    }
                  },
                  {
                    name: 'flip',
                    options: {
                      fallbackPlacements: ['top', 'bottom']
                    }
                  }
                ]
              }}
              portalClassName="z-[9999]"
              mode={DATEPICKER_MODES.RANGE}
              {...datePickerProps}
              {...props}
            />
          </div>
        );
        
      case FIELD_TYPES.RANGE_PICKER:
        return (
          <div className={fieldWrapperClass}>
            <DatePicker 
              className="w-full" 
              mode={DATEPICKER_MODES.RANGE}
              placeholder={placeholder || "날짜 범위 선택"}
              startDate={value?.startDate || null}
              endDate={value?.endDate || null}
              onChange={handleRangePickerChange}
              popperProps={{
                positionFixed: true,
                modifiers: [
                  { 
                    name: 'preventOverflow',
                    options: { 
                      enabled: true,
                      boundary: 'viewport',
                      altAxis: true
                    }
                  },
                  {
                    name: 'flip',
                    options: {
                      fallbackPlacements: ['top', 'bottom']
                    }
                  }
                ]
              }}
              portalClassName="z-[9999]"
              {...datePickerProps}
              {...props}
            />
          </div>
        );
        
      case FIELD_TYPES.TEXTAREA:
        return (
          <div className={textareaWrapperClass}>
          <Input 
          type='textarea'
          placeholder="텍스트 박스 입니다..."
          rows={5}
          value={value || ''}
          onChange={handleChange}
          {...props}
          className="w-full"
        />
        </div>
        );
        
      default:
        return null;
    }
  };

  // 라벨과 입력 필드를 포함한 전체 컴포넌트 렌더링
  return (
    <div className={`${fullWidth ? 'w-full' : medium ? 'w-2/3' : 'w-1/3'} flex ${className} ${type === FIELD_TYPES.TEXTAREA ? 'items-start' : 'items-center'} border-b border-gray-300`}>
      <div className={`w-[120px] flex ${labelClassName} h-full`}>
        <Label labelType="box" className="h-full w-full flex-grow">{label}</Label>
      </div>
      {renderField()}
    </div>
  );
};

FormField.propTypes = {
  /** 필드 타입 - 'input', 'select', 'date', 'dateRange', 'rangePicker', 'textarea' 중 하나 */
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  
  /** 라벨 텍스트 - 필드 왼쪽에 표시되는 텍스트 */
  label: PropTypes.string.isRequired,
  
  /** 필드 값 - 입력 필드의 현재 값 */
  value: PropTypes.any,
  
  /** 값 변경 시 호출될 함수 - 필드 타입에 따라 다른 매개변수를 받을 수 있음 */
  onChange: PropTypes.func,
  
  /** 선택 옵션 배열 - type이 'select'일 때 사용됨 */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /** 옵션 값 */
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      /** 옵션 레이블 (표시 텍스트) */
      label: PropTypes.string.isRequired
    })
  ),
  
  /** 입력 필드 플레이스홀더 텍스트 */
  placeholder: PropTypes.string,
  
  /** 추가 CSS 클래스 */
  className: PropTypes.string,
  
  /** 필드 래퍼 div에 추가할 CSS 클래스 */
  wrapperClassName: PropTypes.string,
  
  /** 라벨 래퍼 div에 추가할 CSS 클래스 */
  labelClassName: PropTypes.string,
  
  /** DatePicker 컴포넌트에 전달할 추가 props */
  datePickerProps: PropTypes.object,
  
  /** 전체 너비 사용 여부 - true일 경우 1/3 대신 전체 너비 사용 */
  fullWidth: PropTypes.bool,
  
  /** 중간 너비 사용 여부 - true일 경우 1/3 대신 2/3 너비 사용 */
  medium: PropTypes.bool,
  
  /** 텍스트 영역 줄 수 - type이 'textarea'일 때 사용됨 */
  rows: PropTypes.number
};

export default FormField; 