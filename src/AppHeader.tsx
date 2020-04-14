import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledHeader = styled.div`
    padding: 2em;
    border-bottom: 1px dotted #999;
`;

const StyleNavLink = styled(NavLink)`
    padding: 1em;

    color: white;

    &.active {
        color: hotpink;
        border: 1px dashed hotpink;
    }
`;

const AppHeader: React.FunctionComponent<RouteComponentProps> = (props) => {
    return (
        <StyledHeader>
            <StyleNavLink to={'./style-quiz'}>Style Quiz</StyleNavLink>
            <StyleNavLink to={'./bjcp-quiz'}>BJCP Quiz</StyleNavLink>
            <StyleNavLink to={'./formula-quiz'}>Recipe Formula Quiz</StyleNavLink>
        </StyledHeader>
    );
};

export default AppHeader;
