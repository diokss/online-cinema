import { GetStaticProps, NextPage } from 'next'
import { FC } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import Catalog from 'ui/catalog-movies/Catalog'
import { MovieService } from '@/services/movie.service'

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Fresh movies"
			description="New movies and series in excellent quality: legal, safe, without ads"
		/>
	)
}

export const getStaticProps:GetStaticProps = async()=>{
    try{
        const {data:movies} = await MovieService.getAll()

        return{
            props:{
                movies
            },
            revalidate:60
        }

    }catch(error){
        return {
            notFound:true
        }
    }
}
export default FreshPage
