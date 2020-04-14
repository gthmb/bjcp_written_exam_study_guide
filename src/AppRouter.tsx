import { Switch, Route, Redirect } from 'react-router';
import React from 'react';
import StyleQuiz from './modules/StyleQuiz/StyleQuiz';
import BJCPQuiz from './modules/BJCPQuiz/BJCPQuiz';
import RecipeFormulaQuiz from './modules/RecipeFormulaQuiz/RecipeFormulaQuiz';

const AppRouter: React.FunctionComponent<{}> = () => (
    <Switch>
        <Route path="/style-quiz" component={StyleQuiz} />
        <Route path="/bjcp-quiz" component={BJCPQuiz} />
        <Route path="/formula-quiz" component={RecipeFormulaQuiz} />
        <Redirect to="/style-quiz" />
    </Switch>
);

export default AppRouter;
