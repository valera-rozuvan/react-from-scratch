import React, { useState } from 'react';

import { Button, Input, ViewKey, KeyConfig, Loader } from './components';
import { generateKeyPair, generateFingerprint, copyTextToClipboard } from './utils';
import { IKeyConfig } from './types';

function App(): React.ReactElement {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [passphrase, setPassphrase] = useState<string>("");
  const [keyPair, setKeyPair] = useState<{ privateKey: string; publicKey: string; }>({ privateKey: "", publicKey: "" });
  const [keyFingerPrint, setKeyFingerPrint] = useState<string>("");
  const [keyConfig, setKeyConfig] = useState<IKeyConfig>({ keyType: "", keyLength: undefined, keyCurve: "" });
  const [generatingKeyInProgress, setGeneratingKeyInProgress] = useState<boolean>(false);

  async function btnClick(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    setKeyPair({ privateKey: "", publicKey: "" });
    setKeyFingerPrint("");
    setGeneratingKeyInProgress(true);

    setTimeout(async () => {
      const { privateKey, publicKey } = await generateKeyPair(name, email, passphrase, keyConfig);
      setKeyPair({ privateKey, publicKey });

      const { fingerprint } = await generateFingerprint(privateKey);
      setKeyFingerPrint(fingerprint);

      setTimeout(() => {
        setGeneratingKeyInProgress(false);
      }, 100);
    }, 100);
  }

  function setKeyDetails(event: React.ChangeEvent<HTMLInputElement>, detailType: string): void {
    event.preventDefault();
    event.stopPropagation();

    switch (detailType) {
      case "name":
        setName(event.currentTarget.value);
        break;
      case "email":
        setEmail(event.currentTarget.value);
        break;
      case "passphrase":
        setPassphrase(event.currentTarget.value);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold underline text-clifford">
          Online GPG key generator
        </h1>
      </div>
      <div className="mt-4 flex flex-col">
        <Input placeholder={"Name"} value={name} detailType={"name"} onChange={setKeyDetails} disabled={generatingKeyInProgress} />
        <Input placeholder={"E-mail"} value={email} detailType={"email"} onChange={setKeyDetails} disabled={generatingKeyInProgress} />
        <Input placeholder={"Passphrase"} value={passphrase} detailType={"passphrase"} onChange={setKeyDetails} disabled={generatingKeyInProgress} />
        <KeyConfig setKeyConfig={setKeyConfig} disabled={generatingKeyInProgress} />
      </div>
      <div className="mt-4 flex flex-row items-center">
        <Button text="Generate" onClick={btnClick} disabled={generatingKeyInProgress} />
        {generatingKeyInProgress && <Loader />}
      </div>
      {(keyFingerPrint.length > 0) && (
        <div className="mt-4 flex flex-row">
          <span className="font-mono">key fingerprint:&nbsp;</span>
          <img
            src="images/copy.svg"
            alt={`copy fingerprint`}
            height="32"
            width="32"
            onClick={(event) => { copyTextToClipboard(event, keyFingerPrint); }}
            className="cursor-pointer bg-gray-100 hover:bg-gray-200"
          />
          <span className="font-mono border-2 border-dashed bg-yellow-200 p-1 leading-10">
            {keyFingerPrint}
          </span>
        </div>
      )}
      <div className="mt-4 flex flex-col justify-around">
        <ViewKey gpgKey={keyPair.publicKey} keyType="public" />
        <div className="h-2" />
        <ViewKey gpgKey={keyPair.privateKey} keyType="private" />
      </div>
      <div className="mt-4">
        <img src="images/fractal.jpg" />
      </div>
    </div>
  );
}

export default App;
