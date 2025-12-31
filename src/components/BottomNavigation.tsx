import { useState } from "react";
import { motion } from "framer-motion";
import { Home, ReceiptText, Plus, Handshake, BarChart3 } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  onAddExpense: () => void;
  activeTab?: string;
}

const BottomNavigation = ({ onAddExpense, activeTab = "home" }: BottomNavigationProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleQuickAdd = (type: string) => {
    setIsDrawerOpen(false);
    if (type === "expense") {
      onAddExpense();
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <div className="mx-4 mb-4">
          <div className="glass-card rounded-3xl px-2 py-3">
            <div className="flex items-center justify-around">
              {/* Home */}
              <NavItem 
                icon={Home} 
                label="Home" 
                isActive={activeTab === "home"} 
              />

              {/* Activity */}
              <NavItem 
                icon={ReceiptText} 
                label="Activity" 
                isActive={activeTab === "activity"} 
              />

              {/* Hero [+] Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDrawerOpen(true)}
                className="relative -mt-8"
              >
                <div className="hero-add-button w-16 h-16 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-white" strokeWidth={3} />
                </div>
              </motion.button>

              {/* Settle Up */}
              <NavItem 
                icon={Handshake} 
                label="Settle Up" 
                isActive={activeTab === "settle"} 
              />

              {/* Insights */}
              <NavItem 
                icon={BarChart3} 
                label="Insights" 
                isActive={activeTab === "insights"} 
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick-Add Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="glass-card border-t border-white/10">
          <DrawerHeader>
            <DrawerTitle className="text-center text-xl font-bold">Quick Add</DrawerTitle>
          </DrawerHeader>
          <div className="p-6 pb-10 grid grid-cols-2 gap-4">
            <QuickAddOption 
              icon="💸" 
              label="Add Expense" 
              onClick={() => handleQuickAdd("expense")} 
            />
            <QuickAddOption 
              icon="👥" 
              label="New Squad" 
              onClick={() => handleQuickAdd("squad")} 
            />
            <QuickAddOption 
              icon="🧾" 
              label="Scan Receipt" 
              onClick={() => handleQuickAdd("scan")} 
            />
            <QuickAddOption 
              icon="💰" 
              label="Record Payment" 
              onClick={() => handleQuickAdd("payment")} 
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ icon: Icon, label, isActive }: NavItemProps) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    className="flex flex-col items-center gap-1 px-2 py-1"
  >
    <div className={`transition-all duration-200 ${isActive ? "drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" : ""}`}>
      <Icon 
        className={`w-6 h-6 transition-all duration-200 ${
          isActive ? "text-[#3b82f6]" : "text-muted-foreground/50"
        }`} 
        strokeWidth={isActive ? 2.5 : 2}
      />
    </div>
    <span className={`text-[10px] font-medium transition-all duration-200 ${
      isActive ? "text-[#3b82f6]" : "text-muted-foreground/50"
    }`}>
      {label}
    </span>
  </motion.button>
);

interface QuickAddOptionProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const QuickAddOption = ({ icon, label, onClick }: QuickAddOptionProps) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
  >
    <span className="text-3xl">{icon}</span>
    <span className="text-sm font-medium text-foreground">{label}</span>
  </motion.button>
);

export default BottomNavigation;
