export interface ISpecial {
    id: number
    description: string
    type: SpecialType;
    date: string;
}

export enum SpecialType {
    NONE = "",
    BIRTHDAY = "Birthday",
    HOLIDAY = "Holiday",
    CELEBRATION = "Celebration",
}

export const NullSpecial: ISpecial = { id: -1, date: "", description: "", type: SpecialType.NONE }