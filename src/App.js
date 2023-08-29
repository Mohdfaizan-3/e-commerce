import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navigation from "./routes/Navigation/Navigation.jsx";
import Shop from "./routes/Shop/ShopComponent";
import ShopPreview from "./routes/Shop/ShopPreview";
import SignInPage from "./routes/auth/signIn/SignInPage.jsx";
import Checkout from "./routes/checkout/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation />,
      children: [
        {
          index:true,
          element: <Shop />,
        },

        {
          path: ":title",
          element: <ShopPreview />,
        },
        {
          path: "signIn",
          element: <SignInPage />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer/>
    </div>
  );
}

export default App;
