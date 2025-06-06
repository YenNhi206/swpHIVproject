import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const mockHistory = [
  {
    id: 1,
    date: "2025-04-10",
    type: "Khám định kỳ",
    description: "Khám sức khỏe tổng quát, xét nghiệm CD4 và tải lượng virus.",
  },
  {
    id: 2,
    date: "2025-03-02",
    type: "Đơn thuốc",
    description: "ARV: TDF + 3TC + EFV. Cấp thuốc 1 tháng.",
  },
  {
    id: 3,
    date: "2025-01-15",
    type: "Tư vấn điều trị",
    description: "Tư vấn tuân thủ điều trị và dinh dưỡng.",
  },
];

export default function History() {
  const [dateRange, setDateRange] = useState({
    from: new Date("2025-01-01"),
    to: new Date("2025-06-01"),
  });

  const filterByDate = (entries) => {
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate >= dateRange.from &&
        entryDate <= dateRange.to
      );
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Lịch sử khám & điều trị</h1>
      <p className="text-muted-foreground">
        Xem lại các lần khám, đơn thuốc và quá trình điều trị HIV
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <p className="font-medium">Chọn khoảng thời gian:</p>
          <div className="flex space-x-2 mt-2">
            <Calendar
              selected={dateRange.from}
              onSelect={(date) => setDateRange({ ...dateRange, from: date })}
            />
            <Calendar
              selected={dateRange.to}
              onSelect={(date) => setDateRange({ ...dateRange, to: date })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filterByDate(mockHistory).map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{item.type}</h2>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span className="text-sm text-right text-gray-500">
                  {format(new Date(item.date), "dd/MM/yyyy")}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}

        {filterByDate(mockHistory).length === 0 && (
          <p className="text-center text-gray-500 italic">Không có dữ liệu trong khoảng thời gian đã chọn.</p>
        )}
      </div>
    </div>
  );
}
