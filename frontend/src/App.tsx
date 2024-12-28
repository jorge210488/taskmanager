import { Provider } from "react-redux";
import { store } from "./redux/store";
import RootLayout from "./layout";

export default function App() {
  return (
    <Provider store={store}>
      <RootLayout>
        <div className="app-content">
          <h1>Welcome to TaskManager!</h1>
        </div>
      </RootLayout>
    </Provider>
  );
}
