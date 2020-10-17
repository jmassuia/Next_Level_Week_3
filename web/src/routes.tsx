import React from 'react';

import {BrowserRouter as Router, Switch, Route }  from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';


export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path="/" component={Landing} exact/>
                <Route path="/map" component={OrphanagesMap}/>
                <Route path="/orphanage/:id" component={Orphanage}/>
                <Route path="/newOrphanage" component={CreateOrphanage}/>
            </Switch>
        </Router>
    )
}