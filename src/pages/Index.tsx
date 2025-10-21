import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";
import SummaryChart from "@/components/SummaryChart";
import Footer from "@/components/Footer";
import { Expense } from "@/types/expense";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Index = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: uuidv4(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ExpenseForm onAddExpense={addExpense} />
            <ExpenseTable expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>
          
          <div className="lg:col-span-1">
            <SummaryChart expenses={expenses} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
