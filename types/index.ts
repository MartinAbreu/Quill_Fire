
export type User = {
  _id: string;
  email: string;
  username: string;
  favColor?: string;
  image?: string;
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

export type FormTopic = {
  title: string,
  topic: string,
  htmltopic: string,
  tag: string,
  theme?: string,
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
  emailFieldError?: string,
  invalidCreds?: boolean,
  invalidCredsError?: string,
}
