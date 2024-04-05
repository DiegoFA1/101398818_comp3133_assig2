import {gql} from 'apollo-angular'

const LOGIN = gql`query Login($usernameEmail: String!, $password: String!) {
    Login(username_email: $usernameEmail, password: $password) {
      id
      username
      email
      password
    }
  }`;

const SIGNUP = gql`mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      id
      username
      email
      password
    }
  }`;

export {LOGIN, SIGNUP}