import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { clearCart, clearItem, decreaseItemCount, increaseItemCount } from "../utils/cartSlice";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { toast } from 'react-toastify';

const Cart = () => {
  const [itemTotalAmount, setItemTotalAmount] = useState(0);
  const [amountToPay, setAmountToPay] = useState(0);
  const cartItems = useSelector((store) => store.cart.items);
  const resNeededInfo = useSelector((store) => store.cart.restaurant);
  const dispatch = useDispatch();

  // to calculate total amount of items only
  useEffect(() => {
    function getItemTotalAmount() {
      let total = 0;

      if (cartItems.length !== 0) {
        cartItems.forEach((item) => {
          total += (item.card.info.price / 100 || item.card.info.defaultPrice / 100) * (item.quantity)
        })
      }
      total = Number(total.toFixed(2));
      setItemTotalAmount(total);
    }

    getItemTotalAmount();
  }, [cartItems]);

  // to calulate overall amountToPay after adding all extra charges
  useEffect(() => {
    function getTotalAmountToPay() {
      let total = 0;
      let deliveryFee = (resNeededInfo?.feeDetails?.totalFee / 100 || 0);
      let gst = Number((itemTotalAmount * 0.18).toFixed(2));

      total = (itemTotalAmount + deliveryFee + gst);
      setAmountToPay(total);
    }

    getTotalAmountToPay();
  }, [itemTotalAmount]);


  return cartItems.length !== 0 ? (
    <div className="pt-[12vh]">
      <h1 className="mt-4 text-4xl text-center font-bold">
        Your <span className="text-orange-500">Cart</span>
      </h1>
      <div className=" w-full md:flex justify-between border-2 my-4">
        <section className="w-full md:w-[60%] p-4">

          {/* restuarant Information */}
          <div className="w-full flex justify-between p-2 border-2 border-slate-200 bg-slate-100 shadow-md">
            <div>
              <h3 className="text-xl sm:text-3xl font-bold">{resNeededInfo.name}</h3>
              <h4 className="py-1">{resNeededInfo.cuisines.join(", ")}</h4>
              <h4 className="pb-1">
                <MdAccessTime className=" inline text-green-500 font-bolder text-xl mb-1 mr-2" />
                {resNeededInfo.sla.slaString}
              </h4>
              <h4 className={` ${resNeededInfo.avgRating < 4 ? 'bg-red-500' : 'bg-green-500'} inline rounded text-white p-[3px]`} >
                <FaStar className="inline mb-1 " /> {resNeededInfo.avgRating}
              </h4>

            </div>

            <img
              src={CDN_URL + resNeededInfo.cloudinaryImageId}
              alt="resImage"
              className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] object-cover border-2 border-slate-200 shadow-md"
            />
          </div>

          {/* **** cartItem items list **** */}
          <div className="w-full mt-3 border-2 border-slate-200 bg-slate-100 shadow-md">

            {cartItems.map((cartItem) => (
              <div key={cartItem.card.info.id} className="flex items-center m-2 p-2 border-b-2">
                <img
                  src={CDN_URL + cartItem.card.info.imageId}
                  alt="item-image"
                  className="w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] object-cover shadow-md"
                />

                <div className="w-full pl-2 ">
                  <div className="flex justify-between pb-2">
                    <h2 className="">{cartItem.card.info.name}</h2>
                    <MdDeleteForever
                      className="ml-2 text-2xl cursor-pointer text-red-500"
                      onClick={() => {
                        dispatch(clearItem(cartItem.card.info.id));
                        toast.error("1 item removed from the Cart.");
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="border-slate-300 flex justify-evenly border-2 bg-white text-green-500  font-semibold rounded-md shadow-md">
                      <div
                        className="p-2 cursor-pointer hover:bg-slate-300 hover:text-orange-500"
                        onClick={() => {
                          if(cartItem.quantity == 1) {
                            toast.error("1 item removed from cart");
                          }
                          dispatch(decreaseItemCount(cartItem.card.info.id))
                        }}
                      >
                        -
                      </div>
                      <span className="py-2 px-1">{cartItem.quantity}</span>
                      <div
                        className="p-2 cursor-pointer hover:bg-slate-300 hover:text-orange-500"
                        onClick={() => dispatch(increaseItemCount(cartItem.card.info.id))}
                      >
                        +
                      </div>
                    </div>
                    <p className="font-bold">
                      ₹ {(cartItem.quantity * (cartItem.card.info.price / 100 || cartItem.card.info.defaultPrice / 100)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="w-full flex justify-between p-4 ">
              <button
                className="py-2 px-1 text-sm  sm:px-4 bg-red-500 text-white font-bold hover:bg-red-700"
                onClick={() => {
                  dispatch(clearCart());
                  toast.error("All items removed from Cart.")
                }}
              >Clear Cart</button>

              <button className="py-2 px-1 text-sm  sm:px-4 bg-green-500 text-white font-bold hover:bg-green-700">
                <Link to={"/restaurant/" + resNeededInfo.id}>
                  Add more Items
                </Link>
              </button>
            </div>
          </div>

        </section>

        {/* order summary section */}
        <section className="w-full p-4 md:w-[40%]">
          <table className="border-2 border-orange-400 w-full">
            <caption className="text-center text-2xl font-bold p-4">Order Summary</caption>
            <thead>
              <tr className="border-b-2 p-3 border-slate-100">
                <th className="text-left p-2">Bill Type</th>
                <th className="text-left p-2 border-l-2 border-slate-100">Price (₹)</th>
              </tr>
            </thead>
            <tbody className="border-2 border-orange-400 w-full">
              <tr className="border-b-2 p-3 border-slate-100">
                <td className="p-2">Item Total</td>
                <td className="p-2 border-l-2 border-slate-100">₹{itemTotalAmount}</td>
              </tr>
              <tr className="border-b-2 p-3 border-slate-100">
                <td className="p-2">Delivery Fee | {resNeededInfo.sla.lastMileTravelString}</td>
                <td
                  className="p-2 border-l-2 border-slate-100"
                >₹{(resNeededInfo.feeDetails.totalFee / 100) || 0}</td>
              </tr>
              <tr className="border-b-2 p-3 border-orange-500">
                <td className="p-2">GST and Restaurant Charges</td>
                <td className="p-2 border-l-2 border-slate-100">₹{(itemTotalAmount * 0.18).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">To Pay</td>
                <td className="p-2 font-bold border-l-2 border-orange-500">₹{amountToPay}</td>
              </tr>
            </tbody>
          </table>

          <Link to="/">
            <button
              className="w-full my-2 p-4 bg-orange-500 text-white font-bold cursor-pointer"
              onClick={() => {
                dispatch(clearCart());
                toast.success("Your order is placed. Cart is empty now.", {autoClose: 2000});
              }}
            >
              Place Order
            </button>
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="pt-[12vh]">
      <div className="my-6 flex flex-col items-center justify-center w-full sm:w-[60vw] m-auto text-center">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
          className="w-[80vw] sm:w-[30vw]"
          alt="empty_cart"
        />

        <p className="my-2 text-xl font-semibold text-slate-700">Your Cart is Empty</p>
        <p className="text-slate-500 ">You can go to home page to view more restaurants</p>
        <button className="my-4 px-4 p-2 text-lg bg-orange-500 text-white font-medium hover:bg-orange-400">
          <Link to="/">
            SEE RESTAURANTS NEAR YOU
          </Link>
        </button>
      </div>
      <Footer />
    </div>

  )
}

export default Cart;