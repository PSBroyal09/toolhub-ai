"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Operator = "+" | "-" | "×" | "÷";

function applyOperator(a: number, b: number, op: Operator): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
  }
}

export function GeneralCalculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  function inputDigit(digit: string) {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  }

  function inputDecimal() {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function clear() {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }

  function handleOperator(nextOperator: Operator) {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator && !waitingForOperand) {
      const result = applyOperator(previousValue, inputValue, operator);
      setPreviousValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }

  function handleEquals() {
    const inputValue = parseFloat(display);
    if (operator && previousValue !== null) {
      const result = applyOperator(previousValue, inputValue, operator);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  }

  function toggleSign() {
    setDisplay(String(parseFloat(display) * -1));
  }

  const buttons: { label: string; onClick: () => void; className?: string }[] = [
    { label: "C", onClick: clear, className: "text-destructive" },
    { label: "±", onClick: toggleSign },
    { label: "%", onClick: () => setDisplay(String(parseFloat(display) / 100)) },
    { label: "÷", onClick: () => handleOperator("÷") },
    { label: "7", onClick: () => inputDigit("7") },
    { label: "8", onClick: () => inputDigit("8") },
    { label: "9", onClick: () => inputDigit("9") },
    { label: "×", onClick: () => handleOperator("×") },
    { label: "4", onClick: () => inputDigit("4") },
    { label: "5", onClick: () => inputDigit("5") },
    { label: "6", onClick: () => inputDigit("6") },
    { label: "-", onClick: () => handleOperator("-") },
    { label: "1", onClick: () => inputDigit("1") },
    { label: "2", onClick: () => inputDigit("2") },
    { label: "3", onClick: () => inputDigit("3") },
    { label: "+", onClick: () => handleOperator("+") },
    { label: "0", onClick: () => inputDigit("0"), className: "col-span-2" },
    { label: ".", onClick: inputDecimal },
    { label: "=", onClick: handleEquals },
  ];

  return (
    <div className="mx-auto flex max-w-xs flex-col gap-3">
      <div className="rounded-lg border bg-muted px-4 py-6 text-right text-3xl font-semibold break-all">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <Button
            key={btn.label}
            variant="outline"
            className={`h-12 text-base ${btn.className ?? ""}`}
            onClick={btn.onClick}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
