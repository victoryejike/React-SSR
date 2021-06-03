import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './client/App';
import Html from './client/Html';

const app = express();
const port = 3000;

app.get('/', (req, res)=>{
    const sheet = new ServerStyleSheet() //creates stylesheet

    const body = renderToString(sheet.collectStyles(<App />)); //collects stylesheet
    const styleTags = sheet.getStyleTags() //gets all the tags in the html
    const title = `Server Side Rendered React Application`

    res.send(Html({ body, styleTags, title }))
})

app.listen(port);
console.log(`server running on ${port}`)