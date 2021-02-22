export type Dinner = {
    dinnerId: number;
    owner: User;
    name: string;
    description: string;
    address: string;
    type: string;
    allergens: string;
    attendants: User[];
    date: Date;
    pictureURL: string
}

export type User = {
    userId: number;
    name: string;
    address: string;
    email: string;
    isAdmin: boolean;
    allergies: string[];
    pictureURL: string,
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