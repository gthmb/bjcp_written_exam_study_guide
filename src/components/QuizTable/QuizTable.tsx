import styled from 'styled-components';
import React from 'react';

enum ViewClass {
    Hidden = 'hidden',
    Visible = 'visible',
    Error = 'error',
    ErrorHidden = 'error-hidden',
}

const viewClassOrder = [
    ViewClass.Hidden,
    ViewClass.Visible,
    ViewClass.Error,
    ViewClass.ErrorHidden,
];

const TableWrapper = styled.div`
    border: 1px dashed hotpink;
    overflow: scroll;
    height: 100%;
`;

const StyledTable = styled.table`
    border-collapse: separate;
    border-spacing: 0 0;
    width: 100%;
    td,
    th {
        max-width: 500px;
        margin-right: 0.5em;
        min-width: 120px;
        padding: 1em;
    }

    th {
        position: sticky;
        top: 0;
        background-color: #282c34;
        z-index: 10;
        border-bottom: 1px dashed hotpink;
    }

    th:first-child {
        text-align: left;
    }

    td:not(:first-child) {
        text-align: center;
    }

    td:first-child,
    th:first-child {
        border-right: 1px dashed hotpink;
        background-color: #282c34;
        left: 0;
        position: sticky;
        z-index: 20;
    }

    tr > th:first-child {
        z-index: 100;
    }
`;

const ViewClassWrapper = styled.div<{ viewclass: ViewClass }>`
    padding: 1em;

    ${({ viewclass }) => {
        if (viewclass === ViewClass.Hidden) {
            return `opacity: 0.0`;
        } else if (viewclass === ViewClass.Visible) {
            return `opacity: 1.0`;
        } else if (viewclass === ViewClass.Error) {
            return `
                user-select: none;
                visibility: 1.0;
                background-color: #970000;
            `;
        } else if (viewclass === ViewClass.ErrorHidden) {
            return `
                user-select: none;
                visibility: 1.0;
                color: #970000;
                background-color: #970000;
            `;
        }
    }}
`;

const ToggleContainer = styled.td<{ enabled: boolean }>`
    display: ${({ enabled }) => (enabled ? '' : 'none')};
    border: 1px dashed rgba(0, 0, 0, 0);

    :hover {
        border-color: #555;
    }

    cursor: pointer;
`;

export const TogglableTableData: React.FunctionComponent<{ enabled?: boolean }> = ({
    children,
    enabled,
}) => {
    const [viewClass, setViewClass] = React.useState(ViewClass.Hidden);

    const isEnabled = enabled !== false;

    const handleClick = () => {
        setViewClass(
            viewClassOrder[(viewClassOrder.indexOf(viewClass) + 1) % viewClassOrder.length]
        );
    };

    return (
        <ToggleContainer onClick={handleClick} enabled={isEnabled}>
            <ViewClassWrapper viewclass={viewClass}>{children}</ViewClassWrapper>
        </ToggleContainer>
    );
};

export const QuizTable: React.FunctionComponent = ({ children }) => (
    <TableWrapper>
        <StyledTable>{children}</StyledTable>
    </TableWrapper>
);
