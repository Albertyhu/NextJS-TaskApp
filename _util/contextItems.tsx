
import { createContext } from 'react'; 
import {
    GlobalInterface, 
    HeaderBarType, 
} from './interface'; 

export const AppContext = createContext<GlobalInterface | null>(null); 

export const SignUpContext = createContext(null); 


export const MenuLinksContext = createContext(null); 

export const HeaderBarContext = createContext<HeaderBarType | null>(null); 