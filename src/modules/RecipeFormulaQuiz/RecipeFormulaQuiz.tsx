import React from 'react';
import { AppContext } from '../../App';
import { QuizTable, TogglableTableData } from '../../components/QuizTable/QuizTable';
import { randomize } from '../../common/methods';
import styled from 'styled-components';

const Note = styled.div`
    color: orange;
`;

const RecipeFormulaQuiz: React.FunctionComponent<{}> = () => {
    const { formulaQuestions } = React.useContext(AppContext);

    const randomized = React.useMemo(() => randomize(formulaQuestions), [formulaQuestions]);

    return (
        <QuizTable>
            <thead>
                <tr>
                    <th>Statement</th>
                    <th>Answer</th>
                </tr>
            </thead>
            <tbody>
                {randomized.map(({ id, question, answer, note }) => (
                    <tr key={id}>
                        <td>{question}</td>
                        <TogglableTableData>
                            {answer}
                            <Note>{note}</Note>
                        </TogglableTableData>
                    </tr>
                ))}
            </tbody>
        </QuizTable>
    );
};

export default RecipeFormulaQuiz;
