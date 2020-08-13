import { MashProfile, BeerType, YeastType, HopAdditionStage } from './Styles.enums';

export interface ICommercialExample {
    name: string;
    selected: boolean;
}

export interface IMetaStyle {
    id: number;
    name: string;
    description: string;
}

export interface IStyle {
    impression_description: string;
    history_description: string;
    comparison_description: string;
    id: number;
    name: string;
    sub_style_id: string;
    commercial_examples: ICommercialExample[];
    og_start: number;
    og_end: number;
    fg_start: number;
    fg_end: number;
    abv_start: number;
    abv_end: number;
    ibu_start: number;
    ibu_end: number;
    srm_start: number;
    srm_end: number;
    meta_style: IMetaStyle;
}

export interface IQuestion<T = any> {
    id: number;
    question: string;
    answer: T;
    note?: string;
}

interface IGristItem {
    fermentable: string;
    lovibond: number;
    ppg: number;
    ratio: number;
    process: string;
}

export interface IStatefulGristItem extends IGristItem {
    prettyWeight: number;
    actualWeight: number;
    actualRatio: number;
}

export interface IInferredHopValues {
    utilization: number;
    time: number;
    stage: HopAdditionStage;
}
export interface IStatefulHopItem extends IHopItem, IInferredHopValues {
    ibus: number;
    ounces: number;
    prettyOunces: number;
    actualIbus: number;
}

interface IHopItem {
    varietal: string;
    alpha: number;
    addition_type: string;
    bittering_ratio: number;
    ounce_per_5_gallon?: number;
}

interface IYeastItem {
    strain: string;
    type: YeastType;
}

export interface IStatefulYeastItem extends IYeastItem {
    billionCells: number;
    vials: number;
    prettyVials: number;
}

export interface IRecipe {
    id: number;
    og: number;
    fg: number;
    ibu: number;
    srm: number;
    beerType: BeerType;
    style: Pick<IStyle, 'id' | 'sub_style_id' | 'name'>;
    grist: IGristItem[];
    hops: IHopItem[];
    yeast: IYeastItem[];
    mashProfile: MashProfile;
}
