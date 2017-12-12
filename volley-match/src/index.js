import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjajyrp002co30158mf9l9c60' });

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
