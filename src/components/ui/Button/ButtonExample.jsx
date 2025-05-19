import React from 'react';
import Button, { BUTTON_TYPES, BUTTON_SIZES } from './Button';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  TrashIcon, 
  XMarkIcon, 
  ChevronRightIcon,
  ChevronLeftIcon,
  PencilSquareIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const ButtonExample = () => {
  return (
    <div className="p-6 space-y-10">


<section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">PRIMARY</h2>
        <div className="space-y-6">
          {/* 주요 타입 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">사이즈별</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">XLARGE</h4>
                <Button 
                  buttonType={BUTTON_TYPES.PRIMARY}
                  size={BUTTON_SIZES.XLARGE}
                >
                  다음
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">LARGE</h4>
                <Button 
                  buttonType={BUTTON_TYPES.PRIMARY}
                  size={BUTTON_SIZES.LARGE}
                  icon={<MagnifyingGlassIcon />}
                >
                  조회
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">MEDIUM</h4>
                <Button 
                  buttonType={BUTTON_TYPES.PRIMARY}
                  size={BUTTON_SIZES.MEDIUM}
                >
                  저장
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">DISABLED</h4>
                <Button 
                  buttonType={BUTTON_TYPES.PRIMARY}
                  size={BUTTON_SIZES.LARGE}
                  disabled
                >
                  저장
                </Button>
              </div>
            </div>
          </div>
          
          {/* 부가 타입 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">부가 타입</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">SAVE</h4>
                <Button 
                  buttonType={BUTTON_TYPES.SAVE}
                  icon={<PencilSquareIcon/>}
                >
                  저장
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">ADD</h4>
                <Button 
                  buttonType={BUTTON_TYPES.ADD}
                  icon={<PlusIcon />}
               
                >
                  추가
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">DELETE</h4>
                <Button 
                  buttonType={BUTTON_TYPES.DELETE}
                  icon={<TrashIcon />}
                >
                  삭제
                </Button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">REFRESH</h4>
                <Button 
                  buttonType={BUTTON_TYPES.REFRESH}
                  icon={<ArrowPathIcon />}
                >
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
     

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">SECONDARY</h2>
        <div className="space-y-6">
          {/* 주요 타입 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">사이즈별</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">XLARGE</h4>
                <Button 
                  buttonType={BUTTON_TYPES.SECONDARY}
                  size={BUTTON_SIZES.XLARGE}
                >
                  다음
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">LARGE</h4>
                <Button 
                  buttonType={BUTTON_TYPES.SECONDARY}
                  size={BUTTON_SIZES.LARGE}
                  icon={<MagnifyingGlassIcon />}
                >
                  조회
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">MEDIUM</h4>
                <Button 
                  buttonType={BUTTON_TYPES.SECONDARY}
                  size={BUTTON_SIZES.MEDIUM}
                >
                  저장
                </Button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">LOADING</h4>
                <Button 
                  buttonType={BUTTON_TYPES.SECONDARY}
                  size={BUTTON_SIZES.MEDIUM}
                  isLoading
                >
                저장
                </Button>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">Line</h2>
        <div className="space-y-6">
          {/* 주요 타입 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">사이즈별</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">XLARGE</h4>
                <Button 
                  buttonType={BUTTON_TYPES.LINE}
                  size={BUTTON_SIZES.XLARGE}
                >
                  다음
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">LARGE</h4>
                <Button 
                  buttonType={BUTTON_TYPES.LINE}
                  size={BUTTON_SIZES.LARGE}
                  icon={<MagnifyingGlassIcon />}
                >
                  조회
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">MEDIUM</h4>
                <Button 
                  buttonType={BUTTON_TYPES.LINE}
                  size={BUTTON_SIZES.MEDIUM}
                >
                  저장
                </Button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">ICON</h4>
                <Button 
                  buttonType={BUTTON_TYPES.LINE}
                  size={BUTTON_SIZES.MEDIUM}
                  icon={<ChevronLeftIcon/>}
                >
                </Button>
                <Button 
                  buttonType={BUTTON_TYPES.LINE}
                  size={BUTTON_SIZES.MEDIUM}
                  icon={<ChevronRightIcon/>}
                >
                </Button>
                <Button 
                  buttonType={BUTTON_TYPES.LINE}
                  size={BUTTON_SIZES.MEDIUM}
                  icon={<XMarkIcon/>}
                >
                </Button>
              </div>
              
            </div>
          </div>
        </div>
      </section>


    
    </div>
  );
};

export default ButtonExample; 