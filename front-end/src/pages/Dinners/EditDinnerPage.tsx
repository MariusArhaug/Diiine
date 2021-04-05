import { useState } from 'react'
import { Chip } from '../../types';
import { useLocation } from 'react-router-dom';
import { Dinner } from '../../types';
import EditDinner from './EditDinner';
import CreateDinner from './CreateDinner';

export interface DinnerPayLoad {
  title: string,
  address: string,
  description: string,
  date: string,
  tags: Chip[],
  ingredients: string[],
  allergens: Chip[],
  attendants: number,
  isDivided: false,
  isOpen: false,
  expenses: number,
  banner: string
}

export const allergies: Chip[] = [
  { label: 'Lactose', value: 'lactose' },
  { label: 'Gluten', value: 'gluten' },
  { label: 'Shellfish', value: 'shellfish' },
  { label: 'Egg', value: 'egg' },
  { label: 'Fish', value: 'fish' },
  { label: 'Mustard', value: 'mustard' },
  { label: 'Celleri', value: 'celleri' },
  { label: 'Peanuts', value: 'peanuts' },
  { label: 'Soy', value: 'soy' },
  { label: 'Molluscs', value: 'molluscs' },
  { label: 'Lupin', value: 'lupin' },
  { label: 'Sulfites', value: 'sulfites' },
]

export const tags: Chip[] = [
  { label: 'Vegan', value: 'vegan' },
  { label: 'Meat', value: 'meat' },
  { label: 'Pasta', value: 'pasta' }
]


export default function EditDinnerPage() {
  const { state: { dinnerFromLocation } }: { state: { dinnerFromLocation: Dinner | null } } = useLocation();
  const [dinner] = useState<Dinner | null>(dinnerFromLocation);

  return (
    <div>
      {dinner ?
        <EditDinner {...dinner} /> :
        <CreateDinner />
      }
    </div>
  )
}
