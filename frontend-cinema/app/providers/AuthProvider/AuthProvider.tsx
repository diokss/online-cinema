
import { useActions } from '@/hooks/useAction'
import { useAuth } from '@/hooks/useAuth'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {FC, useEffect} from 'react'

const DynamicCheckRole = dynamic(()=>import('./CheckRole'),{ssr:false})

const AuthProvider: FC<TypeComponentAuthFields>=({children,Component:{isOnlyAdmin,isOnlyUser}})=>{

    const {user} = useAuth()

    const {logout, checkAuth} = useActions()

    const {pathname} = useRouter()

    useEffect(()=>{
        const accessToken = Cookies.get('accessToken')
        if(accessToken) checkAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        const refreshToken = Cookies.get('refreshToken')
        if(!refreshToken && user) logout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pathname])


    return !isOnlyAdmin && !isOnlyUser ? <>{children}</> : <DynamicCheckRole Component={{isOnlyAdmin, isOnlyUser}}>{children}</DynamicCheckRole>

}
export default AuthProvider