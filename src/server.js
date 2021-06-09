import express from 'express';
import React from 'react';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './client/App';
//import Html from './client/Html';
import serialize from 'serialize-javascript';
import { fetchPopularRepos } from './client/api';
import { matchPath } from 'react-router-dom';
import routes from './client/routes';

const app = express();
app.use(cors());
app.use(express.static('dist'))

app.get('/', (req, res)=>{
    const sheet = new ServerStyleSheet() //creates stylesheet
    const activeRoute = routes.find(route=>(matchPath(req.url, route))) || {}
    console.log(activeRoute)

    const promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve()

    promise.then(data=>{
        console.log(data)
        const body = renderToString(sheet.collectStyles(<App data={data} />)); //collects stylesheet
        const styleTags = sheet.getStyleTags() //gets all the tags in the html
        const title = `Server Side Rendered React Application`

        res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>
                ${styleTags}
                <script src="/bundle.js" defer></script>
            </head>
            <body style='margin: 0'>
                <div id='root'>${body}</div>

                <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
            </body>
        </html>`
        )
    }).catch(err=>console.warn(err))
    
})

const port = 3000;

app.listen(port);
console.log(`server running on ${port}`)