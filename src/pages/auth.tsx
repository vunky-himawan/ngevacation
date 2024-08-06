import Button from "@/components/Button";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import { useAuth } from "@/context/authContext";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Auth = () => {
  const [step, setStep] = useState<number>(1);
  const { provider } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const SEO: SEOModel = {
    title: provider === "login" ? "Login" : "Signup",
    description: "Login page for Hidden Gems",
    siteName: "Hidden Gems",
    siteUrl: "https://hiddengems.com",
    keywords: ["hidden", "gems", "vocation", "traveler"],
    type: "website",
  };

  return (
    <>
      <MainLayout withHeader={false} SEO={SEO}>
        {successMessage && (
          <Toast
            withRedirect
            redirectTo="login page"
            message={successMessage}
            type="success"
          />
        )}
        <section
          className="w-full h-screen bg-cover bg-no-repeat bg-center relative flex justify-center items-center"
          style={{ backgroundImage: "url(/images/background.webp)" }}
        >
          <div className="2xl:w-[45vw] lg:min-h-[50vh] w-[80vw] md:w-[50vw] lg:w-[70vw] flex justify-between items-center">
            <div className="flex-1 hidden lg:block">
              <h1 className="text-white font-semibold text-6xl font-cabinet">
                Hello!
              </h1>
              <h1 className="text-white font-semibold text-xl font-cabinet">
                Ready for the next adventure?
              </h1>
            </div>
            <div className="flex-1 h-full w-full bg-[#141614]/80 rounded-xl p-5 flex flex-col justify-center items-center font-sathosi">
              <div className="w-full flex flex-col space-y-2 text-white p-5">
                {provider === "signup" && (
                  <h5 className="text-lg font-medium">Step {step} of 2</h5>
                )}
                <h5 className="text-2xl font-semibold">
                  {provider === "login" ? "Login" : "Signup"}
                </h5>
                <p>
                  {provider === "login"
                    ? "Welcome back!"
                    : "Welcome! Let's get started."}
                </p>
                {error && <p className="text-red-500">{error}</p>}
              </div>
              {provider === "login" ? (
                <LoginForm
                  setError={setError}
                  setSuccessMessage={setSuccessMessage}
                />
              ) : (
                <SignupForm
                  setError={setError}
                  setSuccessMessage={setSuccessMessage}
                  setStep={setStep}
                  currentStep={step}
                />
              )}
              <p className="text-center text-white">Logo</p>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

const LoginForm = ({
  setError,
  setSuccessMessage,
}: {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { login, token, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (error) {
      setError(error as string);
    }
  };

  useEffect(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  useEffect(() => {
    if (token && role !== "") {
      navigate("/");
    }
  }, [token, role]);

  return (
    <>
      <form onSubmit={handleLogin} className="w-full space-y-5 p-5 flex-1">
        <Input
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          type="email"
          placeholder="Email"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="********"
          type="password"
        />
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-yellow-500 hover:underline">
            Signup
          </a>
        </p>
        <Button type="primary" action="submit">
          Login
        </Button>
      </form>
    </>
  );
};

const SignupForm = ({
  setError,
  setSuccessMessage,
  setStep,
  currentStep,
}: {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
}) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const success = await signUp(fullName, username, email, password);

      if (success) {
        setSuccessMessage("Account created successfully!");

        // Wait for 3 seconds before navigating to login page
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setSuccessMessage(null);

        navigate("/auth/login");
      }
    } catch (error) {
      setError(error as string);
    }
  };

  const validatePassword = (): boolean => {
    const containsSpecialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const minLength = 8;

    if (password.trim().length === 0) {
      setError("Password cannot be empty");
      return false;
    }

    if (confirmPassword.trim().length === 0) {
      setError("Confirm Password cannot be empty");
      return false;
    }

    if (password.length < minLength) {
      setError(`Password must be at least ${minLength} characters long`);
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!containsSpecialCharRegex.test(password)) {
      setError("Password must contain at least one special character");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    const validPassword = validatePassword();

    if (!validPassword) {
      return;
    }

    setError(null);

    setStep(currentStep + 1);
  };

  useEffect(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  return (
    <>
      <form onSubmit={handleSignup} className="w-full space-y-5 p-5 flex-1">
        {currentStep === 1 ? (
          <>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="email"
              placeholder="Email"
              value={email}
            />
            <div>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="********"
                type="password"
                value={password}
              />
            </div>
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              placeholder="********"
              type="password"
              value={confirmPassword}
            />
          </>
        ) : (
          <>
            <Input
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              type="text"
              placeholder="Full Name"
              value={fullName}
            />
            <Input
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              type="text"
              placeholder="Username"
              value={username}
            />
          </>
        )}

        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/auth/login" className="text-yellow-500 hover:underline">
            Sign in
          </a>
        </p>
        {currentStep === 1 ? (
          <Button type="primary" action="button" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button type="primary" action="submit">
            Sign up
          </Button>
        )}
      </form>
    </>
  );
};

export default Auth;
