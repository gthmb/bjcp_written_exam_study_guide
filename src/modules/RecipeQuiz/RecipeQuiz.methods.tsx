import {
    IRecipe,
    IStatefulGristItem,
    IStatefulHopItem,
    IInferredHopValues,
    IStatefulYeastItem,
} from '../../Styles.interfaces';
import { getSteppedValue } from '../../common/methods';
import React from 'react';
import styled from 'styled-components';
import { CalculationData } from './CalculationList';

interface IRecipeValues {
    averagePPG: number;
    ogInteger: number;
    fgInteger: number;
    abv: number;
    prettyAbv: number;
    totalGravityPoints: number;
    totalPoundsGrain: number;
    gristItems: IStatefulGristItem[];
    hopItems: IStatefulHopItem[];
    yeastItems: IStatefulYeastItem[];
    srm: number;
    beerType: string;
    yeastVileFactor: number;
}

interface IRecipeCalculations {
    grist: {
        volumes: CalculationData;
        color: CalculationData;
        abv: CalculationData;
    };
    yeast: {
        volumes: CalculationData;
    };
}

const defaultRecipeValues = {
    averagePPG: 0,
    ogInteger: 0,
    fgInteger: 0,
    abv: 0,
    prettyAbv: 0,
    totalGravityPoints: 0,
    totalPoundsGrain: 0,
    gristItems: [],
    hopItems: [],
    yeastItems: [],
    srm: 0,
    beerType: 'ale',
    yeastVileFactor: 0.007,
};

const Answer = styled.span`
    color: yellow;
    border-bottom: 1px dotted yellow;
`;

const getHopUsageDetails = (addition: IStatefulHopItem['addition_type']): IInferredHopValues => {
    const map: Record<string, IInferredHopValues> = {
        bittering: {
            utilization: 0.25,
            time: 60,
            stage: 'boil',
        },
        flavor: {
            utilization: 0.1,
            time: 10,
            stage: 'boil',
        },
        aroma: {
            utilization: 0.0001,
            time: 0,
            stage: 'boil',
        },
        'dry-hop': {
            utilization: 0.0001,
            time: 2,
            stage: 'dry-hop',
        },
    };
    return map[addition];
};

export const getRecipeValues = (
    recipe: IRecipe | undefined,
    batchSize: number,
    efficiency: number
): IRecipeValues => {
    if (recipe === undefined) {
        return defaultRecipeValues;
    }
    const beerType = recipe.beerType;
    const yeastVileFactor = beerType === 'lager' ? 0.015 : 0.007;
    const averagePPG = recipe.grist.map((item) => item.ratio * item.ppg).reduce((a, b) => a + b);
    const ogInteger = ((recipe.og - 1) * 1000) >> 0;
    const fgInteger = ((recipe.fg - 1) * 1000) >> 0;
    const abv = (ogInteger - fgInteger) * 0.132;
    const prettyAbv = getSteppedValue(abv, 0.1);
    const totalGravityPoints = recipe ? ogInteger * batchSize : 0;
    const totalPoundsGrain = totalGravityPoints / (averagePPG * efficiency);
    const gristItems = recipe.grist.map((item) => {
        const actualWeight = item.ratio * totalPoundsGrain;
        const prettyWeight = getSteppedValue(actualWeight);

        return {
            ...item,
            abv,
            ogInteger,
            actualWeight,
            prettyWeight,
            actualRatio: prettyWeight / totalPoundsGrain,
        };
    });

    const baseSrm =
        gristItems.map((item) => item.prettyWeight * item.lovibond).reduce((a, b) => a + b) /
        batchSize;

    const srm = Math.round(
        baseSrm < 10
            ? baseSrm
            : 4.6 +
                  (gristItems
                      .map((item) => item.prettyWeight * item.lovibond)
                      .reduce((a, b) => a + b) *
                      0.3) /
                      batchSize
    );

    const hopItems = recipe.hops
        .map((item) => ({
            ...item,
            ...getHopUsageDetails(item.addition_type),
        }))
        .map((item) => {
            return {
                ...item,
                ibus: getSteppedValue(recipe.ibu * item.bittering_ratio || 0, 0.5),
            };
        })
        .map((item) => ({
            ...item,
            ounces:
                item.addition_type === 'aroma' || item.addition_type === 'dry-hop'
                    ? ((item.ounce_per_5_gallon || 0) * Math.floor(batchSize)) / 5
                    : (item.ibus * batchSize) / ((item.alpha / 100) * item.utilization * 7490),
        }))
        .map((item) => ({
            ...item,
            prettyOunces: getSteppedValue(item.ounces),
        }))
        .map((item) => ({
            ...item,
            actualIbus: getSteppedValue(
                (item.prettyOunces * (item.alpha / 100) * item.utilization * 7490) / batchSize,
                0.5
            ),
        }));

    const yeastItems = recipe.yeast
        .map((item) => ({
            ...item,
            vials: (item.type === 'ale' ? 0.007 : 0.015) * ogInteger * batchSize,
        }))
        .map((item) => ({
            ...item,
            prettyVials: Math.ceil(item.vials),
            billionCells: getSteppedValue(item.vials * 100),
        }));

    return {
        averagePPG,
        ogInteger,
        fgInteger,
        abv,
        prettyAbv,
        totalGravityPoints,
        totalPoundsGrain,
        gristItems,
        hopItems,
        yeastItems,
        beerType,
        yeastVileFactor,
        srm,
    };
};

