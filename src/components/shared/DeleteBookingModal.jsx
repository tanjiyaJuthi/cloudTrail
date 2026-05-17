"use client";

import {Gear} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoWarningOutline } from "react-icons/io5";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

const DeleteBookingModal = ({booking}) => {
    const router = useRouter();

    const handleDelete = async () => {
        const { data:tokenData } = await authClient.token();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${booking._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'applications/json',
                 Authorization: `Bearer ${tokenData?.token}`
            }
        });

        await res.json();

        router.push("/my-bookings");
    }

    return (
        <Modal>
            <Button className="bg-transparent rounded-none border border-red-500 text-red-500 px-3 py-2 flex gap-1 items-center">
                <RiDeleteBin6Line /> Cancel
            </Button>
            
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-100 rounded-none">
                        <Modal.CloseTrigger />
                        
                        <Modal.Header>
                            <Modal.Heading className="text-2xl flex gap-5 items-center">
                                <IoWarningOutline className="text-5xl p-2 rounded-full bg-red-100 text-red-500 font-bold" />
                                Delete Your Booking?!
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body>
                            <p>
                                {`Are you sure you want to delete "${booking.destinationName}" from your booking? This action cannot be undone and will permanently remove this travel package from the system.`}
                            </p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button 
                                slot="close"
                                className="bg-transparent text-gray-900 rounded-none border border-gray-500 flex gap-1 items-center"
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleDelete}
                                type="suubmit" 
                                className="bg-red-500 rounded-none border border-red-500 text-white flex gap-2 items-center"
                            >
                                <RiDeleteBin6Line /> Delete Destination
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DeleteBookingModal;