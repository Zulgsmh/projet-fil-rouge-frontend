import Link from "next/link";

const listLink = [
  {
    value: "Home",
    destination: "/home",
  },
  {
    value: "About",
    destination: "/about",
  },
  {
    value: "Pricing",
    destination: "/pricing",
  },
  {
    value: "Contact",
    destination: "/contact",
  },
];

const Navbar = () => {
  return (
    <div className="w-full text-white h-18  py-3  px-10 items-center justify-between flex">
      <h3 className="text-lg">MyEasyContainer</h3>
      <div className="flex gap-10">
        {listLink.map((link: any) => {
          return (
            <Link key={link.value} href={link.destination}>
              <label className=" cursor-pointer border-2 border-transparent hover:border-b-white transition-colors duration-100">
                {link.value}
              </label>
            </Link>
          );
        })}
      </div>
      <button className="btn-inline ">Get started</button>
    </div>
  );
};

export default Navbar;
