export function randomize<T = any>(arr: T[]) {
    return [...[...arr].sort(() => (Math.random() > 0.5 ? 1 : -1))];
}

export const getSteppedValue = (value: number, step: number = 0.25) =>
    Math.round((value % 1) * (1 / step)) / (1 / step) + Math.floor(value);
