export type Dinner = {
    dinners_id: number;
    user_id: number;
    name: string;
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
    avgRating: number;
}

export type Rating = {
    rated_of: number;
    rated_by: number;
    rating_value: number;
    description: string;
}

export type Chat = {
    to: User;
    from: User;
    message: string;
}

export type Chip = {
    label: string; value: string
};