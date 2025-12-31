import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentOptionsModal from "./PaymentOptionsModal";

interface TripCard {
  id: string;
  emoji: string;
  title: string;
  members: number;
  squads: number;
  amount?: number;
}

const trips: TripCard[] = [
  { id: "1", emoji: "🏖️", title: "Goa Trip", members: 8, squads: 502, amount: 1850 },
  { id: "2", emoji: "🏠", title: "Flat 4B Rent", members: 4, squads: 502 },
  { id: "3", emoji: "🏔️", title: "Manali Trek", members: 5, squads: 350 },
];

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripCard | null>(null);

  const handleSettleUp = (trip: TripCard) => {
    setSelectedTrip(trip);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hero-gradient rounded-3xl p-6 relative overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-white/20" />
        <div className="absolute top-16 right-12 w-2 h-2 rounded-full bg-white/30" />
        <div className="absolute bottom-24 left-16 w-2 h-2 rounded-full bg-white/25" />
        <div className="absolute top-1/3 right-8 w-4 h-4 rounded-full bg-white/15" />

        {/* Cards carousel */}
        <div className="flex items-center justify-center gap-3 py-8 min-h-[200px]">
          {trips.map((trip, index) => {
            const isActive = index === activeIndex;
            const offset = index - activeIndex;
            
            return (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  scale: isActive ? 1 : 0.75,
                  x: offset * 20,
                  zIndex: isActive ? 10 : 5 - Math.abs(offset),
                }}
                whileHover={{ scale: isActive ? 1.02 : 0.8 }}
                whileTap={{ scale: isActive ? 0.98 : 0.75 }}
                onClick={() => setActiveIndex(index)}
                className={`trip-card rounded-2xl p-4 cursor-pointer flex flex-col items-center justify-center ${
                  isActive ? "w-28 h-36" : "w-20 h-28"
                }`}
                transition={{ duration: 0.3 }}
              >
                <span className={`${isActive ? "text-3xl" : "text-xl"} mb-2`}>{trip.emoji}</span>
                <p className={`font-bold text-white text-center ${isActive ? "text-sm" : "text-xs"}`}>
                  {trip.title}
                </p>
                <p className="text-white/70 text-xs mt-1">
                  {trip.members} / {trip.squads} squads
                </p>
                
                {isActive && trip.amount && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                  >
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSettleUp(trip);
                      }}
                      size="sm"
                      className="settle-button text-xs px-3 py-1 h-7 rounded-lg"
                    >
                      <Wallet className="w-3 h-3 mr-1" />
                      Settle
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {trips.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex 
                  ? "bg-white w-4" 
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {selectedTrip && (
        <PaymentOptionsModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          amount={selectedTrip.amount || 0}
          tripName={selectedTrip.title}
        />
      )}
    </>
  );
};

export default HeroCarousel;
