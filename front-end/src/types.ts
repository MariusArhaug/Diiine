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

export type TypeMessage = {
    chat_id: number;
    created_at: string;
    updated_at: string;
    chat_from: User;
    chat_to: User;
    message: string;
}

export type User = {
    allergies?: string;
    avg_rating?: number;
    user_id: number;
    name: string;
    address?: string;
    email?: string;
    isAdmin?: boolean;
    chatted_to?: number | null;
    avatar?: string;
}

export type Rating = {
    rated_of: number;
    rated_by: number;
    rating_value: number;
    description: string;
}

export type Chip = {
    label: string; value: string
};