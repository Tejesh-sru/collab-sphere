import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/common/Navbar';
import { Card, Input, Button, Alert } from '../components/common';

/**
 * Settings Page
 * User settings for profile, password, and preferences
 */
function SettingsPage() {
  const { user, updateUserProfile, changePassword } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    bio: '',
    location: '',
    university: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notification, setNotification] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const result = await updateUserProfile({ displayName: profileData.displayName });
    
    if (result.success) {
      setNotification({ type: 'success', message: 'Profile updated successfully!' });
    } else {
      setNotification({ type: 'error', message: result.error || 'Failed to update profile' });
    }
    
    setIsSaving(false);
    setTimeout(() => setNotification(null), 5000);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({ type: 'error', message: 'Passwords do not match' });
      return;
    }
    
    setIsSaving(true);
    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    
    if (result.success) {
      setNotification({ type: 'success', message: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setNotification({ type: 'error', message: result.error || 'Failed to change password' });
    }
    
    setIsSaving(false);
    setTimeout(() => setNotification(null), 5000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'account', label: 'Account', icon: 'shield-check' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' },
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--cs-bg-secondary)' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        <h2 className="fw-bold mb-4">Settings</h2>

        {notification && (
          <Alert
            type={notification.type}
            message={notification.message}
            autoClose
            className="mb-4"
          />
        )}

        <div className="row g-4">
          {/* Tabs Sidebar */}
          <div className="col-lg-3">
            <Card>
              <div className="nav flex-column nav-pills">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`nav-link text-start ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <i className={`bi bi-${tab.icon} me-2`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Content Area */}
          <div className="col-lg-9">
            {activeTab === 'profile' && (
              <Card>
                <h5 className="fw-bold mb-4">Profile Information</h5>
                <form onSubmit={handleProfileSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <Input
                        label="Full Name"
                        name="displayName"
                        value={profileData.displayName}
                        onChange={handleProfileChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={profileData.email}
                        disabled
                        helperText="Email cannot be changed"
                      />
                    </div>
                  </div>

                  <Input
                    label="Bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    placeholder="Tell us about yourself"
                  />

                  <div className="row">
                    <div className="col-md-6">
                      <Input
                        label="University"
                        name="university"
                        value={profileData.university}
                        onChange={handleProfileChange}
                        placeholder="Your university"
                      />
                    </div>
                    <div className="col-md-6">
                      <Input
                        label="Location"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" loading={isSaving}>
                    Save Changes
                  </Button>
                </form>
              </Card>
            )}

            {activeTab === 'account' && (
              <Card>
                <h5 className="fw-bold mb-4">Change Password</h5>
                <form onSubmit={handlePasswordSubmit}>
                  <Input
                    type="password"
                    label="Current Password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    required
                  />

                  <Input
                    type="password"
                    label="New Password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    helperText="Must be at least 6 characters"
                    required
                  />

                  <Input
                    type="password"
                    label="Confirm New Password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    required
                  />

                  <Button type="submit" variant="primary" loading={isSaving}>
                    Update Password
                  </Button>
                </form>

                <hr className="my-4" />

                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>
                    <strong>Danger Zone</strong>
                    <p className="mb-2 small">Once you delete your account, there is no going back.</p>
                    <button className="btn btn-danger btn-sm">Delete Account</button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <h5 className="fw-bold mb-4">Notification Preferences</h5>
                
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Email Notifications</h6>
                  {[
                    'New connection requests',
                    'New messages',
                    'Project invitations',
                    'Weekly activity summary',
                  ].map((item, index) => (
                    <div key={index} className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">{item}</label>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Push Notifications</h6>
                  {[
                    'Direct messages',
                    'Mentions',
                    'Event reminders',
                  ].map((item, index) => (
                    <div key={index} className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">{item}</label>
                    </div>
                  ))}
                </div>

                <Button variant="primary">Save Preferences</Button>
              </Card>
            )}

            {activeTab === 'appearance' && (
              <Card>
                <h5 className="fw-bold mb-4">Appearance Settings</h5>
                
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Theme</h6>
                  <div className="d-flex gap-3">
                    <button
                      className={`btn btn-outline-primary ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => theme === 'dark' && toggleTheme()}
                    >
                      <i className="bi bi-sun me-2"></i>
                      Light Mode
                    </button>
                    <button
                      className={`btn btn-outline-primary ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => theme === 'light' && toggleTheme()}
                    >
                      <i className="bi bi-moon me-2"></i>
                      Dark Mode
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Language</h6>
                  <select className="form-select w-auto">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div>
                  <h6 className="fw-semibold mb-3">Other Preferences</h6>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                    <label className="form-check-label">Show online status</label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                    <label className="form-check-label">Enable animations</label>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
