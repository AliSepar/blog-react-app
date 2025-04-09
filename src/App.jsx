import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import LoadingUi from "./components/ui/LoadingUi";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // check who is current user
    authService
      .getCurrentUser()
      // here it will check if there is a user and then it will add the status to the redux state
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        // if everything go well remove loading
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>{/* TODO: <Outlet /> */}</main>
        <Footer />
      </div>
    </div>
  ) : // <LoadingUi />
  null;
}

export default App;
