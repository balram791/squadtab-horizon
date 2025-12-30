import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import friendsIllustration from "@/assets/friends-illustration.png";
import PaymentOptionsModal from "./PaymentOptionsModal";

const OverviewCard = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card rounded-3xl p-6 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Overview</h2>
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
        </div>

        {/* Balance Section */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">Total Balance</p>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-foreground">₹4,250</span>
            <span className="text-sm font-semibold text-destructive">
              You Owe: ₹1,850
            </span>
          </div>
        </div>

        {/* Goa Getaway Feature Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="floating-card rounded-2xl p-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏖️</span>
                <h3 className="font-bold text-foreground">Goa Getaway</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Split with 4 friends • 3 pending
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setIsPaymentModalOpen(true)}
                  size="sm"
                  className="settle-button font-semibold rounded-xl px-5"
                >
                  <Wallet className="w-4 h-4 mr-1.5" />
                  Settle Up
                </Button>
              </motion.div>
            </div>
            <div className="flex-shrink-0">
              <img
                src={friendsIllustration}
                alt="Friends illustration"
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Payment Options Modal */}
      <PaymentOptionsModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={1850}
        tripName="Goa Getaway"
      />
    </>
  );
};

export default OverviewCard;
