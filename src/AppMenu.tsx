import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from './icons/MenuIcon';
import MenuOpenIcon from './icons/MenuOpenIcon';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    align-items: flex-start;

    svg {
        margin-top: -2px;
    }
`;

const PaddedContainer = styled.div`
    padding: 1em;
`;

const RouteLabel = styled(PaddedContainer)`
    color: hotpink;
    border: 1px dashed hotpink;
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

const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    /* display: none; */
`;

const routeMap = [
    { path: '/style-quiz', label: 'Style Quiz' },
    { path: '/bjcp-quiz', label: 'BJCP Quiz' },
    { path: '/formula-quiz', label: 'Recipe Formula Quiz' },
    { path: '/recipe-quiz', label: 'Recipe Quiz' },
    { path: '/style-recap', label: 'Style Recap' },
];

const AppMenu: React.FunctionComponent<{}> = () => {
    const [menuOpened, setMenuOpened] = React.useState(false);

    const toggleMenuOpened = () => {
        setMenuOpened(!menuOpened);
    };

    const pathname = useLocation().pathname;
    const routeLabel = routeMap.find((route) => pathname.includes(route.path))?.label;

    return (
        <Wrapper>
            <PaddedContainer onClick={toggleMenuOpened}>
                {!menuOpened && <MenuIcon />}
                {menuOpened && <MenuOpenIcon />}
            </PaddedContainer>
            {menuOpened && (
                <MenuList onClick={toggleMenuOpened}>
                    {routeMap.map(({ path, label }) => (
                        <StyleNavLink key={path} to={path}>
                            {label}
                        </StyleNavLink>
                    ))}
                </MenuList>
            )}
            {!menuOpened && (
                <RouteLabel>
                    <span>{routeLabel}</span>
                </RouteLabel>
            )}
        </Wrapper>
    );
};

export default AppMenu;
