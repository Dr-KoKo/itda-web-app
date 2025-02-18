import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "react-oidc-context";
import Avatar from "../../components/common/atoms/Avatar";
import { PAGE_URL } from "../../constants/application";

const navigation = [
  { name: "Job Posts", href: PAGE_URL.JOB_POSTS },
  { name: "Team Posts", href: PAGE_URL.TEAM_POSTS },
  { name: "Random Match", href: PAGE_URL.RANDOM_MATCH },
];

const myMenu = [
  { name: "My Resume", url: PAGE_URL.MY_RESUME },
  { name: "My Preference", url: PAGE_URL.MY_PREFERENCE },
];

const TOKEN_REGENERATE_CONFIRM_MESSAGE =
  "You're about to be signed out due to inactivity. Press OK to stay signed in.";

const MainNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [myMenuOpen, setMyMenuOpen] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    return auth.events.addAccessTokenExpiring(() => {
      if (window.confirm(TOKEN_REGENERATE_CONFIRM_MESSAGE)) {
        auth.signinSilent();
      }
    });
  }, [auth, auth.events, auth.signinSilent]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        myMenuOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest(".user-menu")
      ) {
        setMyMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [myMenuOpen]);

  const handleClickAvatar = () => {
    setMyMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Itda</span>
            <img alt="" src="/itda.svg" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-gray-300 transition-all duration-300 hover:scale-110 hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-3">
          {auth.isAuthenticated ? (
            <>
              <span className="cursor-default text-gray-300">{auth.user?.profile.name}</span>
              <div className="user-menu relative">
                <button
                  className="hover:taget cursor-pointer text-sm/6 font-semibold text-gray-300 transition-all duration-300 hover:scale-110 hover:text-white"
                  onClick={handleClickAvatar}
                >
                  <Avatar size={"sm"} src={auth.user?.profile.picture} />
                </button>

                {myMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-gray-800 p-2 shadow-lg">
                    {myMenu.map((menu) => (
                      <a
                        key={menu.name}
                        href={menu.url}
                        className="block rounded-md px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        {menu.name}
                      </a>
                    ))}
                    <button
                      onClick={() => void auth.removeUser()}
                      className="block w-full cursor-pointer rounded-md px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              className="cursor-pointer text-sm/6 font-semibold text-gray-300 transition-all duration-300 hover:scale-110 hover:text-white"
              onClick={() => void auth.signinRedirect()}
            >
              Log in
            </button>
          )}
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Itda</span>
              <img alt="" src="/itda.svg" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="space-y-2 py-6">
                {myMenu.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {auth.isAuthenticated ? (
                  <>
                    <button
                      className="-mx-3 block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-base/7 font-semibold text-gray-900 hover:bg-gray-100"
                      onClick={() => void auth.removeUser()}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <button
                    className="-mx-3 block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-base/7 font-semibold text-gray-900 hover:bg-gray-100"
                    onClick={() => void auth.signinRedirect()}
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default MainNavbar;
