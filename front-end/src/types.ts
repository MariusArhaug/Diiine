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

export type TypeMessage = {
    chat_id: number;
    chat_from: User;
    chat_to: User;
    message: string;
}

export type User = {
    userId: number;
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

export type Chip = {
    label: string; value: string
};