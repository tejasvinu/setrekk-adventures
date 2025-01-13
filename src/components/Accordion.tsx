import { useState } from "react";

const AccordionComponent = () => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number): void => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const accordionItems = [
        {
            title: "Inclusions",
            content: [
                "Travel from Bangalore to any destination, back in Non-AC / Minibus 🚍(depending on the number of participants and Availability)",
                "Meals: Varies from trip/trek to trip/trek ,check detailed itinerary for accurate information",
                "All Entry charges",
                "Guide/Trek lead charges from Setrekk adventures."
            ]
        },
        {
            title: "Exclusions",
            content: [
                "Meals other than those mentioned in the itinerary",
                "Activities charges",
                "Any Kind of Personal Expenses",
                "Any kind of Insurances (health, life, accidental, medical, etc)",
                "Anything that is not included in the above list"
            ]
        },
        {
            title: "Things To Carry",
            content: [
                "Water Bottle (2 liters)",
                "Trekking shoes or hiking boots",
                "Backpack for carrying items",
                "Energy food (dry fruits, chocolate bars, glucose, electrolyte, flavored milk)",
                "Comfortable trekking pants or trousers",
                "Sweaters or Pullovers",
                "Cap or hat",
                "Power bank (optional)",
                "Camera (optional)",
                "Sunscreen lotion, sun blocks, and lip balm",
                "Sunglasses (optional)",
                "Extra cash",
                "Raincoat",
                "Personal medicine if required",
                "Mosquito repellent cream",
                "Torch or headlamps",
                "Flip flops",
                "Towels & blankets",
                "Toilet Kit (Toothbrush, toothpaste, & shampoo)",
                "At least one ID proof (Driving License, Voter ID, or Aadhar card)"
            ]
        },
        {
            title: "Special Notes by Organizer",
            content: [
                "No Luxury. We assure awesome memories in every trip, but not awesome facilities! We provide basic facilities in terms of food, travel & accommodation.",
                <span className="text-red-600">No alcohol & Drugs during Treks & adventure activities</span>,
                "The itinerary is fixed. No special requests to change itinerary/schedule are permitted",
                <span className="text-blue-600">Please go through the Terms & Conditions before booking: Setrekk adventures Terms & Conditions</span>,
                "About Trip: This trip involves basic facilities in terms of food, travel, and stay without any luxury, whatsoever.",
                "This is a group trip with a shared model. It may not suit everyone – especially those expecting privacy, Luxury, and comfort.",
                "Accommodations include homestays with cots & beds/ floor mattresses (sharing basis, separate for boys & girls), clean washrooms",
                "Homestays with Tent stay.",
                <span className="text-red-600">Please do not book this trip if you are not okay with the above points.</span>,
                "Travel: Tempo Traveller or Mini Bus (with push-back seats) depending on the number of participants and Availability",
                "Note: This trip involves an overnight journey on a push-back Seater (Not sleeper or semis-sleeper).",
                "We request you to book this trip only if you can handle slight discomfort (especially the last row of the vehicle).",
                "Seats are allotted on a first come first serve basis to the pickup point"
            ]
        },
        {
            title: "Cancellation Policy",
            content: [
                "🕒 Cancellations made 10 days before the actual trip date will incur a cancellation fee of 10% of the Total Trip Fare for a refund.",
                "🕒 Cancellations made 3 to 6 days before the actual trip date will incur a cancellation fee of 25% of the Total Trip Fare.",
                "🕒 Cancellations made 2 days before the actual trip date will incur a cancellation fee of 50% of the Total Trip Fare.",
                "🕒 Cancellations made 0 to 1 day before the actual trip date will incur a cancellation fee of 100% of the Total Trip Fare.",
                "🌧️ In case of any unforeseen situations like bad weather conditions, a political issue, or government restrictions, the complete trip will be canceled, and only then you will receive a full refund.",
                "🌧️ Cancellations of individual activities like trekking, camping, etc. due to weather conditions or closure of point of interest. In such cases, we will try our best to provide an alternative feasible solution. However, a refund will not be applicable for the same.",
                "🕒 Cancellations are strictly subjected to cancellation policies mentioned on the website & are irrespective of the date of booking.",
            ]
        },
        {
            title: "Terms and Conditions",
            content: [
                "❌ No alcohol & smoking during Treks & adventure activities.",
                "🏞️ No Luxury. We assure awesome memories every trip, but not awesome facilities! We provide basic facilities in terms of food, travel & accommodation.",
                "📅 The itinerary is fixed. No special requests to change itinerary/schedule are permitted.",
                "♻️ Absolutely No littering during our travels. We swear to protect our environment.",
                "⏰ Co-operate with the organizer(s) in following the schedule set for the day (especially getting up and getting ready in the morning). This will ensure travelers won’t miss out on the real fun part – that is traveling.",
                "🛡️ Every traveler is responsible for his/her for your own safety while traveling with Setrekk Adventures. Don’t indulge in any illegal or silly activity that causes harm to you or fellow travelers.",
                "🚫 Unexpected situations: It may happen we do not cover all the places mentioned in the itinerary because of unpredictable reasons like bad weather, wild animal presence, abrupt blocking of sites by the police/forest department, delay in travel because of an issue with our group itself, traffic conditions, etc. In most cases, if the time permits, the organizer(s) will take travelers to an alternative place. But in some cases, we may have to skip a place altogether.",
                "🤝 Travelers are expected to respect each other and help each other. Avoid discussing sensitive matters like sex, politics, and religion/caste/race.",
                "💰 Travellers / Trippers can pay 30 % of actual trip fee in Advance to confirm tickets (Which is Non Refundable).",
                "❗ Using foul or abusive language, eve-teasing, arguing with fellow travelers/organizer(s), and/or involving in the physical assault will not be accepted and will stand a chance of being deserted by Setrekk Adventures team."
            ]
        }
    ];

    return (
        <div className="w-full p-4">
            {accordionItems.map((item, index) => (
                <div key={`accordion-${index}`} className="border border-gray-300 rounded-lg shadow-lg mb-4">
                    <button
                        type="button"
                        className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 border-b border-gray-300 focus:outline-none hover:bg-gray-200"
                        onClick={() => toggleAccordion(index)}
                    >
                        <span className="text-gray-700 font-semibold">{item.title}</span>
                        <svg
                            className={`w-5 h-5 transition-transform transform ${
                                activeAccordion === index ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <div
                        className={`px-6 py-4 ${
                            activeAccordion === index ? "block" : "hidden"
                        }`}
                    >
                        <ul className="list-disc list-inside text-gray-700">
                            {item.content.map((itemContent, i) => (
                                <li className="mb-2 text-lg font-semibold text-gray-700" key={`content-${index}-${i}`}>
                                    {itemContent}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccordionComponent;
