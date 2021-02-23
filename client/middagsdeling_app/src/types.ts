export type Dinner = {
    dinnerId: number;
    owner: User;
    name: string;
    description: string;
    address: string;
    tags: string[];
    //change later to string Array
    allergens: string;
    attendants: User[];
    maxAttendants: number;
    date: Date;
}

export type User = {
    userId: number;
    name: string;
    address: string;
    email: string;
    isAdmin: boolean;
    allergies: string[];
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