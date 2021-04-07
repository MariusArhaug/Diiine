import { Chip } from '../types';

export const CreateChipArray = (value: string[]): Chip[] | undefined => {
  let temp : Chip[] = value.filter(element => element != "").map(element => (
    { label: element, value: element }
  ))
  return temp.length > 0 ? temp : undefined
}