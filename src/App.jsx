import { useState } from 'react'
import { DatePicker, Form, Checkbox, Input, Button, Select, Space, Col, Row, Flex } from 'antd'
import dayjs from 'dayjs'
import './App.css'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const freqToNum = (freq)=>{
  switch(freq){
    case "daily":
      return 365;
    case "weekly":
      return 52;
    case "monthly":
      return 12; 
    case "quaterly":
      return 4; 
    case "semi-annually":
      return 2;
    case "annually":
      return 1;
    default:
      return 0;
  }
}

function App() {
  const [form] = Form.useForm();
  const [result,setResult] = useState();


  

  const onFinish = (values) => {
    console.log(values);
    //defaultValue={dayjs('01/01/2015', 'DD/MM/YYYY')}
    let days = values.EndDate.diff(values.StartDate, 'day')
    if((values.IncEndDay??false)===true){
      days=days+1;
    }

    console.log(days)

    // const t = days/365;
    // const n = freqToNum(values.ComFreq)
    // const r = values.AnnualRate/100
    // const P = values.Amount
    // const final_amount = Math.pow((1+(r/n)),n*t) * P

    //setResult(`No. of days: ${days} \nInterest Earned: ₹${Math.round((final_amount-P)*100)/100} \nFinal Amount: ₹${Math.round(final_amount*100)/100}`)

    const p = values.Amount;
    const r = values.AnnualRate;
    const t = days/365;

    const interest = (p*r*t)/100;

    const final_amount = Number(p) + interest;

    setResult(`No. of days: ${days} \nInterest Earned: ₹${Math.round(interest*100)/100} \nFinal Amount: ₹${Math.round(final_amount*100)/100}`)    
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >

        <Form.Item name="StartDate" label="StartDate">
          <DatePicker format="DD/MM/YYYY" /> 
        </Form.Item>
        <Form.Item name="EndDate" label="EndDate">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item name="IncEndDay" valuePropName="checked" wrapperCol={{offset: 4,span: 24}}>
          <Checkbox>Include end date in calculation (1 day is added)</Checkbox>
        </Form.Item>
        <Form.Item name="Amount" label="Amount">
          <Input type="number" prefix="₹" suffix="" />
        </Form.Item>
        <Form.Item name="AnnualRate" label="Annual Rate">
          <Input type="number" prefix="" suffix="%" />
        </Form.Item>
        {/* <Form.Item name="ComFreq" label="Compound Freq">
          <Select>
            <Select.Option value="daily">daily</Select.Option>
            <Select.Option value="weekly">weekly</Select.Option>
            <Select.Option value="monthly">monthly</Select.Option>
            <Select.Option value="quaterly">quaterly</Select.Option>
            <Select.Option value="semi-annually">semi-annually</Select.Option>
            <Select.Option value="annually">annually</Select.Option>
          </Select>
        </Form.Item> */}
        <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Calculate
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
        </Form.Item>
      </Form>
      <Flex>
        <Input.TextArea placeholder="Result" rows={4} value={result} />
      </Flex>
      
    </>
  )
}

export default App
