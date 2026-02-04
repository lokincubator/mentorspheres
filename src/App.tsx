import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PublicRoute from './layout/PublicRoute';
import ProtectedRoute from './layout/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import AllMentorsPage from './pages/AllMentorsPage';
import MentorIntakeFormPage from "./pages/MentorRegistrationFormPage";
import MenteeIntakeFormPage from './pages/MenteeRegistrationFormPage';
import UserProfilePage from './pages/userProfilePage'; 
import AllMenteesPage from './pages/AllMenteesPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';

// TODO move mentor intake form page to protected after we wire it up

function App() {
	return (
		<Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/all-mentors" element={<AllMentorsPage />} />
                <Route path="/all-mentees" element={<AllMenteesPage />} />
                <Route path='/mentor-intake-form' element={<MentorIntakeFormPage />} />
                <Route path='/mentee-intake-form' element={<MenteeIntakeFormPage />} />
                <Route path='/user-profile' element={<UserProfilePage />} />
                <Route path='/privacy' element={<PrivacyPage />} />
                <Route path='/contact' element={<ContactPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/profile/:id" element={<ProfilePage />} />
            </Route>
		</Routes>
	);
}

export default App;
