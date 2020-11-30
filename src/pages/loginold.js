import React, { useState } from 'react';
import Link from 'next/link';
import { firebaseClient } from '../../firebaseClient';

const login = (_props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div>
      <Link href="/">
        <a>Go back to home page</a>
      </Link>
      <br />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={'Email'}
      />
      <input
        type={'password'}
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder={'Password'}
      />
      <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .createUserWithEmailAndPassword(email, pass);
          window.location.href = '/dashboard';
        }}
      >
        Create account
      </button>
      <button
        onClick={async () => {
          await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
          window.location.href = '/dashboard';
        }}
      >
        Log in
      </button>
    </div>
  );
};

export default login;