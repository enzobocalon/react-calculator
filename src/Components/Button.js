import React, { useContext} from 'react'
import '../App.css'
import { CalcContext } from '../Context/CalcContext'

const Button = ({value}) => {

    const { calc, setCalc } = useContext(CalcContext)

    const commaClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        })
    }

    const resetClick = () => {
        setCalc({sign: '', num: 0, res: 0})
    }

    const handleClickButton = () => {
        const numberString = value.toString()
        let numberValue;
        if (numberString === '0' && calc.num === 0){
            numberValue = 0;
        } else{
            numberValue = Number(calc.num + numberString)
        }

        setCalc({
            ...calc,
            num: numberValue
        })
    }

    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }

    const equalsClick = () => {
        if (calc.res && calc.num){
            const math = (firstNumber, secondNumber, sign) => {
                const result = {
                  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
                  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
                  'x': (firstNumber, secondNumber) => firstNumber * secondNumber, 
                  '/': (firstNumber, secondNumber) => firstNumber / secondNumber 
                }
                return result[sign](firstNumber, secondNumber)
              }
              setCalc({
                res: math(calc.res, calc.num, calc.sign),
                sign: '',
                num: 0
            })
        }
    }

    const percentageClick = () => {
        setCalc({
            num: (calc.num / 100),
            res: (calc.res / 100),
            sign: ''
        })
    }

    const invertClick = () => {
        setCalc({
            num: calc.num ? calc.num * (-1) : 0,
            res: calc.res ? calc.res * (-1) : 0,
            sign: ''
        })
    }

    const handleBtnClick = () => {
        const result = {
            '.': commaClick,
            'C' : resetClick,
            '/': signClick,
            '+': signClick,
            '-': signClick,
            'x': signClick,
            '=': equalsClick,
            '%': percentageClick,
            '+-': invertClick
        }
        if(result[value]) {
            return result[value]()
          } else {
            return handleClickButton()
          }
    }

  return (
    <button id={
        typeof value === 'number' ? value : 
        value === 'x' ? 'multiply' : 
        value ==='=' ? 'equals' :
        value ==='+' ? 'add' :
        value ==='-' ? 'subtract' : 
        value ==='.' ? 'decimal' :
        value ==='C' ? 'clear' : 
        value ==='/' ? 'divide' : null} 
        className='button' onClick={handleBtnClick}>{value}</button>
  )
}

export default Button