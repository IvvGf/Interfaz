import { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "./client";

const AuthContext = createContext({ user: null, signOut: () => {}, id: undefined });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      setUser(session?.user);
      setId(session?.user?.id);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (_event === "SIGNED_OUT") {
          localStorage.removeItem("user");
        }
        setUser(session?.user);
        setId(session?.user?.id);
        setLoading(false);
      },
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    signOut: () => supabase.auth.signOut(),
    id,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};