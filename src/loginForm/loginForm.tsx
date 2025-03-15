import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './loginForm.module.scss';
import Loader from '../loader';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return <div className={styles.loginContainer}><Loader /></div>
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)

    console.log('Form submitted:', { email, password });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.heading}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
            aria-describedby="emailError"
            required
          />
          {error && !email && (
            <span id="emailError" className={styles.errorText}>Email is required</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
            aria-describedby="passwordError"
            required
          />
          {error && !password && (
            <span id="passwordError" className={styles.errorText}>Password is required</span>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>Login</button>

        {error && <div className={styles.errorMessage}>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
