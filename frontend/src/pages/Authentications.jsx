import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNotification } from "../contexts/NotificationContext";
import Checkbox from "@mui/material/Checkbox";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import { createUser, logingUser } from "../services/userservices";

const Authentications = () => {
  const { showNotification } = useNotification();
  const { setUser } = useContext(AuthContext);
  const [showNext, setShowNext] = useState(true);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(null);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  const submitLogin = async () => {
    if (!email || !password) {
      showNotification("All inputs not provided", "error");
      return;
    }
    try {
      const reponse = await logingUser(email, password);
      if (reponse.status == 200) {
        showNotification(reponse.data.message, "success");
        localStorage.setItem("jwt", reponse.data.token);
        setUser({
          email: reponse.data.email,
          firstname: reponse.data.firstname,
          lastname: reponse.data.lastname,
        });
      } else {
        showNotification(reponse.message, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitRegister = async () => {
    if (!email || !password || !confPassword) {
      showNotification("All inputs not provided", "error");
      return;
    }
    if (password !== confPassword) {
      showNotification("Password and confirm password do not match", "error");
      return;
    }
    if (!termsChecked) {
      showNotification("You must agree to the terms and conditions", "error");
      return;
    }
    try {
      const reponse = await createUser(
        firstName,
        lastName,
        dob,
        gender,
        email,
        password,
      );
      if (reponse.status === 201 || reponse.status === 200) {
        showNotification(reponse.data.message, "success");
        setIsLogin(true);
      } else {
        showNotification(reponse.message || "Registration failed", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const check_first_error = () => {
    if (!firstName || !lastName || !dob || !gender) {
      showNotification("All inputs not provided", "error");
      return;
    }
    if (!dob_validation()) return;

    setShowNext(false);
  };

  const dob_validation = () => {
    if (!dob) {
      showNotification("Date of birth is required", "error");
      return false;
    }

    const today = new Date();
    const birthDate = new Date(dob);

    if (birthDate > today) {
      showNotification("Date of birth cannot be in the future", "error");
      return false;
    }

    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    let finalAge = age;

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      finalAge--;
    }

    if (finalAge < 18) {
      showNotification("You must be at least 18 years old", "error");
      return false;
    }

    return true;
  };

  return (
    <div className=" flex items-center justify-center h-screen">
      <div className=" bg-slate-100 p-10 rounded-lg">
        {!isLogin ? (
          showNext ? (
            <>
              <div className=" text-4xl pl-2 my-7 font-semibold">
                Welcome!
                <br /> Tell me about youself
              </div>
              <div className=" flex flex-col  gap-6">
                <TextField
                  required={true}
                  label={"First name"}
                  className=" w-[400px]"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <TextField
                  required={true}
                  label={"Last name"}
                  className=" w-[400px]"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                <div>
                  <TextField
                    type="date"
                    label={"Date of birth"}
                    className=" w-[400px]"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required={true}
                    onChange={(e) => setDob(e.target.value)}
                    value={dob}
                  />
                </div>
                <div>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    row
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </div>
                <Button
                  variant="contained"
                  sx={{
                    width: "400px",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#000000",
                    },
                  }}
                  onClick={check_first_error}
                >
                  Next
                </Button>
                <div>
                  If you already have an account?{" "}
                  <span
                    className=" text-blue-700 font-semibold underline cursor-pointer"
                    onClick={() => setIsLogin(true)}
                  >
                    SignIn
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className=" mt-[-10px] font-semibold flex items-center hover:text-orange-600 cursor-pointer duration-300 ml-[-20px]"
                onClick={() => setShowNext(true)}
              >
                <ArrowBackIcon
                  sx={{
                    fontSize: "30px",
                  }}
                />
                {/* <span>PREV</span> */}
              </div>
              <div className=" text-3xl pl-2 my-9 font-semibold">
                Almost there!
                <br />
                Create your login details
              </div>

              <div className=" flex flex-col  gap-6">
                <TextField
                  required={true}
                  label={"Your email"}
                  className=" w-[400px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required={true}
                  label={"Password"}
                  className=" w-[400px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <TextField
                  required={true}
                  label={"Confirm password"}
                  className=" w-[400px]"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  type="password"
                />
                <div className="text-center">
                  I agree terms and conditions{" "}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsChecked}
                        onChange={(e) => setTermsChecked(e.target.checked)}
                      />
                    }
                  />
                </div>
                <Button
                  variant="contained"
                  sx={{
                    width: "400px",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#000000",
                    },
                  }}
                  onClick={submitRegister}
                >
                  Next
                </Button>
                <div>
                  If you already have an account?{" "}
                  <span
                    className=" text-blue-700 font-semibold underline cursor-pointer"
                    onClick={() => setIsLogin(true)}
                  >
                    SignIn
                  </span>
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <div className=" text-4xl pl-2 my-7 font-semibold">
              Welcome Back!
              <br /> Sign in to your account
            </div>
            <div className="flex flex-col gap-6">
              <TextField
                required={true}
                label={"Email"}
                className=" w-[400px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required={true}
                label={"Password"}
                className=" w-[400px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <Button
                variant="contained"
                sx={{
                  width: "400px",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#000000",
                  },
                }}
                onClick={submitLogin}
              >
                Next
              </Button>
              <div className="">
                Don't have an account?{" "}
                <span
                  className=" text-blue-700 font-semibold underline cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  SignUp
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Authentications;
