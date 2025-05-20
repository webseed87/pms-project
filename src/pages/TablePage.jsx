import React from 'react';
import { AliveScope } from 'react-activation';
import AppInner from '../components/table/AppInner';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const TablePage = () => (
  <AliveScope>
    <AppInner />
  </AliveScope>
);

export default TablePage;
