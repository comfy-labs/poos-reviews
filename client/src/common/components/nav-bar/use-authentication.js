import { useState } from "react";
import loginUser from "../../data/apiRequest/graphQLRequest/authentication/login";
import signUpUser from "../../data/apiRequest/graphQLRequest/authentication/signUp";

const DEFAULT_ERRORS = null;

export default function useAuthentication() {
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const [isLoading, setIsLoading] = useState(false);

  const clearErrors = () => setErrors(DEFAULT_ERRORS);

  const login = (email, password) => {
    setIsLoading(true);
    setErrors(DEFAULT_ERRORS);
    return loginUser(email, password)
      .then(payload => {
        setIsLoading(false);
        return {
          errors: null,
          user: payload.login.user,
          token: payload.login.token
        };
      })
      .catch(errors => {
        setIsLoading(false);
        const errorPayload = Array.isArray(errors) ? errors : [errors];
        setErrors(errorPayload);
        return { errors: errorPayload, user: null, token: null };
      });
  };

  const signUp = (name, email, password) => {
    setIsLoading(true);
    setErrors(DEFAULT_ERRORS);
    return signUpUser(name, email, password)
      .then(payload => {
        setIsLoading(false);
        return {
          errors: null,
          user: payload.signup.user,
          token: payload.signup.token
        };
      })
      .catch(errors => {
        setIsLoading(false);
        const errorPayload = Array.isArray(errors) ? errors : [errors];
        setErrors(errorPayload);
        return { errors: errorPayload, user: null, token: null };
      });
  };

  return { clearErrors, errors, isLoading, login, signUp };
}
