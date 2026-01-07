import React from 'react'
import ReactDOM from 'react-dom/client'     // React 컴포넌트를 실제 HTML에 붙이는 역할
import App from './App'                     // App은 전체 화면의 루트 컴포넌트
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(    // HTML root에 React 앱 붙이기
    // StrictMode는 개발 모드 전용 검사 도구
    <React.StrictMode>      
        <App />
    </React.StrictMode>
)