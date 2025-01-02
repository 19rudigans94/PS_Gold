// Импорты библиотек
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';

// Импорты компонентов и стилей
import App from './App';
import store from './store/store';
import AuthCheck from './components/AuthCheck';
import './index.css';

// Функция для создания конфигурации роутера
const createRouter = () =>
  createBrowserRouter(
    [
      {
        path: '/*',
        element: (
          <Provider store={store}>
            <AuthCheck>
              <App />
            </AuthCheck>
          </Provider>
        ),
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );

// Создание и рендеринг приложения
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={createRouter()} />
);