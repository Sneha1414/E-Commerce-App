import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { useCartContext } from "../context/cart_context";
import { toast } from "react-toastify";


const Nav = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const { total_item, clearCart } = useCartContext();
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  const handleDeleteAccount = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updateUsers = users.filter(user => user.email !== authUser.email);
    localStorage.setItem('users', JSON.stringify(updateUsers));
    localStorage.removeItem('authUser');
    localStorage.removeItem('cart');
    clearCart();
    toast.success('Account deleted successfully');
    navigate('/');
  };

  const Nav = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }

        &.user-login,
        &.user-login--name {
          font-size: 1.8rem;
          text-decoration: none;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &.user-login {
          padding: 1.4rem 2.4rem;
          border: none;
          background-color: rgb(98 84 243);
          color: rgb(255 255 255);
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          max-width: auto;

          &:hover {
            box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
            transform: scale(0.96);
          }
        }

        &.user-logout {
          font-size: 1.4rem;
          padding: 0.8rem 1.4rem;
          background-color: ${({ theme }) => theme.colors.btn};
          color: ${({ theme }) => theme.colors.white};
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
            box-shadow: ${({ theme }) => theme.colors.shadowSupport};
            transform: scale(0.96);
          }
        }
      }
    }
  }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }

      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;

        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }

        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

  return (
    <Nav>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="navbar-link cart-trolley--link">
              <FiShoppingCart className="cart-trolley" />
              <span className="cart-total--item"> {total_item} </span>
            </NavLink>
          </li>
          {authUser ? (
            <>
              <li>
                <span className="navbar-link user-login--name">
                  Welcome, {authUser.name}
                </span>
              </li>
              <li>
                <button className="navbar-link user-logout" onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/register"
                       className="navbar-link user-login"
                       onClick={() => setMenuIcon(false)}>
                        Register
              </NavLink>
            </li>
          )}
        </ul>

        {/* two button for open and close of menu */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </Nav>
  );
};

export default Nav;