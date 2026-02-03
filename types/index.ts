/**
 * Shared TypeScript type definitions for QuillFire
 * 
 * These types represent the data structures used throughout the application.
 * They should match your Mongoose models, but represent the shape of data
 * as it appears in your React components (after population/transformation).
 */

/**
 * User Type
 * 
 * This represents a user object as it appears in your components.
 * Notice how I'm mapping from your UserSchema:
 * - email: String (required) → string
 * - username: String (required) → string  
 * - password: String → NOT included (we don't expose passwords to frontend)
 * - favColor: String (optional) → string | undefined
 * - image: String (optional) → string | undefined
 * - _id: Added by Mongoose → string
 * 
 * The `_id` field is added automatically by Mongoose, so we include it here.
 */
export type User = {
  _id: string;
  email: string;
  username: string;
  favColor?: string; // Optional because it's not required in schema
  image?: string;    // Optional because it's not required in schema
};

export type Comment = {
  _id: string,
  creator: User,
  topicId: string,
  content: string,
  createdOn: string
}

export type Topic = {
  _id: string,
  creator: User,
  title: string,
  topic: string,
  htmltopic: string,
  tag: string,
  theme?: string,
  createdOn: string,
  likes: string[],
  dislikes: string[]
}

export type FormErrors = {
  //Topic form errors
  titleContent?: boolean,
  titleError?: string,
  topicContent?: boolean,
  topicError?: string,
  tagContent?: boolean,
  tagError?: string,
  themeSelected?: boolean,
  themeError?: string

  //Sign in/up errors
  usernameField?: boolean,
  usernameFieldError?: string,
  passwordField?: boolean,
  passwordFieldError?: string,
  emailField?: boolean,
  emailFieldError?: string
}

/**
 * HOW TO CREATE THE OTHER TYPES:
 * 
 * 1. Look at your Mongoose schema (e.g., models/topic.js, models/comment.js)
 * 2. For each field, map the Mongoose type to TypeScript:
 *    - String → string
 *    - Number → number
 *    - Boolean → boolean
 *    - Date → string (ISO date strings) or Date
 *    - Array → Type[] (e.g., string[])
 *    - Schema.Types.ObjectId → string (when populated) or ObjectId type
 *    - required: false → add ? to make it optional
 * 
 * 3. Add _id: string (Mongoose adds this automatically)
 * 
 * EXAMPLE FOR COMMENT TYPE:
 * 
 * From CommentSchema:
 * - creator: Schema.Types.ObjectId, ref: "User" → When populated: creator: User
 * - topicId: Schema.Types.ObjectId, required → topicId: string
 * - content: String, required → content: string
 * - createdOn: Date, required → createdOn: string (ISO date)
 * 
 * So Comment type would be:
 * 
 * export type Comment = {
 *   _id: string;
 *   creator: User;  // Populated user object
 *   topicId: string;
 *   content: string;
 *   createdOn: string; // ISO date string
 * };
 * 
 * EXAMPLE FOR TOPIC TYPE:
 * 
 * From TopicSchema:
 * - creator: Schema.Types.ObjectId, ref: "User" → creator: User (when populated)
 * - title: String, required → title: string
 * - topic: String, required → topic: string
 * - htmltopic: String, required → htmltopic: string
 * - tag: String, required → tag: string
 * - theme: String (optional) → theme?: string
 * - createdOn: Date, required → createdOn: string
 * - likes: Array → likes: string[] (array of user IDs)
 * - dislikes: Array → dislikes: string[] (array of user IDs)
 * 
 * So Topic type would be:
 * 
 * export type Topic = {
 *   _id: string;
 *   creator: User;
 *   title: string;
 *   topic: string;
 *   htmltopic: string;
 *   tag: string;
 *   theme?: string;
 *   createdOn: string;
 *   likes: string[];
 *   dislikes: string[];
 * };
 * 
 * TIPS:
 * - Use `?` for optional fields (when required: false or not specified)
 * - When a field references another model (ref: "User"), use the populated type (User)
 * - Arrays of ObjectIds become string[] (user IDs)
 * - Dates from API responses are usually ISO strings, so use string
 * - If you need both populated and non-populated versions, create two types:
 *   - Comment (with creator: User)
 *   - CommentDocument (with creator: string)
 */
