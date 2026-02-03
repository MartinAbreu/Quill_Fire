import { FormErrors } from "@/types";

type TopicContent = {
  title: string;
  topic: string;
  tag: string;
  theme: string;
};

type SignInContent = {
  username: string;
  password: string;
};

type SignUpContent = {
  username: string;
  password: string;
  email: string;
};

export function validateTopic(content: TopicContent): [boolean, FormErrors] {
  let valid = true;
  const errors: FormErrors = {};

  if (content.title.length === 0) {
      valid = false;
      errors.titleContent = true;
      errors.titleError = "Please add your title...";
  }
  
  if (content.topic.length === 0) {
      valid = false;
      errors.topicContent = true;
      errors.topicError = "Please create your topic...";
    }

    if (content.topic.length < 20) {
      valid = false;
      errors.topicContent = true;
      errors.topicError = "Please create a more descriptive topic...";
    }

    if (content.tag.length === 0) {
      valid = false;
      errors.tagContent = true;
      errors.tagError = "Please make some hashtags for your topic...";
    }

    if (content.theme.length === 0) {
      valid = false;
      errors.themeSelected = true;
      errors.themeError = "Please select the theme for your topic...";
    }
  
  return [valid, errors];
}

export function validateSignIn(content: SignInContent): [boolean, FormErrors] {
  let valid = true;
  let errors: FormErrors = {}

  if (content.username.length === 0) {
      valid = false;
      errors.usernameField = true;
      errors.usernameFieldError = "Please enter your username...";
    }
    if (content.password.length === 0) {
      valid = false;
      errors.passwordField = true;
      errors.passwordFieldError = "Please enter your password...";
    }
  
  return [valid, errors]
}

export function validateSignUp(content: SignUpContent): [boolean, FormErrors] {
  let valid = true;
  let errors: FormErrors = {};

  if (!/^[a-zA-Z0-9._]+$/.test(content.username)) {
      valid = false;
      errors.usernameField = true;
      errors.usernameFieldError =
        "Please no special characters or spaces in your username.";
    }
    if (content.username.length === 0) {
      valid = false;
      errors.usernameField = true;
      errors.usernameFieldError = "Please create a username";
    }
    if (content.username.length < 6) {
      valid = false;
      errors.usernameField = true;
      errors.usernameFieldError = "Your username must be at least 6 characters";
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])\S{8,}$/.test(
        content.password
      )
    ) {
      valid = false;
      errors.passwordField = true;
      errors.passwordFieldError =
        "The password must have at least one lowercase letter, one uppercase letter, one digit, and one special character with no spaces";
    }
    if (content.password.length === 0) {
      valid = false;
      errors.passwordField = true;
      errors.passwordFieldError = "Please create your password...";
    }
    if (content.password.length < 8) {
      valid = false;
      errors.passwordField = true;
      errors.passwordFieldError = "Password must be at least 8 characters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.email)) {
      valid = false;
      errors.emailField = true;
      errors.emailFieldError = "Please enter a valid email";
    }
  
  return [valid, errors]
}
