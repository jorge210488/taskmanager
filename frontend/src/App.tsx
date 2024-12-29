import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/router";
import RootLayout from "./layout";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <RootLayout>
          <AppRouter />
        </RootLayout>
      </Router>
    </Provider>
  );
}
