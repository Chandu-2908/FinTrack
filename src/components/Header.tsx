import { Wallet, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-lg"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-primary-glow p-2.5 rounded-2xl shadow-lg">
            <Wallet className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              FinTrack
            </h1>
            <p className="text-xs text-muted-foreground">Track your spending with ease</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full transition-all hover:scale-110"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-accent" />
          ) : (
            <Moon className="h-5 w-5 text-primary" />
          )}
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
