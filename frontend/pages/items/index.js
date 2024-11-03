import Layout from "../../components/Layout/Layout";
import React from "react";
import { CalendarDays, ThumbsUp, WifiOff } from "lucide-react";
import { usePouchDB } from "../../hooks/usePouchDB";

function ItemsPage() {
  const {
    posts,
    isOnline,
    syncStatus,
    isLoading,
    error
  } = usePouchDB();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-white p-6">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-white p-6">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <div className="flex items-center gap-2">
            {(!isOnline || syncStatus) && (
              <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-md">
                {!isOnline && (
                  <div className="flex items-center gap-2">
                    <WifiOff className="h-4 w-4 text-amber-500" />
                    <span>Offline - Using local data</span>
                  </div>
                )}
                {syncStatus && (
                  <span className="ml-2">{syncStatus}</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                    {post.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{post.body}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes} likes</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}


export default ItemsPage;