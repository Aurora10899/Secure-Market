"use client";

import { ethers } from "ethers";
import React, { useState } from "react";
import SupplyChainABI from "@/data/SupplyChainABI.json";
import { toast } from "sonner";
import axios from "axios";
import { Search, X } from "lucide-react";

export default function GetProduct() {
  const [closeModal, setCloseModal] = useState(false);
  const [productID, setProductID] = useState("");
  const [showData, setShowData] = useState(false);
  const [data, setData] = useState({
    productId: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    supplier: "",
  });

  const handleChange = async () => {
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
      const response = await contract.getProduct(productID);
      setData({
        productId: response[0].toString(),
        name: response[1],
        description: response[2],
        price: response[3].toString(),
        quantity: response[4].toString(),
        supplier: response[5],
      });
      console.log(data);
      setShowData(true);
      document.body.style.overflow = "hidden";
      setCloseModal(true);
    } catch (error: any) {
      if (error.code === "CALL_EXCEPTION") {
        toast.error(error.reason);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  

  return (
    <div className="w-full justify-center items-center flex-col p-5">
      <div className="w-full justify-center items-center flex">
        <div className="flex w-full items-center space-x-2 md:w-2/3 lg:w-1/2 xl:w-1/3">
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Search a Specific by Product ID"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
          ></input>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={handleChange}
          >
            <Search size={20} />
          </button>
        </div>
      </div>
      {showData && closeModal && (
        <div className="justify-center items-center flex fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex">
          <div
            className="fixed top-0 right-0 bottom-0 left-0 "
            onClick={() => {
                setCloseModal(false);
                document.body.style.overflow = "auto";
            }}
          ></div>
          <div className="fixed flex w-4/5 xl:w-1/4 lg:w-1/2 sm:w-2/3 items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md lg:w-full md:w-4/5 sm:w-full w-5/6">
              <button
                type="button"
                className="absolute top-1 right-1 bg-transparent rounded-full px-3 py-3 text-sm font-semibold text-red shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:text-white"
                onClick={() => {
                    setCloseModal(false);
                    document.body.style.overflow = "auto";
                }}
              >
                <X className="h-4 w-4 hover:text-white" />
              </button>
              <section className="overflow-hidden">
                <div className="mx-auto max-w-5xl px-5 py-24">
                  <div className="mx-auto flex flex-wrap items-center lg:w-full">
                    <div className="mt-6 w-full lg:mt-0 lg:w-full lg:pl-10">
                      <h2 className="text-sm font-semibold tracking-widest text-gray-500">
                        Product ID: {data.productId}
                      </h2>
                      <h1 className="my-4 text-3xl font-semibold text-black">
                        {data.name}
                      </h1>
                      <div className="my-4 flex items-center"></div>
                      <p className="leading-relaxed">{data.description}</p>
                      <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
                        <div className="flex items-center">
                          <span className="mr-3 text-sm font-semibold">
                            Quantity: {data.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="title-font text-lg font-bold text-gray-900">
                          {data.price} Wei
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        *1 Ether = 1000000000000000000 Wei
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
