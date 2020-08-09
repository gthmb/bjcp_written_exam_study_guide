import React from 'react';
import { AppContext } from '../../App';
import styled from 'styled-components';
import { StyledControl } from '../RecipeQuiz/RecipeQuiz';

const CardList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    @media (max-width: 1480px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 1020px) {
        grid-template-columns: 1fr;
    }
`;

const StyleCard = styled.div`
    padding: 1em;
    margin: 1em;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);

    .stats {
        display: flex;
        flex-direction: row;

        > span {
            margin-right: 1em;
        }
    }

    h3 {
        color: #4fc3f7;
    }

    h4 {
        color: orange;
    }

    &.even h3 {
        color: hotpink;
    }
`;

const Controls = styled.div`
    padding: 1em;
    position: sticky;
    top: 0;
    width: 100%;
    background-color: #282c34;

    > label {
        margin-right: 2em;
    }
`;

const StyleRecap: React.FunctionComponent<{}> = () => {
    const { styles } = React.useContext(AppContext);
    let metaId = 1;
    let odd = true;

    const [enabledSections, setEnabledSections] = React.useState<{ [key: string]: boolean }>({
        impression: true,
        history: true,
        comparison: true,
    });

    const toggleSections = (section: string) => () => {
        setEnabledSections({
            ...enabledSections,
            [section]: !enabledSections[section],
        });
    };

    const [anchor, setAnchor] = React.useState('');

    const handleStyleSelect = ({
        currentTarget: { value },
    }: React.FormEvent<HTMLSelectElement>) => {
        setAnchor(value);
        window.location.href = `/style-recap/#/${value}`;
    };

    return (
        <>
            <Controls>
                <StyledControl as="select" onChange={handleStyleSelect} value={anchor}>
                    {styles.map((style) => (
                        <option
                            key={style.id}
                            value={`${style.meta_style.id}-${style.sub_style_id}`}
                        >
                            {style.meta_style.id}
                            {style.sub_style_id} {style.name}
                        </option>
                    ))}
                </StyledControl>

                <label>
                    <input
                        type="checkbox"
                        onClick={toggleSections('impression')}
                        checked={enabledSections.impression}
                        readOnly
                    />
                    Overall Impression
                </label>
                <label>
                    <input
                        type="checkbox"
                        onClick={toggleSections('history')}
                        checked={enabledSections.history}
                        readOnly
                    />
                    History
                </label>
                <label>
                    <input
                        type="checkbox"
                        onClick={toggleSections('comparison')}
                        checked={enabledSections.comparison}
                        readOnly
                    />
                    Comparison
                </label>
            </Controls>
            <CardList>
                {styles?.length &&
                    styles.map((style) => {
                        odd = style.meta_style.id !== metaId ? !odd : odd;
                        metaId = style.meta_style.id;

                        const id = `/${style.meta_style.id}-${style.sub_style_id}`;
                        return (
                            <StyleCard key={id} id={id} className={odd ? 'odd' : 'even'}>
                                <h3>
                                    {style.meta_style.id}
                                    {style.sub_style_id} {style.name}
                                </h3>
                                <div className="stats">
                                    <span>
                                        OG: {style.og_start} - {style.og_end}
                                    </span>
                                    <span>
                                        FG: {style.fg_start} - {style.fg_end}
                                    </span>
                                    <span>
                                        IBU: {style.ibu_start} - {style.ibu_end}
                                    </span>
                                    <span>
                                        SRM: {style.srm_start} - {style.srm_end}
                                    </span>
                                </div>
                                {enabledSections.impression && (
                                    <div>
                                        <h4>Overall Impression</h4>
                                        <p>{style.impression_description}</p>
                                    </div>
                                )}
                                {enabledSections.history && (
                                    <div>
                                        <h4>History</h4>
                                        <p>{style.history_description}</p>
                                    </div>
                                )}
                                {enabledSections.comparison && (
                                    <div>
                                        <h4>Comparison</h4>
                                        <p>{style.comparison_description}</p>
                                    </div>
                                )}
                            </StyleCard>
                        );
                    })}
            </CardList>
        </>
    );
};

export default StyleRecap;
