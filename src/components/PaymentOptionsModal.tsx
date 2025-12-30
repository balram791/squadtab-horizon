import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Building2, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface PaymentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  tripName: string;
  upiId?: string;
  sortCode?: string;
  accountNumber?: string;
}

const PaymentOptionsModal = ({
  isOpen,
  onClose,
  amount,
  tripName,
  upiId = "YOUR_UPI_ID@okaxis",
  sortCode = "XX-XX-XX",
  accountNumber = "XXXXXXXX",
}: PaymentOptionsModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleUpiPayment = () => {
    const upiLink = `upi://pay?pa=${upiId}&pn=SquadTab&am=${amount}&cu=INR`;
    window.location.href = upiLink;
    toast({
      title: "Opening UPI App 📱",
      description: "Redirecting to your UPI payment app...",
    });
  };

  const handleBankTransfer = async () => {
    const bankDetails = `Sort Code: ${sortCode}\nAccount Number: ${accountNumber}`;
    try {
      await navigator.clipboard.writeText(bankDetails);
      setCopied(true);
      toast({
        title: "Bank Details Copied! ✓",
        description: "Sort Code and Account Number copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50"
          >
            <div className="glass-card rounded-3xl p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Payment Options</h2>
                  <p className="text-sm text-muted-foreground mt-1">{tripName}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Amount Display */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-5 text-center">
                <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
                <p className="text-4xl font-extrabold text-foreground">₹{amount.toLocaleString()}</p>
              </div>

              {/* Payment Buttons */}
              <div className="space-y-3">
                {/* UPI Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleUpiPayment}
                    className="w-full settle-button py-6 text-base font-semibold rounded-2xl"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    Pay via UPI
                  </Button>
                </motion.div>

                {/* UK Bank Transfer Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleBankTransfer}
                    variant="outline"
                    className="w-full py-6 text-base font-semibold rounded-2xl border-2 border-border/50 bg-background/50 hover:bg-muted/50"
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5 mr-2 text-success" />
                    ) : (
                      <Building2 className="w-5 h-5 mr-2" />
                    )}
                    {copied ? "Details Copied!" : "UK Bank Transfer"}
                    {!copied && <Copy className="w-4 h-4 ml-2 opacity-50" />}
                  </Button>
                </motion.div>
              </div>

              {/* Bank Details Preview */}
              <div className="text-center text-xs text-muted-foreground">
                <p>Sort Code: {sortCode} • Account: {accountNumber}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentOptionsModal;
