import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/HeroCarousel";
import SquadsList from "@/components/SquadsList";
import BottomNavigation from "@/components/BottomNavigation";
import AddExpenseModal from "@/components/AddExpenseModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              Home
            </h1>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center"
            >
              <span className="text-xl">👋</span>
            </motion.div>
          </div>
        </motion.header>

        {/* Hero Carousel Card */}
        <div className="mb-6">
          <HeroCarousel />
        </div>

        {/* Squads List */}
        <div className="mb-6">
          <SquadsList />
        </div>

        {/* Add Expense Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl py-6 text-base"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Expense
          </Button>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation onAddExpense={() => setIsModalOpen(true)} />

      {/* Add Expense Modal */}
      <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Index;
