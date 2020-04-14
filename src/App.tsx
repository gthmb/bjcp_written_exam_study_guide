import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IStyle, IQuestion } from './Styles.interfaces';
import AppRouter from './AppRouter';
import { BrowserRouter, Route } from 'react-router-dom';
import AppHeader from './AppHeader';

interface IAppContext {
    styles: IStyle[];
    bjcpQuestions: IQuestion<boolean>[];
    formulaQuestions: IQuestion<string>[];
}

export const AppContext = React.createContext<IAppContext>({
    styles: [],
    bjcpQuestions: [],
    formulaQuestions: [],
});

const AppContainer = styled.div`
    min-height: 100vh;
    color: white;
    margin-bottom: 2em;
`;

const App: React.FunctionComponent<{}> = () => {
    const [styles, setStyles] = React.useState<IStyle[]>([]);
    const [bjcpQuestions, setBjcpQuestions] = React.useState<IQuestion<boolean>[]>([]);
    const [formulaQuestions, setFormulaQuestions] = React.useState<IQuestion<string>[]>([]);

    const fetchStyles = async () => {
        const data = await fetch('./data/gthmb_bjcp_styles.json');
        const styles = await data.json();
        const sorted = styles.sort((a: IStyle, b: IStyle) => {
            if (a.meta_style.id === b.meta_style.id) {
                return a.sub_style_id > b.sub_style_id ? 1 : -1;
            } else {
                return a.meta_style.id > b.meta_style.id ? 1 : -1;
            }
        });
        setStyles(sorted);
    };

    const fetchBJCPQuestions = async () => {
        const data = await fetch('./data/bjcp_ethics_levels_judging_process.json');
        const questions = await data.json();
        const sorted = questions.sort((a: IQuestion, b: IQuestion) => (a.id > b.id ? 1 : -1));
        setBjcpQuestions(sorted);
    };

    const fetchRecipeQuestions = async () => {
        const data = await fetch('./data/recipe_formulas.json');
        const questions = await data.json();
        const sorted = questions.sort((a: IQuestion, b: IQuestion) => (a.id > b.id ? 1 : -1));
        setFormulaQuestions(sorted);
    };

    useEffect(() => {
        fetchStyles();
        fetchBJCPQuestions();
        fetchRecipeQuestions();
    }, []);

    const context: IAppContext = { styles, bjcpQuestions, formulaQuestions };

    return (
        <AppContext.Provider value={context}>
            <BrowserRouter>
                <AppContainer>
                    <Route component={AppHeader} />
                    <AppRouter />
                </AppContainer>
            </BrowserRouter>
        </AppContext.Provider>
    );
};

export default App;
