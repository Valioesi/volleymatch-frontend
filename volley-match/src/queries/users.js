import gql from 'graphql-tag';


export const allUsersQuery = gql`
query AllUsersQuery {
    allUsers {
        id
        firstName
        lastName
    }
}
`