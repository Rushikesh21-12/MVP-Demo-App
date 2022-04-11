import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation authenticate($login: String!, $password: String!) {
    authenticate(login: $login, password: $password) {
        success
        token
        user {
            id
            role
            email
            firstname
        }
    }
  }
`;

export const CREATE_NEW_USER = gql`
mutation createNewUser(
  $role: String!
  $email: String!
  $password: String!
  $firstname: String!
  $surname: String!
  $phoneNumber: String!
) {
  createNewUser(
    email: $email
    password: $password
    firstname: $firstname
    surname: $surname
    phoneNumber: $phoneNumber
    role: $role
  ) {
    id
    firstname
    surname
    email
    password
    phoneNumber
    stripeCustomerID
  }
}
`;

