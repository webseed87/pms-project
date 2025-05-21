import React from 'react';
import MainLayout from '../layout/MainLayout';
import ToolBar from '../components/searchbox/ToolBar';
import SearchForm from '../components/searchbox/SearchForm';
import TablePage from './TablePage';

const PagePage = () => {
  return (
    <MainLayout>
      <TablePage />
    </MainLayout>
  );
};

export default PagePage; 