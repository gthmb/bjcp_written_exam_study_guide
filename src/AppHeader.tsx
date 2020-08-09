import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { AppContext } from './App';
import { StyledControl } from './modules/RecipeQuiz/RecipeQuiz';

const StyledHeader = styled.div`
    padding: 2em;
    border-bottom: 1px dashed #555;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
`;

const StyleNavLink = styled(NavLink)`
    padding: 1em;

    color: white;

    text-decoration: none;

    &.active {
        color: hotpink;
        border: 1px dashed hotpink;
    }
`;

const AppHeader: React.FunctionComponent<{ className?: string; toggleRevealAll: () => void }> = ({
    className,
    toggleRevealAll,
}) => {
    const context = React.useContext(AppContext);

    return (
        <StyledHeader className={className}>
            <div>
                <StyleNavLink to={'/style-quiz'}>Style Quiz</StyleNavLink>
                <StyleNavLink to={'/bjcp-quiz'}>BJCP Quiz</StyleNavLink>
                <StyleNavLink to={'/formula-quiz'}>Recipe Formula Quiz</StyleNavLink>
                <StyleNavLink to={'/recipe-quiz'}>Recipe Quiz</StyleNavLink>
                <StyleNavLink to={'/style-recap'}>Style Recap</StyleNavLink>
            </div>
            <div>
                <label>
                    Reveal All
                    <StyledControl
                        as="input"
                        type="checkbox"
                        checked={context.revealAll}
                        onChange={toggleRevealAll}
                    ></StyledControl>
                </label>
            </div>
        </StyledHeader>
    );
};

export default AppHeader;