export const getRecipeCalculations = (
    recipeValues: IRecipeValues,
    batchSize: number,
    efficiency: number
): IRecipeCalculations => {
    const gristVolumeCalculations: CalculationData = [
        {
            title: 'Find the total gravity points needed:',
            steps: [
                'OriginalGravity * Volume = totalGravityPoints',
                <>
                    {recipeValues.ogInteger} * {batchSize} ={' '}
                    <Answer>{recipeValues.totalGravityPoints}</Answer> gravity points
                </>,
            ],
        },
        {
            title: 'Find the average Potential Points of Gravity per Pound of grain for the batch:',
            steps: [
                '(g1.percent * g1.ppg + g2.percent * g2.ppg ...) = averagePPG',
                <>
                    {recipeValues.gristItems
                        .map((item) => `${item.ratio} * ${item.ppg}`)
                        .join(' + ')}{' '}
                    = <Answer>{recipeValues.averagePPG} PPG</Answer>
                </>,
            ],
        },
        {
            title: 'Find the total weight of grains needed:',
            steps: [
                'totalGravityPoints / (averagePPG * efficiency) = totalPoundsGrain',
                <>
                    {recipeValues.totalGravityPoints} / ({recipeValues.averagePPG} * {efficiency}) ={' '}
                    <Answer>{recipeValues.totalPoundsGrain.toFixed(2)} lbs</Answer>
                </>,
            ],
        },
        {
            title:
                ' Apply percentages to each grain to determine amounts of each (and round to sensible imcrements):',
            steps: [
                'totalGravityPoints / (averagePPG * efficiency) = totalPoundsGrain',
                'g.percent * totalPoundsGrain = g.weight',
                <>
                    {recipeValues.gristItems.map((item, indx) => (
                        <div key={indx}>
                            {item.fermentable}: {item.ratio} *{' '}
                            {recipeValues.totalPoundsGrain.toFixed(2)} ={' '}
                            {item.actualWeight.toFixed(2)} {' => '}
                            <Answer>{item.prettyWeight} lbs</Answer>
                        </div>
                    ))}
                </>,
            ],
        },
    ];

    const colorOver10Calculation = {
        title: 'Since the SRM is over 10, we use this formula:',
        steps: [
            '4.6 + .3 * (g.weight1 * g1.lovibond + g2.wieght * g2.lovibond ...) / Volume',
            <>
                4.6 + .3 * (
                {recipeValues.gristItems
                    .map((item) => `${item.prettyWeight} * ${item.lovibond}`)
                    .join(' + ')}{' '}
                ) / {batchSize} = <Answer>{recipeValues.srm} SRM</Answer>
            </>,
        ],
    };

    const colorUnder10Calculation = {
        title: 'Since the SRM is 10 or below, we use this formula:',
        steps: [
            '(g.weight1 * g1.lovibond + g2.wieght * g2.lovibond ...) / Volume',
            <>
                (
                {recipeValues.gristItems
                    .map((item) => `${item.prettyWeight} * ${item.lovibond}`)
                    .join(' + ')}{' '}
                ) / {batchSize} = <Answer>{recipeValues.srm} SRM</Answer>
            </>,
        ],
    };

    const gristColorCalculations: CalculationData = [
        recipeValues.srm > 10 ? colorOver10Calculation : colorUnder10Calculation,
    ];

    const gristABVCalculations: CalculationData = [
        {
            title: 'Subtract the FG from the OG and multiply by 0.132:',
            steps: [
                '(OG - FG) * 0.132 = ABV',
                <>
                    {' '}
                    ({recipeValues.ogInteger} - {recipeValues.fgInteger}) * 0.132 ={' '}
                    <Answer>{recipeValues.abv.toFixed(1)}%</Answer>
                </>,
            ],
        },
    ];

    const yeastVoume = [
        {
            title: `For ${recipeValues.beerType}s, this is formula:`,
            steps: [
                `${recipeValues.yeastVileFactor} * OG * Volume = vials`,
                <>
                    {recipeValues.yeastVileFactor} * {recipeValues.ogInteger} * {batchSize} ={' '}
                    {recipeValues.yeastVileFactor * recipeValues.ogInteger * batchSize}
                </>,
            ],
        },
    ];

    return {
        grist: {
            volumes: gristVolumeCalculations,
            color: gristColorCalculations,
            abv: gristABVCalculations,
        },
        yeast: {
            volumes: yeastVoume,
        },
    };
};
