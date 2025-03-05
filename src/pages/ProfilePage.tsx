import React, { useState } from 'react';
import { User, Save } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { UpdateProfileData } from '../types/auth';

const ProfilePage: React.FC = () => {
  const { user, updateProfile, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    avatar_url: user?.avatar_url || ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData as UpdateProfileData);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <User className="h-6 w-6 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
            />
            <p className="mt-1 text-sm text-gray-500">
              Email cannot be changed
            </p>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <div className="flex items-center space-x-3">
              <input
                id="avatar_url"
                name="avatar_url"
                type="url"
                value={formData.avatar_url}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/avatar.jpg"
              />
              {formData.avatar_url && (
                <img
                  src={formData.avatar_url}
                  alt="Avatar preview"
                  className="h-10 w-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                  }}
                />
              )}
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? (
                'Saving...'
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;