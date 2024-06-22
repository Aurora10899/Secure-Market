"use client";

import { useEffect, useState } from "react";
import { Box, ArrowRight, RefreshCw } from "lucide-react";
import axios from "axios";
import { ethers } from "ethers";
import { toast } from "sonner";
import SupplyChainABI from "@/data/SupplyChainABI.json";
import RegSupplier from "@/components/RegSupplier";
import RemoveSupplier from "@/components/RemoveSupplier";
import AllPlacedOrders from "@/components/AllPlacedOrders";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [suppliersAddress, setSuppliersAddress] = useState([]);

  const [nonVerified, setNonVerified] = useState([]);

  const [regSellers, setRegSellers] = useState(false);
  const [removeSellers, setRemoveSellers] = useState(false);
  const [updateShipmentStatus, setUpdateShipmentStatus] = useState(false);

  const handleShowSuppliers = async () => {
    try {
      const contractAddress = (await axios.get("/api/contract-address")).data
        .contractAddress;
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
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
      setSuppliersAddress(data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleShowNonVerifiedSuppliers = async () => {
    try {
      const response = await axios.post("/api/users/verifysuppliers");
      const data = response.data.user.map(
        (supplier: any) => supplier.walletaddress
      );
      setNonVerified(data);
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
    handleShowSuppliers();
    handleShowNonVerifiedSuppliers();

    const interval = setInterval(async () => {
      await handleIsLoggedIn();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const closeRegSellersModal = () => {
    setRegSellers(false);
  };
  const closeRemoveSellersModal = () => {
    setRemoveSellers(false);
  };
  const closeUpdateShipmentStatusModal = () => {
    setUpdateShipmentStatus(false);
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
      <div className="px-2 py-2 md:px-6 md:py-10">
        <hr className="sm:w-2/4 h-0.5 mx-auto my-4 bg-gray-800 border-0 " />
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl text-center">
          Register or Remove a Seller
        </h1>
        <hr className="sm:w-2/4 h-0.5 mx-auto my-4 bg-gray-800 border-0 rounded" />
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-2 xl:gap-16 justify-around">
          <div
            className="space-y-3 xl:m-20 lg:m-20 md:m-10 bg-blue-950 p-6 rounded-lg hover:bg-blue-900"
            onClick={() => setRegSellers(true)}
          >
            <span className="inline-block rounded-full bg-gray-50 p-3 text-black">
              <Box size={40} />
            </span>
            <h1 className="text-xl font-semibold capitalize text-white">
              Register a Seller
            </h1>
            <p className="text-sm text-gray-500">
              Register a seller by entering their wallet address
            </p>
            <button
              className="-mx-1 inline-flex transform items-center text-sm font-semibold capitalize text-white transition-colors duration-300 hover:underline"
              onClick={() => setRegSellers(true)}
            >
              Register
              <ArrowRight size={16} />
            </button>
          </div>
          {regSellers && <RegSupplier closeModal={closeRegSellersModal} />}
          <div
            className="space-y-3 xl:m-20 lg:m-20 md:m-10 bg-blue-950 p-6 rounded-lg hover:bg-blue-900"
            onClick={() => setRemoveSellers(true)}
          >
            <span className="inline-block rounded-full bg-gray-50 p-3 text-black">
              <Box size={40} />
            </span>
            <h1 className="text-xl font-semibold capitalize text-white">
              Remove a Seller
            </h1>
            <p className="text-sm text-gray-500">
              Remove a seller by entering their wallet address
            </p>
            <button
              className="-mx-1 inline-flex transform items-center text-sm font-semibold capitalize text-white transition-colors duration-300 hover:underline"
              onClick={() => setRemoveSellers(true)}
            >
              Remove
              <ArrowRight size={16} />
            </button>
          </div>
          {removeSellers && (
            <RemoveSupplier closeModal={closeRemoveSellersModal} />
          )}
        </div>
      </div>
      <div>
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h1 className="text-lg font-bold">Registered Sellers</h1>
              <p className="mt-1 text-sm text-gray-700">
                This is the list of all Registered Sellers.
              </p>
            </div>
            <div>
              <button
                type="button"
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400/80 hover:text-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => {
                  handleShowSuppliers(), handleShowNonVerifiedSuppliers();
                }}
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
                          <span>Seller Address</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {suppliersAddress.map((supplier: any) => (
                        <tr key={supplier.supplierAddress}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 ">
                              {supplier.supplierAddress}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h1 className="text-lg font-bold">Non Verified Sellers</h1>
              <p className="mt-1 text-sm text-gray-700">
                This is the list of all Non verified Sellers.
              </p>
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
                          <span>Seller Address</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {nonVerified.map((supplier: any) => (
                        <tr key={supplier}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 ">
                              {supplier}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="px-2 py-2 md:px-6 md:py-10">
        <hr className="sm:w-2/4 h-0.5 mx-auto my-4 bg-gray-800 border-0 rounded" />
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl text-center">
          User's Orders Status
        </h1>
        <hr className="sm:w-2/4 h-0.5 mx-auto my-4 bg-gray-800 border-0 rounded" />
      </div>
      <AllPlacedOrders />
    </div>
  );
}
