import React from 'react';
import Button from '../ui/Button';
import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const ToolBar = () => {
  return (
    <div className="min-w-[900px] w-full px-4 py-3 bg-gray-50 border-t border-l border-r border-gray-300 inline-flex items-center justify-end gap-2">
      <Button buttonType="primary" size="medium" className="h-10" icon={<MagnifyingGlassIcon className="w-4 h-4" />}>조회</Button>
      <Button buttonType="refresh" size="medium" className="h-10" icon={<ArrowPathIcon className="w-4 h-4" />} />
    </div>
  );
};

export default ToolBar;
