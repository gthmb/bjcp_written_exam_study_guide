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
