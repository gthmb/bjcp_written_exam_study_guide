import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IStyle, IQuestion, IRecipe } from './Styles.interfaces';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from './AppHeader';

interface IAppContext {
    styles: IStyle[];
    bjcpQuestions: IQuestion<boolean>[];
    formulaQuestions: IQuestion<string>[];
    recipes: IRecipe[];
    revealAll: boolean;
}

export const AppContext = React.createContext<IAppContext>({
    styles: [],
    bjcpQuestions: [],
    formulaQuestions: [],
    recipes: [],
    revealAll: false,
});

const AppContainer = styled.div`
    height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
`;

const StyledAppHeader = styled(AppHeader)`
    flex: 0 1 auto;
`;

const StyledPageContent = styled.div`
    flex: 1 1 0;
    /* this breaks sticky header on the style-recap page
    height: 0;
    position: relative;
    */
`;

const App: React.FunctionComponent<{}> = () => {
    const [styles, setStyles] = React.useState<IStyle[]>([]);
    const [bjcpQuestions, setBjcpQuestions] = React.useState<IQuestion<boolean>[]>([]);
    const [formulaQuestions, setFormulaQuestions] = React.useState<IQuestion<string>[]>([]);
    const [recipes, setRecipes] = React.useState<IRecipe[]>([]);

    const fetchStyles = async () => {
        const data = await fetch('/data/gthmb_bjcp_styles.json');
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
        const data = await fetch('/data/bjcp_ethics_levels_judging_process.json');
        const questions = await data.json();
        const sorted = questions.sort((a: IQuestion, b: IQuestion) => (a.id > b.id ? 1 : -1));
        setBjcpQuestions(sorted);
    };

    const fetchRecipeQuestions = async () => {
        const data = await fetch('/data/recipe_formulas.json');
        const questions = await data.json();
        const sorted = questions.sort((a: IQuestion, b: IQuestion) => (a.id > b.id ? 1 : -1));
        setFormulaQuestions(sorted);
    };

    const fetchRecipes = async () => {
        const data = await fetch('/data/recipes.json');
        const recipes = await data.json();
        setRecipes(recipes);
    };

    useEffect(() => {
        fetchStyles();
        fetchBJCPQuestions();
        fetchRecipeQuestions();
        fetchRecipes();
    }, []);

    const [revealAll, setRevealAll] = React.useState<boolean>(false);

    const handleToggleRevealAll = () => {
        const reveal = !revealAll;
        document.body.classList[reveal ? 'add' : 'remove']('reveal-all-toggles');
        setRevealAll(reveal);
    };

    return (
        <AppContext.Provider
            value={{ styles, bjcpQuestions, formulaQuestions, recipes, revealAll }}
        >
            <BrowserRouter>
                <AppContainer>
                    <StyledAppHeader toggleRevealAll={handleToggleRevealAll} />
                    <StyledPageContent>
                        <AppRouter />
                    </StyledPageContent>
                </AppContainer>
            </BrowserRouter>
        </AppContext.Provider>
    );
};

export default App;
