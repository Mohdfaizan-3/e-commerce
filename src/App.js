import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home/HomeComponent";
import Navigation from "./routes/Navigation/Navigation.jsx";
import Shop from "./routes/Shop/ShopComponent";
import SignInPage from "./routes/auth/signIn/SignInPage.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "shop",
          element: <Shop />,
        },
        {
          path: "signIn",
          element: <SignInPage />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
