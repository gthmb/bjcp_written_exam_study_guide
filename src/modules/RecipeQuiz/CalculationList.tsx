import React from 'react';
import styled from 'styled-components';
import { Note } from '../../components/ValueRenderers';

export type CalculationData = {
    title: string;
    steps: React.ReactChild[];
}[];

const OrderedList = styled.ol`
    display: grid;
    grid-gap: 1em 3em;
    grid-template-rows: auto auto;
    grid-auto-flow: column;

    ul {
        padding: 0;
        margin: 1em 0;
    }

    ul li {
        list-style: none;
        line-height: 2em;
    }

    @media (max-width: 768px) {
        grid-template-rows: unset;
        grid-auto-flow: row;
        grid-template-columns: auto;
    }
`;

const CalculationList: React.FunctionComponent<{ list: CalculationData }> = ({ list }) => (
    <OrderedList>
        {list.map((calc, index) => (
            <li key={index}>
                {calc.title}
                <Note as="code">
                    <ul>
                        {calc.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </Note>
            </li>
        ))}
    </OrderedList>
);
export default CalculationList;
