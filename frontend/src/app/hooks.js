import { useDispatch, useSelector } from 'react-redux';

// Thin wrappers so every component imports hooks from one place instead
// of `react-redux` directly — makes a future TypeScript migration a
// one-file change (add AppDispatch/RootState generics here only).
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
