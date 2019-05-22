import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import MainPage from '@components/pages/MainPage';
import PageNotFound from '@components/specials/PageNotFound';
import AboutPage from '@components/pages/AboutPage';
import AnimalsInfoPage from '@components/pages/AnimalsInfoPage';
import EventsInfoPage from '@components/pages/EventsInfoPage';
import AnimalsAdoptionPage from '@components/pages/AnimalsAdoptionPage';


export default class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={MainPage}/>
                <Route exact path='/about' component={AboutPage}/>
                <Route exact path='/events' component={EventsInfoPage}/>
                <Route exact path='/animals' component={AnimalsInfoPage}/>
                <Route exact path='/animals/adoption' component={AnimalsAdoptionPage}/>
                <Route component={PageNotFound}/>
            </Switch>
        );
    }
}