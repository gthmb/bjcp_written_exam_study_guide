import React from 'react';
import { AppContext } from '../../App';
import { QuizTable } from '../../components/QuizTable';
import { randomize } from '../../common/methods';
import { TogglableElement } from '../../components/TogglableElement';
import { Note } from '../../components/ValueRenderers';

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
                        <TogglableElement as="td">
                            {answer}
                            <Note as="div">{note}</Note>
                        </TogglableElement>
                    </tr>
                ))}
            </tbody>
        </QuizTable>
    );
};

export default RecipeFormulaQuiz;
