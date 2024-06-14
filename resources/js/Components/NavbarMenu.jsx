import { Button, MegaMenu, Navbar } from "flowbite-react";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { Link, Head } from "@inertiajs/react";

function NavbarMenu({ auth }) {
  return (
    <>
      <div className="pt-2">
        <div className="container flex items-center justify-between">
          <a href="index.html">
            <img src="assets/images/logo.svg" alt="Logo" className="w-32" />
          </a>

          <div className="w-80">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="w-full pl-10 py-2 border border-gray-300 rounded-full shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-300"
                placeholder="Search "
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1117.65 5.35a7.5 7.5 0 010 10.6z"
                  />
                </svg>
              </span>
              <button className="absolute right-0.5 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                Search
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="relative text-center text-gray-700 hover:text-blue-500 transition duration-300"
            >
              <div className="text-2xl">
                <FaRegHeart />
              </div>
              <div className="text-xs leading-3">Wishlist</div>
              <div className="absolute right-1 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-blue-500 text-white text-xs">
                8
              </div>
            </a>
            <a
              href="#"
              className="relative text-center text-gray-700 hover:text-blue-500 transition duration-300"
            >
              <div className="text-2xl">
                <LuShoppingCart />
              </div>
              <div className="text-xs leading-3">Cart</div>
              <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-blue-500 text-white text-xs">
                2
              </div>
            </a>
            <a
              href="#"
              className="relative text-center text-gray-700 hover:text-blue-500 transition duration-300"
            >
              <div className="text-2xl">
                <FiUser />
              </div>
              <div className="text-xs leading-3">Account</div>
            </a>
          </div>
        </div>
      </div>
      <MegaMenu>
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
          <Navbar.Brand href="/" className="mr-auto">
            <img alt="" src="/favicon.svg" className="mr-3 h-6 sm:h-9" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              237 Furniture store
            </span>
          </Navbar.Brand>
          <div className="order-2 hidden items-center md:flex">
            {auth.user ? (
              <Link
                href={route("dashboard")}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={route("login")}
                  className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5"
                >
                  Log in
                </Link>
                <Link
                  href={route("register")}
                  className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#2079ff] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="#">Home</Navbar.Link>
            <Navbar.Link>
              <MegaMenu.Dropdown toggle={<>Company</>}>
                <ul className="grid grid-cols-3">
                  <div className="space-y-4 p-4">
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Library
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Resources
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Pro Version
                      </a>
                    </li>
                  </div>
                  <div className="space-y-4 p-4">
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Support Center
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Terms
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Blog
                      </a>
                    </li>
                  </div>
                  <div className="space-y-4 p-4">
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Newsletter
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Playground
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        License
                      </a>
                    </li>
                  </div>
                </ul>
              </MegaMenu.Dropdown>
            </Navbar.Link>
            <Navbar.Link href="#">Team</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </div>
      </MegaMenu>
    </>
  );
}

export default NavbarMenu;
