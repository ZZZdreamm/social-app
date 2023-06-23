export let serverURL = 'https://cacarrot-server.herokuapp.com/social'
export let socketURL = 'https://cacarrot-server.herokuapp.com/'
export const localServerURL = 'http://localhost:5000/social'
export const localSocketURL = 'http://localhost:5000/'

if (process.env.NODE_ENV == `development`){
    serverURL = localServerURL
    socketURL = localSocketURL
}