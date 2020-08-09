import { Switch, Route, Redirect } from 'react-router';
import React from 'react';
import StyleQuiz from './modules/StyleQuiz/StyleQuiz';
import BJCPQuiz from './modules/BJCPQuiz/BJCPQuiz';
import RecipeFormulaQuiz from './modules/RecipeFormulaQuiz/RecipeFormulaQuiz';
import RecipeQuizRouter from './modules/RecipeQuiz/RecipeQuizRouter';
import StyleRecap from './modules/StyleRecap/StyleRecap';

const AppRouter: React.FunctionComponent<{}> = () => (
    <Switch>
        <Route path="/style-quiz" component={StyleQuiz} />
        <Route path="/bjcp-quiz" component={BJCPQuiz} />
        <Route path="/formula-quiz" component={RecipeFormulaQuiz} />
        <Route path="/recipe-quiz" component={RecipeQuizRouter} />
        <Route path="/style-recap" component={StyleRecap} />
        <Redirect to="/style-quiz" />
    </Switch>
);

export default AppRouter;
