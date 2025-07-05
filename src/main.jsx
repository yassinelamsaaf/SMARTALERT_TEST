import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { LanguageProvider } from "./i18n/LanguageProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <LanguageProvider>
            <App />
        </LanguageProvider>
    </Provider>,
);
