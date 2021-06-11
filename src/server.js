import express from 'express';
import React from 'react';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './client/App';
//import Html from './client/Html';
import serialize from 'serialize-javascript';
import { fetchPopularRepos } from './client/api';
import { matchPath, StaticRouter } from 'react-router-dom';
import routes from './client/routes';

const app = express();
app.use(cors());
app.use(express.static('dist'))

app.get('/', (req, res, next)=>{
    const sheet = new ServerStyleSheet() //creates stylesheet
        
    const activeRoute = routes.find(
        (route) => matchPath(req.url, route)
    ) || {}
    console.log(activeRoute)

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const body = renderToString(sheet.collectStyles(<StaticRouter location={req.url} context={{ data }}><App /></StaticRouter>)); //collects stylesheet
    const styleTags = sheet.getStyleTags() //gets all the tags in the html
    const title = `Server Side Rendered React Application`
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <script src="/bundle.js" defer></script>
          ${styleTags}
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${body}</div>
        </body>
      </html>
    `)
  }).catch(next)

    
})

const port = 3000;

app.listen(port);
console.log(`server running on ${port}`)