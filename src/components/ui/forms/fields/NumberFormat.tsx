import React from "react";
import {NumericFormat as BaseNumericFormat} from "react-number-format";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    prefix?: string;
    suffix?: string;
}

const NumberFormat = React.forwardRef(function NumberFormatCustom(props: CustomProps, ref) {
    const {onChange, prefix, suffix, ...other} = props;

    return (
        <BaseNumericFormat
            {...other}

            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator={' '}
            decimalScale={2}
            prefix={prefix}
            suffix={suffix}
        />
    );
});

export default NumberFormat;