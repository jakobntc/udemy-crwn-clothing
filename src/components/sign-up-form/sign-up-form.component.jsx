import { useState } from "react";

const initialFormFields = {
  displayName: "Sam",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(initialFormFields); // Creating a state variable
  const { displayName, email, password, confirmPassword } = formFields; // Destructoring

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Event for ", name, " with new value ", value);

    setFormFields({ ...formFields, [name]: value }); // ... = Foreach element of formFields 
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={() => { }}>
        <label>Display Name</label>
        <input type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <label>Email</label>
        <input type="email" required onChange={handleChange} name="email" value={email} />

        <label>Password</label>
        <input type="password" required onChange={handleChange} name="password" value={password} />

        <label>Confirm Password</label>
        <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}


export default SignUpForm;