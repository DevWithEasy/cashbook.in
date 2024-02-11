import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../libs/allBookAction";
import { addBook, refresh } from "../../store/slice/bookSlice";
import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, Spinner } from "@chakra-ui/react";

export default function Contact_Add({ view, setView }) {
  const { currentBook } = useSelector((state) => state.book);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("Customer");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Modal isOpen={view} isCentered size="xl">
        <ModalOverlay />
        <ModalContent className="mx-2">
          <div className="px-6 py-4 flex justify-between items-center border-b">
            <p className="text-xl">Add New Contact</p>
            <button
              onClick={() => setView(!view)}
              className="px-4 py-1 border rounded"
            >
              X
            </button>
          </div>

          <div className="px-6 pt-3 pb-10 space-y-5">
            <div className="space-y-1">
              <label className="text-sm text-gray-500">Contact name</label>
              <input
                placeholder="e.g - Abdur Rahman, Abdul Malek"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded border focus:outline-[#4863D4]"
                autoFocus={true}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm text-gray-500">
                Mobile Number (Optional){" "}
              </label>
              <select className="mr-2 px-4 py-2 border rounded focus:outline-[#4863D4]">
                <option>BD</option>
              </select>
              <input
                placeholder="e.g - 01717642515"
                onChange={(e) => setPhone(e.target.value)}
                className="px-4 py-2 rounded border focus:outline-[#4863D4]"
              />
            </div>
            <div
              className="space-y-1"
            >
              <label className="block text-sm text-gray-500">
                Contact Type
              </label>
              <div
                className="space-x-2"
              >
                <button
                  onClick={() => setType("Customer")}
                  className={`px-6 py-1 border rounded-full ${
                    type === "Customer" && "bg-[#EBEEFD] text-[#4863D4]"
                  }`}
                >
                  Customer
                </button>
                <button
                  onClick={() => setType("Supplier")}
                  className={`px-6 py-1 border rounded-full ${
                    type === "Supplier" && "bg-[#EBEEFD] text-[#4863D4]"
                  }`}
                >
                  Supplier
                </button>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-end border-t">
            <button
              onClick={(e) =>
                createBook(
                  currentBook?._id,
                  name,
                  setLoading,
                  dispatch,
                  addBook,
                  refresh,
                  setView
                )
              }
              className="px-8 py-3 bg-[#4863D4] text-white rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
