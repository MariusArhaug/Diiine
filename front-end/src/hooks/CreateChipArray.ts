import { Chip } from '../types';

export const CreateChipArray = (value: string[]): Chip[] => {
  let temp : Chip[] = value.map(element => (
    { label: element, value: element }
  ))
  return temp
}