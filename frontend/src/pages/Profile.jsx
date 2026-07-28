import { useContext, useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import AuthContext from "../context/AuthContext";

function Profile() {
  const { auth, updateUser } = useContext(AuthContext);

  const [user, setUser] = useState(auth.user);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.user?.name || "",
    phone: auth.user?.phone || "",
    state: auth.user?.state || "",
  });

  const [status, setStatus] = useState({
    message: "",
    error: false,
    loading: false,
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!auth.token) return;

      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        setUser(data.user);

        setFormData({
          name: data.user.name || "",
          phone: data.user.phone || "",
          state: data.user.state || "",
        });
      } catch (error) {
        setUser(auth.user);
      }
    };

    loadProfile();
  }, [auth.token, auth.user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setStatus({
      message: "Saving changes...",
      error: false,
      loading: true,
    });

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            state: formData.state,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setStatus({
          message: data.message || "Unable to update profile.",
          error: true,
          loading: false,
        });

        return;
      }

      updateUser(data.user);
      setUser(data.user);
      setIsEditing(false);

      setStatus({
        message: "Profile updated successfully.",
        error: false,
        loading: false,
      });
    } catch (error) {
      setStatus({
        message: "Server error while updating profile.",
        error: true,
        loading: false,
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      state: user?.state || "",
    });

    setIsEditing(false);

    setStatus({
      message: "",
      error: false,
      loading: false,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-linear-to-r from-blue-950 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome Back, {user?.name || "Citizen"}
            </h1>

            <p className="mt-3 text-blue-100">
              Manage your personal information securely.
            </p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            <FaEdit />
            Edit Information
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 border">
            <p className="text-sm text-gray-500">
              Account Status
            </p>

            <h3 className="mt-2 text-xl font-bold text-green-600">
              Active
            </h3>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border">
            <p className="text-sm text-gray-500">
              Member Since
            </p>

            <h3 className="mt-2 text-xl font-bold">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "-"}
            </h3>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border">
            <p className="text-sm text-gray-500">
              Last Updated
            </p>

            <h3 className="mt-2 text-xl font-bold">
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString()
                : "-"}
            </h3>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-lg border p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Personal Information
          </h2>

          <div className="divide-y">
            <div className="py-5 flex items-center gap-5">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaUser className="text-blue-900" />
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                {isEditing ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-xl px-4 py-2"
                  />
                ) : (
                  <p className="font-semibold text-lg">
                    {user?.name || "-"}
                  </p>
                )}
              </div>
            </div>

            <div className="py-5 flex items-center gap-5">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaEnvelope className="text-blue-900" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-semibold text-lg">
                  {user?.email || "-"}
                </p>
              </div>
            </div>

            <div className="py-5 flex items-center gap-5">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaPhone className="text-blue-900" />
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                {isEditing ? (
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-xl px-4 py-2"
                  />
                ) : (
                  <p className="font-semibold text-lg">
                    {user?.phone || "-"}
                  </p>
                )}
              </div>
            </div>

            <div className="py-5 flex items-center gap-5">
              <div className="bg-blue-100 p-3 rounded-xl">
                📍
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  State
                </p>

                {isEditing ? (
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-xl px-4 py-2"
                  />
                ) : (
                  <p className="font-semibold text-lg">
                    {user?.state || "-"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-6 py-3 rounded-xl border text-gray-700 hover:bg-gray-100"
              >
                <FaTimes className="inline mr-2" />
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={status.loading}
                className="px-6 py-3 rounded-xl bg-blue-900 text-white hover:bg-blue-800"
              >
                <FaSave className="inline mr-2" />

                {status.loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;