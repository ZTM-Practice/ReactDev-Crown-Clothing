import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../../store/root-reducer";
import App from "../../App";

export function renderWithProviders(
    ui,
    {
      preloadedState = {},
      // Automatically create a store instance if no store was passed in
      store = createStore(rootReducer, preloadedState),
      needRouter = false,
      ...renderOptions
    } = {}
  ) {
    function Wrapper({ children }) {
      if (needRouter){
        return (
          <Provider store={store}>
            <App>
              {children}
            </App>
          </Provider>
        )
      } else {
        return (
          <Provider store={store}>
            {children}
          </Provider>
        )
      }
    }
  
    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
  }
