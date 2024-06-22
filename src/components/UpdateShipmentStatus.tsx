"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { ArrowRight, X } from "lucide-react";
import { toast } from "sonner";
import SupplyChainABI from "@/data/SupplyChainABI.json";
import Loading from "@/components/Loading";

export default function UpdateShipmentStatus({
  closeModal,
}: {
  closeModal: any;
}) {
  const [order, setOrder] = useState({
    address: "",
    orderId: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateStatus = async () => {
    try {
      setIsLoading(true);
      const contractAddress = (await axios.get("/api/contract-address")).data
        .contractAddress;
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress!,
        SupplyChainABI,
        signer
      );
      await contract.updateShipmentStatus(
        order.address,
        order.orderId,
        order.status
      );
      toast.success("Shipment status updated successfully");
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
            Update Shipment Status
          </h2>
          <div className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Buyer Address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Buyer Address"
                    value={order.address}
                    onChange={(e) =>
                      setOrder({ ...order, address: e.target.value })
                    }
                  ></input>
                </div>
              </div>
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
                    placeholder="Order ID"
                    value={order.orderId}
                    onChange={(e) =>
                      setOrder({ ...order, orderId: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Shipment Status{" "}
                </label>
                <div className="mt-2">
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="shipmentStatus"
                    onChange={(e) =>
                      setOrder({ ...order, status: e.target.value })
                    }
                  >
                    <option value="0">Pending</option>
                    <option value="1">Intransit</option>
                    <option value="2">Shipped</option>
                    <option value="3">Delivered</option>
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-950 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-900"
                  onClick={() => {
                    handleUpdateStatus();
                  }}
                >
                  Update Status <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
