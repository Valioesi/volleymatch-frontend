import gql from 'graphql-tag';


export const allGamesQuery = gql`
    query AllGamesQuery ($resultFilter: GameResultFilter) {
        allGames(filter: {
            result: $resultFilter
        }){
            id
            time
            team1{
                id
                firstName
                lastName
            }
            team2{
                id
                firstName
                lastName
            }
            result {
                winnersScore
                losersScore
                team1Won
            }
        }
    }
`;

export const allGamesOfUserQuery = gql`
query AllGamesOfUserQuery ($resultFilter: GameResultFilter){
    allGames(filter: {AND: [{OR: [
        {
          team1_some: {
            id: "cjajzpx12qch20146fx420bky"
          }
        },
        {
          team2_some: {
            id: "cjajzpx12qch20146fx420bky"
          }
        }
      ],
      }, 
        {
            result: $resultFilter
        }
      ]}) {
        id
        time
        team1{
            id
            firstName
            lastName
        }
        team2{
            id
            firstName
            lastName
        }
        result {
            winnersScore
            losersScore
            team1Won
        }
    }
}
`;




export const createGameMutation = gql`
mutation CreateGameMutation($time: String!, $team1: [ID!]!, $team2: [ID!]!) {
    createGame (
        time: $time,
        team1Ids: $team1,
        team2Ids: $team2
    ) {
        id
        time
        team1 {
            id
        }
        team2 {
            id
        }
    }
} 
`;


export const createGameResultMutation = gql`
mutation CreateGameResultMutation($gameId: ID!, $winners: [ID!]!, $losers: [ID!], $winnersScore: Int!, $losersScore: Int!, $team1Won: Boolean!) {
    createGameResult (
        gameId: $gameId,
        winnersIds: $winners,
        losersIds: $losers,
        winnersScore: $winnersScore,
        losersScore: $losersScore,
        team1Won: $team1Won
    ) {
        winners {
            firstName
        }
        losers {
            firstName
        }
    }
} 
`;