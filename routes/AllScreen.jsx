
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from '../src/component/admin'
import LoginPage from '../auth/login'
import AdminPrivateRoute from '../src/component/privateRoute'

const AllScreen = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/admin-login" element={<LoginPage/>} />
{/* private route */}
        <Route element={<AdminPrivateRoute />}>
        <Route path="/" element={<Admin />} />
      </Route>

        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AllScreen