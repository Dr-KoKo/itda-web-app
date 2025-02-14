import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PAGE_URL } from "./constants/application";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import MyPreference from "./pages/MyPreference";
import MyResume from "./pages/MyResume";
import NotFound from "./pages/NotFound";
import RandomMatch from "./pages/RandomMatch";
import SignIn from "./pages/SignIn";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`${PAGE_URL.HOME}`} element={<Home />} />
          <Route path={`${PAGE_URL.ABOUT}`} element={<Home />} />
          <Route
            path={`${PAGE_URL.MY_PREFERENCE}`}
            element={<MyPreference />}
          />
          <Route path={`${PAGE_URL.MY_RESUME}`} element={<MyResume />} />
          <Route path={`${PAGE_URL.RANDOM_MATCH}`} element={<RandomMatch />} />
          <Route path={`${PAGE_URL.SIGN_IN}`} element={<SignIn />} />
          <Route path={`${PAGE_URL.LOG_IN}`} element={<LogIn />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
