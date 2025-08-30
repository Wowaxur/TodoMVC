import '@testing-library/jest-dom';

// Мокаем переменные окружения Vite для тестов
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
globalThis.__VITE_ENV__ = {
    VITE_FIREBASE_API_KEY: 'test-api-key',
    VITE_FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
    VITE_FIREBASE_PROJECT_ID: 'test-project-id',
    VITE_FIREBASE_STORAGE_BUCKET: 'test-storage-bucket',
    VITE_FIREBASE_MESSAGING_SENDER_ID: 'test-sender-id',
    VITE_FIREBASE_APP_ID: 'test-app-id',
};
