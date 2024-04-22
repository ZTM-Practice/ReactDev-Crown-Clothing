import { useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocFromAuth } from './utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './store/user/user.action.js'; 
import Navigation from './components/navigation/navigation';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });

const routes = [];
for (const path of Object.keys(pages)){
  const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes('$') ? fileName.replace('$', ':') : fileName.replace(/\/index/, '');

  routes.push({
    path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    children: routes.map(({ Element, ErrorBoundary, ...props }) => ({
      ...props,
      element: <Element />,
      ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
    }))
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
            createUserDocFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <RouterProvider router={router} />
  )
};

export default App;
