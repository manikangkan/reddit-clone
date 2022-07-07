import { Alert } from "../icons/Alert";
import { Add } from "../icons/Add";
import { Chat } from "../icons/Chat";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const handleSignOut = () => {
    localStorage.removeItem("reddit-user");
    window.location.reload();
  };
  return (
    <nav className="dark:bg-neutral-900 flex items-center justify-between p-4">
      {/* logo */}
      <Link to="/">
        <img
          src="https://avatars.githubusercontent.com/u/75943412?v=4"
          alt="logo"
          className="w-8 aspect-square rounded-sm object-cover"
        />
      </Link>
      {/* nav profile */}
      <section className="w-1/2 flex items-center justify-between">
        <Add />
        <Alert />
        <Chat />
        <img
          src={`https://avatars.dicebear.com/api/adventurer/:${user.username}.svg?background=%23ffffff`}
          alt="profile image"
          className="w-8 aspect-square rounded-sm object-cover cursor-pointer"
          onClick={handleSignOut}
        />
      </section>
    </nav>
  );
};

export default Navbar;
