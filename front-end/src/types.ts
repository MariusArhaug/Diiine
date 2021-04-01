export interface Dinner {
    dinners_id: number;
    owner: User;
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
    isDivided: boolean;
    expenses: number;
};

export interface TypeMessage {
    chat_id?: number;
    created_at?: string;
    updated_at?: string;
    chat_from: number;
    chat_to: number;
    message: string;
};

export interface User {
    user_id: number;
    allergies?: string;
    avg_rating?: number;
    name: string;
    address?: string;
    email?: string;
    isAdmin?: boolean;
    chatted_to?: number | null;
    avatar?: string;
};

export interface Rating {
    rated_of: number;
    rated_by: number;
    rating_value: number;
    description: string;
};

export interface Chip {
    label: string;
    value: string;
};

export interface ChatManager {
  user: User;
  partner: User;
  allUsers: User[];
  messages: TypeMessage[];
  findMessages: () => Promise<"no user selected" | undefined>;
  findPartner: (partnerId: number) => Promise<any>;
  findAllUsers: () => Promise<any>;
};


export interface AttendingDinner {
  user_id: number, 
  dinners_id: number,
  secondary_pk: number
}
