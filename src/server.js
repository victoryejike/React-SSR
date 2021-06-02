import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './client/App';
import Html from './client/Html';

const app = express();
const port = 3000;

app.get('/', (req, res)=>{
    const body = renderToString(<App />)
    const title = `Server Side Rendered React Application`

    res.send(Html({ body, title }))
})

app.listen(port);
console.log(`server running on ${port}`)