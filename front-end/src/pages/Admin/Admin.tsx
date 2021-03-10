import React, { useState, useEffect } from "react";
import { Dinner, User } from '../../types';
import client from '../../feathers-client'
import AdminCard from './AdminCard';




export default function Admin() {

    const [users, setUsers] = useState({
        data: []
    });

    const [dinners, setDinners] = useState({
        data: []
    });

    useEffect(() => {
        client.service('users').find().then((response: any) => {
            setUsers(response);
        })

    }, []);

    useEffect(() => {
        client.service('dinners').find().then((response: any) => {
            setDinners(response);
        })

    }, []);

    const populateUserCards = () => {

    }

    return (
        <div>
            Work in progress
        </div>
    )




}
