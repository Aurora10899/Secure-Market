"use client";

import AddProduct from "@/components/AddProduct";
import {
  ArrowRight,
  Blocks,
  ClipboardPen,
  CircleDollarSign,
  Box,
} from "lucide-react";
import GetProduct from "@/components/GetProduct";
import GetAllProducts from "@/components/GetAllProducts";
import { useEffect, useState } from "react";
import UpdateProduct from "@/components/ProductUpdate";
import axios from "axios";
import { toast } from "sonner";
import { ethers } from "ethers";
import SupplyChainABI from "@/data/SupplyChainABI.json";
import OrderRandom from "@/components/OrderRandom";
import UserOrders from "@/components/UserOrders";
import PayOrder from "@/components/PayOrder";
import { useRouter } from "next/navigation";

export default function DashboardPage({ params }: any) {
  const router = useRouter();
  const [isSeller, setIsSeller] = useState(false);

  const [addProductModel, setAddProductModel] = useState(false);
  const [updateProductModel, setUpdateProductModel] = useState(false);
  const [orderRandomModel, setOrderRandomModel] = useState(false);
  const [payOrderModel, setPayOrderModel] = useState(false);

  const checkSeller = async () => {
    try {
      const contractAddress = (await axios.get("/api/contract-address")).data
        .contractAddress;
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(
        contractAddress!,
        SupplyChainABI,
        signer
      );
      const response = await contract.getAllSuppliers();
      const data = response.map((suppliers: any) => {
        return {
          supplierAddress: suppliers.toString(),
        };
      });

      for (let i = 0; i < response.length; i++) {
        const supplier = data[i];
        if (supplier.supplierAddress === address) {
          setIsSeller(true);
          break;
        } else {
          setIsSeller(false);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.status === 200) {
        window.location.reload();
        router.push("/");
        toast.success("Logout Successful");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleIsLoggedIn = async () => {
    try {
      const response = await axios.get("/api/users/loginstatus");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      if (response.data.isLogged == address) {
      } else {
        handleLogout();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    checkSeller();
    const interval = setInterval(async () => {
      await handleIsLoggedIn();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const closeAddProductModal = () => setAddProductModel(false);
  const closeUpdateProductModal = () => setUpdateProductModel(false);
  const closeOrderRandomModal = () => setOrderRandomModel(false);
  const closePayOrderModal = () => setPayOrderModel(false);

  return (
    <div className="flex flex-col space-y-10 mb-10">
      <div className="flex justify-end px-5 py-5">
        <button
          type="button"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400/80 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <GetProduct />
      <GetAllProducts />
      <div className="px-2 py-2 md:px-6 md:py-10">
        <hr className="sm:w-2/4 h-0.5 mx-auto my-4 bg-gray-800 border-0 rounded" />
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl text-center">
          Buyer's Corner
        </h1>
        <hr className="sm:w-2/4 h-0.5 mx-auto my-4 bg-gray-800 border-0 rounded" />
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-2 xl:gap-16 justify-around">
          <div
            className="space-y-3 xl:m-20 lg:m-20 md:m-10 bg-blue-950 p-6 rounded-lg hover:bg-blue-900"
            onClick={() => setOrderRandomModel(true)}
          >
            <span className="inline-block rounded-full bg-gray-50 p-3 text-black">
              <Box size={40} />
            </span>
            <h1 className="text-xl font-semibold capitalize text-white">
              Order A Product
            </h1>
            <p className="text-sm text-gray-500">
              Order a product from any of the mentioned sellers in the above list
            </p>
            <button
              className="-mx-1 inline-flex transform items-center text-sm font-semibold capitalize text-white transition-colors duration-300 hover:underline"
              onClick={() => setOrderRandomModel(true)}
            >
              Order
              <ArrowRight size={16} />
            </button>
          </div>
          {orderRandomModel && (
            <OrderRandom closeModal={closeOrderRandomModal} />
          )}
          <div
            className="space-y-3 xl:m-20 lg:m-20 md:m-10 bg-blue-950 p-6 rounded-lg hover:bg-blue-900"
            onClick={() => setPayOrderModel(true)}
          >
            <span className="inline-block rounded-full bg-gray-50 p-3 text-black">
              <CircleDollarSign size={40} />
            </span>
            <h1 className="text-xl font-semibold capitalize text-white">
              Pay for an Order
            </h1>
            <p className="text-sm text-gray-500">
              Pay for the orders that you have placed
            </p>
            <button
              className="-mx-1 inline-flex transform items-center text-sm font-semibold capitalize text-white transition-colors duration-300 hover:underline"
              onClick={() => setPayOrderModel(true)}
            >
              Pay
              <ArrowRight size={16} />
            </button>
          </div>
          {payOrderModel && <PayOrder closeModal={closePayOrderModal} />}
        </div>
      </div>
      <UserOrders />
      {isSeller && (
        <div className="px-2 py-2 md:px-6 md:py-10">
          <hr className="sm:w-2/4 h-0.5 mx-auto my-4 bg-gray-800 border-0 rounded" />
          <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl text-center">
            Seller's Corner
          </h1>
          <hr className="sm:w-2/4 h-0.5 mx-auto my-4 bg-gray-800 border-0 rounded" />
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-2 xl:gap-16 justify-around">
            {isSeller && (
              <div
                className="space-y-3 xl:m-20 lg:m-20 md:m-10 bg-blue-950 p-6 rounded-lg hover:bg-blue-900"
                onClick={() => setAddProductModel(true)}
              >
                <span className="inline-block rounded-full bg-gray-50 p-3 text-black">
                  <Blocks size={40} />
                </span>
                <h1 className="text-xl font-semibold capitalize text-white">
                  Sell Your Products
                </h1>
                <p className="text-sm text-gray-500">
                  Add your products and sell them on our platform
                </p>
                <button
                  className="-mx-1 inline-flex transform items-center text-sm font-semibold capitalize text-white transition-colors duration-300 hover:underline"
                  onClick={() => setAddProductModel(true)}
                >
                  Add Product
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
            {isSeller && addProductModel && (
              <AddProduct closeModal={closeAddProductModal} />
            )}
            {isSeller && (
              <div
                className="space-y-3 xl:m-20 lg:m-20 md:m-10 bg-blue-950 p-6 rounded-lg hover:bg-blue-900"
                onClick={() => setUpdateProductModel(true)}
              >
                <span className="inline-block rounded-full bg-gray-50 p-3 text-black">
                  <ClipboardPen size={40} />
                </span>
                <h1 className="text-xl font-semibold capitalize text-white">
                  Update Your Products
                </h1>
                <p className="text-sm text-gray-500">
                  Update the details of your products
                </p>
                <button
                  className="-mx-1 inline-flex transform items-center text-sm font-semibold capitalize text-white transition-colors duration-300 hover:underline"
                  onClick={() => setUpdateProductModel(true)}
                >
                  Update Product
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
            {isSeller && updateProductModel && (
              <UpdateProduct closeModal={closeUpdateProductModal} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
