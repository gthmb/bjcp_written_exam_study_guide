export function randomize<T = any>(arr: T[]) {
    return [...arr.sort(() => (Math.random() > 0.5 ? 1 : -1))];
}
