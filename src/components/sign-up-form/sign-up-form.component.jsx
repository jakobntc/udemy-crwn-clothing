import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const initialFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(initialFormFields); // Creating a state variable
  const { displayName, email, password, confirmPassword } = formFields; // Destructoring

  console.log(formFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Event for ", name, " with new value ", value);

    setFormFields({ ...formFields, [name]: value }); // ... = Foreach element of formFields 
  }

  const handleSubmit = async (event) => {
    const { email, password } = event;
    const something = await createAuthUserWithEmailAndPassword(email, password);
    console.log(something);
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={(event) => {handleSubmit(event)}}>
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