import { Switch, Route, Redirect } from 'react-router';
import React, { Suspense } from 'react';

const StyleQuiz = React.lazy(() => import('./modules/StyleQuiz/StyleQuiz'));
const BJCPQuiz = React.lazy(() => import('./modules/BJCPQuiz/BJCPQuiz'));
const RecipeFormulaQuiz = React.lazy(() => import('./modules/RecipeFormulaQuiz/RecipeFormulaQuiz'));
const RecipeQuizRouter = React.lazy(() => import('./modules/RecipeQuiz/RecipeQuizRouter'));
const StyleRecap = React.lazy(() => import('./modules/StyleRecap/StyleRecap'));

const AppRouter: React.FunctionComponent<{}> = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            <Route path="/style-quiz" component={StyleQuiz} />
            <Route path="/bjcp-quiz" component={BJCPQuiz} />
            <Route path="/formula-quiz" component={RecipeFormulaQuiz} />
            <Route path="/recipe-quiz" component={RecipeQuizRouter} />
            <Route path="/style-recap" component={StyleRecap} />
            <Redirect to="/style-quiz" />
        </Switch>
    </Suspense>
);

export default AppRouter;
