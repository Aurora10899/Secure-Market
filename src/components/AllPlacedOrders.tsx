"use client";

import { ethers } from "ethers";
import { RefreshCw } from "lucide-react";
import SupplyChainABI from "@/data/SupplyChainABI.json";
import { toast } from "sonner";
import axios from "axios";
import React, { useState, useEffect } from "react";
import UpdateShipmentStatus from "@/components/UpdateShipmentStatus";

export default function AllPlacedOrders() {
  const [contractData, setContractData] = useState([]);
  const [updateShipmentStatus, setUpdateShipmentStatus] = useState(false);

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
      const response = await contract.getAllOrders();
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

      setContractData(data);
    } catch (error: any) {
      if (error.code === "CALL_EXCEPTION") {
        toast.error(error.reason);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    handleChange();
  }, []);

  const closeUpdateShipmentStatusModal = () => {
    setUpdateShipmentStatus(false);
  };

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:relative">
          <div>
            <h1 className="text-lg font-bold">Orders</h1>
            <p className="mt-1 text-sm text-gray-700">
              This is the list of all Placed Orders.
              <br />* 1 ETH = 1000000000000000000 Wei
            </p>
          </div>
          <div className="md:absolute md:top-3 md:right-20">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md bg-teal-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-900/80"
              onClick={() => setUpdateShipmentStatus(true)}
            >
              Shipment Status
            </button>
          </div>
          <div>
            {updateShipmentStatus && (
              <UpdateShipmentStatus
                closeModal={closeUpdateShipmentStatusModal}
              />
            )}
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400/80 hover:text-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleChange}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="table-auto min-w-full table-auto divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Order ID</span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Product ID
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Quantity
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Total Price
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Payment
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Buyer Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {contractData.map((product: any) => {
                      if (product.isPaid) {
                        return (
                          <tr key={product.productId}>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.orderId}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.productId}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.quantity}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.totalPrice}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              {product.isPaid ? (
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                  Paid
                                </span>
                              ) : (
                                <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                  Unpaid
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.shipmentStatus == 1 ? (
                                  <span className="inline-flex rounded-full bg-amber-100 px-2 text-xs font-semibold leading-5 text-amber-800">
                                    Intransit
                                  </span>
                                ) : product.shipmentStatus == 2 ? (
                                  <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                                    Shipped
                                  </span>
                                ) : product.shipmentStatus == 3 ? (
                                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                    Delivered
                                  </span>
                                ) : (
                                  <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                    Pending
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.buyer}
                              </div>
                            </td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
