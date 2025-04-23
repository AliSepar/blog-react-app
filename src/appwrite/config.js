import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    // to created the client at the same time as the object is created
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //   we will get the featuredImage from the Storage which will be stored as id with a method
  //   in place of  slug we can user ID.unique
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  //   we separate the slug to get access to the document id easer
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updataPost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  //   get one specific post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
    }
  }

  //   getting all the posts with out condition
  //   async allPost() {
  //     try {
  //       return await this.databases.listDocuments(
  //         conf.appwriteDatabaseId,
  //         conf.appwriteCollectionId
  //       );
  //     } catch (error) {
  //       console.log("Appwrite service :: allPost :: error", error);
  //     }
  //   }

  //   getting all the post with a condition will use Query, you can have multiple query
  // to use queries you have to add indexes(make that filed) in the collection (table)
  //Query.equal('status'): status is the key
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
        // you can write it manual here [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  //file upload service
  //bucket is is just a variable name which referer to Storage
  //the has to be the actual file name (blob)
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  //   delete specific file with its id
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  //file preview specific
  getFilePreview(fileId) {
    // return this.bucket.getFilePreview(conf.appwriteBucketId, fileId); // can't access getFilePreview in free plan
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
