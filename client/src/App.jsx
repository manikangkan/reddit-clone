import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Board from "./components/Board";

import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await localStorage.getItem("reddit-user");
      setUser(JSON.parse(user));
    };
    getUser();
  }, []);

  return (
    <div className="dark:bg-neutral-800">
      {user ? (
        <div className="dark:bg-neutral-800 min-h-screen max-w-4xl mx-auto">
          {/* navbar */}
          <Navbar user={user} />
          {/* board */}
          <Board user={user} />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default App;
