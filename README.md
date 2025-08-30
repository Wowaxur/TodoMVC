# todo-mvc

React + TypeScript проект для управления задачами (Todo List) с использованием Firebase Firestore.  
Проект построен по архитектуре **FSD (Feature-Sliced Design)**, с поддержкой CRUD, редактирования задач, фильтров и Skeleton Loader.

---

## 🔧 Стек технологий

- React 18 + TypeScript
- Vite
- Firebase Firestore
- Material UI (MUI) для UI
- Styled Components / MUI для стилей
- Jest + React Testing Library для тестов

---

## 🗂 Структура проекта (FSD)

---

## Создай файл `.env` в корне проекта с переменными Firebase:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Запуск проекта:

```bash
npm run dev
```

## Запуск тестов:

```bash
npm run test
```
