import { CircleDollar } from '@gravity-ui/icons';
import {Card, Link} from "@heroui/react";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { SiExpertsexchange } from "react-icons/si";
import { MdOutlineSupportAgent } from "react-icons/md";

const WhyChoose = () => {
    return (
        <div className="why-choose-wrapper px-20 lg:px-0 bg-sky-50 mt-20 py-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl">Why Choose Wanderlust</h2>
                    <p className="text-gray-400">Your trusted partner for exceptional travel experiences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                    <Card className="rounded-none shadow-none p-10">
                        <MdOutlineHealthAndSafety className="text-4xl text-sky-500" />

                        <Card.Header>
                            <Card.Title className="text-2xl">Safe & Secure</Card.Title>
                            <Card.Description className="mt-5">
                                Your safety is our priority with comprehensive travel insurance and 24/7 support.
                            </Card.Description>
                        </Card.Header>
                    </Card>

                    <Card className="rounded-none shadow-none p-10">
                        <SiExpertsexchange className="text-4xl text-sky-500" />

                        <Card.Header>
                            <Card.Title className="text-2xl">Expert Guides</Card.Title>
                            <Card.Description className="mt-5">
                                Your safety is our priority with comprehensive travel insurance and 24/7 support.
                            </Card.Description>
                        </Card.Header>
                    </Card>

                    <Card className="rounded-none shadow-none p-10">
                        <MdOutlineSupportAgent className="text-4xl text-sky-500" />

                        <Card.Header>
                            <Card.Title className="text-2xl">24/7 Support</Card.Title>
                            <Card.Description className="mt-5">
                                Your safety is our priority with comprehensive travel insurance and 24/7 support.
                            </Card.Description>
                        </Card.Header>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default WhyChoose;