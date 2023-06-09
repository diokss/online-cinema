import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

import formStyles from '../../../../ui/form-elemets/admin-form.module.scss'
import AdminNavigation from 'ui/admin-navigation/AdminNavigation'
import Button from 'ui/form-elemets/Button'
import Field from 'ui/form-elemets/Field'
import SlugField from 'ui/form-elemets/SlugField/SlugField'
import UploadField from 'ui/form-elemets/UploadField/UploadField'
import Heading from 'ui/heading/Heading'
import SkeletonLoader from 'ui/heading/SkeletonLoader'
import { IMovieEditInput } from './movie-edit.interface'
import { useMovieEdit } from './useMovieEdit'
import { useAdminGenres } from './useAdminGenres'
import { useAdminActors } from './useAdminActors'
import dynamic from 'next/dynamic'


const DynamicSelect = dynamic(()=>import('ui/select/Select'),{
	ssr:false
})

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue)

	const {isLoading:isGenresLoading,data:genres} = useAdminGenres()

	const {isLoading:isActorsLoading,data:actors} = useAdminActors()

	return (
		<Meta title="Edit movie">
			<AdminNavigation />
			<Heading title="Edit movie"></Heading>
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('title', {
									required: 'Name is required!',
								})}
								placeholder="Name"
								error={errors.title}
								style={{ width: '50%' }}
							/>

							<SlugField
								register={register}
								error={errors.slug}
								generate={() => {
									setValue('slug', generateSlug(getValues('title')))
								}}
							/>

							<Field
								{...register('parameters.country', {
									required: 'Country is required!',
								})}
								placeholder="Country"
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.duration', {
									required: 'Duration is required!',
								})}
								placeholder="Duration"
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.year', {
									required: 'Year is required!',
								})}
								placeholder="Year"
								error={errors.parameters?.year}
								style={{ width: '31%' }}
							/>
									{/* {React selects} */}
							
							<Controller
							control={control}
							name="genres"
							render={({
								field,
								fieldState: { error },
							}) => (
								<DynamicSelect
									field={field}
									options={genres || []}
									isLoading={isGenresLoading}
									isMulti
									placeholder='Genres'
									error={error}
								/>
							)}
							rules={{
								required: 'Please select at least one genre!',
							}}
						/>
							<Controller
							control={control}
							name="actors"
							render={({
								field,
								fieldState: { error },
							}) => (
								<DynamicSelect
									field={field}
									options={actors || []}
									isLoading={isActorsLoading}
									isMulti
									placeholder='Actors'
									error={error}
								/>
							)}
							rules={{
								required: 'Please select at least one actor!',
							}}
						/>

							<Controller
							control={control}
							name="poster"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder="movies"
									placeholder="Poster"
								/>
							)}
							rules={{
								required: 'Poster is required',
							}}
						/>
						<Controller
							control={control}
							name="bigPoster"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder="movies"
									placeholder="Big Poster"
								/>
							)}
							rules={{
								required: 'Big Poster is required',
							}}
						/>
						<Controller
							control={control}
							name="videoUrl"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder="movies"
									placeholder="Video"
									style={{marginTop:-25}}
									isNoImage
								/>
							)}
							rules={{
								required: 'Video is required',
							}}
						/>
						
						</div>
				
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}
export default MovieEdit
