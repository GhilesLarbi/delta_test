import PouchDB from 'pouchdb';

class DatabaseService {
  constructor() {
    this.localDb = null;
    this.remoteDb = null;
    this.sync = null;
  }

  initialize() {
    if (!this.localDb) {
      this.localDb = new PouchDB('posts_db');
      this.remoteDb = new PouchDB('http://localhost:5984/posts', {
        auth: {
          username: 'admin',
          password: 'admin'
        },
        adapter: ''
      });
    }
  }

  setupSync(onSyncChange, onChange) {
    if (true) {
      this.sync = this.localDb.sync(this.remoteDb, {
        live: true,
        retry: true,
      })
      .on('change', (change) => {
        onSyncChange('Syncing changes...');
        onChange(change)
      })
      .on('paused', () => {
        onSyncChange('Sync paused');
      })
      .on('active', () => {
        onSyncChange('Sync active');
      })
      .on('denied', () => {
        onSyncChange('Sync denied');
      })
      .on('complete', () => {
        onSyncChange('Sync complete');
      })
      .on('error', (err) => {
        console.error('Sync error:', err);
        onSyncChange('Sync error');
      });
    }
  }

  async getAllPosts() {
    try {
      const result = await this.localDb.allDocs({
        include_docs: true,
        attachments: true
      });
      return result.rows.map(row => row.doc);
    } catch (err) {
      console.error('Error getting posts:', err);
      throw err;
    }
  }

  async createPost(post) {
    try {
      const timestamp = new Date().toISOString();
      const newPost = {
        _id: `post_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: timestamp,
        ...post
      };
      const response = await this.localDb.put(newPost);
      return { ...newPost, _rev: response.rev };
    } catch (err) {
      console.error('Error creating post:', err);
      throw err;
    }
  }

  async updatePost(post) {
    try {
      const response = await this.localDb.put(post);
      return { ...post, _rev: response.rev };
    } catch (err) {
      console.error('Error updating post:', err);
      throw err;
    }
  }

  async deletePost(postId) {
    try {
      const doc = await this.localDb.get(postId);
      await this.localDb.remove(doc);
    } catch (err) {
      console.error('Error deleting post:', err);
      throw err;
    }
  }

  cancelSync() {
    if (this.sync) {
      this.sync.cancel();
      this.sync = null;
    }
  }
}

export const dbService = new DatabaseService();
