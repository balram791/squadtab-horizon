import { motion } from "framer-motion";
import { Check, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingNotificationProps {
  type: "owe" | "settled";
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  delay?: number;
  className?: string;
}

const FloatingNotification = ({
  type,
  title,
  subtitle,
  actionLabel,
  onAction,
  delay = 0,
  className = "",
}: FloatingNotificationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ scale: 1.03, y: -4 }}
      className={`floating-card-elevated rounded-2xl p-4 cursor-pointer ${className}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay * 0.5
        }}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
            type === "settled" 
              ? "bg-success/10" 
              : "bg-accent/10"
          }`}>
            {type === "settled" ? (
              <Check className="w-5 h-5 text-success" />
            ) : (
              <Leaf className="w-5 h-5 text-accent" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm leading-tight">
              {title}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
            {actionLabel && onAction && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction();
                }}
                size="sm"
                className="mt-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl text-xs px-4 h-8"
              >
                {actionLabel}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingNotification;
