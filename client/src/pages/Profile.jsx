import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookLoader from '../components/BookLoader';
import { useAuthUser } from '../contexts/AuthUserContexts';

const Profile = () => {
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    bio: '',
    birthDate: '',
    profilePic: '',
  });
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false); // New state for image upload status
  const { user, updateUser } = useAuthUser();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
<<<<<<< HEAD
    const MY_IP = import.meta.env.VITE_MY_IP;
=======
    const MY_IP = import.meta.env.VITE_BACKEND_URL;
>>>>>>> 2cca578 (Initial commit or reconnect)
    try {
      if (!user || !user.userId) {
        throw new Error('No user data found');
      }

<<<<<<< HEAD
      const response = await axios.post(`http://${MY_IP}:3000/profile/getuser`, {
=======
      const response = await axios.post(`${MY_IP}/profile/getuser`, {
>>>>>>> 2cca578 (Initial commit or reconnect)
        userId: user.userId
      });

      setFormData({
        username: response.data.username || '',
        email: response.data.email || '',
        first_name: response.data.first_name || '',
        last_name: response.data.last_name || '',
        bio: response.data.bio || '',
        birthDate: response.data.birthDate ? new Date(response.data.birthDate).toISOString().split('T')[0] : '',
        profilePic: response.data.profilePic || 'https://via.placeholder.com/150',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching user data:', error);
      setError(error.message || 'An error occurred while fetching user data');
    }
  };

  const handleMainEditToggle = () => {
    setIsEditingAll(!isEditingAll);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  if (loading) return <BookLoader />;

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      setImageFile(file);
      setImageUploading(true); // Set uploading state to true when starting upload

      if (file) {
        const MY_IP = import.meta.env.VITE_MY_IP;
        const mimeType = file.type;
<<<<<<< HEAD
        const response = await axios.get(`http://${MY_IP}:3000/auth/presignedurl`, {
=======
        const response = await axios.get(`${MY_IP}/auth/presignedurl`, {
>>>>>>> 2cca578 (Initial commit or reconnect)
          params: { mimeType }
        });

        const presignedUrl = response.data.url;
        const formData = new FormData();
        formData.append("bucket", response.data.fields["bucket"]);
        formData.append("Content-Type", mimeType);
        formData.append("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
        formData.append("X-Amz-Credential", response.data.fields["X-Amz-Credential"]);
        formData.append("X-Amz-Date", response.data.fields["X-Amz-Date"]);
        formData.append("Policy", response.data.fields["Policy"]);
        formData.append("X-Amz-Signature", response.data.fields["X-Amz-Signature"]);
        formData.append("key", response.data.fields["key"]);
        formData.append("file", file);

        await axios.post(presignedUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        const imageUrl = `${import.meta.env.VITE_CLOUDFRONT_URL}/${response.data.fields["key"]}`;
        setFormData(prevData => ({ ...prevData, profilePic: imageUrl }));
      }
    } catch (error) {
      console.error("Error handling image upload:", error);
      setError("Failed to handle image upload. Please try again.");
    } finally {
      setImageUploading(false); // Set uploading state to false when upload completes
    }
  };

  const handleSubmit = async () => {
    setUploading(true);
    const MY_IP = import.meta.env.VITE_MY_IP;
    try {
      if (!user || !user.userId) {
        throw new Error('No user data found');
      }

<<<<<<< HEAD
      const response = await axios.put(`http://${MY_IP}:3000/profile/update`, {
=======
      const response = await axios.put(`${MY_IP}/profile/update`, {
>>>>>>> 2cca578 (Initial commit or reconnect)
        userId: user.userId,
        ...formData
      });
      updateUser({
        ...user,
        first_name: formData.first_name,
        profilePic: formData.profilePic
      });

      setIsEditingAll(false);
      fetchUserDetails();
    } catch (error) {
      console.error('Error updating user data:', error);
      setError(error.message || 'An error occurred while updating user data');
    }
    setUploading(false);
  };

  if (error) return <div className="text-red-500">{error}</div>;

  // Input field class with conditional text color
  const inputClass = `form-control w-full px-3 py-2 border-indigo-100 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${isEditingAll ? 'bg-white text-black' : 'bg-indigo-200 text-gray-700'
    }`;

  return (
    <div className="bg-gray-100 min-h-screen py-8 mt-10 px-10 bg-indigo-50">
      <div className="container mx-auto bg-indigo-50">
        <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold text-center mb-8">
          Profile
          <span className="block w-24 h-1 bg-[#5c8bf5] mx-auto mt-2"></span>
        </h1>
      </div>
      <div className="flex items-center justify-center bg-indigo-50">
        <div className="flex flex-wrap items-stretch justify-center container mx-auto py-10 max-w-5xl">
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <div className="bg-indigo-200 rounded-lg shadow-lg h-full">
              <div className="p-6 text-center">
                <div className="mb-4 relative">
                  <img
                    src={formData.profilePic}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto border-2 border-indigo-600"
                  />
                  {isEditingAll && (
                    <label
                      htmlFor="profile-pic-upload"
                      className="cursor-pointer inline-block mx-auto mt-3 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                    >
                      <input
                        id="profile-pic-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      New Pic
                    </label>
                  )}
                </div>
                {imageUploading && <div className="text-black">Uploading image...</div>}
                <h5 className="text-lg font-medium">{`${formData.first_name} ${formData.last_name}`}</h5>
                <h6 className="text-lg text-gray-500">{formData.email}</h6>
              </div>
              <div className="text-center pb-6 pt-20">
                <h5 className="text-blue-500 text-lg">About</h5>
                <p className="text-lg mt-2">{formData.bio || "No bio available."}</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <div className="bg-indigo-100 rounded-lg shadow-lg h-full">
              <div className="p-6">
                <div className="mb-4">
                  <h6 className="text-primary text-lg font-medium">Personal Details</h6>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="form-group flex items-center">
                    <label htmlFor="username" className="block text-lg font-medium bg-indigo-100 mr-4">
                      Username
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                      disabled={!isEditingAll}
                    />
                  </div>
                  <div className="form-group flex items-center">
                    <label htmlFor="first_name" className="block text-lg font-medium bg-indigo-100 mr-4">
                      First Name
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      disabled={!isEditingAll}
                    />
                  </div>
                  <div className="form-group flex items-center">
                    <label htmlFor="last_name" className="block text-lg font-medium bg-indigo-100 mr-4">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      disabled={!isEditingAll}
                    />
                  </div>
                  <div className="form-group flex items-start">
                    <label htmlFor="bio" className="block text-lg font-medium bg-indigo-100 mr-4">
                      Bio
                    </label>
                    <textarea
                      className={inputClass}
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Enter bio"
                      rows="3"
                      disabled={!isEditingAll}
                    ></textarea>
                  </div>
                  <div className="form-group flex items-center">
                    <label htmlFor="birthDate" className="block text-lg font-medium bg-indigo-100 mr-4">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      className={inputClass}
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      disabled={!isEditingAll}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleMainEditToggle}
                    className={`btn ${isEditingAll ? "bg-red-500 hover:bg-red-600" : "bg-indigo-500 hover:bg-indigo-600"} text-white px-4 py-2 rounded-md`}
                  >
                    {isEditingAll ? "Cancel" : "Edit"}
                  </button>
                  {isEditingAll && (
                    <button
                      onClick={handleSubmit}
                      className="ml-3 btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                      {uploading ? "Saving..." : "Save"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Profile;