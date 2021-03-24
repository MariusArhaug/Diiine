import React, { useEffect, useState } from "react";
import client from "../../feathers-client";
import { useAuth } from "../../hooks/use-auth";
import { User } from "../../types";
import Chat from "./Chat";


export default function ChatManager() {
    const user : User = useAuth().user;
    const [partner, setPartner] = useState<User>({
        user_id: 0,
        name: 'Loading...'
    });
    const [allUsers, setAllUsers] = useState<[User]>([user]);

    const findMessages = async () => {};

    const findPartner = async (partnerId: number) => {
            client
                .service("users")
                .get(partnerId)
                .then((res: any) => {
                    setPartner(res.data);
                    return res.data;
                });
    };

    const findAllUsers = async () => {
        client
            .service("users")
            .find({ query: { $select: ["user_id", "name", "avatar"] } }).then((res: any) => {
                setAllUsers(res.data);
                // return res.data;
            });
            
    };

    return {
        user,
        partner,
        allUsers,
        findMessages,
        findPartner,
        findAllUsers,
    }
}
