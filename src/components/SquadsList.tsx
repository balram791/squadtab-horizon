import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Squad {
  id: string;
  emoji: string;
  title: string;
  people: number;
  squads: number;
}

const squads: Squad[] = [
  { id: "1", emoji: "🏖️", title: "Bali Trip", people: 11, squads: 7 },
  { id: "2", emoji: "🏠", title: "Flat 4B Rent", people: 4, squads: 12 },
  { id: "3", emoji: "🍽️", title: "Weekend Dinners", people: 6, squads: 5 },
];

const SquadsList = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Squads</h2>
        <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold uppercase tracking-wide">
          Active
        </span>
      </div>

      {/* Squad items */}
      <div className="space-y-3">
        {squads.map((squad, index) => (
          <motion.div
            key={squad.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card rounded-2xl p-4 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">{squad.emoji}</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{squad.title}</p>
                <p className="text-sm text-muted-foreground">
                  {squad.people} people, {squad.squads} squads
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SquadsList;
