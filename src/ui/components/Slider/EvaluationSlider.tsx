import {
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderProps,
  SliderThumb,
  SliderTrack,
  Tooltip
} from '@chakra-ui/react';
import { useState } from 'react';

type EvaluationSliderProps = {
  id: string;
  label: string;
} & SliderProps;

export function EvaluationSlider({
  id,
  label,
  ...sliderProps
}: EvaluationSliderProps) {
  const [sliderValue, setSliderValue] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (value: number) => {
    setSliderValue(value);

    if (sliderProps.onChange) sliderProps.onChange(value);
  };

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm'
  };

  return (
    <FormLabel htmlFor={id}>
      {label}
      <Slider
        id={id}
        defaultValue={5}
        max={10}
        step={1}
        onChange={handleChange}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="text-black"
        {...sliderProps}
      >
        <SliderMark {...labelStyles} value={0}>
          0
        </SliderMark>
        <SliderMark {...labelStyles} value={5}>
          5
        </SliderMark>
        <SliderMark {...labelStyles} value={10}>
          10
        </SliderMark>

        <SliderTrack bg="detail">
          <SliderFilledTrack bg="primary" />
        </SliderTrack>

        <Tooltip
          hasArrow
          placement="top"
          label={sliderValue}
          isOpen={showTooltip}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </FormLabel>
  );
}
