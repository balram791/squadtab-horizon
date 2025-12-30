import { useState } from "react";
import { motion } from "framer-motion";
import OverviewCard from "@/components/OverviewCard";
import FloatingNotification from "@/components/FloatingNotification";
import BottomNavigation from "@/components/BottomNavigation";
import AddExpenseModal from "@/components/AddExpenseModal";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSettleUp = () => {
    toast({
      title: "Opening Settle Up",
      description: "Redirecting to settlement screen...",
    });
  };

  const handleSendReminder = () => {
    toast({
      title: "Reminder Sent! 📤",
      description: "Priya will receive a notification",
    });
  };

  return (
    <div className="min-h-screen pb-28 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-72 h-72 rounded-full bg-success/5 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pt-8 max-w-lg mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                SquadTab
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Split smarter, together
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center"
            >
              <span className="text-xl">👋</span>
            </motion.div>
          </div>
        </motion.header>

        {/* Overview Card */}
        <div className="mb-6">
          <OverviewCard onSettleUp={handleSettleUp} />
        </div>

        {/* Floating Notifications */}
        <div className="space-y-4">
          <FloatingNotification
            type="owe"
            title="Priya still owes ₹404.20 from dinner"
            subtitle="Last reminder: 2 days ago"
            actionLabel="Send Reminder"
            onAction={handleSendReminder}
            delay={0.2}
          />

          <FloatingNotification
            type="settled"
            title="Manali Trip - Settled! All Clear! ✓"
            subtitle="₹12,500 split between 5 friends"
            delay={0.4}
          />

          <FloatingNotification
            type="settled"
            title="Manali Trek - Settled! All Clear 🌿"
            subtitle="Adventure expenses cleared"
            delay={0.6}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation onAddExpense={() => setIsModalOpen(true)} />

      {/* Add Expense Modal */}
      <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Index;
