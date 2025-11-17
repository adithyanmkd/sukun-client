import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { completeGoogleLogin } from "../authSlice";
import { useAppDispatch } from "@/app/hooks";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const userJson = searchParams.get("user");

    if (!token || !userJson) {
      navigate("/login");
      return;
    }
    let user;
    try {
      user = JSON.parse(decodeURIComponent(userJson));
    } catch (error) {
      console.log("Failed to parse user", error);
      navigate("/login");
      return;
    }

    if (token) {
      dispatch(completeGoogleLogin({ token, user }))
        .unwrap()
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchParams, navigate, dispatch]);
  return <div></div>;
};

export default GoogleCallback;
