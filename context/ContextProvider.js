import React, { createContext} from 'react';

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [auth1,setAuth1]=React.useState(false)
  const [user_details,setUser_details]=React.useState([])
  return (
    <AppContext.Provider value={{
        auth1,
        setAuth1,
        user_details,
        setUser_details
        }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return React.useContext(AppContext);
}