import styled from 'styled-components';
import React from 'react';

enum ViewClass {
    Hidden = 'hidden',
    Visible = 'visible',
    Error = 'error',
}

const TableWrapper = styled.div`
    display: flex;
    flex-direction: table-row;
    justify-content: center;
`;

const StyledTable = styled.table`
    padding: 2em;
    border: 1px dashed hotpink;

    width: 100%;

    td,
    th {
        padding: 1em;
        max-width: 500px;
    }

    th {
        position: sticky;
        top: 0;
        background-color: #282c34;
    }

    td:not(:first-child) {
        text-align: center;
    }
`;

const viewClassOrder = [ViewClass.Hidden, ViewClass.Visible, ViewClass.Error];

const ViewClassWrapper = styled.td<{ viewclass: ViewClass; enabled: boolean }>`
    cursor: pointer;
    user-select: none;

    display: ${({ enabled }) => (enabled ? '' : 'none')};

    ${({ viewclass }) => {
        if (viewclass === ViewClass.Hidden) {
            return `opacity: 0.0`;
        } else if (viewclass === ViewClass.Visible) {
            return `opacity: 1.0`;
        } else if (viewclass === ViewClass.Error) {
            return `
                visibility: 1.0;
                background-color: rgba(225, 0, 0, 0.7);
            `;
        }
    }}
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
        <ViewClassWrapper viewclass={viewClass} onClick={handleClick} enabled={isEnabled}>
            {children}
        </ViewClassWrapper>
    );
};

export const QuizTable: React.FunctionComponent = ({ children }) => (
    <TableWrapper>
        <StyledTable>{children}</StyledTable>
    </TableWrapper>
);
