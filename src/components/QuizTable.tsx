import styled from 'styled-components';
import React from 'react';

const TableWrapper = styled.div`
    overflow: scroll;
    width: calc(100% - 2px);
    border: 1px dashed hotpink;
`;

const QuizTableWrapper = styled(TableWrapper)`
    position: absolute;
    max-height: calc(100% - 2px);
`;

const Table = styled.table`
    border-collapse: separate;
    width: 100%;

    td,
    th {
        max-width: 500px;
        margin-right: 0.5em;
        min-width: 120px;
        padding: 1em;
        text-align: center;
    }

    thead tr th {
        border-bottom: 1px dashed hotpink;
    }

    th {
        background-color: #282c34;
    }
`;

const TableSticky = styled(Table)`
    th {
        position: sticky;
        top: 0;
        z-index: 10;
    }

    th:first-child,
    td:first-child {
        text-align: left;
    }

    td:first-child,
    th:first-child {
        left: 0;
        position: sticky;
        z-index: 20;
        border-right: 1px dashed hotpink;
        background-color: #282c34;
    }

    tr > th:first-child {
        z-index: 100;
    }
`;

export const QuizTable: React.FunctionComponent = ({ children }) => (
    <QuizTableWrapper>
        <TableSticky>{children}</TableSticky>
    </QuizTableWrapper>
);

export const StyledTable: React.FunctionComponent = ({ children }) => (
    <TableWrapper>
        <Table>{children}</Table>
    </TableWrapper>
);

export const StickyTable: React.FunctionComponent = ({ children }) => (
    <TableWrapper>
        <TableSticky>{children}</TableSticky>
    </TableWrapper>
);
