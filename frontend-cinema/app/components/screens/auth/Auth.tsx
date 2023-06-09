import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/Meta'

import Button from 'ui/form-elemets/Button'

import styles from './Auth.module.scss'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'
import Heading from '../../../ui/heading/Heading'
import AuthFields from './AuthFields'
import { useActions } from '@/hooks/useAction'

const Auth: FC = () => {
	useAuthRedirect()

	const { isLoading } = useAuth()

	const [type, setType] = useState<'login' | 'register'>('login')

	const {login,register} = useActions()

	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onChange',
	})




	const onSubmit: SubmitHandler<IAuthInput> = (data) => {

		if (type === 'login') login(data)
		else if (type === 'register') register(data)

		reset()
	}

	return (
		<Meta title="Auth">
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title="Auth" className="mb-6" />

					<AuthFields formState={formState} register={registerInput} isPasswordRequired={true}/>
					<div className={styles.buttons}>
						<Button
							type="submit"
							onClick={() => setType('login')}
							disabled={isLoading}
						>
							Login
						</Button>

						<Button
							type="submit"
							onClick={() => setType('register')}
							disabled={isLoading}
						>
							Register
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default Auth
