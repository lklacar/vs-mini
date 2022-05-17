import React from 'react';
import ReactDOM from 'react-dom/client';
import EditorScreen from './screens/EditorScreen';
import reportWebVitals from './reportWebVitals';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <EditorScreen/>
    </React.StrictMode>
);

reportWebVitals();
