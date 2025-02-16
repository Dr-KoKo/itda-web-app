import { Route, Routes } from "react-router-dom";
import { PAGE_URL } from "./constants/application";
import Home from "./pages/Home";
import MyPreference from "./pages/MyPreference";
import MyResume from "./pages/MyResume";
import NotFound from "./pages/NotFound";
import RandomMatch from "./pages/RandomMatch";
import Post from "./pages/Post";
import Layout from "./components/feature/Layout";
import RouterErrorBoundary from "./components/errors/RouterErrorBoundary";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />} errorElement={<RouterErrorBoundary />}>
          <Route index element={<Home />} />
          <Route path={`${PAGE_URL.HOME}`} element={<Home />} />
          <Route path={`${PAGE_URL.ABOUT}`} element={<Home />} />
          <Route path={`${PAGE_URL.JOB_POSTS}`} element={<Post />} />
          <Route path={`${PAGE_URL.TEAM_POSTS}`} element={<Post />} />
          <Route path={`${PAGE_URL.MY_PREFERENCE}`} element={<MyPreference />} />
          <Route path={`${PAGE_URL.MY_RESUME}`} element={<MyResume />} />
          <Route path={`${PAGE_URL.RANDOM_MATCH}`} element={<RandomMatch />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
