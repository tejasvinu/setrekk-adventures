"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AccordionComponent = () => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const accordionItems = [
        {
            title: "What's Included",
            content: [
                "🚌 Non-AC Bus/Minibus transportation from Bangalore",
                "🍽️ Selected meals (check itinerary for details)",
                "🎫 All entry and permit charges",
                "👥 Professional trek guide from Setrekk Adventures"
            ]
        },
        {
            title: "What's Not Included",
            content: [
                "🍽️ Meals not mentioned in itinerary",
                "🎯 Optional activities",
                "💰 Personal expenses",
                "🏥 Travel insurance",
                "✨ Items not listed in inclusions"
            ]
        },
        {
            title: "Essential Packing List",
            content: [
                "💧 2L water bottle",
                "👟 Trekking/hiking boots",
                "🎒 Day backpack",
                "🍫 Energy snacks & electrolytes",
                "👕 Comfortable trekking clothes",
                "🧥 Warm layers",
                "🧢 Cap or hat",
                "🔋 Power bank",
                "📷 Camera (optional)",
                "🧴 Sunscreen & lip balm",
                "🕶️ Sunglasses",
                "💵 Extra cash",
                "🌧️ Rain gear",
                "💊 Personal medications",
                "🦟 Insect repellent",
                "🔦 Headlamp/torch",
                "👡 Flip-flops for camp",
                "🛏️ Light blanket",
                "🧰 Basic toiletries",
                "🪪 Government ID proof"
            ]
        },
        {
            title: "Important Guidelines",
            content: [
                "🏕️ Basic facilities provided - focus on adventure over luxury",
                "🚫 No alcohol or drugs during treks",
                "📅 Fixed itinerary - no customization",
                "📞 24/7 ground support available",
                "👥 Group travel model - shared accommodations",
                "🏡 Basic homestays with separate arrangements for men/women",
                "⚠️ Prior trekking experience recommended for difficult treks"
            ]
        },
        {
            title: "Cancellation Policy",
            content: [
                "💫 10+ days before: 10% fee",
                "📅 3-6 days before: 25% fee",
                "⏰ 2 days before: 50% fee",
                "❌ 0-1 day before: 100% fee",
                "🌧️ Full refund only if entire trip cancelled due to weather/safety",
                "⚠️ No refunds for individual activity cancellations"
            ]
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            {accordionItems.map((item, index) => (
                <motion.div
                    key={`accordion-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-4"
                >
                    <button
                        type="button"
                        onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                        className={`w-full flex justify-between items-center p-5 rounded-xl text-left transition-all
                            ${activeAccordion === index 
                                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                                : 'bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 hover:shadow-md'}`}
                        aria-expanded={activeAccordion === index}
                        aria-controls={`accordion-content-${index}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className={`text-lg font-semibold transition-transform duration-300 ${
                                activeAccordion === index ? 'transform translate-x-2' : ''
                            }`}>{item.title}</span>
                            {activeAccordion === index && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="h-2 w-2 rounded-full bg-white"
                                />
                            )}
                        </div>
                        <motion.svg
                            animate={{ 
                                rotate: activeAccordion === index ? 180 : 0,
                                scale: activeAccordion === index ? 1.2 : 1
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                    </button>
                    <AnimatePresence>
                        {activeAccordion === index && (
                            <motion.div
                                id={`accordion-content-${index}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                    height: "auto", 
                                    opacity: 1,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                exit={{ 
                                    height: 0, 
                                    opacity: 0,
                                    transition: { duration: 0.2, ease: "easeIn" }
                                }}
                                className="overflow-hidden"
                            >
                                <div className="p-5 bg-slate-800/30 backdrop-blur-sm rounded-b-xl border border-slate-700/50">
                                    <ul className="space-y-3">
                                        {item.content.map((content, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ 
                                                    delay: i * 0.05,
                                                    duration: 0.3,
                                                    ease: "easeOut"
                                                }}
                                                className="flex items-center gap-3 text-slate-300 hover:text-slate-100 transition-colors group"
                                            >
                                                <span className="text-base relative pl-2">
                                                    <motion.span
                                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                        layoutId={`dot-${index}-${i}`}
                                                    />
                                                    {content}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
};

export default AccordionComponent;
