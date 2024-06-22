"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { ethers } from "ethers";
import SupplyChainABI from "@/data/SupplyChainABI.json";
import axios from "axios";
import { toast } from "sonner";
import Loading from "./Loading";

export default function PayOrder({ closeModal }: { closeModal: any }) {
  const [order, setOrder] = useState({
    orderId: "",
    price: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleOrder = async () => {
    try {
      setIsLoading(true);
      const contractAddress = (await axios.get("/api/contract-address")).data
        .contractAddress;
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress!,
        SupplyChainABI,
        signer
      );

      const response = await contract.payForOrder(order.orderId, {
        value: order.price,
      });
      toast.success("Ordered Paid successfully");
      setIsLoading(false);
      closeModal();
    } catch (error: any) {
      setIsLoading(false);
      if (error.code === "CALL_EXCEPTION") {
        toast.error(error.reason);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const getOrderValue = async () => {
    try {
      const contractAddress = (await axios.get("/api/contract-address")).data
        .contractAddress;
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress!,
        SupplyChainABI,
        signer
      );

      const response = await contract.getBuyerOrders();

      const data = response.map((products: any) => {
        return {
          orderId: products[0].toString(),
          productId: products[1].toString(),
          quantity: products[2].toString(),
          totalPrice: products[3].toString(),
          isPaid: products[4],
          shipmentStatus: products[5],
          buyer: products[6],
        };
      });

      let pos = -1;

      for(let i = 0; i < data.length; i++) {
        if(data[i].orderId == order.orderId) {

          pos = i;
          break;

          
        } else{
          pos = -1;
        }
      }

      if(pos != -1) {
        setOrder({ ...order, price: data[pos].totalPrice })
      } else {
        setOrder({ ...order, price: "Invalid Order ID" })
      }
    } catch (error) {
      toast.error("Invalid Order Id");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  });

  return (
    <div className="justify-center items-center flex fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex">
      <div
        className="fixed top-0 right-0 bottom-0 left-0 "
        onClick={() => closeModal()}
      ></div>
      {isLoading && <Loading />}
      <div className="fixed rounded-lg flex w-4/5 xl:w-1/4 lg:w-1/2 sm:w-2/3 items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md lg:w-full md:w-4/5 sm:w-full w-5/6">
          <button
            type="button"
            className="absolute top-1 right-1 bg-transparent rounded-full px-3 py-3 text-sm font-semibold text-red shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:text-white"
            onClick={() => closeModal()}
          >
            <X className="h-4 w-4 hover:text-white" />
          </button>
          <h2 className="text-2xl font-bold leading-tight text-black">
            Pay for an Order
          </h2>
          <div className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Order ID{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Your Order ID"
                    value={order.orderId}
                    onChange={(e) => {
                      setOrder({ ...order, orderId: e.target.value });
                     }}
                    onKeyUp={(e) => {
                      getOrderValue();
                    }}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Price{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder={order.price}
                    disabled={true}
                    value={order.price}
                  ></input>
                  <p className="mt-1 text-xs text-gray-500">
                    *1 Ether = 1000000000000000000 wei
                  </p>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-950 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-900/80"
                  onClick={() => {
                    handleOrder();
                  }}
                >
                  Pay <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
