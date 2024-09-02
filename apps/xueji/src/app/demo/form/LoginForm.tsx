'use client'
import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import styles from './login.module.css'
import Select from 'react-select'
import Input from '@mui/material/Input'

interface User {
  name: string
}

interface LoginFormValues {
  username: string
  password: string
  remember: boolean
  select: object
}

// interface IFormValues {
//   'First Name': string
//   Age: number
// }
// type InputProps = {
//   label: Path<IFormValues>
//   register: UseFormRegister<IFormValues>
//   required: boolean
// }

// /* The following component is an example of your existing Input Component*/
// const Input = ({ label, register, required }: InputProps) => (
//   <>
//     <label>{label}</label>
//     <input {...register(label, { required })} />
//   </>
// )

// you can use **React.forwardRef** to pass the ref too
// const Select = React.forwardRef<HTMLSelectElement, { label: string } & ReturnType<UseFormRegister<IFormValues>>>(
//   ({ onChange, onBlur, name, label }, ref) => (
//     <>
//       <label>{label}</label>
//       <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
//         <option value="20">20</option>
//         <option value="30">30</option>
//       </select>
//     </>
//   ),
// )

export default function Page() {
  const [user, setUser] = useState<User | null>(null)
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: '用户123',
    },
  })

  const onSubmit: SubmitHandler<LoginFormValues> = ({ username, password, remember, select }) => {
    console.log(username, password, remember, select)
    setUser({ name: username })
  }

  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.greeting}>
          <h2>Welcome back, {user.name}!</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h2 className={styles.header}>Login</h2>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            {/* <input
              id="username"
              type="text"
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
              })}
              className={`${styles.input} ${errors.username ? styles.errorInput : ''}`}
              placeholder="Enter your username"
            /> */}
            <Controller
              name="username"
              control={control}
              rules={{
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
              }}
              render={({ field }) => <Input {...field} placeholder="输入用户名" />}
            />
            {errors.username && <span className={styles.errorMessage}>{errors.username.message}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
          </div>
          <Controller
            name="select"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Filters"
                options={[
                  { value: 'chocolate', label: 'Chocolate' },
                  { value: 'strawberry', label: 'Strawberry' },
                  { value: 'vanilla', label: 'Vanilla' },
                ]}
              />
            )}
          />
          <div className={styles.rememberMe}>
            <input id="remember" type="checkbox" {...register('remember')} />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      )}
    </div>
  )
}
