import React, { FormEvent } from 'react';
import './Signup.css';

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
};
function Signup() {
  return (
    <form onSubmit={handleSubmit} method="get" className="signup-form">
      <div>
        <label>
          Enter your name:
          <input type="text" name="name" id="name" required />
        </label>
      </div>
      <div>
        <input type="submit" value="Play!" />
      </div>
    </form>
  );
}

export default Signup;
