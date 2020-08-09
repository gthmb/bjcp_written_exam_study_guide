import { Switch, Route, Redirect } from 'react-router';
import React from 'react';
import RecipeQuiz from './RecipeQuiz';

const RecipeQuizRouter: React.FunctionComponent<{}> = () => (
    <Switch>
        <Route path="/recipe-quiz/style/:recipeId" exact component={RecipeQuiz} />
        <Redirect to="/recipe-quiz/style/1" />
    </Switch>
);

export default RecipeQuizRouter;
