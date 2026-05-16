"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { CiEdit } from "react-icons/ci";
import { LuSave } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { authClient } from "@/app/lib/auth-client";

const EditDestinationModal = ({ destination }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const editDestinationPackage = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const updatedDestination = Object.fromEntries(formData.entries());
      updatedDestination.price = Number(updatedDestination.price);
      updatedDestination.rating = Number(updatedDestination.rating);
      updatedDestination.reviewCount = Number(updatedDestination.reviewCount);

      const { tokenData } = await authClient.getSession();
      const token = tokenData?.token;
      console.log(token);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatedDestination),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update destination");
      }

      setOpen(false);

      router.replace(`/destinations/${data.data.slug}`);
      router.refresh();
    } catch (error) {
      console.error("Edit destination error:", error.message);
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button
        onPress={() => setOpen(true)}
        className="bg-transparent text-gray-900 rounded-none border border-gray-500 flex gap-1 items-center"
      >
        <CiEdit /> Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-200 w-full rounded-none p-10">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Update Travel Package</Modal.Heading>

              <p className="mt-1.5 text-sm leading-5 text-muted">
                Make changes to the travel package details below
              </p>
            </Modal.Header>

            <Modal.Body className="py-4">
              <Surface variant="default">
                <Form onSubmit={editDestinationPackage} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Destination Name */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={destination.destinationName}
                        name="destinationName"
                        isRequired
                      >
                        <Label>Destination Name</Label>
                        <Input
                          placeholder="Bali Paradise"
                          className="rounded-none bg-sky-50 shadow-none"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Country */}
                    <TextField
                      defaultValue={destination.country}
                      name="country"
                      isRequired
                    >
                      <Label>Country</Label>
                      <Input
                        placeholder="Indonesia"
                        className="rounded-none bg-sky-50 shadow-none"
                      />
                      <FieldError />
                    </TextField>

                    {/* Category - Updated Select Component */}
                    <div>
                        <Select
                          defaultValue={destination.category}
                          name="category"
                          isRequired
                          placeholder="Select category"
                        >
                          <Label>Category</Label>

                          {/* TRIGGER */}
                          <Select.Trigger className="w-full rounded-none bg-sky-50 border border-sky-200 shadow-none px-3 py-2 text-left hover:bg-sky-100 focus:outline-none focus:ring-0">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>

                          {/* DROPDOWN */}
                          <Select.Popover className="rounded-none">
                            <ListBox className="w-full rounded-none bg-sky-50 border border-sky-200 shadow-none p-0">
                              
                              <ListBox.Item
                                id="Beach"
                                textValue="Beach"
                                className="px-3 py-2 cursor-pointer rounded-none hover:bg-sky-200 focus:bg-sky-300 data-selected:bg-sky-400 data-selected:text-white"
                              >
                                Beach
                                <ListBox.ItemIndicator />
                              </ListBox.Item>

                              <ListBox.Item
                                id="Mountain"
                                textValue="Mountain"
                                className="px-3 py-2 cursor-pointer rounded-none hover:bg-sky-200 focus:bg-sky-300 data-selected:bg-sky-400 data-selected:text-white"
                              >
                                Mountain
                                <ListBox.ItemIndicator />
                              </ListBox.Item>

                              <ListBox.Item
                                id="City"
                                textValue="City"
                                className="px-3 py-2 cursor-pointer rounded-none hover:bg-sky-200 focus:bg-sky-300 data-selected:bg-sky-400 data-selected:text-white"
                              >
                                City
                                <ListBox.ItemIndicator />
                              </ListBox.Item>

                              <ListBox.Item
                                id="Adventure"
                                textValue="Adventure"
                                className="px-3 py-2 cursor-pointer rounded-none hover:bg-sky-200 focus:bg-sky-300 data-selected:bg-sky-400 data-selected:text-white"
                              >
                                Adventure
                                <ListBox.ItemIndicator />
                              </ListBox.Item>

                              <ListBox.Item
                                id="Cultural"
                                textValue="Cultural"
                                className="px-3 py-2 cursor-pointer rounded-none hover:bg-sky-200 focus:bg-sky-300 data-selected:bg-sky-400 data-selected:text-white"
                              >
                                Cultural
                                <ListBox.ItemIndicator />
                              </ListBox.Item>

                              <ListBox.Item
                                id="Luxury"
                                textValue="Luxury"
                                className="px-3 py-2 cursor-pointer rounded-none hover:bg-sky-200 focus:bg-sky-300 data-selected:bg-sky-400 data-selected:text-white"
                              >
                                Luxury
                                <ListBox.ItemIndicator />
                              </ListBox.Item>

                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>

                    {/* Price */}
                    <TextField
                      defaultValue={destination.price}
                      name="price"
                      type="number"
                      isRequired
                    >
                      <Label>Price (USD)</Label>
                      <Input
                        type="number"
                        placeholder="1299"
                        className="rounded-none bg-sky-50 shadow-none"
                      />
                      <FieldError />
                    </TextField>

                    {/* Duration */}
                    <TextField
                      defaultValue={destination.duration}
                      name="duration"
                      isRequired
                    >
                      <Label>Duration</Label>
                      <Input
                        placeholder="7 Days / 6 Nights"
                        className="rounded-none bg-sky-50 shadow-none"
                      />
                      <FieldError />
                    </TextField>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={destination.imageUrl}
                        name="imageUrl"
                        isRequired
                      >
                        <Label>Image URL</Label>
                        <Input
                          type="url"
                          placeholder="https://example.com/bali-paradise.jpg"
                          className="rounded-none bg-sky-50 shadow-none"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    <TextField
                      defaultValue={destination.rating}
                      name="rating"
                      type="number"
                      isRequired
                    >
                      <Label>Rating (0 - 5)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        placeholder="4.8"
                        className="rounded-none bg-sky-50 shadow-none"
                      />
                      <FieldError />
                    </TextField>

                    <TextField
                      defaultValue={destination.reviewCount}
                      name="reviewCount"
                      type="number"
                      isRequired
                    >
                      <Label>Review Count</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="1200"
                        className="rounded-none bg-sky-50 shadow-none"
                      />
                      <FieldError />
                    </TextField>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={destination.description}
                        name="description"
                        isRequired
                      >
                        <Label>Description</Label>
                        <TextArea
                          placeholder="Describe the travel experience..."
                          className="rounded-none bg-sky-50"
                        />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  <Modal.Footer>
                    <Button
                      slot="close"
                      className="bg-transparent rounded-none border border-red-500 text-red-500 px-3 py-2 flex gap-2 items-center"
                    >
                      <RiDeleteBin6Line /> Cancel
                    </Button>

                    <Button
                      type="submit"
                      className="bg-sky-500 rounded-none border border-sky-500 text-white px-3 py-2 flex gap-2 items-center"
                    >
                      <LuSave /> Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditDestinationModal;
