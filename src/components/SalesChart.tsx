import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Sale } from "../types";

// Utility function to get the month abbreviation
const renderMonth = (date: string) => {
    return new Date(date).toLocaleString("en-US", { month: "short" }).toUpperCase();
};

interface Props {
    sales: Sale[];
}

const SalesChart: React.FC<Props> = ({ sales }) => {
    // Aggregate sales data by month
    const aggregatedSales = sales.reduce((acc: any[], sale: Sale) => {
        const month = renderMonth(sale.weekEnding);
        const existingMonth = acc.find((entry) => entry.month === month);

        if (existingMonth) {
            existingMonth.retailSales += sale.retailSales;
            existingMonth.wholesaleSales += sale.wholesaleSales;
        } else {
            acc.push({
                month,
                retailSales: sale.retailSales,
                wholesaleSales: sale.wholesaleSales,
            });
        }

        return acc;
    }, []);

    return (
        <LineChart
            width={1100}
            height={400}
            data={aggregatedSales}
            margin={{ right: 30, left: 20, bottom: 10 }}
        >
            <XAxis
                dataKey="month"
                axisLine={{ stroke: "#D0D0D0", strokeWidth: 1 }}
                tick={{ fontSize: 12, fill: "#A0A0A0" }}
                tickLine={false}
            />

            <YAxis hide />

            <Tooltip />

            <Line
                type="monotone"
                dataKey="retailSales"
                stroke="#4D90FE"
                strokeWidth={2}
                dot={false}
            />

            <Line
                type="monotone"
                dataKey="wholesaleSales"
                stroke="#B0B0B0"
                strokeWidth={2}
                dot={false}
            />
        </LineChart>
    );
};

export default SalesChart;
