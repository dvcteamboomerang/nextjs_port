import NavBar from "../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { checkIfLoggedIn } from "../scripts/common/API";
import { useRouter } from "next/router";
function WebpageTemplate({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkIfLoggedIn(setUser, () => {
      if (router.pathname != "/" && !user) router.push("/");
    });
  }, [user]);

  return (
    <div className={"centerY flowY"}>
      <NavBar user={user} setUser={setUser} />
      {children}
    </div>
  );
}

export default WebpageTemplate;
