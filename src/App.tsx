import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PublicRoute from './layout/PublicRoute';
import ProtectedRoute from './layout/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';

function App() {
	return (
		<Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/profile/:id" element={<ProfilePage />} />
            </Route>
		</Routes>
	);
}

export default App;
