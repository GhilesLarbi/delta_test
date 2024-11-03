import Layout from '@components/Layout/Layout';
import React, { useContext } from "react";
import Context from "../../store";
import { User, Mail, Calendar, Key } from "lucide-react";

function Index(props) {
  const { user } = useContext(Context);

  return (
    <Layout>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-8">
              <div className="flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-white/30 flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-center text-2xl font-bold text-white mt-4">
                {user.user.name}
              </h1>
              <p className="text-center text-blue-100 mt-2">@{user.user.username}</p>
            </div>

            {/* User Details Section */}
            <div className="p-6">
              <div className="grid gap-6">
                {/* Email */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-violet-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900 font-medium">{user.user.email}</p>
                  </div>
                </div>

                {/* User ID */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Key className="h-5 w-5 text-violet-500" />
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-gray-900 font-medium break-all">{user.user.id}</p>
                  </div>
                </div>

                {/* Created At */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-violet-500" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(user.user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Token Preview */}
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Authentication Token</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 break-all font-mono">
                    {user.token}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;