import { UserProps } from "@/contexts/interfaces/typesContext"
import { Place } from "@/pages/place/interface/interface"

export interface modalCompanyProps {
  isOpen: boolean,
  onClose: (() => void),
  size?: string,
  isEdit?: boolean,
  selectCompany?: any,
}

export interface companiesProps {
  companies: companyProps[]
}

export interface companyProps {
    id?: string | undefined,
    name: string | undefined,
    website: string | undefined,
    cnpj: string | undefined,
    user_id: string | undefined
    user?: UserProps
    place?: Place[]
}