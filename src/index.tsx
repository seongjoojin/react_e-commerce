import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import ko_KR from 'antd/lib/locale-provider/ko_KR';
import App from './components/App';
import './GlobalStyles';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

ReactDOM.render(
      <LocaleProvider locale={ko_KR}>
        <Provider store={store}>
          <App />
        </Provider>
      </LocaleProvider>,
    document.getElementById('root') as HTMLElement
  );
