import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Receipt, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddExpenseModal = ({ isOpen, onClose }: AddExpenseModalProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [splitWith, setSplitWith] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Expense Added! 🎉",
      description: `₹${amount} for "${description}" has been added`,
    });

    // Reset form
    setDescription("");
    setAmount("");
    setSplitWith("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="glass-card rounded-3xl p-6 max-w-lg mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Add Expense</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-muted-foreground" />
                    Description
                  </label>
                  <Input
                    placeholder="Dinner at restaurant..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-muted/50 border-0 rounded-xl h-12 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <span className="text-muted-foreground">₹</span>
                    Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-muted/50 border-0 rounded-xl h-12 text-foreground placeholder:text-muted-foreground text-2xl font-bold"
                  />
                </div>

                {/* Split With */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    Split with
                  </label>
                  <Input
                    placeholder="Add friends..."
                    value={splitWith}
                    onChange={(e) => setSplitWith(e.target.value)}
                    className="bg-muted/50 border-0 rounded-xl h-12 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Quick Split Options */}
                <div className="flex gap-2 pt-2">
                  {["Equal", "By %", "Exact"].map((option) => (
                    <motion.button
                      key={option}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 px-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-2xl mt-4"
                >
                  Add Expense
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddExpenseModal;
