import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Session from './pages/Session/';
import Main from './pages/Main/';
import Dashboard from './pages/Dashboard/';
import Curses from './pages/Curses/';
import NewCurse from './pages/NewCurse/';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/session" component={Session} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/curses" component={Curses} />
                <Route path="/newcurse" component={NewCurse} />
            </Switch>
        </BrowserRouter>
    );
}