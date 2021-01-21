import { createContext, useContext, useState, useEffect } from 'react';
import { Season } from '../interfaces/anime';
import { CurrentUser } from '../interfaces/currentUser';

interface AppContextInterface {
  currentUser: CurrentUser | null;
}
const AppContext = createContext<AppContextInterface | null>(null);

export function useUserContext() {
  return useContext(AppContext);
}
export function AppWrapper({ children }: { children: any }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [season, setSeason] = useState<Season | null>(null);

  let sharedState = {
    currentUser,
    season,
    setCurrentUser,
    setSeason,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}
