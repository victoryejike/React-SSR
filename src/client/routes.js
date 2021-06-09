import Home from './Home';
import Grid from './grid';
import { fetchPopularRepos } from './api';

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/popular/:id',
        component: Grid,
        fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
        
    }
]

export default routes;