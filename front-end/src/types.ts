export type Dinner = {
    dinners_id: number;
    user_id: number;
    title: string;
    description: string;
    address: string;
    ingredients: string;
    tags: string;
    allergens: string;
    attendants: number;
    date: Date;
    maxAttendants: number;
    isOpen: boolean;
    isDivided: boolean,
    expenses: number,
};

export type TypeMessage = {
    chat_id?: number;
    created_at?: string;
    updated_at?: string;
    chat_from: number;
    chat_to: number;
    message: string;
};

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
};

export type Rating = {
    rating_id?: number,
    rated_of: User;
    rated_by: User;
    rating_value: number;
    description: string;
};

export type Chip = {
    label: string;
    value: string;
};

export type ChatManager = {
    user: User;
    partner: User;
    allUsers: User[];
    messages: TypeMessage[];
    findMessages: () => Promise<"no user selected" | undefined>;
    findPartner: (partnerId: number) => Promise<any>;
    findAllUsers: () => Promise<any>;
};
