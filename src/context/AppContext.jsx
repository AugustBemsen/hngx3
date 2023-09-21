import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { images } from "../assets";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export const AppContext = preserveRef("c", createContext());

function preserveRef(key, v) {
  if (import.meta.env.PROD) return v;

  const old = import.meta.hot.data[key];
  const now = old || v;

  import.meta.hot.on("vite:beforeUpdate", () => {
    import.meta.hot.data[key] = now;
  });

  return now;
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(images);
  const [query, setQuery] = useState("");

  const auth = getAuth();

  //function handling logout
  const onLogout = async () => {
    //successful signout
    await signOut(auth)
      .then(() => {
        toast.success("Hope to see you soon!");
        window.location.replace("/");
      })
      .catch((error) => {
        // errors
        toast.error("Error " + error);
      });
  };

  //authentication
  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    // Clean up the listener
    return () => unsubscribe();
  }, [auth]);

  //loading state
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after the timeout
    }, 4000);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);

  //for image data
  useEffect(() => {
    setData(data);
    setLoading(true);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        data,
        query,
        setQuery,
        onLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
