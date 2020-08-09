import React from 'react';
import { AppContext } from '../../App';
import { QuizTable } from '../../components/QuizTable';
import { randomize } from '../../common/methods';
import { TogglableElement } from '../../components/TogglableElement';

const BJCPQuiz: React.FunctionComponent<{}> = () => {
    const { bjcpQuestions } = React.useContext(AppContext);

    const randomized = React.useMemo(() => randomize(bjcpQuestions), [bjcpQuestions]);

    return (
        <QuizTable>
            <thead>
                <tr>
                    <th>Statement</th>
                    <th>Answer</th>
                </tr>
            </thead>
            <tbody>
                {randomized.map(({ id, question, answer }) => (
                    <tr key={id}>
                        <td>{question}</td>
                        <TogglableElement as="td">{answer ? 'True' : 'False'}</TogglableElement>
                    </tr>
                ))}
            </tbody>
        </QuizTable>
    );
};

export default BJCPQuiz;
