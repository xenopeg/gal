'use client'
 
import { useFormStatus, useFormState } from 'react-dom'
import { signIn } from '@/actions/auth'

export function SignInButton() {
  const { pending } = useFormStatus()
 
  return (
    <button aria-disabled={pending} type="submit">
      {pending ? 'Submitting...' : 'Sign In'}
    </button>
  )
}

export function SignInForm() {
  const [state, action] = useFormState(signIn, undefined)
 
  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
 
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <SignInButton />
    </form>
  )
}