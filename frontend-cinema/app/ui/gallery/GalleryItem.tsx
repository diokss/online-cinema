import {FC} from 'react'
import cn from 'classnames'
import styles from './Gallery.module.scss'
import { IGalleryItemProps } from './gallery.interface'
import Link from 'next/link'
import Image from 'next/image'

const GalleryItem: FC<IGalleryItemProps>=({item,variant})=>{
    return <Link href={item.link}>
        <a className={cn(styles.item,{
            [styles.withText]:item.content,
            [styles.horizontal]:variant==='horizontal',
            [styles.vertical]:variant==='vertical',

        })}>
            <Image src={item.posterPath} alt={item.name} layout='fill' draggable={false} priority/>
            {item.content &&(
                <div className={styles.content}>
                    <div className={styles.title}>{item.content.title}</div>
                    {item.content.subTitle&&(
                        <div className={styles.subTitle}>{item.content.subTitle}</div>
                    )}
                </div>
            )}

        </a>
    </Link>

}
export default GalleryItem