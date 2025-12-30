import { motion } from "framer-motion";
import { Home, Plus, PieChart, User } from "lucide-react";

interface BottomNavigationProps {
  onAddExpense: () => void;
  activeTab?: string;
}

const BottomNavigation = ({ onAddExpense, activeTab = "home" }: BottomNavigationProps) => {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "insights", icon: PieChart, label: "Insights" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mb-4">
        <div className="glass-card rounded-3xl px-4 py-3">
          <div className="flex items-center justify-around">
            {/* Home */}
            <NavItem 
              icon={navItems[0].icon} 
              label={navItems[0].label} 
              isActive={activeTab === navItems[0].id} 
            />

            {/* Add Expense Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onAddExpense}
              className="relative -mt-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary shadow-lg shadow-primary/30 flex items-center justify-center">
                <Plus className="w-8 h-8 text-primary-foreground" strokeWidth={2.5} />
              </div>
            </motion.button>

            {/* Insights */}
            <NavItem 
              icon={navItems[1].icon} 
              label={navItems[1].label} 
              isActive={activeTab === navItems[1].id} 
            />

            {/* Profile */}
            <NavItem 
              icon={navItems[2].icon} 
              label={navItems[2].label} 
              isActive={activeTab === navItems[2].id} 
            />
          </div>
        </div>
      </div>
    </motion.div>
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
    className="flex flex-col items-center gap-1 px-3 py-1"
  >
    <Icon 
      className={`w-6 h-6 transition-colors ${
        isActive ? "text-primary" : "text-muted-foreground"
      }`} 
      strokeWidth={isActive ? 2.5 : 2}
    />
    <span className={`text-xs font-medium transition-colors ${
      isActive ? "text-primary" : "text-muted-foreground"
    }`}>
      {label}
    </span>
  </motion.button>
);

export default BottomNavigation;
