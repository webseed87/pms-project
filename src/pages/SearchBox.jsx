import React from 'react';
import SearchForm from '../components/searchbox/SearchForm';
import ToolBar from '../components/searchbox/ToolBar';

const SearchBox = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">검색박스</h2>
        <ToolBar />
        <SearchForm />
      
    </div>
  );
};

export default SearchBox; 