import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import "./index.css";
import App from "./App.jsx";
import { logWebVitals } from './reportWebVitals';

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);

// Monitor web vitals for performance tracking
if (process.env.NODE_ENV === 'development') {
    logWebVitals();
}