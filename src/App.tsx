import { Routes, Route, useSearchParams, useLocation, Navigate } from 'react-router-dom';

import Dashboard from "./components/dashboard/index.tsx";
import LayoutPage from './pages/layoutPage/index.tsx';
import LayoutPageForm from './pages/layoutPageForm/index.tsx';
import PrivateRoute from './utils/privateRoute.tsx';
import PublicRoute from './utils/publicRoute.tsx';
import SignInForm from './components/signInForm/index.tsx';
import ForgotForm from './components/forgotForm/index.tsx';
import SignUpForm from './components/signUpForm/index.tsx';
import UpdateUserForm from './components/updateUserForm/index.tsx';
import Hero from './components/hero/index.tsx';
import LayoutPageAuth from './pages/layoutPageAuth/index.tsx';
import TrainingView from './components/traineView/index.tsx';
import LayoutPageTraineView from './pages/layoutPageTraineView/index.tsx';


const App = () => {

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />} >
          <Route path={'/'} element={<LayoutPage />} >
            <Route index element={<Hero />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />} >
          <Route element={<LayoutPageAuth />} >
            <Route path={'/dashboard'} element={<Dashboard />} />
          </Route>
          <Route element={<LayoutPageTraineView />} >
            <Route path='trainingView' element={<TrainingView />} />
          </Route>
        </Route>

        <Route path='/' element={<LayoutPageForm />} >
          <Route path={'/sign-in'} element={<SignInForm />} />
          <Route path={'/sign-up'} element={<SignUpForm />} />
          <Route path='/updateuser' element={<UpdateUserForm />} />
          <Route path='/forgot' element={<ForgotForm />} />
        </ Route>


      </Routes>


    </>
  )
}

export default App