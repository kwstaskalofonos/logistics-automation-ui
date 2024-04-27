'use client'
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import React from "react";

const Navbar: React.FunctionComponent = () => {

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session?.user);
  }, [session])

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <svg width="640" height="160" viewBox="0 0 640 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="bd-svg-black" />
            <path />
          </svg>

        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        {/* <div className="navbar-start">
              <a className="navbar-item">
                About
              </a>

              <a className="navbar-item">
                Contact
              </a>
            </div> */}

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {session ?
                <React.Fragment>
                  <div className="navbar-item">
                    {session?.user?.name}
                  </div>
                  <a className="button is-light" onClick={() => signOut()}>
                    Log out
                  </a>
                </React.Fragment>
                :
                <a className="button is-light" onClick={() => router.push('/api/auth/signin')}>
                  Log in
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;