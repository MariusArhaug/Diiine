export type Dinner = {
    dinners_id: number;
    user_id: number;
    title: string;
    description: string;
    address: string;
    ingredients: string;
    tags: string;
    allergens: string;
    attendants: User[];
    date: Date;
    maxAttendants: number;
    isOpen: boolean;
}

export type User = {
    user_id: number;
    name: string;
    address: string;
    email: string;
    isAdmin: boolean;
    allergies: string;
}

export type Rating = {
    rated: User;
    ratedBy: User;
    description: string;
    rating: number;
}

export type Chat = {
    to: User;
    from: User;
    message: string;
}

export type Chip = {
    label: string; value: string
};