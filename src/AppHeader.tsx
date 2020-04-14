import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledHeader = styled.div`
    padding: 2em;
    border-bottom: 1px dashed #555;
    display: inline-flex;
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

const AppHeader: React.FunctionComponent<{ className?: string }> = (props) => {
    return (
        <StyledHeader className={props.className}>
            <StyleNavLink to={'./style-quiz'}>Style Quiz</StyleNavLink>
            <StyleNavLink to={'./bjcp-quiz'}>BJCP Quiz</StyleNavLink>
            <StyleNavLink to={'./formula-quiz'}>Recipe Formula Quiz</StyleNavLink>
        </StyledHeader>
    );
};

export default AppHeader;
