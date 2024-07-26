import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header"; // /Header or /Header.js (both work fine)
import Error from "./components/Error";
import RestaurantMenu from "./pages/RestaurantMenu.jsx";
import { Provider } from "react-redux";
import store from "./utils/appStore";
import Cart from "./pages/Cart.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home.jsx";
// Lazy loading 
// Wrap inside <Suspense> component by react (to not show error between the loading time of the component) 
const About = lazy(() => import("./pages/About.jsx"))


const AppLayout = () => {

    return (
        <Provider store={store}>
            <div className="app font-Roboto">
                <Header />
                <Outlet />
                {/* for popup notification */}
                <ToastContainer stacked autoClose={1000}/>  
            </div>
        </Provider>
    );
};

// **** Creating Routing configuration *****
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <Suspense fallback={<h1>Loading......</h1>}>
                    <About />
                </Suspense>,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />,
            },
        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppLayout />); 

// <RouterProvider />  (a component by react-router-dom)
root.render(<RouterProvider router={appRouter} />);
