import React, { useState, useEffect } from "react";
import { Dinner, User } from '../types';
import client from '../feathers-client'
import AdminCard from './AdminCard';
import { Rating } from '../types';


export default function AverageRating(user: User) {

  useEffect(() => {
    client.service('rating')
      .find({
        query: {
          rated_of: user.user_id
        }
      })
      .then((rating: Rating) => {
        console.log(rating.description);
      })
      .catch((e: Error) => {
        console.log(e);
      })
  }, []);

  return (
    <div>
      Work in progress
    </div>
  )
}
