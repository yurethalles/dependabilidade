import React, { useState } from 'react';

const CalculadoraCientifica = () => {
  const [display, setDisplay] = useState('0');
  const [memoria, setMemoria] = useState(null);
  const [operacaoPendente, setOperacaoPendente] = useState(null);
  const [novoNumero, setNovoNumero] = useState(true);

  const operacoes = {
    'sin': (num) => Math.sin(num),
    'cos': (num) => Math.cos(num),
    'tan': (num) => Math.tan(num),
    'log': (num) => Math.log10(num),
    'ln': (num) => Math.log(num),
    'sqrt': (num) => Math.sqrt(num),
    'x²': (num) => Math.pow(num, 2),
    'π': () => Math.PI,
    'e': () => Math.E,
  };

  const handleNumero = (num) => {
    if (novoNumero) {
      setDisplay(num);
      setNovoNumero(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperacao = (op) => {
    const atual = parseFloat(display);
    
    if (operacaoPendente) {
      const resultado = calcular(memoria, atual, operacaoPendente);
      setDisplay(resultado.toString());
      setMemoria(resultado);
    } else {
      setMemoria(atual);
    }
    
    setOperacaoPendente(op);
    setNovoNumero(true);
  };

  const handleFuncaoCientifica = (func) => {
    const atual = parseFloat(display);
    const resultado = operacoes[func](atual);
    setDisplay(resultado.toString());
    setNovoNumero(true);
  };

  const calcular = (a, b, operacao) => {
    switch (operacao) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleIgual = () => {
    if (!operacaoPendente) return;
    
    const atual = parseFloat(display);
    const resultado = calcular(memoria, atual, operacaoPendente);
    setDisplay(resultado.toString());
    setMemoria(null);
    setOperacaoPendente(null);
    setNovoNumero(true);
  };

  const limpar = () => {
    setDisplay('0');
    setMemoria(null);
    setOperacaoPendente(null);
    setNovoNumero(true);
  };

  const botoes = [
    ['sin', 'cos', 'tan', 'C'],
    ['log', 'ln', 'sqrt', '÷'],
    ['x²', '7', '8', '9'],
    ['π', '4', '5', '6'],
    ['e', '1', '2', '3'],
    ['+/-', '0', '.', '=']
  ];

  const operadoresLaterais = ['×', '-', '+'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-96 border border-gray-700">
        <div className="bg-gray-900 text-white text-right p-4 rounded-lg mb-4 h-20 flex items-end justify-end text-3xl overflow-hidden border border-gray-700">
          {display}
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {botoes.map((linha, i) => (
            <React.Fragment key={i}>
              {linha.map((botao, j) => (
                <button
                  key={`${i}-${j}`}
                  onClick={() => {
                    if (botao === 'C') limpar();
                    else if (botao === '=') handleIgual();
                    else if (botao === '+/-') setDisplay((-parseFloat(display)).toString());
                    else if ('0123456789.'.includes(botao)) handleNumero(botao);
                    else if (Object.keys(operacoes).includes(botao)) handleFuncaoCientifica(botao);
                    else handleOperacao(botao);
                  }}
                  className={`${
                    botao === 'C' ? 'bg-red-500 hover:bg-red-600' :
                    botao === '=' ? 'bg-green-500 hover:bg-green-600' :
                    'bg-gray-700 hover:bg-gray-600'
                  } text-white p-4 rounded-lg transition-colors text-lg font-medium`}
                >
                  {botao}
                </button>
              ))}
            </React.Fragment>
          ))}
          
          {operadoresLaterais.map((op, i) => (
            <button
              key={op}
              onClick={() => handleOperacao(op)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors text-lg font-medium"
            >
              {op}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculadoraCientifica;