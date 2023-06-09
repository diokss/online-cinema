import { MovieService } from '@/services/movie.service'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import SkeletonLoader from 'ui/heading/SkeletonLoader'
import MovieList from './MovieList'


const PopularMovies: FC = () => {

    const {isLoading,data:popularMovies} = useQuery('Popular movies in sidebar', ()=>MovieService.getMostPopularMovies())


	return isLoading ? <div className='mt-11'>
        <SkeletonLoader count={3} className="h-28 mb-4"/>
    </div> : <MovieList movies={popularMovies || []} link={'/trending'} title={'Popular Movies'}/>
}

export default PopularMovies
