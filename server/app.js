import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import http from 'http'

const startApolloServer = async (typeDefs, resolvers) => {

      const app = express();
      const httpServer = http.createServer(app);

      const server = new ApolloServer({
      
            typeDefs,
            resolvers
      
      });

      await server.start();

      app.use('/graphql', cors(), express.json(), expressMiddleware(server));

      await new Promise(resolve => httpServer.listen({ port : 4000 }, resolve));

      console.log('Server on port 4000'); 

};

export default startApolloServer;