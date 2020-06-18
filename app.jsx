import React, { Suspense, lazy } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './app.css';

const Mapa = lazy(() => import('./components/Pantalla'));
const Admin = lazy(() => import('./components/Admin'));

const routes = [
    {
        path: '/',
        exact: true,
        sidebar: 'Home',
        component: () => <Mapa/>,
    },
    {
        path: '/admin',
        sidebar: 'admin',
        component: () => <Admin/>,
    },
];

const NoMatch = ({location}) => (
    <div>
        <h3 style={{color: "#fff"}}>Pagina no encontrada! <code>{location.pathname}</code></h3>
    </div>
);

class Base extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Router>
                <main role="main">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            {routes.map((route, index) => (
                                <Route key={index} path={route.path} exact={route.exact}
                                       component={route.component}/>
                            ))}
                            <Route key={'404'} component={NoMatch}/>
                        </Switch>
                    </Suspense>
                </main>
            </Router>
        );
    }
}

render(<Base/>, document.getElementById('container'), () => {});
