import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { verifyUser } from "../services/userservices";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await verifyUser();
      if (response.status === 200) {
        setUser({
          email: response.data.email,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
        });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, getData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
