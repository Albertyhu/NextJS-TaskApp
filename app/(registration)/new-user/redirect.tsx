'use client'
import { useEffect } from 'react';
import { NavigationHooks } from '@/_hooks/navigation'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const { GoHome } = NavigationHooks()

    useEffect(() => {
        var cancel = setTimeout(() => GoHome(), 3000); 
        return () => {
            clearTimeout(cancel); 
        }
    }, [])

    return (<>{children}</>)
}

export default Wrapper; 