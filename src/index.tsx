import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import ko_KR from 'antd/lib/locale-provider/ko_KR';
import App from './components/App';
import './GlobalStyles';

ReactDOM.render(
      <LocaleProvider locale={ko_KR}>
        <App />
      </LocaleProvider>,
    document.getElementById('root') as HTMLElement
  );
