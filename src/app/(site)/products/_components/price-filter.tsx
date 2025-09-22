'use client';
import React, { useState } from 'react';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';

const PriceFilter = () => {
  const [values, setValues] = useState([0, 100]);

  return (
    <div className="w-full mt-10">
      <DualRangeSlider
        label={(value) => value}
        value={values}
        onValueChange={setValues}
        min={0}
        max={100}
        step={1}
      />
    </div>
  );
};

export { PriceFilter };