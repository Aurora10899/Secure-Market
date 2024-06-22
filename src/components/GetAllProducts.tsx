"use client";

import { ethers } from "ethers";
import SupplyChainABI from "@/data/SupplyChainABI.json";
import { toast } from "sonner";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function GetAllProducts() {
  const [contractData, setContractData] = useState([]);

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
      const response = await contract.getProducts();
      const data = response.map((products: any) => {
        return {
          productId: products[0].toString(),
          name: products[1],
          description: products[2],
          price: products[3].toString(),
          quantity: products[4].toString(),
          supplier: products[5],
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

  return (
    <div>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-lg font-bold">Products</h1>
            <p className="mt-1 text-sm text-gray-700">
              This is the list of all Products.
              <br />
              * 1 ETH = 1000000000000000000 Wei
            </p>
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
                        <span>Product ID</span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Description
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Seller
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
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {contractData.map((product: any) => {
                      if (product.quantity > 0) {
                        return (
                          <tr key={product.productId}>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.productId}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.name}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.description}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.supplier}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.quantity}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {product.price}
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
    </div>
  );
}
