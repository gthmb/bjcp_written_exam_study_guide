import React from 'react';
import { AppContext } from '../../App';
import { QuizTable, TogglableTableData } from '../../components/QuizTable/QuizTable';
import { randomize } from '../../common/methods';

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
                        <TogglableTableData>{answer ? 'True' : 'False'}</TogglableTableData>
                    </tr>
                ))}
            </tbody>
        </QuizTable>
    );
};

export default BJCPQuiz;
