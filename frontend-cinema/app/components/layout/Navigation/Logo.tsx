import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logoImage from '@/assets/images/logo.svg'

const Logo: FC = () => {
	return <Link href={'/'}>
        <a className='px-layout mb-10 block'>
            <Image src={logoImage} height={34} alt='Online cinema' draggable={false}/>
        </a>
    </Link>
}

export default Logo
