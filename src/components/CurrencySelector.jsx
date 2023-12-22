import React, { useEffect, useState } from "react";
import { InputNumber, Select, Space } from "antd";
import "../App.css";

const { Option } = Select;

const CurrencySelector = ({ data }) => {
    const [firstSelector, setFirstSelector] = useState("UAH");
    const [secondSelector, setSecondSelector] = useState("UAH");
    const [firstInput, setFirstInput] = useState("");
    const [secondInput, setSecondInput] = useState("");

    function firstSelectorHandler(value) {
        setFirstSelector(value);
    }

    function secondSelectorHandler(value) {
        setSecondSelector(value);
    }

    useEffect(() => {
        if (data[0].rate !== "loading...") {
            const uah = { name: "UAH", rate: 1 };
            data.push(uah);
            setFirstSelector(data.find((el) => el.name === "UAH").rate);
            setSecondSelector(data.find((el) => el.name === "USD").rate);
        }
    }, [data]);

    useEffect(() => {
        if (data[0].rate !== "loading...") {
            setSecondInput(
                ((+firstInput * firstSelector) / secondSelector).toFixed(2)
            );
        }
    }, [firstSelector]);

    useEffect(() => {
        if (data[0].rate !== "loading...") {
            setFirstInput(
                ((+secondInput * secondSelector) / firstSelector).toFixed(2)
            );
        }
    }, [secondSelector]);

    function firstInputHandler(value) {
        setFirstInput(value);
        setSecondInput(((+value * firstSelector) / secondSelector).toFixed(2));
    }

    function secondInputHandler(value) {
        setSecondInput(value);
        setFirstInput(((+value * secondSelector) / firstSelector).toFixed(2));
    }

    return (
        <div>
            <Space direction="vertical">
                <InputNumber
                    value={firstInput}
                    onChange={firstInputHandler}
                    placeholder="Введите кол-во валюты"
                    addonAfter={
                        <Select
                            className="selector"
                            value={firstSelector}
                            onChange={firstSelectorHandler}
                            style={{ width: 90 }}
                        >
                            {data.map((el) => (
                                <Option
                                    width={200}
                                    key={el.name}
                                    value={el.rate}
                                >
                                    {el.name}
                                </Option>
                            ))}
                        </Select>
                    }
                />
                <InputNumber
                    value={secondInput}
                    onChange={secondInputHandler}
                    placeholder="Введите кол-во валюты"
                    addonAfter={
                        <Select
                            className="selector"
                            value={secondSelector}
                            onChange={secondSelectorHandler}
                            style={{ width: 90 }}
                        >
                            {data.map((el) => (
                                <Option
                                    width={200}
                                    key={el.name}
                                    value={el.rate}
                                >
                                    {el.name}
                                </Option>
                            ))}
                        </Select>
                    }
                />
            </Space>
        </div>
    );
};

export default CurrencySelector;
