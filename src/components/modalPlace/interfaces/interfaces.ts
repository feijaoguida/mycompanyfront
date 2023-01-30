

export interface modalPlaceProps {
  isOpen: boolean,
  onClose: (() => void),
  size?: string,
  isEdit?: boolean,
  selectPlace?: any,
  idCompany?:any
}

export interface placesProps {
  places: placeProps[]
}

export interface placeProps {
    id?: string;
    name: string;
    stret?: string;
    number: number;
    city: string;
    State: string;
    company_id?: string
    
}