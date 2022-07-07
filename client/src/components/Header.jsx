const Header = () => {
  return (
    <header className="dark:bg-neutral-900">
      {/* header cover & profile */}
      <div className="relative flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
          alt="header cover"
          className="h-24 w-full object-cover"
        />
        <img
          src={`https://avatars.dicebear.com/api/adventurer/:web-dev-board.svg?background=%23ffffff`}
          alt="header profile"
          className="w-16 aspect-square object-cover rounded-sm absolute top-16 border-2 border-neutral-900"
        />
      </div>
      {/* username & tagname */}
      <div className="mt-10 mb-4 text-center">
        <h1 className="dark:text-gray-100 font-semibold text-sm leading-relaxed">
          Web developers for 21 century
        </h1>
        <p className="dark:text-gray-400 text-xs leading-relaxed">@webdev</p>
      </div>
      {/* header links */}
      <div className="px-4 flex items-center justify-between border-t dark:border-neutral-800">
        <div className="w-2/3 flex items-center justify-between">
          <p className="dark:text-gray-100 text-sm font-semibold py-4 border-b-2">
            Posts
          </p>
          <p className="dark:text-gray-400 text-sm">Web dev discord</p>
          <p className="dark:text-gray-400 text-sm">FAQs</p>
        </div>
        <button>Join</button>
      </div>
    </header>
  );
};

export default Header;
