import express from 'express';
import React from 'react';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './client/App';
//import Html from './client/Html';
import serialize from 'serialize-javascript';
import { fetchPopularRepos } from './client/api';

const app = express();
app.use(cors());
app.use(express.static('dist'))

app.get('/', (req, res)=>{
    const name = 'Ejike'
    const sheet = new ServerStyleSheet() //creates stylesheet

    fetchPopularRepos()
    .then(data=>{
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
    })
    
    
})

const port = 3000;

app.listen(port);
console.log(`server running on ${port}`)