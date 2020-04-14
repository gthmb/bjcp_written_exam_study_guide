import { AppContext } from '../../App';
import React from 'react';
import styled from 'styled-components';
import { TogglableTableData, QuizTable } from '../../components/QuizTable/QuizTable';
import { randomize } from '../../common/methods';

enum QuizColumn {
    CommercialExample = 'CommercialExample',
    Gravity = 'Gravity',
    Color = 'Color',
    IBUs = 'IBUs',
}

interface IEnabledColumns {
    [QuizColumn.CommercialExample]: boolean;
    [QuizColumn.Gravity]: boolean;
    [QuizColumn.Color]: boolean;
    [QuizColumn.IBUs]: boolean;
}

const HideableTableHeader = styled.th<{ enabled: boolean }>`
    display: ${({ enabled }) => (enabled ? '' : 'none')};
`;

const ColumSelector = styled.div`
    margin: 1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > label {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 1em;

        > input {
            margin-right: 0.5em;
        }
    }
`;

const StyleQuiz: React.FunctionComponent<{}> = () => {
    const { styles } = React.useContext(AppContext);

    const randomized = React.useMemo(() => randomize(styles), [styles]);

    const [columns, setColumns] = React.useState<IEnabledColumns>({
        CommercialExample: true,
        Gravity: false,
        Color: false,
        IBUs: false,
    });

    const toggleColumns = (column: QuizColumn) => () => {
        setColumns({
            ...columns,
            [column]: !columns[column],
        });
    };

    return (
        <>
            <ColumSelector>
                <label>
                    <input
                        type="checkbox"
                        onClick={toggleColumns(QuizColumn.CommercialExample)}
                        checked={columns.CommercialExample}
                        readOnly
                    />
                    Commercial Examples
                </label>
                <label>
                    <input
                        type="checkbox"
                        onClick={toggleColumns(QuizColumn.Gravity)}
                        checked={columns.Gravity}
                        readOnly
                    />
                    Gravity
                </label>
                <label>
                    <input
                        type="checkbox"
                        onClick={toggleColumns(QuizColumn.Color)}
                        checked={columns.Color}
                        readOnly
                    />
                    Color
                </label>
                <label>
                    <input
                        type="checkbox"
                        onClick={toggleColumns(QuizColumn.IBUs)}
                        checked={columns.IBUs}
                        readOnly
                    />
                    IBUs
                </label>
            </ColumSelector>
            <QuizTable>
                <thead>
                    <tr>
                        <th>Style</th>
                        <HideableTableHeader enabled={columns.CommercialExample}>
                            Commercial Example
                        </HideableTableHeader>
                        <HideableTableHeader enabled={columns.Gravity}>
                            Original Gravity
                        </HideableTableHeader>
                        <HideableTableHeader enabled={columns.Gravity}>
                            Final Gravity
                        </HideableTableHeader>
                        <HideableTableHeader enabled={columns.Color}>Color</HideableTableHeader>
                        <HideableTableHeader enabled={columns.IBUs}>IBUs</HideableTableHeader>
                    </tr>
                </thead>
                <tbody>
                    {randomized.map((style) => (
                        <tr key={style.id}>
                            <td>
                                {style.meta_style.id}
                                {style.sub_style_id}. {style.name}
                            </td>
                            <TogglableTableData enabled={columns.CommercialExample}>
                                {style.commercial_examples.find((ex) => ex.selected)?.name}
                            </TogglableTableData>
                            <TogglableTableData enabled={columns.Gravity}>
                                {style.og_start} - {style.og_end}
                            </TogglableTableData>
                            <TogglableTableData enabled={columns.Gravity}>
                                {style.fg_start} - {style.fg_end}
                            </TogglableTableData>
                            <TogglableTableData enabled={columns.Color}>
                                {style.srm_start} - {style.srm_end}
                            </TogglableTableData>
                            <TogglableTableData enabled={columns.IBUs}>
                                {style.ibu_start} - {style.ibu_end}
                            </TogglableTableData>
                        </tr>
                    ))}
                </tbody>
            </QuizTable>
        </>
    );
};

export default StyleQuiz;
