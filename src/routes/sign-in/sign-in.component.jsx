import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";


const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <SignUpForm />
      <Button
        buttonType="google"
        buttonOptions={{
          onClick: logGoogleUser,
        }}
      >
        Sign in with google
      </Button>
    </div>
  );
}


export default SignIn;