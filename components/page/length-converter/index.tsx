"use client";
import { ComboBoxResponsive } from "@/components/shared/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lengthUnits } from "@/constants/length-units";
import { convertLength } from "@/lib/helpers";
import { ArrowLeftRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

export const LengthConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputUnit, setInputUnit] = useState("meters");
  const [outputUnit, setOutputUnit] = useState("kilometers");
  const [outputValue, setOutputValue] = useState("");

  const handleConvert = useCallback(() => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      const result = convertLength(value, inputUnit, outputUnit);
      console.log("result", result);
      setOutputValue(String(result));
    }
  }, [inputUnit, inputValue, outputUnit]);
  const handleSwap = () => {
    let prevInput = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(prevInput);
  };
  useEffect(() => {
    handleConvert();
  }, [inputUnit, outputUnit, inputValue, handleConvert]);

  return (
    <section className="grid grid-cols-2 gap-4 w-full max-w-[450px]">
      <div className="w-full col-span-2 flex gap-2">
        <ComboBoxResponsive
          triggerProps={{
            variant: "outline",
            className: "justify-between w-full",
          }}
          value={inputUnit}
          title="kaynak birim"
          data={lengthUnits}
          handleChange={(e) => {
            setInputUnit(String(e));
            handleConvert();
          }}
        />
        <Button onClick={handleSwap}>
          <ArrowLeftRight width={16} height={16} />
        </Button>

        <ComboBoxResponsive
          triggerProps={{
            variant: "outline",
            className: "justify-between w-full",
          }}
          value={outputUnit}
          title="hedef birim"
          data={lengthUnits}
          handleChange={(e) => {
            setOutputUnit(String(e));
            handleConvert();
          }}
        />
      </div>
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleConvert();
        }}
        placeholder={`Enter ${inputUnit}`}
        className="col-span-2 md:col-span-1"
      />
      <Input
        defaultValue={outputValue}
        placeholder="The result"
        disabled
        className="col-span-2 md:col-span-1 disabled:opacity-100 bg-gray-100 disabled:cursor-default"
      />
    </section>
  );
};
