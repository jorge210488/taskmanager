import { Provider } from "react-redux";
import { store } from "./redux/store";
import RootLayout from "./layout";
import Home from "./app/home/home";

export default function App() {
  return (
    <Provider store={store}>
      <RootLayout>
        <Home />
      </RootLayout>
    </Provider>
  );
}
