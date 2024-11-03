import { useState, useEffect } from 'react';
import { dbService } from '../services/db.service';

export function usePouchDB() {
  const [posts, setPosts] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [syncStatus, setSyncStatus] = useState('');
  const [syncChanged, setSyncChanged] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize database
    dbService.initialize();

    // Setup online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load initial data and setup sync
    const loadData = async () => {
      try {
        const localPosts = await dbService.getAllPosts();
        setPosts(localPosts);
        
        if (isOnline) {
          dbService.setupSync(setSyncStatus, setSyncChanged);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      dbService.cancelSync();
    };
  }, [isOnline, syncChanged]);

  const createPost = async (postData) => {
    try {
      const newPost = await dbService.createPost(postData);
      setPosts(prevPosts => [...prevPosts, newPost]);
      return newPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updatePost = async (postData) => {
    try {
      const updatedPost = await dbService.updatePost(postData);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post._id === postData._id ? updatedPost : post
        )
      );
      return updatedPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletePost = async (postId) => {
    try {
      await dbService.deletePost(postId);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  console.log(posts)

  return {
    posts,
    isOnline,
    syncStatus,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost
  };
}