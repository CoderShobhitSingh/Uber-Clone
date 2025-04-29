import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div
        className="bg-cover bg-center h-screen pt-8 flex justify-between flex-col w-full"
        style={{
          backgroundImage:
            "url('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_690,w_552/v1712735385/assets/1d/f42839-21ae-4896-8a5f-21b15058f429/original/Airport-taxi-pickup.png')",
        }}
      >
        <img
          className="w-24 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white pb-8 py-4 px-4">
          <h2 className="text-[30px] font-semibold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
