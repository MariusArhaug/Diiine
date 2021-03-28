import content from "*.svg";
import React, { useEffect, useState } from "react";
import client from "../../feathers-client";
import { useAuth } from "../../hooks/use-auth";
import { TypeMessage, User } from "../../types";
import Chat from "./Chat";
import Message from "./Message";

export default function ChatManager() {
    const user: User = useAuth().user;
    const [partner, setPartner] = useState<User>({
        user_id: 0,
        name: "Loading...",
    });
    const [allUsers, setAllUsers] = useState<User[]>([user]);
    const [messages, setMessages] = useState<TypeMessage[]>([]);
    
    useEffect(() => {
        if (partner.user_id != 0) {
            findMessages();
        }
    }, [partner]);

    client.service("chat").on((chat: TypeMessage) => {
        setMessages([...messages, chat]);
    });
    
    const newMessage = async (content: string): Promise<any> => {
        const result = await client.service("chat").create({
            chat_from: user.user_id,
            chat_to: partner.user_id,
            message: content,
        });

        return result;
        
    };

    const findMessages = async () => {
        if (partner.user_id != 0) {
            return await client
                .service("chat")
                .find({
                    query: {
                        $sort: { created_at: 1 },
                        $limit: 10,
                        $and: [
                            {
                                chat_to: {
                                    $in: [user.user_id, partner.user_id],
                                },
                            },
                            {
                                chat_from: {
                                    $in: [user.user_id, partner.user_id],
                                },
                            },
                        ],
                    },
                })
                .then((result: any) => {
                    setMessages(result.data);
                    return result.data;
                });
        } else {
            return "no user selected";
        }
    };

    const findPartner = async (partnerId: number) => {
        return await client
            .service("users")
            .find({ query: { user_id: partnerId } })
            .then((res: any) => {
                setPartner(res.data[0]);

                return res.data;
            });
    };

    const findAllUsers = async () => {
        return await client
            .service("users")
            .find({ query: { $select: ["user_id", "name", "avatar"] } })
            .then((res: any) => {
                setAllUsers(res.data);
                return res.data;
            });
    };

    return {
        user,
        partner,
        allUsers,
        messages,
        newMessage,
        findMessages,
        findPartner,
        findAllUsers,
    };
}
