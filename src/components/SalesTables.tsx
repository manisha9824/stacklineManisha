import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Sale } from "../types";

interface Props {
    sales: Sale[];
}

const SalesTable: React.FC<Props> = ({ sales }) => {
    const [sortConfig, setSortConfig] = useState<{ field: keyof Sale; order: "asc" | "desc" }>({
        field: "retailSales",
        order: "asc",
    });

    const handleSort = (field: keyof Sale) => {
        setSortConfig((prev) => ({
            field,
            order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
        }));
    };

    const renderSortIcon = (column: keyof Sale) => {
        if (sortConfig.field === column) {
            return sortConfig.order === "asc" ? (
                <FontAwesomeIcon icon={faChevronUp} style={{ fontSize: "12px", marginLeft: "5px" }} />
            ) : (
                <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: "12px", marginLeft: "5px" }} />
            );
        }
        // Render a neutral icon for unsorted columns
        return <FontAwesomeIcon icon={faChevronUp} style={{ fontSize: "12px", marginLeft: "5px", opacity: 0.3 }} />;
    };

    const formatColumnName = (column: string) => {
        return column.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase();
    };

    const formatNumberWithCommas = (num: number) => {
        return new Intl.NumberFormat().format(num);
    };

    const sortedSales = useMemo(() => {
        const { field, order } = sortConfig;
        return [...sales].sort((a, b) => {
            const valA = a[field];
            const valB = b[field];

            if (typeof valA === "string") {
                return order === "asc" ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
            }
            return order === "asc" ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
        });
    }, [sales, sortConfig]);

    const columns: (keyof Sale)[] = ["weekEnding", "retailSales", "wholesaleSales", "unitsSold", "retailerMargin"];

    return (
        <div className="sales-table-container" style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column}
                                onClick={() => handleSort(column)}

                            >
                                {formatColumnName(column)}
                                {renderSortIcon(column)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedSales.map((sale, index) => (
                        <tr key={index}>
                            <td>{sale.weekEnding}</td>
                            <td>${formatNumberWithCommas(sale.retailSales)}</td>
                            <td>${formatNumberWithCommas(sale.wholesaleSales)}</td>
                            <td>{sale.unitsSold}</td>
                            <td>${formatNumberWithCommas(sale.retailerMargin)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;