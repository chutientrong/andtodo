import { Routes, Route } from "react-router-dom";
import Task from "./pages/Task";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./components/layout/AuthLayout";
import HomeLayout from "./components/layout/HomeLayout";
import AppLayout from "./components/layout/AppLayout";
import { routes } from "./router";
function App() {
  return (
    <AppLayout>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index path={routes.LOGIN} element={<Login />} />
          <Route path={routes.SIGNUP} element={<Signup />} />
        </Route>

        <Route element={<HomeLayout />}>
          <Route path={routes.TODO} element={<Task />} />
          <Route
            path={routes.HOMEPAGE}
            element={
              <div className="flex flex-col items-center w-full pt-10 h-50% gap-3">
                <img src="./assets/images/sms1.png" className="w-4/12" alt="" />
                <h1 className="text-lg text-gray-600">
                  Select or create new todo
                </h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </AppLayout>
  );
}

export default App;
