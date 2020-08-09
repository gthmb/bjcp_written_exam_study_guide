import styled from 'styled-components';
import React from 'react';
import { AppContext } from '../App';

export enum ViewState {
    Hidden = 'hidden',
    Visible = 'visible',
    Error = 'error',
    ErrorHidden = 'error-hidden',
}

const ViewStateOrder: ViewState[] = [
    ViewState.Hidden,
    ViewState.Visible,
    ViewState.Error,
    ViewState.ErrorHidden,
];

const ToggleContainer = styled.div<IToggable>`
    display: ${({ enabled }) => (enabled ? '' : 'none')};
    border: 1px dashed rgba(0, 0, 0, 0);

    :hover {
        border-color: #555;
    }

    cursor: pointer;

    &.hidden {
        opacity: 0;
        user-select: none;
    }

    &.is-visible {
        opacity: 1;
    }

    &.error {
        opacity: 1;
        background-color: #970000 !important;
    }

    &.error-hidden {
        opacity: 1;
        color: #970000;
        background-color: #970000;
        user-select: none;

        > div,
        span {
            color: #970000 !important;
        }
    }
`;

interface IToggable {
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    enabled?: boolean;
    className?: string;
    states?: ViewState[];
}

export const TogglableElement: React.FunctionComponent<IToggable> = ({
    as,
    children,
    enabled,
    className,
    states,
}) => {
    const stateCycle = states || ViewStateOrder;

    const [viewState, setViewState] = React.useState(stateCycle[0]);

    const isEnabled = enabled !== false;

    const { revealAll } = React.useContext(AppContext);

    const handleClick = () => {
        if (revealAll) return;
        setViewState(stateCycle[(stateCycle.indexOf(viewState) + 1) % stateCycle.length]);
    };

    return (
        <ToggleContainer
            as={as}
            onClick={handleClick}
            enabled={isEnabled}
            className={`toggle-container ${className || ''} ${viewState}`}
        >
            {children}
        </ToggleContainer>
    );
};

TogglableElement.defaultProps = {
    as: 'span',
};
