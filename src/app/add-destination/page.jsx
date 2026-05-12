"use client";

import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";

const AddDestinationPage = () => {
    const router = useRouter();

    const addDestinationPackage = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const destination = Object.fromEntries(formData.entries());

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/destination`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(destination),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || "Failed to add destination");
            }
            router.replace(`/destinations`);
            router.refresh();

        } catch (error) {
            console.error("Add destination error:", error.message);
        }
    };

  return (
    <div className="add-destination-wrapper my-20">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-2 text-center">
          <h2 className="text-4xl">Add New Travel Package</h2>
        </div>

        <Card className="w-xl mx-auto rounded-none mt-10 mb-20">
          <Card.Content>
            <Form onSubmit={addDestinationPackage} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Destination Name */}
                <div className="md:col-span-2">
                  <TextField name="destinationName" isRequired>
                    <Label>Destination Name</Label>
                    <Input
                      className='rounded-none bg-sky-50 border border-sky-50 shadow-none'
                      placeholder="Bali Paradise"
                    />
                    <FieldError />
                  </TextField>
                </div>

                {/* Country */}
                <TextField name="country" isRequired>
                  <Label>Country</Label>
                  <Input className='rounded-none bg-sky-50 border border-sky-50 shadow-none' placeholder="Indonesia"  />
                  <FieldError />
                </TextField>

                {/* Category - Updated Select Component */}
                <div>
                  <Select
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
                <TextField name="price" type="number" isRequired>
                  <Label>Price (USD)</Label>
                  <Input
                    className='rounded-none bg-sky-50 border border-sky-50 shadow-none'
                    type="number"
                    placeholder="1299"
                    
                  />
                  <FieldError />
                </TextField>

                {/* Duration */}
                <TextField name="duration" isRequired>
                  <Label>Duration</Label>
                  <Input
                  className='rounded-none bg-sky-50 border border-sky-50 shadow-none'
                    placeholder="7 Days / 6 Nights"
                    
                  />
                  <FieldError />
                </TextField>

                {/* Departure Date */}
                <div className="md:col-span-2">
                  <TextField name="departureDate" type="date" isRequired>
                    <Label>Departure Date</Label>
                    <Input className='rounded-none bg-sky-50 border border-sky-50 shadow-none' type="date"  />
                    <FieldError />
                  </TextField>
                </div>

                {/* Image URL - Removed preview */}
                <div className="md:col-span-2">
                  <TextField name="imageUrl" isRequired>
                    <Label>Image URL</Label>
                    <Input
                    className='rounded-none bg-sky-50 border border-sky-50 shadow-none'
                      type="url"
                      placeholder="https://example.com/bali-paradise.jpg"
                      
                    />
                    <FieldError />
                  </TextField>
                </div>

                <TextField name="rating" type="number" isRequired>
                  <Label>Rating (0 - 5)</Label>
                  <Input
                  className='rounded-none bg-sky-50 border border-sky-50 shadow-none'
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="4.8"
                    
                  />
                  <FieldError />
                </TextField>
              
                <TextField name="reviewCount" type="number" isRequired>
                  <Label>Review Count</Label>
                  <Input
                  className='rounded-none bg-sky-50 border border-sky-50 shadow-none'
                    type="number"
                    min="0"
                    placeholder="1200"
                    
                  />
                  <FieldError />
                </TextField>

                {/* Description */}
                <div className="md:col-span-2">
                  <TextField name="description" isRequired>
                    <Label>Description</Label>
                    <TextArea
                    className='rounded-none bg-sky-50 border border-sky-50 shadow-none'
                      placeholder="Describe the travel experience..."
                      name="description"
                    />
                    <FieldError />
                  </TextField>
                </div>
              </div>

              {/* Buttons */}

              <Button
                type="submit"
                variant="outline"
                // isLoading={isPending}
                className="rounded-none w-full bg-cyan-500 text-white"
              >
                {/* {isPending ? "Adding Package..." : "Add Travel Package"} */}
                Add Travel Package
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default AddDestinationPage;
