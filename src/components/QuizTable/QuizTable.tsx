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
    border-collapse: separate;
    border-spacing: 0 1em;

    width: 100%;

    td,
    th {
        max-width: 500px;
    }

    th {
        position: sticky;
        top: 0;
        background-color: #282c34;
    }

    th:first-child {
        text-align: left;
    }

    td:not(:first-child) {
        text-align: center;
    }
`;

const viewClassOrder = [ViewClass.Hidden, ViewClass.Visible, ViewClass.Error];

const ViewClassWrapper = styled.div<{ viewclass: ViewClass }>`
    padding: 1em;

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

const ToggleContainer = styled.td<{ enabled: boolean }>`
    display: ${({ enabled }) => (enabled ? '' : 'none')};
    border: 1px dashed #555;
    cursor: pointer;
    margin: 15em;
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
