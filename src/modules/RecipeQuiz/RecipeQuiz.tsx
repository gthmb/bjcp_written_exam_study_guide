import React from 'react';
import { AppContext } from '../../App';
import styled from 'styled-components';
import { GravityRenderer, Note } from '../../components/ValueRenderers';
import { TogglableElement } from '../../components/TogglableElement';
import { StyledTable, StickyTable } from '../../components/QuizTable';
import CalculationList from './CalculationList';
import CollapsableContainer from '../../components/CollapsableContainer';
import { getRecipeValues, getRecipeCalculations } from './RecipeQuiz.methods';
import { IStatefulHopItem } from '../../Styles.interfaces';
import { RouteComponentProps } from 'react-router';

const Controls = styled.div`
    padding: 1em;
    border-bottom: 1px dashed #555;
`;

const RecipeContainer = styled.div`
    padding: 1em;
`;

const DashedWrapper = styled.div`
    border: 1px dashed hotpink;
    p {
        margin: 0;
        padding: 1em;
    }
`;

export const StyledControl = styled.select`
    padding: 0.5em;
    margin: 1em;
    background: #282c34;
    color: #4fc3f7;
    border: none;
    border-bottom: 1px solid #4fc3f7;
    min-width: 50px;
`;

const RecipeQuiz: React.FunctionComponent<RouteComponentProps<{ recipeId: string }>> = (props) => {
    console.log(props);

    const { recipes, styles } = React.useContext(AppContext);

    const [recipeId] = React.useState(Number(props.match.params.recipeId));

    const [batchSize, setBatchSize] = React.useState(5.5);

    const [efficiency] = React.useState(0.75);

    const handleRecipeSelect = (evt: React.FormEvent<HTMLSelectElement>) => {
        window.location.href = `/recipe-quiz/style/${evt.currentTarget.value}`;
    };

    const handleBatchSizeChanged = (evt: React.FormEvent<HTMLInputElement>) => {
        setBatchSize(Number(evt.currentTarget.value));
    };

    const recipe = recipes.find((r) => r.id === recipeId);

    const style = styles.find(
        (style) =>
            style.meta_style.id === recipe?.style.id &&
            style.sub_style_id === recipe.style.sub_style_id
    );

    const recipeValues = getRecipeValues(recipe, batchSize, efficiency);
    const recipeCalculations = getRecipeCalculations(recipeValues, batchSize, efficiency);

    const formatHopWhen = (item: IStatefulHopItem): string => {
        const str =
            {
                boil: `${item.time} min boil`,
                'dry-hop': `${item.time} day dry hop`,
            }[item.stage] || String(item.time);

        return str;
    };

    return (
        <>
            <Controls>
                <label>
                    Style
                    <StyledControl as="select" onChange={handleRecipeSelect} value={recipeId}>
                        {recipes.map((recipe) => (
                            <option key={recipe.id} value={recipe.id}>
                                {recipe.style.name} ({recipe.style.id}
                                {recipe.style.sub_style_id})
                            </option>
                        ))}
                    </StyledControl>
                </label>

                <label>
                    Batch Size
                    <StyledControl
                        as="input"
                        type="number"
                        min={3}
                        max={20}
                        value={batchSize}
                        onChange={handleBatchSizeChanged}
                    ></StyledControl>
                </label>
            </Controls>
            <RecipeContainer>
                <h2>{recipe?.style.name}</h2>
                <h4>Style Description</h4>
                <DashedWrapper>
                    <TogglableElement as="p">
                        {style ? style.impression_description : 'cant find style'}
                    </TogglableElement>
                </DashedWrapper>
                <h4>Target Parameters</h4>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>OG</th>
                            <th>FG</th>
                            <th>SRM</th>
                            <th>IBU</th>
                            <th>ABV</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <TogglableElement as="td">
                                <GravityRenderer value={recipe?.og} />
                            </TogglableElement>
                            <TogglableElement as="td">
                                <GravityRenderer value={recipe?.fg} />
                            </TogglableElement>
                            <TogglableElement as="td">{recipeValues?.srm}</TogglableElement>
                            <TogglableElement as="td">{recipe?.ibu}</TogglableElement>
                            <TogglableElement as="td">{recipeValues?.prettyAbv}%</TogglableElement>
                        </tr>
                    </tbody>
                </StyledTable>
                <h4>Grist</h4>
                <StickyTable>
                    <thead>
                        <tr>
                            <th>Fermentable</th>
                            <th>Percentage</th>
                            <th>Weight</th>
                            <th>Lovibond</th>
                            <th>Potential Points / Gallon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipeValues.gristItems
                            .sort((a, b) => (a.ratio > b.ratio ? -1 : 1))
                            .map((item, index) => (
                                <tr key={index + 1}>
                                    <TogglableElement as="td">{item.fermentable}</TogglableElement>
                                    <TogglableElement as="td">
                                        {item.ratio * 100}%{' '}
                                        <Note>({Math.round(item.actualRatio * 100)}%)</Note>
                                    </TogglableElement>
                                    <TogglableElement as="td">
                                        {item.prettyWeight}{' '}
                                        <Note>({item.actualWeight.toFixed(2)})</Note>
                                    </TogglableElement>
                                    <TogglableElement as="td">{item.lovibond}°L</TogglableElement>
                                    <TogglableElement as="td">{item.ppg}</TogglableElement>
                                </tr>
                            ))}
                    </tbody>
                </StickyTable>
                <CollapsableContainer title="Grist Calculations" open={false}>
                    <p>Volumes</p>
                    <CalculationList list={recipeCalculations.grist.volumes} />

                    <p>Color</p>
                    <CalculationList list={recipeCalculations.grist.color} />

                    <p>ABV</p>
                    <CalculationList list={recipeCalculations.grist.abv} />
                </CollapsableContainer>
                <h4>Hops</h4>
                <StickyTable>
                    <thead>
                        <tr>
                            <th>Varietal</th>
                            <th>Alpha Acid</th>
                            <th>Ounces</th>
                            <th>When</th>
                            <th>Contributed IBUs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipeValues.hopItems.map((item, index) => (
                            <tr key={index + 1}>
                                <TogglableElement as="td">{item.varietal}</TogglableElement>
                                <TogglableElement as="td">{item.alpha}</TogglableElement>
                                <TogglableElement as="td">
                                    {item.prettyOunces} <Note>({item.ounces.toFixed(2)})</Note>
                                </TogglableElement>
                                <TogglableElement as="td">{formatHopWhen(item)}</TogglableElement>
                                <TogglableElement as="td">
                                    {item.actualIbus} <Note>({item.ibus})</Note>
                                </TogglableElement>
                            </tr>
                        ))}
                    </tbody>
                </StickyTable>

                <h4>Yeast</h4>
                <StickyTable>
                    <thead>
                        <tr>
                            <th>Strain</th>
                            <th>Cells</th>
                            <th>Vials</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipeValues.yeastItems.map((item, index) => (
                            <tr key={index + 1}>
                                <TogglableElement as="td">{item.strain}</TogglableElement>
                                <TogglableElement as="td">
                                    {item.billionCells} billion
                                </TogglableElement>
                                <TogglableElement as="td">
                                    {item.prettyVials} <Note>({item.vials.toFixed(2)})</Note>
                                </TogglableElement>
                            </tr>
                        ))}
                    </tbody>
                </StickyTable>
                <CollapsableContainer title="Yeast Calculations" open={false}>
                    <p>Volumes</p>
                    <CalculationList list={recipeCalculations.yeast.volumes} />
                </CollapsableContainer>
            </RecipeContainer>
        </>
    );
};

export default RecipeQuiz;
