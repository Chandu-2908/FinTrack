import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense } from "@/types/expense";

interface SummaryChartProps {
  expenses: Expense[];
}

const COLORS = [
  "hsl(160, 65%, 55%)", // Mint
  "hsl(15, 85%, 70%)",  // Coral
  "hsl(260, 60%, 75%)", // Lavender
  "hsl(45, 90%, 65%)",  // Yellow
  "hsl(200, 70%, 60%)", // Blue
  "hsl(330, 70%, 65%)", // Pink
  "hsl(100, 60%, 55%)", // Green
  "hsl(30, 80%, 60%)",  // Orange
  "hsl(280, 65%, 60%)", // Purple
  "hsl(180, 60%, 50%)", // Teal
];

const SummaryChart = ({ expenses }: SummaryChartProps) => {
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const sortedCategoryData = categoryData.sort((a, b) => b.value - a.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-accent/20" style={{ boxShadow: "var(--shadow-card)" }}>
        <CardHeader>
          <CardTitle className="text-2xl">Spending Summary</CardTitle>
          <CardDescription>Breakdown of your expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-6 rounded-2xl">
              <p className="text-sm text-muted-foreground mb-2">Total Expenses</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                ₹{totalExpense.toFixed(2)}
              </p>
            </div>

            {expenses.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sortedCategoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {sortedCategoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => `₹${value.toFixed(2)}`}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Category Breakdown
                  </h3>
                  {sortedCategoryData.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{item.value.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          {totalExpense > 0 ? ((item.value / totalExpense) * 100).toFixed(1) : 0}%
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No data to display. Add some expenses to see your summary!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SummaryChart;
