import React, { useState, useEffect } from "react";

import { IKeyConfig } from '../types';

interface IKeyConfigProps {
  setKeyConfig: (keyConfig: IKeyConfig) => void;
  disabled: boolean;
}

const keyTypeOptionsData = [
  { value: 'ecc', label: 'ECC' },
  { value: 'rsa', label: 'RSA' },
];

const keyCurveOptionsData = [
  { value: 'curve25519', label: 'curve25519' },
  { value: 'ed25519', label: 'ed25519' },
  { value: 'nistP256', label: 'nistP256' },
  { value: 'nistP384', label: 'nistP384' },
  { value: 'nistP521', label: 'nistP521' },
  { value: 'brainpoolP256r1', label: 'brainpoolP256r1' },
  { value: 'brainpoolP384r1', label: 'brainpoolP384r1' },
  { value: 'brainpoolP512r1', label: 'brainpoolP512r1' },
  { value: 'secp256k1', label: 'secp256k1' },
];

const keyLengthOptionsData = [
  { value: 2048, label: '2048' },
  { value: 3072, label: '3072' },
  { value: 4096, label: '4096' },
  { value: 5120, label: '5120' },
  { value: 6144, label: '6144' },
  { value: 7168, label: '7168' },
  { value: 8192, label: '8192' },
];

function KeyConfig({ setKeyConfig, disabled }: IKeyConfigProps): React.ReactElement {
  const [keyType, setKeyType] = useState<string>("ecc");
  const [keyLength, setKeyLength] = useState<number | undefined>(undefined);
  const [keyCurve, setKeyCurve] = useState<string | undefined>("curve25519");

  const handleKeyTypeOptionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setKeyType(event.target.value);
  };

  const handleKeyCurveOptionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setKeyCurve(event.target.value);
  };

  const handleKeyLengthOptionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newValue = parseInt(event.target.value, 10);

    if (!Number.isFinite(newValue) || newValue < 2048 || newValue > 8192) {
      return;
    }

    setKeyLength(newValue);
  };

  useEffect(() => {
    if (keyType === "ecc" && typeof keyCurve === "undefined") {
      setKeyCurve("curve25519");
      setKeyLength(undefined);
    } else if (keyType === "rsa" && typeof keyLength === "undefined") {
      setKeyLength(2048);
      setKeyCurve(undefined);
    }
  }, [keyType, keyLength, keyCurve]);

  useEffect(() => {
    setKeyConfig({ keyType, keyLength, keyCurve });
  }, [keyType, keyLength, keyCurve]);

  const selectClasses = `
    block
    w-full

    mt-2

    pr-4
    pl-4
    py-2

    bg-transparent
    border
    border-gray-300
    rounded-full
    placeholder-gray-400
    focus:outline-none
    leading-relaxed

    disabled:border-gray-200
    disabled:bg-gray-50
    disabled:text-gray-500
    disabled:shadow-none
    dark:disabled:border-gray-700
    dark:disabled:bg-gray-800/20
  `;

  return (
    <div className="mt-4 flex flex-row">
      <div className="mr-4">
        <label htmlFor="key-type-select">Key type:</label>
        <select className={selectClasses} id="key-type-select" value={keyType} onChange={handleKeyTypeOptionChange} disabled={disabled}>
          {keyTypeOptionsData.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {(keyType === "ecc" && typeof keyCurve === "string") && (
        <div>
          <label htmlFor="key-curve-select">Key curve:</label>
          <select className={selectClasses} id="key-curve-select" value={keyCurve} onChange={handleKeyCurveOptionChange} disabled={disabled}>
            {keyCurveOptionsData.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
      {(keyType === "rsa" && typeof keyLength === "number") && (
        <div>
          <label htmlFor="key-length-select">Key length:</label>
          <select className={selectClasses} id="key-length-select" value={keyLength} onChange={handleKeyLengthOptionChange} disabled={disabled}>
            {keyLengthOptionsData.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default KeyConfig;
