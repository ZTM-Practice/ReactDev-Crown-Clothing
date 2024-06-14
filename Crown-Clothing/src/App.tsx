import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './store/user/user.action'; 
import { fetchCategoriesStart } from './store/categories/category.action';
import Navigation from './components/navigation/navigation';
import { ActionFunction, createBrowserRouter, LoaderFunction, RouterProvider } from 'react-router-dom';

type Page = {
  path: string;
  default: FC;
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: FC;
}

const pages: Record<string, Page> = import.meta.glob('./pages/**/*.tsx', { eager: true });

const routes = [];
for (const path of Object.keys(pages)){
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
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
    dispatch(checkUserSession());
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <RouterProvider router={router} />
  )
};

export default App;
