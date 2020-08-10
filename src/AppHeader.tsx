import React from 'react';
import styled from 'styled-components';
import { AppContext } from './App';
import AppMenu from './AppMenu';
import { StyledControl } from './modules/RecipeQuiz/RecipeQuiz';

const StyledHeader = styled.div`
    padding: 1em 0;
    border-bottom: 1px dashed #555;
    display: inline-flex;
    justify-content: space-between;
`;

const RightControls = styled.div`
    margin-top: 4px;
`;

const AppHeader: React.FunctionComponent<{ className?: string; toggleRevealAll: () => void }> = ({
    className,
    toggleRevealAll,
}) => {
    const context = React.useContext(AppContext);

    return (
        <StyledHeader className={className}>
            <AppMenu />
            <RightControls>
                <label>
                    Reveal All
                    <StyledControl
                        as="input"
                        type="checkbox"
                        checked={context.revealAll}
                        onChange={toggleRevealAll}
                    ></StyledControl>
                </label>
            </RightControls>
        </StyledHeader>
    );
};

export default AppHeader;
