import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full py-6 mt-12 border-t bg-card/50"
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          <p>Made by <b>Chandu Veeramalla</b> and <b>Akash Ravula</b></p>

        </p>
        <p className="text-xs text-muted-foreground mt-1">
          © 2025 Fintrack. Track wisely, spend happily.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
